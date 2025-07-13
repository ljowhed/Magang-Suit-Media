import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap'; // Alias untuk menghindari konflik nama
// Hapus import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageItems = [];
  const maxPageButtons = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <BSPagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </BSPagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4"> {/* Utility classes for centering */}
      <BSPagination>
        <BSPagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
        <BSPagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
        {pageItems}
        <BSPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <BSPagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
      </BSPagination>
    </div>
  );
};

export default Pagination;