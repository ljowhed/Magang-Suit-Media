import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap'; // Import Container
// Hapus import './Banner.css';

const Banner = () => {
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const textOffset = scrollY * 0.3;

  return (
    <div className="banner-container position-relative overflow-hidden d-flex justify-content-center align-items-center"
         ref={bannerRef}
         style={{ height: '400px', marginTop: '70px', backgroundColor: '#eee' }}> {/* Atur tinggi dan margin top langsung */}
      <div
        className="banner-image"
        style={{
          position: 'absolute',
          top: '-50px',
          left: 0,
          width: '100%',
          height: 'calc(100% + 100px)',
          backgroundImage: 'url(/src/assets/images/banner-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.1s linear',
          transform: `translateY(${parallaxOffset}px)`,
          // Bentuk miring masih pakai CSS kustom
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
        }}
      ></div>
      <Container
        className="banner-overlay text-center p-4 bg-dark bg-opacity-50 rounded" // Kelas Bootstrap
        style={{ transform: `translateY(${textOffset}px)`, zIndex: 1, color: 'white' }}
        ref={textRef}
      >
        <h1 className="display-4 fw-bold mb-2">Ideas</h1> {/* Kelas Bootstrap untuk ukuran dan bold */}
        <p className="lead">Where all our great things begin</p> {/* Kelas Bootstrap untuk ukuran teks */}
      </Container>
    </div>
  );
};

export default Banner;