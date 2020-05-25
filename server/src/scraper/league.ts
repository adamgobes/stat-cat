const puppeteer = require('puppeteer')
import { GQLFantasyLeague } from '../generated/gqlTypes'

export async function getLeagueInformation(leagueId: string) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

    const page = await browser.newPage()
    await page.goto(
        `https://fantasy.espn.com/basketball/tools/leaguemembers?leagueId=${leagueId}&seasonId=2020`
    )

    await page.waitForSelector('h3.subHeader', {
        visible: true,
    })

    const leagueName = await page.$eval('h3.subHeader', n => n.innerText)

    const leagueMembers = await page.$$eval('div.team__column', nodes =>
        nodes.map(n => n.title).slice(1)
    )

    await browser.close()

    return { leagueName, leagueMembers }
}
