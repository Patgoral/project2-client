import {
	indexTickets,
	createTicket,
	signUp,
	signIn,
} from './api.js'

import {
	onIndexTicketSuccess,
	onFailure,
	onCreateTicketSuccess,
	onSignUpSuccess,
    onSignInFailure,
	onSignInSuccess,
    reloadIndexElements,
} from './ui.js'

const createTicketForm = document.querySelector('#create-ticket-form')
const signUpForm = document.querySelector('#sign-up-form')
const signInForm = document.querySelector('#sign-in-form')


//START OF AUTH

signUpForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			username: event.target['username'].value,
			password: event.target['password'].value,
		},
	}
	console.log(userData)
	signUp(userData).then(onSignUpSuccess).catch(onFailure)
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

// START OF TICKETS
indexTickets()
	.then((res) => res.json())
	.then((res) => {
		console.log(res)
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
	})	.catch(onFailure)
})







// PARTS


// removePartBtn.addEventListener('click', (event) => {
// 	const partId = event.target.getAttribute('part-id')
// 	const ticketId = event.target.getAttribute('ticket-id')
// console.log(partId)
// 	const updatedTicket = deletePart(ticketId, partId).then(res => {
//         return res.data
//     }).catch(onFailure)
//     document.querySelector(`#parts-${ticketId}`).innerHTML = buildParts(updatedTicket)
//     showTicketContainer.appendChild("div")
//     //create new div with new data
// })
