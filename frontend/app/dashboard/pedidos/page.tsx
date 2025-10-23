// /app/dashboard/pedidos/page.tsx
import { listOrder, OrderResponse } from '@/api/api';
import { OrderCard } from '@/components/order-cart';

import { ClipboardList, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function PedidosPage() {
  

  const ordersResponse = await listOrder();

  const ordersList = Array.isArray(ordersResponse.orders)
    ? ordersResponse.orders
    : [];

  return (
    <div className="w-full">
      {/* 1. Cabeçalho da Página */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ClipboardList size={30} />
          Pedidos
        </h1>
        <Link 
          href="/dashboard/pedidos/novo-pedido" 
          className="flex items-center gap-2 bg-slate-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-500 transition-colors"
        >
          <Plus size={20} />
          Novo Pedido
        </Link>
      </header>

      {/*Lista de Pedidos */}
      {ordersList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-500">
          Nenhum pedido encontrado.
        </div>
      ) : (
        <div className="space-y-6">
          {ordersList.map((order:OrderResponse) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}