import { store } from './store.js'

import {
	showTicket,
	deleteTicket,
	updateTicket,
	deletePart,
	createPart,
	indexTickets,
} from './api.js'

const indexTicketContainer = document.querySelector('#index-ticket-container')
const messageContainer = document.querySelector('#message-container')
const loginmessageContainer = document.querySelector('#login-message-container')
const showTicketContainer = document.querySelector('#show-ticket-container')
const authContainer = document.querySelector('#auth-container')
const appContainer = document.querySelector('#app-container')

export const reloadIndexElements = () => {
	while (indexTicketContainer.firstChild) {
		indexTicketContainer.children[0].remove()
	}
}

const modalCloser = () => {
	const modalDiv = document.getElementById('showModal')
	modalDiv.remove()
	// .then(indexTickets)
	// .then((res) => res.json())
	// .then((res) => {
	//     onIndexTicketSuccess(res.tickets)
	// })
	// .catch(onFailure)
}

// START OF TICKET
export const onIndexTicketSuccess = (tickets) => {
	tickets.forEach((ticket) => {
		const div = document.createElement('div')
		div.innerHTML = `
        <h2>${ticket.customerName}</h2>
        <h3>${ticket.bikeName}</h3>
        <button class="showBtn" data-toggle="modal" data-target="#showModal" data-id="${ticket._id}" >Show Ticket</button>
        `

		indexTicketContainer.appendChild(div)
	})
	const builtTickets = document.getElementsByClassName('showBtn')

	for (let i = 0; i < builtTickets.length; i++) {
		let singleTicket = builtTickets[i]
		singleTicket.addEventListener('click', showTicketSetter)
	}
}

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
//  DELETE TICKET
const deleteTicketSetter = function (event) {
	const deleteTicketId = event.target.getAttribute('data-id')

	if (!deleteTicketId) return

	deleteTicket(deleteTicketId)
		.then(onDeleteTicketSuccess)
		.then(reloadIndexElements)
		.then(indexTickets)
		.then((res) => res.json())
		.then((res) => {
			onIndexTicketSuccess(res.tickets)
		})
		.catch(onFailure)
}
//  UPDATE TICKET
const updateTicketSetter = function (event) {
	event.preventDefault()
	const updateTicketId = event.target.getAttribute('data-id')
	const ticketData = {
		ticket: {
			customerName: event.target['customerName'].value,
			bikeName: event.target['bikeName'].value,
			svcDesc: event.target['svcDesc'].value,
		},
	}
	updateTicket(ticketData, updateTicketId)
		.then(onUpdateTicketSuccess)
		.then(reloadIndexElements)
		.then(indexTickets)
		.then((res) => res.json())
		.then((res) => {
			onIndexTicketSuccess(res.tickets)
		})
		.catch(onFailure)
	modalCloser()
}
// CREATE PART
const createPartSetter = function (event) {
	event.preventDefault()
	const ticketId = event.target['ticketId'].value
	const partData = {
		part: {
			partName: event.target['partName'].value,
			partNumber: event.target['partNumber'].value,
		},
	}

	createPart(ticketId, partData)
		.then((res) => res.json())
		.then((res) => {
			onShowTicketSuccess(res.ticket)
			modalCloser()
			onCreatePartSuccess()
		})
}

// DELETE PART
const deletePartSetter = function (event) {
	const partId = event.target.getAttribute('part-id')
	const ticketId = event.target.getAttribute('ticket-id')

	if (!partId) return

	deletePart(ticketId, partId)
		.then((res) => res.json())
		.then((res) => {
			onDeletePartSuccess(res.ticket)
		})
		.catch(onFailure)
	modalCloser()
}

