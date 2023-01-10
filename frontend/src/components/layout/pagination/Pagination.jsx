import ReactPaginate from 'react-paginate';
import './pagination.css';

const Pagination = ({ handleChange, numberOfProducts, currentPage }) => {
    return (
        <ReactPaginate
            breakLabel={'...'}
            forcePage={currentPage}
            marginPagesDisplayed={2}
            nextLabel={'Next'}
            previousLabel={'Previous'}
            pageCount={Math.ceil(numberOfProducts / 9)}
            pageRangeDisplayed={1}
            containerClassName='page-container'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            activeClassName='active'
            onPageChange={handleChange}
        />
    )
}

export default Pagination;