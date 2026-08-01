import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const rootDir = process.cwd();

    // Lê o contexto atual do harness
    const featureListPath = path.join(rootDir, '..', 'feature_list.json');
    let featureList = { features: [] };
    if (fs.existsSync(featureListPath)) {
      featureList = JSON.parse(fs.readFileSync(featureListPath, 'utf-8'));
    }

    // Aqui insere a orquestração agnóstica do agente desejado
    return NextResponse.json({
      status: 'success',
      message: `Prompt recebido para o harness: "${message}"`,
      activeFeatures: featureList.features
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}