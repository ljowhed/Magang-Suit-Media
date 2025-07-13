import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';

const Banner = () => {
  const bannerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect untuk background
  const parallaxOffset = scrollY * 0.5;

  // Path gambar latar belakang.
  // PASTIKAN FILE 'banner-bg.png' ADA DI FOLDER 'public/' PROYEK ANDA.
  const backgroundImagePath = '/banner-bg.png';

  return (
    <div
      ref={bannerRef}
      className="position-relative overflow-hidden d-flex justify-content-center align-items-center text-white"
      style={{
        height: '400px', // Sesuaikan tinggi banner sesuai kebutuhan
        marginTop: '70px', // Sesuaikan dengan tinggi header Anda
        // Aplikasikan gambar latar belakang langsung ke container utama
        backgroundImage: `url(${backgroundImagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${-parallaxOffset}px`, // Parallax vertikal
        backgroundRepeat: 'no-repeat',
        // Bentuk miring diterapkan pada container utama
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)', // Bentuk miring
        // Tambahkan overlay gelap untuk memastikan teks terbaca
        // Ini akan menciptakan efek overlay di atas gambar latar belakang
        // tanpa membuat box terpisah untuk teks.
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Warna overlay hitam dengan 50% opacity
        backgroundBlendMode: 'overlay', // Menggabungkan warna overlay dengan gambar
      }}
    >
      {/* Konten teks langsung di dalam container utama, di atas background */}
      <Container className="text-center" style={{ zIndex: 1 }}>
        <h1 className="display-4 fw-bold mb-2">Ideas</h1>
        <p className="lead">Where all our great things begin</p>
      </Container>
    </div>
  );
};

export default Banner;
