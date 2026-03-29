import ProdutoList from '../components/ProdutoList';

export const metadata = {
  title: 'Xtreme APKs & Web Services',
  description: 'A sua plataforma definitiva e segura para aquisição de produtos digitais de alta performance e conversoões de nicho black.',
};

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>O melhor do <span className="text-neon">Mundo Digital</span><br/>num só lugar.</h1>
        <p>
          A sua revolução tecnológica começa aqui. Garanta softwares, serviços digitais e os 
          melhores sistemas do Brasil com acesso instantâneo e suporte real de especialista.
        </p>
      </header>
      
      <section className="produtos-grid" id="produtos">
        <ProdutoList />
      </section>
    </main>
  );
}
