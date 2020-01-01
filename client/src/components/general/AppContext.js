import React, { createContext, useReducer, useMemo } from 'react'
import cookie from 'react-cookies'

const AppContext = createContext()

const initialSelectedTeam = cookie.load('selectedTeam')

const initialAppState = {
    selectedTeam: initialSelectedTeam,
    isNavOpen: false,
    darkMode: false,
}

const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
const TOGGLE_NAV = 'TOGGLE_NAV'
const SET_SELECTED_TEAM = 'SET_SELECTED_TEAM'

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
        case SET_SELECTED_TEAM:
            return {
                ...state,
                selectedTeam: action.selectedTeam,
            }
        default:
            return state
    }
}

export function setSelectedTeam(selectedTeam) {
    return {
        type: SET_SELECTED_TEAM,
        selectedTeam,
    }
}

export function toggleNav() {
    return {
        type: TOGGLE_NAV,
    }
}

function AppContextProvider({ children, initialState = initialAppState }) {
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
