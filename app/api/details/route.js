import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${apikey}`
    );

    const data = await res.json();

    // Envia a resposta como JSON
    return NextResponse.json(data);
  } catch (error) {
    // Lida com erros
    return NextResponse.json(
      { message: 'Erro ao buscar dados', error: error.message },
      { status: 500 }
    );
  }
}