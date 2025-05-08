import React from 'react';

const Pagination = ({ totalPages, currentPage, handleChange }) => {
    return (
        <div className='flex justify-center items-center my-4'>
            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={index}
                        onClick={() => handleChange(page)}
                        className={`mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                        {page}
                    </button>

                );
            })}
        </div>
    );
};

export default Pagination;
