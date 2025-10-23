// /components/PaymentButton.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { payOrder } from '@/api/api';
import { Check, DollarSign, Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  orderId: string;
  status: string;
}

export function PaymentButton({ orderId, status }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isPaid = status === 'PAGO';

  const handlePayment = async () => {
    setIsLoading(true);
    try {

      await payOrder(orderId);
      
      // 2. Atualiza a lista de pedidos em segundo plano
      router.refresh(); 

    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Não foi possível processar o pagamento.");
    } finally {
      setIsLoading(false);
    }
  };

  // Se já estiver pago, mostre o botão verde desabilitado
  if (isPaid) {
    return (
      <button 
        disabled 
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white"
      >
        <Check size={16} />
        Pago
      </button>
    );
  }

  // Se estiver pendente, mostre o botão de pagamento
  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium bg-purple-600 text-white
                 hover:bg-purple-700 transition-colors
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <DollarSign size={16} />
      )}
      {isLoading ? 'Processando...' : 'Realizar Pagamento'}
    </button>
  );
}