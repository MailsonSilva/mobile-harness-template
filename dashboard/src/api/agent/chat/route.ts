import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    // Rota universal de integração com agentes de IA (Claude Code, OpenCode, Codex, etc.)
    return NextResponse.json({
      success: true,
      output: `[Agente Harness - Modelo: ${model || 'Claude 3.5 Sonnet'}]\nInstrução recebida: "${prompt}"\n\nExecutando ciclo: PLAN ➔ EXECUTE ➔ VALIDATE...`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}