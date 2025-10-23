// /components/OrderCard.tsx
import React from 'react';
import type { OrderRequest } from '@/api/api'; // Importe a interface
import { User, Calendar, Tag, Package } from 'lucide-react';
import { PaymentButton } from './payment-button';

// Funções Helper para formatar dados
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatCurrency(amount: number) {
  return amount.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL'
  });
}

// Componente para o "badge" de status
function StatusBadge({ status }: { status: string }) {
  const isPaid = status === 'PAGO';
  const bgColor = isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
      {status}
    </span>
  );
}

export function OrderCard({ order }: { order: OrderRequest }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      
      {/* Cabeçalho do Card: Cliente e Data */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-2 text-gray-700">
          <User size={18} />
          <span className="font-semibold">{order.client.name}</span>
          <span className="text-gray-500 text-sm hidden sm:block">- {order.client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>{formatDate(order.date)}</span>
        </div>
      </header>

      {/* Corpo do Card: Produtos e ID */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Tag size={16} />
          <span>ID: {order.id}</span>
        </div>
        
        {/* Lista de Produtos */}
        <div className="space-y-2">
          {order.products.map(product => (
            <div key={product.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-50">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-gray-600" />
                <span>{product.name} (x{product.quantity})</span>
              </div>
              <span className="font-medium">{formatCurrency(product.price * product.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé do Card: Status, Total e Botão */}
      <footer className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 bg-gray-50 border-t">
        <div className="flex items-center gap-4">
          <StatusBadge status={order.status} />
          <div className="text-lg font-bold text-gray-800">
            Total: {formatCurrency(order.amount)}
          </div>
        </div>
        
        {/* O Botão de Cliente é renderizado aqui */}
        <PaymentButton orderId={order.id} status={order.status} />
      </footer>
    </div>
  );
}