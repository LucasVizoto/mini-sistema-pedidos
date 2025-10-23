// /app/dashboard/pedidos/page.tsx
import { listOrder, OrderResponse } from '@/api/api';
import { OrderCard } from '@/components/order-cart';

import { ClipboardList } from 'lucide-react';

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
        {/* Você pode adicionar um botão "Novo Pedido" aqui se quiser */}
      </header>

      {/* 2. Lista de Pedidos */}
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