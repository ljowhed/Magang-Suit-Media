import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Select from '../components/Select';
import { getIdeas } from '../services/api';
import usePersistedState from '../hooks/usePersistedState';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const IdeasList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialState = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return {
      page: parseInt(params.get('page')) || 1,
      size: parseInt(params.get('size')) || 10,
      sort: params.get('sort') || '-published_at',
    };
  }, [location.search]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = usePersistedState('currentPage', getInitialState().page);
  const [itemsPerPage, setItemsPerPage] = usePersistedState('itemsPerPage', getInitialState().size);
  const [sortBy, setSortBy] = usePersistedState('sortBy', getInitialState().sort);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        'page[number]': currentPage,
        'page[size]': itemsPerPage,
        append: ['small_image', 'medium_image'],
        sort: sortBy,
      };
      const data = await getIdeas(params);
      setPosts(data.data);
      setTotalItems(data.meta.total);
    } catch (err) {
      setError('Failed to fetch ideas. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage);
    params.set('size', itemsPerPage);
    params.set('sort', sortBy);
    navigate(`?${params.toString()}`, { replace: true });
  }, [currentPage, itemsPerPage, sortBy, navigate]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    const newSize = parseInt(e.target.value);
    setItemsPerPage(newSize);
    setCurrentPage(1);
  };

  const handleSortByChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Pilihan 1: Hanya gunakan label Bahasa Inggris (atau Bahasa Indonesia saja)
  const sortOptions = [
    { label: 'Newest', value: '-published_at' },
    { label: 'Oldest', value: 'published_at' },
  ];

  // Pilihan 2: Jika Anda ingin mempertahankan keduanya, pastikan value-nya unik
  // const sortOptions = [
  //   { label: 'Terbaru', value: '-published_at-id' },
  //   { label: 'Terlama', value: 'published_at-id' },
  //   { label: 'Newest', value: '-published_at-en' },
  //   { label: 'Oldest', value: 'published_at-en' },
  // ];


  const itemsPerPageOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
  ];

  return (
    <>
      <Header />
      <Banner />
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center p-3 mb-4 bg-white rounded shadow-sm">
          <div className="text-muted small">
            Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} -{' '}
            {Math.min(totalItems, currentPage * itemsPerPage)} of {totalItems} items
          </div>
          <div className="d-flex gap-3">
            <Select
              label="Show per page:"
              value={itemsPerPage}
              options={itemsPerPageOptions}
              onChange={handleItemsPerPageChange}
            />
            <Select
              label="Sort by:"
              value={sortBy}
              options={sortOptions}
              onChange={handleSortByChange}
            />
          </div>
        </div>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading ideas...</span>
            </Spinner>
            <p className="mt-3 text-muted">Loading ideas...</p>
          </div>
        )}
        {error && <p className="text-center text-danger my-5">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-muted my-5">No ideas found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {posts.map((post) => (
                <Col key={post.id}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default IdeasList;
