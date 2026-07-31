import { spawn, ChildProcess } from 'child_process';
import EventEmitter from 'events';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';

export interface PiEvent {
  type: string;
  data: any;
  timestamp: string;
}

export class PiBridge extends EventEmitter {
  private piProcess: ChildProcess | null = null;
  private git = simpleGit();
  private rootDir: string;

  constructor(rootDir: string = process.cwd()) {
    super();
    this.rootDir = rootDir;
  }

  /**
   * Inicia o Pi Agent em Modo RPC (JSONL sobre stdin/stdout)
   */
  public startSession(model: string = 'anthropic/claude-3-5-sonnet') {
    if (this.piProcess) {
      this.piProcess.kill();
    }

    // Inicia o processo CLI do Pi com saída em JSONL
    this.piProcess = spawn('pi', ['--mode', 'rpc', '--model', model], {
      cwd: this.rootDir,
      env: { ...process.env },
    });

    this.piProcess.stdout?.on('data', (chunk: Buffer) => {
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          this.emit('event', {
            type: parsed.type || 'message',
            data: parsed,
            timestamp: new Date().toISOString(),
          } as PiEvent);
        } catch {
          this.emit('raw-log', line);
        }
      }
    });

    this.piProcess.stderr?.on('data', (data: Buffer) => {
      this.emit('error', data.toString());
    });

    this.piProcess.on('exit', (code) => {
      this.emit('exit', code);
      this.piProcess = null;
    });
  }

  /**
   * Envia um novo objetivo ou comando para o Pi em execução
   */
  public sendPrompt(promptText: string) {
    if (!this.piProcess || !this.piProcess.stdin) {
      throw new Error('Sessão do Pi não está ativa.');
    }
    const payload = JSON.stringify({ type: 'prompt', content: promptText }) + '\n';
    this.piProcess.stdin.write(payload);
  }

  /**
   * Lê a lista de tarefas atual do feature_list.json
   */
  public getFeatureList() {
    const filePath = path.join(this.rootDir, 'feature_list.json');
    if (!fs.existsSync(filePath)) return { features: [] };
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  /**
   * Obtém diffs do Git e status atual dos arquivos
   */
  public async getGitStatus() {
    const status = await this.git.status();
    const diff = await this.git.diff();
    return { status, diff };
  }

  /**
   * Encerra a sessão ativa do Pi
   */
  public stopSession() {
    if (this.piProcess) {
      this.piProcess.kill();
      this.piProcess = null;
    }
  }
}