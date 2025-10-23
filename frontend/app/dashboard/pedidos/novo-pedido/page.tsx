// /app/dashboard/pedidos/novo-pedido/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  listClient, 
  listProduct, 
  postOrder, 
  Client, 
  Product,
  CreateOrderPayload 
} from '@/api/api';
import { 
  CircleAlertIcon, 
  CheckCircle, 
  Plus, 
  Trash2, 
  ShoppingCart,
  Loader2 
} from 'lucide-react';

// Interface para os itens no nosso carrinho local
interface CartItem extends Product {
  quantity: number;
}

export default function NovoPedidoPage() {
  const router = useRouter();

  // --- Estados de Dados ---
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // --- Estados do Formulário ---
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // --- Estados de UI ---
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 1. BUSCAR Clientes e Produtos ao carregar a página
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [clientResponse, productResponse] = await Promise.all([
          listClient(),
          listProduct()
        ]);
        
        setClients(Array.isArray(clientResponse.clients) ? clientResponse.clients : []);
        setProducts(Array.isArray(productResponse.products) ? productResponse.products : []);

      } catch (err) {
        setError('Falha ao carregar clientes ou produtos. Tente recarregar a página.');
      } finally {
        setIsLoadingData(false);
      }
    }
    loadInitialData();
  }, []); // [] = Executa apenas uma vez

  // 2. FUNÇÕES DO CARRINHO
  const handleAddProduct = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Se já existe, apenas incrementa a quantidade
        return currentCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Se não existe, adiciona ao carrinho com quantidade 1
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const newQuantity = Math.max(1, quantity); // Garante que a quantidade seja no mínimo 1
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveProduct = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // 3. FUNÇÃO DE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId || cart.length === 0) {
      setError('Você deve selecionar um cliente e pelo menos um produto.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Formata o payload para a API
    const payload: CreateOrderPayload = {
      clientId: selectedClientId,
      products: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      await postOrder(payload);
      
      setSuccess('Pedido criado com sucesso!');
      
      // Limpa o formulário
      setCart([]);
      setSelectedClientId('');
      
      // Atualiza o cache da lista de pedidos em segundo plano
      router.refresh(); 

    } catch (err) {
      setError('Erro ao criar o pedido. Tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };
  
  // 4. RENDERIZAÇÃO
  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 size={40} className="animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Criar Novo Pedido
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">

          {/* Mensagens de Alerta */}
          {error && (
            <div className="flex gap-3 rounded-md border border-red-300 bg-red-50 px-4 py-3">
              <CircleAlertIcon className="mt-0.5 shrink-0 text-red-500" size={16} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex gap-3 rounded-md border border-green-300 bg-green-50 px-4 py-3">
              <CheckCircle className="mt-0.5 shrink-0 text-green-500" size={16} />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* 1. Seleção de Cliente */}
          <div>
            <label htmlFor="client" className="text-lg font-medium text-gray-700 mb-2 block">
              1. Selecione o Cliente
            </label>
            <select 
              id="client"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="" disabled>Selecione...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Produtos Selecionados (Carrinho) */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              2. Produtos no Pedido
            </h2>
            <div className="space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg text-gray-500">
                  <ShoppingCart size={30} />
                  <p>Carrinho vazio</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                    <span className="flex-1 font-medium">{item.name}</span>
                    <input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                      className="w-20 p-2 border rounded-md text-center"
                    />
                    <span className="text-gray-600 w-24 text-right">
                      { (item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                    </span>
                    <button type="button" onClick={() => handleRemoveProduct(item.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Lista de Produtos Disponíveis */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              3. Adicionar Produtos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleAddProduct(product)}
                    className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 mt-8">
          <button 
            type="button"
            onClick={handleBack}
            className="py-2 px-6 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Voltar
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 py-2 px-6 rounded-lg bg-purple-600 text-white font-medium
                       hover:bg-purple-700 transition-colors
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : 'Criar Pedido'}
          </button>
        </div>
      </form>
    </div>
  );
}