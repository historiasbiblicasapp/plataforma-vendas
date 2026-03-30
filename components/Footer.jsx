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
          <br />
          <p><strong>Horário de Atendimento:</strong><br />Seg a Sex: 08:00 às 20:00</p>
        </div>

        <div className="footer-section">
          <h3>Fale Conosco</h3>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            <span style={{ fontSize: '1.2rem', color: 'var(--neon)' }}>✆</span> (24) 98811-2657
          </a>
          <a href="mailto:contato@pontodigital.com.br">
            <span style={{ fontSize: '1.2rem', color: 'var(--neon)' }}>✉</span> wellingtonpoeta@hotmail.com
          </a>
          <br />
          <p>
            <span style={{ fontSize: '1.2rem', color: 'var(--neon)' }}>📍</span>
            <br />Barra Mansa - Rio de Janeiro - RJ<br />
          </p>
        </div>

        <div className="footer-section">
          <h3>Nossa Localização</h3>
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/vt/data=qc30LbwYrf6ZTGryCi9llM1guR7S5iNw9-G8Y0sWGPqOTkVwGzmXqMTV1_hO9yMJY4v261NQj4lbaAobqdzRnSEeqjNWKCgaBRYPmonUGRXjyIbqF-oIz8Y4m60KKnnwCBBxzPOupK_q0EZeILqW_p6v2Xx1EeJELxb6ZHBzy9bp_DUnjNRyTSBDdLbkSXZzr2kQmccpBIxFBPAltoYSHEHuVo2sEviELZjdBnItveF7xQdRhUMSr2RybuspzdU6oE-o_qCsdZZ_c629u4rzsqy3vhM"
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
