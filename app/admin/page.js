'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import './admin.css';

export default function AdminPage() {
    const [produtos, setProdutos] = useState([]);
    const [form, setForm] = useState({ id: '', nome: '', descricao: '', preco: '', imagemUrl: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginStr, setLoginStr] = useState('');
    const [passStr, setPassStr] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProdutos();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginStr === 'admin' && passStr === 'info2013') {
            setIsAuthenticated(true);
        } else {
            alert('Usuário ou senha incorretos!');
        }
    };

    const fetchProdutos = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "produtos"));
            const produtosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProdutos(produtosData);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
        setLoading(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        console.log("1. Enviando arquivo para o Proxy Interno (Bypass CORS)...");

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                console.log("2. Upload completo via Servidor!", data.url);
                setForm(prev => ({ ...prev, imagemUrl: data.url }));
            } else {
                throw new Error(data.error || 'Erro no servidor');
            }
        } catch (error) {
            console.error("ERRO COMPLETO:", error);
            alert(`Falha no Upload: ${error.message}\n\nTente novamente ou use uma foto menor.`);
        } finally {
            setIsUploading(false);
            console.log("Processo de upload finalizado.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const payload = {
                nome: form.nome,
                descricao: form.descricao,
                preco: parseFloat(form.preco),
                imagens: form.imagemUrl ? [form.imagemUrl] : []
            };

            if (isEditing) {
                await updateDoc(doc(db, "produtos", form.id), payload);
            } else {
                await addDoc(collection(db, "produtos"), payload);
            }
            
            setForm({ id: '', nome: '', descricao: '', preco: '', imagemUrl: '' });
            setIsEditing(false);
            fetchProdutos();
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar o produto.");
        }
        setIsSaving(false);
    };

    const handleEdit = (prod) => {
        setForm({
            id: prod.id,
            nome: prod.nome,
            descricao: prod.descricao,
            preco: prod.preco,
            imagemUrl: prod.imagens?.[0] || ''
        });
        setIsEditing(true);
        window.scrollTo(0, 0); // Scroll pro form
    };

    const handleDelete = async (id) => {
        if (!confirm('Deseja realmente apagar este produto?')) return;
        try {
            await deleteDoc(doc(db, "produtos", id));
            fetchProdutos();
        } catch (error) {
            console.error(error);
            alert("Erro ao deletar.");
        }
    };

    if (loading) return <div className="admin-container">Carregando painel administrativo...</div>;

    if (!isAuthenticated) {
        return (
            <div className="admin-container" style={{maxWidth: '400px', textAlign: 'center', marginTop: '100px'}}>
                <div className="admin-header" style={{justifyContent: 'center'}}>
                    <h2>Acesso Restrito</h2>
                </div>
                <form onSubmit={handleLogin} className="admin-form">
                    <input 
                        type="text" 
                        placeholder="Usuário" 
                        className="admin-input" 
                        value={loginStr} 
                        onChange={(e) => setLoginStr(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        className="admin-input" 
                        value={passStr} 
                        onChange={(e) => setPassStr(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="admin-btn">Entrar no Sistema</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Painel Administrativo</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <h3>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h3>
                
                <input 
                    type="text" 
                    placeholder="Nome do Produto (ex: Video Editor Pro)" 
                    className="admin-input" 
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                    required
                />
                
                <textarea 
                    placeholder="Descrição para vendas" 
                    className="admin-input" 
                    value={form.descricao}
                    onChange={(e) => setForm({...form, descricao: e.target.value})}
                    required
                ></textarea>
                
                <input 
                    type="number" 
                    step="0.01"
                    placeholder="Preço (ex: 49.90)" 
                    className="admin-input" 
                    value={form.preco}
                    onChange={(e) => setForm({...form, preco: e.target.value})}
                    required
                />
                
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--textDim)'}}>
                            Imagem do produto (Cloud Permanente)
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="admin-input"
                            onChange={handleFileUpload}
                            style={{ width: '100%' }}
                        />
                        {isUploading && <span style={{fontSize: '12px', color: 'var(--neon)', display: 'block', marginTop: '5px'}}>Enviando para nuvem permanente, aguarde...</span>}
                    </div>
                    {form.imagemUrl && !isUploading && (
                        <div>
                            <img src={form.imagemUrl} alt="Preview" style={{ height: '60px', borderRadius: '4px', border: '1px solid var(--glassBorder)' }} />
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="admin-btn" disabled={isSaving || isUploading}>
                        {isSaving ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Produto')}
                    </button>
                    {isEditing && (
                        <button type="button" className="admin-btn" style={{ background: '#555'}} onClick={() => {
                            setIsEditing(false);
                            setForm({ id: '', nome: '', descricao: '', preco: '', imagemUrl: '' });
                        }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h3 style={{ marginTop: '50px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Produtos Cadastrados</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(prod => (
                        <tr key={prod.id}>
                            <td style={{width: '60px'}}>
                                {prod.imagens?.[0] ? 
                                    <img src={prod.imagens[0]} alt={prod.nome} style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '4px' }} /> 
                                    : <div style={{width: '40px', height:'40px', background: '#333', borderRadius: '4px'}}></div>
                                }
                            </td>
                            <td>{prod.nome}</td>
                            <td>R$ {Number(prod.preco).toFixed(2)}</td>
                            <td style={{ display: 'flex', gap: '10px' }}>
                                <button className="admin-btn" onClick={() => handleEdit(prod)} style={{padding: '6px 12px', fontSize: '13px'}}>Editar</button>
                                <button className="admin-btn danger" onClick={() => handleDelete(prod.id)} style={{padding: '6px 12px', fontSize: '13px'}}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    {produtos.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', color: '#888', padding: '30px' }}>
                                Nenhum produto cadastrado no banco de dados ainda. Utiliza o formulário acima para adicionar o seu primeiro produto.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
