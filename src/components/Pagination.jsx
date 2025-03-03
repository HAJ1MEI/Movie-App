import React from 'react'

const Pagination = ({currentPage, totalPages, handlePageChange}) => {
  return (
    <nav>
      <ul className="justify-content-center list-unstyled pagination">
        <li className='page-item'>
          <button onClick={(e)=>handlePageChange(currentPage-1)} className="btn btn-primary m-1" disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        <li className='page-item'>
          <button className="btn btn-primary m-1" disabled={currentPage === currentPage}>
          {currentPage}
          </button>
        </li>
        
        <li className='page-item'>
          <button onClick={(e)=>handlePageChange(currentPage+1)} className="btn btn-primary m-1" disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
