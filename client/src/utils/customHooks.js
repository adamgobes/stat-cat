import { useState, useEffect } from 'react'

export function usePagination(totalElements, elementsPerPage) {
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

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}
