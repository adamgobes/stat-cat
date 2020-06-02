import React, { createContext, useReducer, useMemo, useEffect } from 'react'
import cookie from 'react-cookies'

const AppContext = createContext()

const initialSelectedTeam = cookie.load('selectedTeam')

export const initialAppState = {
    selectedTeam: initialSelectedTeam,
    isNavOpen: false,
    darkMode: false,
    alert: {
        showAlert: false,
        message: '',
        isError: false,
    },
}

const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
const TOGGLE_NAV = 'TOGGLE_NAV'
const SET_SELECTED_TEAM = 'SET_SELECTED_TEAM'
const CLOSE_ALERT = 'CLOSE_ALERT'
const SHOW_ALERT = 'SHOW_ALERT'

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
        case CLOSE_ALERT:
            return {
                ...state,
                alert: {
                    ...state.alert,
                    showAlert: false,
                },
            }
        case SHOW_ALERT:
            return {
                ...state,
                alert: {
                    showAlert: true,
                    message: action.message,
                    isError: action.isError,
                },
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

export function toggleDarkMode() {
    return {
        type: TOGGLE_DARK_MODE,
    }
}

export function closeAlert() {
    return {
        type: CLOSE_ALERT,
    }
}

export function showAlert(message, isError) {
    return {
        type: SHOW_ALERT,
        message,
        isError,
    }
}

function AppContextProvider({ children, initialState = initialAppState }) {
    const [appContext, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        setTimeout(() => {
            dispatch(closeAlert())
        }, [5000])
    }, [appContext.alert.showAlert])

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
