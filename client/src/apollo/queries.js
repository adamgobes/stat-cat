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

export const WEEKLY_OVERVIEW_QUERY = gql`
    ${BasicPlayerInfoFragment}
    query {
        myTeam {
            players {
                ...BasicPlayerInfo
                gameCountThisWeek
                injury {
                    playingProbability
                    description
                }
            }
        }
    }
`

export const MY_STATS_QUERY = gql`
    ${BasicPlayerInfoFragment}
    query myStatsQuery($timeFrame: String) {
        myTeam {
            players(timeFrame: $timeFrame) {
                ...BasicPlayerInfo
                stats {
                    category
                    value
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
    ${BasicPlayerInfoFragment}
    query getPlayerStatsQuery($playerIds: [ID!]!) {
        getPlayerStats(playerIds: $playerIds) {
            ...BasicPlayerInfo
            stats {
                category
                value
            }
        }
    }
`
