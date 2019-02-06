import { decorate, observable, action, configure } from 'mobx'

configure({
	enforceActions: 'observed',
})

class Store {
	loggedIn = ''

	userTeam = []

	setLoggedIn(val) {
		this.loggedIn = val
	}

	setUserTeam(team) {
		this.userTeam = team
	}

	addPlayer(player) {
		this.userTeam.push(player)
	}
}

export default decorate(Store, {
	loggedIn: observable,
	userTeam: observable,
	setUserTeam: action,
	setLoggedIn: action,
	addPlayer: action,
})
