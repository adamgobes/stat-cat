export const sentPlayers = [
    {
        id: '9228',
        firstName: 'Draymond',
        lastName: 'Green',
        fullName: 'Draymond Green',
        currentTeam: {
            abbreviation: 'GSW',
        },
        position: 'PF',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203110.png',
    },
    {
        id: '9296',
        firstName: 'Mike',
        lastName: 'Conley',
        fullName: 'Mike Conley',
        currentTeam: {
            abbreviation: 'UTA',
        },
        position: 'PG',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201144.png',
    },
]

export const receivedPlayers = [
    {
        id: '9503',
        firstName: 'Rudy',
        lastName: 'Gobert',
        fullName: 'Rudy Gobert',
        currentTeam: {
            abbreviation: 'UTA',
        },
        position: 'C',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203497.png',
    },
    {
        id: '9338',
        firstName: 'Ricky',
        lastName: 'Rubio',
        fullName: 'Ricky Rubio',
        currentTeam: {
            abbreviation: 'PHX',
        },
        position: 'PG',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201937.png',
    },
]

export const sendingSearchData = {
    allPlayers: [
        {
            id: '9228',
            firstName: 'Draymond',
            lastName: 'Green',
            fullName: 'Draymond Green',
            currentTeam: { abbreviation: 'GSW', __typename: 'NbaTeam' },
            position: 'PF',
            imageSrc:
                'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203110.png',
            __typename: 'Player',
        },
    ],
}

export const receivingSearchData = {
    allPlayers: [
        {
            id: '9282',
            firstName: 'Julius',
            lastName: 'Randle',
            fullName: 'Julius Randle',
            currentTeam: { abbreviation: 'NYK', __typename: 'NbaTeam' },
            position: 'C',
            imageSrc:
                'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203944.png',
            __typename: 'Player',
        },
    ],
}

export const getPlayerStatsData = {
    getPlayerStats: [
        {
            id: '9282',
            firstName: 'Julius',
            lastName: 'Randle',
            fullName: 'Julius Randle',
            currentTeam: { abbreviation: 'NYK', __typename: 'NbaTeam' },
            position: 'C',
            imageSrc:
                'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203944.png',
            __typename: 'Player',
            stats: [
                { category: 'FGA', value: 14, __typename: 'Stat' },
                { category: 'FGM', value: 6.3, __typename: 'Stat' },
                { category: 'FTA', value: 5.7, __typename: 'Stat' },
                { category: 'FTM', value: 3.8, __typename: 'Stat' },
                { category: '3PM', value: 1, __typename: 'Stat' },
                { category: 'RPG', value: 8.7, __typename: 'Stat' },
                { category: 'APG', value: 3.5, __typename: 'Stat' },
                { category: 'PPG', value: 17.3, __typename: 'Stat' },
                { category: 'SPG', value: 0.7, __typename: 'Stat' },
                { category: 'BPG', value: 0.1, __typename: 'Stat' },
                { category: 'TPG', value: 3.2, __typename: 'Stat' },
            ],
        },
    ],
}
