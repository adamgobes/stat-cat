const puppeteer = require('puppeteer')
import { GQLFantasyLeague } from '../generated/gqlTypes'

export async function getLeagueInformation(leagueId: string) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

    const page = await browser.newPage()

    await page.goto(
        `https://fantasy.espn.com/basketball/tools/leaguemembers?leagueId=${leagueId}&seasonId=2020`
    )

    try {
        await page.waitForSelector('h3.subHeader', {
            visible: true,
            timeout: 6000,
        })
    } catch (e) {
        await browser.close()
        throw new Error('timeout')
    }

    const leagueName = await page.$eval('h3.subHeader', n => n.innerText)

    const leagueMembers = await page.$$eval('div.team__column', nodes =>
        nodes.map(n => n.title).slice(1)
    )

    await browser.close()

    return { leagueName, leagueMembers }
}

export async function getESPNTeamPlayers(leagueId: string, espnTeamId: string) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

    const page = await browser.newPage()
    await page.goto(
        `https://fantasy.espn.com/basketball/team?leagueId=${leagueId}&teamId=${espnTeamId}&seasonId=2020`
    )

    try {
        await page.waitForSelector('.player-column__athlete .AnchorLink', {
            visible: true,
            timeout: 6000,
        })
    } catch (e) {
        await browser.close()
        throw new Error('timeout')
    }

    const playerNames = await page.$$eval('.player-column__athlete .AnchorLink', nodes =>
        nodes.map(n => n.innerText)
    )

    const espnTeamName = await page.$eval('.teamName', n => n.innerText)

    return { espnTeamName, playerNames }
}
