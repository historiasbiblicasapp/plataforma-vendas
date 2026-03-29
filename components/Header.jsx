"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo-container">
          {/* Logo enviada pelo usuário colocada como logo.png */}
          <img 
            src="/logo.png" 
            alt="Ponto Digital" 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span>PONTO DIGITAL</span>
        </Link>
        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="#produtos">Produtos</Link>
          <Link href="#contato">Contato</Link>
        </nav>
      </div>
    </header>
  );
}
