export function getFullName(player) {
    return player.fullName
}

export function getFirstName(player) {
    return player.firstName
}

export function getLastName(player) {
    return player.lastName
}

export function getFirstLastShortened(player) {
    return `${getFirstName(player).substring(0, 1)}. ${getLastName(player)}`
}

export function getPlayerImage(player) {
    return player.imageSrc
}

export function getIsInjured(player) {
    return !!player.injury
}

export function getPlayerInjuryDescription(player) {
    return player.injury.description
}

export function getPlayingProb(player) {
    return player.injury.playingProbability
}

export function getGameCount(player) {
    return player.gameCountThisWeek
}
