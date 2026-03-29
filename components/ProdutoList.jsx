'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ProdutoCard from './ProdutoCard';

export default function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const snap = await getDocs(collection(db, "produtos"));
        const produtosData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProdutos(produtosData);
      } catch (err) {
        console.error("Erro ao carregar os produtos vitrine:", err);
      }
      setLoading(false);
    }
    fetchProdutos();
  }, []);

  if (loading) {
    return (
        <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '60px', color: 'var(--textDim)'}}>
            Carregando catálogo de produtos...
        </div>
    );
  }

  if (produtos.length === 0) {
      return (
          <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '60px', color: 'var(--textDim)'}}>
            Nenhum produto cadastrado no momento. Acesse a área administrativa para cadastrar.
        </div>
      )
  }

  return (
    <>
      {produtos.map(prod => (
        <ProdutoCard key={prod.id} produto={prod} />
      ))}
    </>
  );
}
