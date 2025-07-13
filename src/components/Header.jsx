import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useScrollDirection from '../hooks/useScrollDirection';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'down') {
      setIsVisible(false);
    } else if (scrollDirection === 'up') {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Gunakan bg-suitmedia-orange untuk warna latar belakang
    // Atur padding y-axis dengan py-3
    // Tambahkan kelas kustom header-scrolled-transparent untuk efek scroll
    <Navbar
      fixed="top"
      expand="lg"
      className={`py-3 ${isVisible ? 'header-visible' : 'header-hidden'} ${isScrolled ? 'bg-white bg-opacity-90 shadow-sm header-scrolled-transparent' : ''}`} // Hapus 'bg-suitmedia-orange' dari sini
      style={{
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
        // Terapkan warna oranye (#FF6600) hanya saat tidak di-scroll
        backgroundColor: isScrolled ? '' : '#FF6600'
      }}
    >
      <Container>
        <Navbar.Brand href="#">
          {/* Lokasi penempatan logo */}
          <img
            src="/suitmedia-logo.png" // Path logo
            alt="SuitMedia Logo"
            height="40" // Sesuaikan tinggi logo
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Navigasi Link dengan warna teks putih/gelap dan active state */}
            <Nav.Link href="#" className={isScrolled ? 'text-dark' : 'text-white'}>Work</Nav.Link>
            <Nav.Link href="#" className={isScrolled ? 'text-dark' : 'text-white'}>About</Nav.Link>
            <Nav.Link href="#" className={isScrolled ? 'text-dark' : 'text-white'}>Services</Nav.Link>
            <Nav.Link href="#" active className={isScrolled ? 'text-dark nav-link-active' : 'text-white nav-link-active-orange'}>Ideas</Nav.Link>
            <Nav.Link href="#" className={isScrolled ? 'text-dark' : 'text-white'}>Careers</Nav.Link>
            <Nav.Link href="#" className={isScrolled ? 'text-dark' : 'text-white'}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
