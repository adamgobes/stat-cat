import puppeteer from 'puppeteer'

async function getLeagueInformation(leagueId: string): Promise<any> {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto(
        'https://fantasy.espn.com/basketball/team?leagueId=633975&seasonId=2020&teamId=2'
    )

    await page.waitForSelector('.player-column__athlete .AnchorLink', {
        visible: true,
    })

    const elems = await page.$$eval('.player-column__athlete .AnchorLink', nodes =>
        nodes.map(n => n.innerText)
    )

    console.log(elems)

    await browser.close()

    return elems
}
