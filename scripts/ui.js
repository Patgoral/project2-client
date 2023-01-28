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

// START OF TICKET
export const onIndexTicketSuccess = (tickets) => {
	tickets.forEach((ticket) => {
		const div = document.createElement('div')
		div.innerHTML = `
        <h2>${ticket.customerName}</h2>
        <h3>${ticket.bikeName}</h3>
        <button id="show-ticket-btn" class="showBtn" data-toggle="modal" data-target="#showModal" data-id="${ticket._id}" >Show Ticket</button>
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
}
// CREATE PART
const createPartSetter = function (event) {
	event.preventDefault()
	const ticketId = event.target.getAttribute('data-id')
	const partData = {
		part: {
			partName: event.target['partName'].value,
			partNumber: event.target['partNumber'].value,
		},
	}
	createPart((ticketId, partData))
		.then((res) => res.json())
		.then((res) => {
			onCreatePartSuccess(res.part.ticket)
		})
		.catch(onFailure)
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
}

// SHOWS TICKET/BUILDS PART CONTAINER & FORMS
export const onShowTicketSuccess = (ticket) => {
	const div = document.createElement('div')
	div.innerHTML = 
    `
    <div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="showModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="showModalLabel">Ticket Manager</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <h3>Customer Name: ${ticket.customerName}</h3>
        <h3>Bike: ${ticket.bikeName}</h3>
        <p>Service Description:<br>${ticket.svcDesc}</p>
        <div id="parts-container">
          ${buildParts(ticket)}
        </div>
       
        <form class ="addPartForm" id="newpart ticket-id="${ticket._id}">
        <input type="text" name="partName" placeholder="Part Name" />
        <input type="text" name="partNumber" placeholder="Part Number" />
        <input class="addPartBtn" type="submit" value="Add Part">
      </form>
      <br>
        <form class ="updateTicketForm" data-id="${ticket._id}">
        <input type="text" name="customerName" value="${ticket.customerName}">
        <input type="text" name="bikeName" value="${ticket.bikeName}">
        <input type="text" name="svcDesc" value="${ticket.svcDesc}">
        <input id="update-ticket-btn" class="updateBtn" type="submit" data-toggle="modal" value="Update Ticket">
      </form>  
      
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
        <button class="deletePartBtn" ticket-id='${ticket._id}' part-id='${part._id}'>Delete Part</button>       
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

export const onSignInFailure = () => {
	loginmessageContainer.innerHTML = "You've entered an incorrect username or password."
}

export const onSignInSuccess = (userToken) => {
	messageContainer.innerHTML = 'Successful Login!'
	store.userToken = userToken
	appContainer.classList.remove('hide')
	authContainer.classList.add('hide')
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
	// indexTicketContainer.remove()
	indexTickets()

}

export const onFailure = (error) => {
	messageContainer.innerHTML = `
    <h3>ERROR!</h3>
    <p>${error}</p>
    `
}


