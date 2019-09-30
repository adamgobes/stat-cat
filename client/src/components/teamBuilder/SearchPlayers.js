import React, { useContext } from 'react'
import styled from 'styled-components'
import AddPlayerInput from './AddPlayerInput'
import SuggestionsGrid from './SuggestionsGrid'
import { TeamBuilderContext } from './TeamBuilderContext'

const Header = styled.h2`
    text-align: center;
    margin: 40px 0;
`

function SearchPlayers({ data, loading }) {
    const {
        teamBuilderContext: { warningMessage, playerInput },
    } = useContext(TeamBuilderContext)
    return (
        <>
            {!!warningMessage && (
                <h3 style={{ marginTop: '50px', textAlign: 'center' }}>{warningMessage}</h3>
            )}
            {playerInput.length >= 3 && <SuggestionsGrid data={data} loading={loading} />}
        </>
    )
}

export default SearchPlayers
