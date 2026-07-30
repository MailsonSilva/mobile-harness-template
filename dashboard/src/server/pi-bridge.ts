import { spawn, ChildProcess } from 'child_process';
import EventEmitter from 'events';
import simpleGit from 'simple-git';

export class PiBridge extends EventEmitter {
  private piProcess: ChildProcess | null = null;
  private git = simpleGit();

  // Inicia o Pi Agent em modo RPC (JSONL stdin/stdout)
  public startSession(model: string = 'anthropic/claude-3-5-sonnet') {
    this.piProcess = spawn('pi', ['--mode', 'rpc', '--model', model], {
      cwd: process.cwd(),
      env: { ...process.env },
    });

    this.piProcess.stdout?.on('data', (data) => {
      const lines = data.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const event = JSON.parse(line);
          // Emite eventos de execução para a UI React (Websockets/SSE)
          this.emit('pi-event', event);
        } catch {
          this.emit('raw-log', line);
        }
      }
    });

    this.piProcess.stderr?.on('data', (data) => {
      this.emit('pi-error', data.toString());
    });
  }

  // Envia instruções e prompts para o Pi
  public sendPrompt(prompt: string) {
    if (this.piProcess && this.piProcess.stdin) {
      const message = JSON.stringify({ type: 'prompt', content: prompt }) + '\n';
      this.piProcess.stdin.write(message);
    }
  }

  // Obtém informações de status do Git para o Dashboard
  public async getGitStatus() {
    const status = await this.git.status();
    const diff = await this.git.diff();
    return { status, diff };
  }
}