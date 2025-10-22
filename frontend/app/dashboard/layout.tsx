// /app/dashboard/layout.tsx
import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      

      <aside className="w-60 bg-gray-900 p-5 border-r border-gray-200">
        <div>
        <img src={'/oticket_play_image.png'} className='mb-9'></img>
        </div>
        
        <nav>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block py-2.5 px-4 rounded-md text-gray-100 hover:bg-gray-200 hover:text-gray-900"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/produtos"
                className="block py-2.5 px-4 rounded-md  text-gray-100 hover:bg-gray-200 hover:text-gray-900"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/pedidos"
                className="block py-2.5 px-4 rounded-md text-gray-100 hover:bg-gray-200 hover:text-gray-900"
              >
                Pedidos
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block py-2.5 px-4 rounded-md text-gray-100 hover:bg-gray-200 hover:text-gray-900"
              >
                Voltar para Home
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-slate-100">

        {children}
      </main>
    </div>
  );
}