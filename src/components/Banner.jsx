import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';

const Banner = () => {
  const bannerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // URL gambar latar belakang yang bisa di-update dari CMS/API.
  // Untuk saat ini, kita gunakan placeholder yang bagus.
  // Nanti, Anda bisa mengganti ini dengan state yang diisi dari fetch API.
  const dynamicBackgroundImageUrl = 'https://images.unsplash.com/photo-1558591741-2a1e0d3f2b1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80';
  // Atau placeholder generik jika tidak ada URL dari API:
  // const dynamicBackgroundImageUrl = 'https://placehold.co/1920x400/343a40/ffffff?text=Ideas+Background';


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efek parallax untuk gambar latar belakang
  // Gambar bergerak lebih lambat (0.5x kecepatan scroll)
  const imageParallaxOffset = scrollY * 0.5;

  // Efek parallax untuk teks
  // Teks bergerak lebih lambat lagi (0.3x kecepatan scroll)
  const textParallaxOffset = scrollY * 0.3;

  return (
    <div
      ref={bannerRef}
      className="position-relative overflow-hidden d-flex justify-content-center align-items-center text-white"
      style={{
        height: '400px', // Tinggi total banner
        // Margin top untuk memberi ruang pada header yang fixed
        // Sesuaikan '70px' dengan tinggi header Anda
        paddingTop: '70px', // Menggunakan padding-top agar konten tidak tertutup header
        marginTop: '-70px', // Menggeser banner ke atas agar fixed header tidak membuat ruang kosong
        // Latar belakang gambar dan overlay
        backgroundImage: `url(${dynamicBackgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${-imageParallaxOffset}px`, // Parallax vertikal pada gambar
        backgroundRepeat: 'no-repeat',
        // Overlay gelap untuk memastikan teks terbaca, diterapkan pada background
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Warna overlay hitam dengan 50% opacity
        backgroundBlendMode: 'overlay', // Menggabungkan warna overlay dengan gambar
        // Bentuk miring pada bagian bawah banner
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)', // 85% untuk kemiringan
        // Transisi untuk smooth parallax (opsional, tapi bagus untuk visual)
        transition: 'background-position 0.1s linear', // Transisi untuk parallax gambar
      }}
    >
      {/* Konten teks langsung di dalam container utama, di atas background */}
      <Container
        className="text-center"
        style={{
          zIndex: 1, // Pastikan teks di atas overlay
          transform: `translateY(${textParallaxOffset}px)`, // Parallax vertikal pada teks
          transition: 'transform 0.1s linear', // Transisi untuk parallax teks
        }}
      >
        <h1 className="display-4 fw-bold mb-2">Ideas</h1>
        <p className="lead">Where all our great things begin</p>
      </Container>
    </div>
  );
};

export default Banner;
