"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // Criar estados para os campos de input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
        router.push('/dashboard'); 
  };


  // Lógica de validação: botão só é habilitado se ambos os campos estiverem preenchidos
  const isButtonDisabled = !username || !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Card de Login */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-white">
        
        {/* Lado Esquerdo: Imagem  */}
        <div className="hidden md:block md:w-1/2">
          <Image 
            src="/esporte_image_login_page.png"
            alt="Ilustração na página de login"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Lado Direito: Formulário */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
        
          <div className="flex flex-col items-center mb-8">
            <i className='bx bxs-user-circle text-7xl text-green-600'></i>
            <h1 className="text-3xl font-semibold text-gray-800 mt-2">
              Login
            </h1>
          </div>
          

          <form onSubmit={handleLogin}>
            
            <div className="mb-5 relative">
              <label htmlFor="username" className="text-sm font-medium text-gray-600 mb-1 block">
                Username
              </label>
              <i className='bx bxs-user absolute left-3 top-1/2 mt-2 text-gray-400'></i>
              <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-5 relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1 block">
                Password
              </label>
              {/* Ícone dentro do input */}
              <i className='bx bxs-lock-alt absolute left-3 top-1/2 mt-2 text-gray-400'></i>
              <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Opções (Remember/Forgot) */}
            <div className="flex justify-between items-center text-sm mb-8">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link href="#" className="text-black hover:underline">
                Forgot Password
              </Link>
            </div>
            
            {/* Botão de Login */}
            <button 
              type="submit"
              disabled={isButtonDisabled} // O botão é desabilitado baseado na lógica
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold tracking-wide
                         hover:bg-green-700 transition-colors
                         disabled:bg-gray-400 disabled:cursor-not-allowed" 
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}