import React from 'react'
import { Pagination } from 'react-bootstrap'

interface TablePaginationProps {
  currentPage: number,
  totalPage: number,
  onChange: Function
}

export default function TablePagination({ currentPage, totalPage, onChange } : TablePaginationProps) {
  function handlePageChange(newPage: number) {
    if (onChange) onChange(newPage);
  }

  return (
    <Pagination size='sm'>
      <Pagination.First disabled={currentPage < 2} onClick={() => handlePageChange(1)} />
      {currentPage - 1 > 0 &&
        <Pagination.Prev
          disabled={currentPage < 2}
          onClick={() => handlePageChange(currentPage - 1)} />
      }
      {currentPage - 1 > 0 &&
        <Pagination.Item
          disabled={currentPage < 2}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </Pagination.Item>
      }
      <Pagination.Item active={true}>{currentPage}</Pagination.Item>
      {currentPage < totalPage &&
        <Pagination.Item
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </Pagination.Item>
      }
      {currentPage < totalPage &&
        <Pagination.Next
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)} />
      }
      <Pagination.Last
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(totalPage)} />
    </Pagination>
  )
}
