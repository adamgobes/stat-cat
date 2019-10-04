import React, { createContext, useReducer, useMemo } from 'react'

const SET_PLAYER_INPUT = 'SET_PLAYER_INPUT'
const SET_TEAM = 'SET_TEAM'
const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const SET_WARNING_MESSAGE = 'SET_WARNING_MESSAGE'

const TeamBuilderContext = createContext()

export const initialState = {
    playerInput: '',
    team: [],
    warningMessage: '',
}

export default function reducer(state, action) {
    switch (action.type) {
        case SET_PLAYER_INPUT:
            return {
                ...state,
                playerInput: action.value,
            }
        case SET_TEAM:
            return {
                ...state,
                team: action.team,
            }
        case ADD_PLAYER:
            return {
                ...state,
                warningMessage: '',
                team: [...state.team, action.player],
            }
        case REMOVE_PLAYER:
            return {
                ...state,
                team: state.team.filter(p => p.id !== action.player.id),
            }
        case SET_WARNING_MESSAGE:
            return {
                ...state,
                warningMessage: action.value,
            }

        default:
            return state
    }
}

export function setPlayerInput(value) {
    return {
        type: SET_PLAYER_INPUT,
        value,
    }
}

export function setTeam(team) {
    return {
        type: SET_TEAM,
        team,
    }
}

export function addPlayer(player) {
    return {
        type: ADD_PLAYER,
        player,
    }
}

export function removePlayer(player) {
    return {
        type: REMOVE_PLAYER,
        player,
    }
}

export function setWarningMessage(value) {
    return {
        type: SET_WARNING_MESSAGE,
        value,
    }
}

function TeamBuilderContextProvider({ children }) {
    const [teamBuilderContext, dispatch] = useReducer(reducer, initialState)

    const contextValue = useMemo(
        () => ({
            teamBuilderContext,
            dispatch,
        }),
        [teamBuilderContext, dispatch]
    )

    return (
        <TeamBuilderContext.Provider value={contextValue}>{children}</TeamBuilderContext.Provider>
    )
}

export { TeamBuilderContext, TeamBuilderContextProvider }
