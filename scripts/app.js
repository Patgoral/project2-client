import {
	indexTickets,
	createTicket,
	showTicket,
	updateTicket,
	deleteTicket,
	// indexParts,
	// createPart,
	// updatePart,
	// deletePart,
} from './api.js'

import {
	onIndexTicketSuccess,
	onFailure,
	onCreateTicketSuccess,
	onShowTicketSuccess,
	onUpdateTicketSuccess,
	onDeleteTicketSuccess,
	// onIndexPartSuccess,
	// onCreatePartSuccess,
	// onUpdatePartSuccess,
	// onDeletePartSuccess,
} from './ui.js'

const createTicketForm = document.querySelector('#create-ticket-form')
const indexTicketContainer = document.querySelector('#index-ticket-container')

const showTicketContainer = document.querySelector('#show-ticket-container')

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
	createTicket(ticketData).then(onCreateTicketSuccess).catch(onFailure)
})

indexTicketContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

	if (!id) return

	showTicket(id)
		.then((res) => res.json())
		.then((res) => {
			onShowTicketSuccess(res.ticket)
		})
		.catch(onFailure)
})

showTicketContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const id = event.target.getAttribute('data-id')
	const ticketData = {
		ticket: {
			customerName: event.target['customerName'].value,
			bikeName: event.target['bikeName'].value,
			svcDesc: event.target['svcDesc'].value,
		},
	}
	updateTicket(ticketData, id)
    .then(onUpdateTicketSuccess)
    .catch(onFailure)

})

showTicketContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

	if (!id) return

	deleteTicket(id).then(onDeleteTicketSuccess).catch(onFailure)
})

// PARTS
