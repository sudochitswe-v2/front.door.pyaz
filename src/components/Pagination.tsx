// Pagination Component
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    // Calculate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page, current page, and last page with ellipses if needed
            pages.push(1);

            if (currentPage > 3) {
                pages.push(-1); // Ellipsis
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push(-1); // Ellipsis
            }

            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-700 w-full max-w-4xl">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors duration-200 text-sm
                ${currentPage === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                    }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="sm:hidden">Prev</span>
                <span className="hidden sm:block">Previous</span>
            </button>

            {pageNumbers.map((pageNum, index) => (
                pageNum === -1 ? (
                    <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400 text-sm">...</span>
                ) : (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`flex items-center justify-center min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 rounded-md transition-colors duration-200 text-sm
                        ${currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                        }`}
                    >
                        {pageNum}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors duration-200 text-sm
                ${currentPage === totalPages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                    }`}
            >
                <span className="hidden sm:block">Next</span>
                <span className="sm:hidden">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </nav>
    );
};