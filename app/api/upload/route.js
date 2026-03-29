import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'Arquivo não fornecido' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Salvar no diretório public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Garantir que a pasta existe
    await mkdir(uploadDir, { recursive: true });

    // Nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '_')}`;
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ success: false, error: 'Falha no upload' }, { status: 500 });
  }
}
