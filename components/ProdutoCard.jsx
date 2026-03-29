export default function ProdutoCard({ produto }) {
  const zapAdmin = "5511999999999";
  const texto = `Olá! Quero acesso imediato ao *${produto.nome}* no valor de R$ ${produto.preco.toFixed(2).replace('.', ',')}.`;
  const urlFinal = `https://wa.me/${zapAdmin}?text=${encodeURIComponent(texto)}`;

  return (
    <div className="produto-card">
      <div className="produto-image-container">
        {produto.imagens && produto.imagens.length > 0 ? (
          <img 
            className="produto-image"
            src={produto.imagens[0]} 
            alt={produto.nome}
          />
        ) : (
          <span className="produto-placeholder">S/ Imagem</span>
        )}
      </div>
      <div>
        <h3 className="produto-title">{produto.nome}</h3>
        <p className="produto-description">{produto.descricao}</p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <p className="produto-price">
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </p>
        <a href={urlFinal} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button className="btn-comprar">Garantir Acesso no WhatsApp</button>
        </a>
      </div>
    </div>
  );
}
