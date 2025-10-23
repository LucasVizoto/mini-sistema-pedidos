"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { postClient } from '@/api/api';


import { CircleAlertIcon, CheckCircle, User, Mail } from 'lucide-react'; 

export default function NovoClientePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Estado para a mensagem de sucesso
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await postClient({ name, email });
      
      setSuccess('Cliente cadastrado com sucesso!');
      
      //Limpa o formulário
      setName('');
      setEmail('');
      
      // Atualiza o cache da página de lista em segundo plano
      router.refresh(); 

    } catch (err) {
      setError('Erro ao cadastrar cliente. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para o botão "Voltar"
  const handleBack = () => {
    router.back(); // Navega para a página anterior no histórico
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Novo Cliente
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          
          {/* MENSAGEM DE ERRO (Se houver) */}
          {error && (
            <div className="flex gap-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 mb-4">
              <CircleAlertIcon className="mt-0.5 shrink-0 text-red-500 opacity-60" size={16} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* MENSAGEM DE SUCESSO (Se houver) */}
          {success && (
            <div className="flex gap-3 rounded-md border border-green-300 bg-green-50 px-4 py-3 mb-4">
              <CheckCircle className="mt-0.5 shrink-0 text-green-500 opacity-60" size={16} />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Campo Nome */}
          <div className="mb-5 relative">
            <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1 block">
              Nome
            </label>
            <User className="absolute left-3 top-1/2 mt-2 text-gray-400" size={18} />
            <input 
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>

          {/* Campo Email */}
          <div className="mb-5 relative">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1 block">
              Email
            </label>
            <Mail className="absolute left-3 top-1/2 mt-2 text-gray-400" size={18} />
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 mt-8">
            
            {/* BOTÃO DE VOLTAR */}
            <button 
              type="button"
              onClick={handleBack}
              className="py-2 px-6 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Voltar
            </button>

            {/* BOTÃO DE ENVIAR */}
            <button 
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 rounded-lg bg-slate-800 text-white font-medium
                         hover:bg-slate-600 transition-colors
                         disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}