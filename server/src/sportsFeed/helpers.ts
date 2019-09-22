import { GQLInjury } from '../generated/gqlTypes'

export function extractBasicInfo(sportsFeedPlayerObj) {
    return {
        id: sportsFeedPlayerObj.id,
        firstName: sportsFeedPlayerObj.firstName,
        lastName: sportsFeedPlayerObj.lastName,
        fullName: `${sportsFeedPlayerObj.firstName} ${sportsFeedPlayerObj.lastName}`,
        position: sportsFeedPlayerObj.primaryPosition,
        currentTeam: sportsFeedPlayerObj.currentTeam
            ? {
                  id: sportsFeedPlayerObj.currentTeam.id,
                  abbreviation: sportsFeedPlayerObj.currentTeam.abbreviation,
              }
            : null,
        imageSrc: sportsFeedPlayerObj.officialImageSrc,
    }
}

export function extractInjuryInfo(sportsFeedPlayerObj): GQLInjury {
    const { playingProbability, description } = sportsFeedPlayerObj.currentInjury
    return {
        description,
        playingProbability,
    }
}

export function parseDate(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const day = date.getDate() > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`

    return `${year}${month}${day}`
}

export function getStartDate(): Date {
    const date = new Date()
    const day = date.getDay()
    let prevMonday
    if (date.getDay() === 0) {
        prevMonday = new Date().setDate(date.getDate() - 7)
    } else {
        prevMonday = new Date().setDate(date.getDate() - day)
    }

    return new Date(prevMonday)
}

export function getEndDate(startDate: Date): Date {
    const endDate = new Date().setDate(startDate.getDate() + 7)
    return new Date(endDate)
}
