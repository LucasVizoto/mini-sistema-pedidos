import { Client, listClient } from '@/api/api';
import Link from 'next/link'
import { Plus, Users } from 'lucide-react';

export default async function ClientesPage() {
  const clients = await listClient();

  const clientesList = Array.isArray(clients.clients) 
    ? clients.clients 
    : [];
  //console.log(clients)
  
  return (
    <div>
      <div className="w-full">
        {/* Cabeçalho */}
      <header className="flex justify-between items-center mb-6">
        {/* Título da página */}
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={30} />
          Clientes
        </h1>
        <Link 
          href="/dashboard/clientes/novo-cliente" 
          className="flex items-center gap-2 bg-slate-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-500 transition-colors"
        >
          <Plus size={20} />
          Novo Cliente
        </Link>
      </header>

      {/* Tabela e conteúdos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {clientesList.length === 0 ? (
          <p className="p-6 text-gray-500">Nenhum cliente cadastrado ainda.</p>
        ) : (
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesList.map((cliente:Client) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cliente.id} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cliente.name} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cliente.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
}