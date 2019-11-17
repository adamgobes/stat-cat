import { useState } from 'react'

export default function usePagination(totalElements, elementsPerPage) {
    const [page, setPage] = useState(1)
    const maxPages = Math.ceil(totalElements / elementsPerPage)

    function incrementPage() {
        if (page < maxPages) {
            setPage(page + 1)
        }
    }

    function decrementPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    return { page, incrementPage, decrementPage, maxPages }
}
