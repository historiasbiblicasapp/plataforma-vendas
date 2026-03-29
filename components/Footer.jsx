export default function Footer() {
  const whatsappNumber = "5511999999999";
  
  return (
    <footer className="footer" id="contato">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Ponto Digital</h3>
          <p>
            Plataforma confiável para você adquirir produtos digitais de alta escala com 
            suporte especializado 24/7.
          </p>
          <br/>
          <p><strong>Horário de Atendimento:</strong><br/>Seg a Sex: 08:00 às 20:00</p>
        </div>

        <div className="footer-section">
          <h3>Fale Conosco</h3>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            <span style={{ fontSize: '1.2rem', color: 'var(--neon)' }}>✆</span> (11) 99999-9999
          </a>
          <a href="mailto:contato@pontodigital.com.br">
            <span style={{ fontSize: '1.2rem', color: 'var(--neon)' }}>✉</span> contato@pontodigital.com.br
          </a>
          <br/>
          <p>
            <span style={{ fontSize: '1.2rem', color: 'var(--neon)' }}>📍</span> 
            Av. Paulista, 1000<br/>Bela Vista, São Paulo - SP<br/>CEP: 01310-100
          </p>
        </div>

        <div className="footer-section">
          <h3>Nossa Localização</h3>
          <div className="footer-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117006.18525091726!2d-46.74542617357754!3d-23.593652899477004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c1c4961501%3A0x6a1bc9ef2ce10df2!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ponto Digital - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
