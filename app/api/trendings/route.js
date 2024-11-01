import { NextResponse } from 'next/server';

export async function GET(request) {
  const tokenTmb = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tokenTmb}`,
    },
  };

  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
      options
    );
    const data = await res.json();
    // Envia a resposta como JSON
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar dados', error: error.message },
      { status: 500 }
    );
  }
}
