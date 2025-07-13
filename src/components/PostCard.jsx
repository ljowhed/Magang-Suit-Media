import React from 'react';
    import { Card } from 'react-bootstrap';

    const PostCard = ({ post }) => {
      // URL placeholder default
      const defaultPlaceholder = `https://placehold.co/400x250/cccccc/333333?text=No+Image+Available`;
      // Hapus errorPlaceholder jika Anda hanya ingin satu jenis placeholder
      // const errorPlaceholder = `https://placehold.co/400x250/ff0000/ffffff?text=Image+Load+Error`;

      // Tentukan URL gambar yang akan digunakan
      const primaryImageUrl = post.medium_image?.[0]?.url || post.small_image?.[0]?.url;

      // Gunakan URL asli jika valid, jika tidak, langsung pakai defaultPlaceholder
      const imageUrl = (primaryImageUrl && (primaryImageUrl.startsWith('http://') || primaryImageUrl.startsWith('https://')))
        ? primaryImageUrl
        : defaultPlaceholder;

      return (
        <Card className="h-100 shadow-sm rounded-3">
          <Card.Img
            variant="top"
            src={imageUrl} // Gunakan URL gambar yang sudah diproses
            alt={post.title || 'Post Image'}
            style={{ height: '180px', objectFit: 'cover' }}
            onError={(e) => {
              // Jika gambar gagal dimuat (termasuk URL dari API),
              // ganti dengan placeholder default yang lebih ramah
              e.target.onerror = null; // Mencegah loop error
              e.target.src = defaultPlaceholder; // Selalu tampilkan placeholder "No Image Available"
            }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Text className="text-muted small mb-1">
              {new Date(post.published_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Card.Text>
            <Card.Title className="h6 fw-bold mb-auto">
              {post.title}
            </Card.Title>
          </Card.Body>
        </Card>
      );
    };

    export default PostCard;
    