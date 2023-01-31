import { indexTickets, createTicket, signUp, signIn } from './api.js'

import {
	onIndexTicketSuccess,
	onFailure,
	onCreateTicketSuccess,
	onCreateTicketFailure,
	onSignUpSuccess,
	onSignInFailure,
	onSignUpFailure,
	onSignInSuccess,
    onSignOutSuccess,
	reloadIndexElements,
} from './ui.js'

const createTicketForm = document.querySelector('#create-ticket-form')
const signUpForm = document.querySelector('#sign-up-form')
const signInForm = document.querySelector('#sign-in-form')
const signOutBtn = document.querySelector('#signout-button')

//START OF AUTH

signUpForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			username: event.target['username'].value,
			password: event.target['password'].value,
		},
	}
	signUp(userData)
    .then((res) => res.json())
    .then(onSignUpSuccess)
    .catch(onSignUpFailure)
})



signInForm.addEventListener('submit', (event) => {
	event.preventDefault() 
	const userData = {
		credentials: {
			username: event.target['username'].value,
			password: event.target['password'].value,
		},
	}
	console.log(userData)
	signIn(userData)
		.then((res) => res.json())
		.then((res) => onSignInSuccess(res.token))
		.then(indexTickets)
		.then((res) => res.json())
		.catch(onSignInFailure)
})

signOutBtn.addEventListener('click', onSignOutSuccess)

// START OF TICKETS
indexTickets()
	.then((res) => res.json())
	.then((res) => {
		onIndexTicketSuccess(res.tickets)
	})
	.catch(onFailure)

createTicketForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const ticketData = {
		ticket: {
			customerName: event.target['customerName'].value,
			bikeName: event.target['bikeName'].value,
			svcDesc: event.target['svcDesc'].value,
		},
	}

	createTicket(ticketData)
    
		.then(onCreateTicketSuccess)
		.then(reloadIndexElements)
		.then(indexTickets)
		.then((res) => res.json())
		.then((res) => {
			onIndexTicketSuccess(res.tickets)
		})
		.catch(onCreateTicketFailure)
})
