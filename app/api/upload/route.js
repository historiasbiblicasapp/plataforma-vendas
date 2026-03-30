import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
        return NextResponse.json({ success: false, error: 'Arquivo não fornecido' }, { status: 400 });
    }

    // 1. Converter o arquivo em Base64 para o ImgBB (formato mais aceito)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 2. Preparar o corpo da requisição para o ImgBB
    const imgbbForm = new FormData();
    imgbbForm.append('image', base64Image);

    // 3. Sua Chave de API que você acabou de gerar
    const apiKey = '138bd1b8476505fd82bcd832dfcd3f4b';

    // 4. Enviar para a nuvem permanente do ImgBB
    console.log(`[ImgBB] Iniciando upload permanente para: ${file.name}`);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: imgbbForm
    });

    const result = await response.json();

    if (result.success) {
        console.log(`[ImgBB] Upload concluído! URL: ${result.data.url}`);
        // Retornamos a URL direta da imagem (display_url ou url)
        return NextResponse.json({ 
            success: true, 
            url: result.data.url 
        });
    } else {
        throw new Error(result.error?.message || 'Falha no servidor ImgBB');
    }

  } catch (error) {
    console.error('[API] Erro interno no Proxy ImgBB:', error);
    return NextResponse.json({ 
        success: false, 
        error: error.message || 'Falha no processamento' 
    }, { status: 500 });
  }
}
