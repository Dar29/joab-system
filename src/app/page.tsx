// app/page.tsx (o app/home/page.tsx en Next.js 13+ con app directory)

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/inicio'); // Redirige automáticamente a "/inicio"
  return null; // No se renderiza nada en la página
}