// SHOWS TICKET/BUILDS PART CONTAINER & FORMS
export const onShowTicketSuccess = (ticket) => {
	const div = document.createElement('div')
	div.innerHTML = `
    <div class="modal fade" id="showModal" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="showModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="showModalLabel">Ticket Manager</h5>
          <button type="button" class="close" data-dismiss="modal" id="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <ul>
        <li><h3>Customer Name: ${ticket.customerName}</h3></li>
        <li><h3>Bike: ${ticket.bikeName}</h3></li>
        <li><h4>Service Description:</h4>${ticket.svcDesc}</li>
        </ul>
        <div id="parts-container">
          ${buildParts(ticket)}
        </div>
       
        <form class ="addPartForm" id="newpart ticket-id="${ticket._id}">
        <input type="text" name="partName" placeholder="Part Name" />
        <input type="text" name="partNumber" placeholder="Part Number" />
        <input hidden type="text" name="ticketId" value="${ticket._id}" />
        <button class="addPartBtn" type="submit">Add Part</button>
      </form>
      <br>
        <form class ="updateTicketForm" data-id="${ticket._id}">
        <input type="text" name="customerName" value="${ticket.customerName}">
        <input type="text" name="bikeName" value="${ticket.bikeName}">
        <input type="text" name="svcDesc" value="${ticket.svcDesc}">
        <button id="update-ticket-btn" class="updateBtn" type="submit">Update Ticket</button<
      </form>  
      <br>
      <button id="delete-ticket-btn" class="deleteBtn" data-dismiss="modal" data-id="${
				ticket._id
			}">Delete Ticket</button>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
    `

	showTicketContainer.appendChild(div)

	// DELETE TICKET
	const deleteTickets = document.getElementsByClassName('deleteBtn')

	for (let i = 0; i < deleteTickets.length; i++) {
		let singleTicket = deleteTickets[i]
		singleTicket.addEventListener('click', deleteTicketSetter)
	}
	// UPDATE TICKET
	const updateTickets = document.getElementsByClassName('updateTicketForm')

	for (let i = 0; i < updateTickets.length; i++) {
		let singleTicket = updateTickets[i]
		singleTicket.addEventListener('submit', updateTicketSetter)
	}

	// CREATE PART
	const createPart = document.getElementsByClassName('addPartForm')

	for (let i = 0; i < createPart.length; i++) {
		let singlePart = createPart[i]
		singlePart.addEventListener('submit', createPartSetter)
	}
}

function buildParts(ticket) {
	let string = ''
	ticket.parts.forEach((part) => {
		string += `<p id='${part._id}'><b>Name:</b> ${part.partName}<br><b>Part Number:</b> ${part.partNumber}</p>
        <button class="deletePartBtn" ticket-id='${ticket._id}' data-dismiss="modal" part-id='${part._id}'>Delete Part</button>       
        `
	})

	const deleteParts = document.getElementsByClassName('deletePartBtn')

	for (let i = 0; i < deleteParts.length; i++) {
		let singlePart = deleteParts[i]
		singlePart.addEventListener('click', deletePartSetter)
	}

	return string
}

// USER ACTIONS
export const onSignUpSuccess = () => {
	loginmessageContainer.innerHTML = "You've created a new user! Now Sign In"
}

export const onSignUpFailure = () => {
	loginmessageContainer.innerHTML = 'Invalid Sign Up, please try again.'
}

export const onSignInFailure = () => {
	loginmessageContainer.innerHTML =
		"You've entered an incorrect username or password."
}

export const onSignInSuccess = (userToken) => {
	messageContainer.innerHTML = 'Successful Login!'
	store.userToken = userToken
	appContainer.classList.remove('hide')
	authContainer.classList.add('hide')
}

export const onSignOutSuccess = () => {
    messageContainer.innerHTML = 'Logout Successful!'
    appContainer.classList.add('hide')
	authContainer.classList.remove('hide')
}

// SUCCESS DIALOGUE
const onUpdateTicketSuccess = () => {
	messageContainer.innerText = 'Ticket Updated!'
}

const onDeleteTicketSuccess = () => {
	messageContainer.innerText = 'Ticket Deleted!'
}

const onDeletePartSuccess = () => {
	messageContainer.innerText = 'Part Deleted!'
}

const onCreatePartSuccess = () => {
	messageContainer.innerText = 'Part Created!'
}

export const onCreateTicketSuccess = () => {
	messageContainer.innerText = 'Ticket Created!'
}

export const onCreateTicketFailure = () => {
	messageContainer.innerText = 'Invalid Ticket Entry'
}

export const onFailure = (error) => {
	messageContainer.innerHTML = `
    <h3>ERROR!</h3>
    <p>${error}</p>
    `
}
