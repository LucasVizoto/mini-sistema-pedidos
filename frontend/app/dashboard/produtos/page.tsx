import { listProduct, Product } from '@/api/api';

import {Plus, Gift} from 'lucide-react'
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await listProduct();

  const productsList = Array.isArray(products.products) 
    ? products.products 
    : [];
  //console.log(products)
  
  return (
    <div>

      <div className="w-full">
      <header className="flex justify-between items-center mb-6">
        {/* Título da página */}
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Gift  size={30} />
          Produtos
        </h1>
        <Link 
          href="/dashboard/produtos/novo-produto" 
          className="flex items-center gap-2 bg-slate-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-500 transition-colors"
        >
          <Plus size={20} />
          Novo Produto
        </Link>
      </header>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {productsList.length === 0 ? (
          <p className="p-6 text-gray-500">Nenhum produto cadastrado ainda.</p>
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
                  Preço
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsList.map((product:Product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R${product.price}
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