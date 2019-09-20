import React, { createContext, useReducer, useMemo } from 'react'

const AppContext = createContext()

const initialState = {
    isNavOpen: false,
    darkMode: false,
}

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export const TOGGLE_NAV = 'TOGGLE_NAV'

const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode,
            }
        case TOGGLE_NAV:
            return {
                ...state,
                isNavOpen: !state.isNavOpen,
            }
        default:
            return state
    }
}

function AppContextProvider({ children }) {
    const [appContext, dispatch] = useReducer(reducer, initialState)

    const contextValue = useMemo(
        () => ({
            appContext,
            dispatch,
        }),
        [appContext, dispatch]
    )

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }
