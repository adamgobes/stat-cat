import gql from 'graphql-tag'

import BasicPlayerInfoFragment from './fragments'

export const MY_TEAM_QUERY = gql`
    ${BasicPlayerInfoFragment}
    query {
        myTeam {
            players {
                ...BasicPlayerInfo
            }
        }
    }
`

export const DASHBOARD_QUERY = gql`
    ${BasicPlayerInfoFragment}
    query {
        myTeam {
            players {
                ...BasicPlayerInfo
                gameCountThisWeek
                stats {
                    category
                    value
                }
                injury {
                    playingProbability
                    description
                }
            }
        }
    }
`

export const SEARCH_PLAYERS_QUERY = gql`
    ${BasicPlayerInfoFragment}
    query allPlayersQuery($filter: String) {
        allPlayers(filter: $filter) {
            ...BasicPlayerInfo
        }
    }
`

export const GET_PLAYER_STATS_QUERY = gql`
    query getPlayerStatsQuery($playerIds: [ID!]!) {
        getPlayerStats(playerIds: $playerIds) {
            stats {
                category
                value
            }
        }
    }
`
