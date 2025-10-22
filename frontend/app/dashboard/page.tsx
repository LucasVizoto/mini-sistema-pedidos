// /app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Página Inicial do Site</h1>
      <p>Note que o menu lateral do dashboard NÃO aparece aqui.</p>
      <Link href="/dashboard">
        Ir para o Dashboard
      </Link>
    </main>
  );
}