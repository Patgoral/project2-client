import {
	indexTickets,
	createTicket,
	showTicket,
	updateTicket,
	deleteTicket,
	deletePart,
	createPart,
	signUp,
	signIn,
} from './api.js'

import {
	onIndexTicketSuccess,
	onFailure,
	onCreateTicketSuccess,
	onShowTicketSuccess,
	onUpdateTicketSuccess,
	onDeleteTicketSuccess,
	onSignUpSuccess,
	onSignInSuccess,
	buildParts,
	// onCreatePartSuccess,
	// onDeletePartSuccess,
} from './ui.js'

const createTicketForm = document.querySelector('#create-ticket-form')
const indexTicketContainer = document.querySelector('#index-ticket-container')
const showTicketContainer = document.querySelector('#show-ticket-container')
const signUpForm = document.querySelector('#sign-up-form')
const signInForm = document.querySelector('#sign-in-form')
// const addPartBtn = document.querySelector('#addpart')
// const removePartBtn = document.querySelector('#removepart')
// const showTicketBtn = document.querySelector('#show-ticket-btn')
// const updateTicketBtn = document.querySelector('#update-ticket-btn')
// const deleteTicketBtn = document.querySelector('#delete-ticket-btn')

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
		.catch(onFailure)
})

// START OF TICKETS
indexTickets()
	.then((res) => res.json())
	.then((res) => {
		console.log(res)
		onIndexTicketSuccess(res.tickets)
	})
	.catch(onFailure)

    
    // createTicketForm.addEventListener('submit', (event) => {
    //     event.preventDefault()
    //     const ticketData = {
    //         ticket: {
    //             customerName: event.target['customerName'].value,
    //             bikeName: event.target['bikeName'].value,
    //             svcDesc: event.target['svcDesc'].value,
    //         },
    //     }
    //     const updatedTicket = createTicket(ticketData).then(res => {
    //         return res.data 
    //         })
    //     document.querySelector(`#index-ticket-container`).innerHTML = indexTickets(updatedTicket)
    //     indexTicketContainer.appendChild("div").catch(onFailure)
    // })


createTicketForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const ticketData = {
		ticket: {
			customerName: event.target['customerName'].value,
			bikeName: event.target['bikeName'].value,
			svcDesc: event.target['svcDesc'].value,
		},
	}
    
	createTicket(ticketData).then(onCreateTicketSuccess).catch(onFailure)
})

const showTicketSetter = function (event) {
	const showTicketId = event.target.getAttribute('data-id')

	if (!showTicketId) return

	showTicket(showTicketId)
		.then((res) => res.json())
		.then((res) => {
			onShowTicketSuccess(res.ticket)
		})
		.catch(onFailure)
}

const tickets = document.getElementsByClassName('showBtn')
for (let i = 0; i < tickets.length; i++) {
	let singleTicket = tickets[i]
	singleTicket.addEventListener('click', showTicketSetter)
}

console.log(tickets)

showTicketContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const updateTicketId = event.target.getAttribute('data-id')
	// console.log(showTicketId)
	const ticketData = {
		ticket: {
			customerName: event.target['customerName'].value,
			bikeName: event.target['bikeName'].value,
			svcDesc: event.target['svcDesc'].value,
		},
	}
	updateTicket(ticketData, updateTicketId)
		.then(onUpdateTicketSuccess)
		.catch(onFailure)
})

showTicketContainer.addEventListener('click', (event) => {
	const deleteTicketId = event.target.getAttribute('data-id')

	if (!deleteTicketId) return

	deleteTicket(deleteTicketId).then(onDeleteTicketSuccess).catch(onFailure)
})

// PARTS

// addPartBtn.addEventListener('click', (event) => {
// 	event.preventDefault()
// 	const ticketId = event.target.getAttribute('ticket-id')

// 	const partData = {
// 		part: {
// 			partName: event.target['partName'].value,
// 			partNumber: event.target['partNumber'].value,
// 		},
// 	}
//     console.log(partData)
// 	createPart(ticketId, partData).catch(onFailure)
// })

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
