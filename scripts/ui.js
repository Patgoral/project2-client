import { store } from './store.js'
import { showTicket,
        deleteTicket,
        updateTicket,
        deletePart,
        createPart,
        } from './api.js'

const indexTicketContainer = document.querySelector('#index-ticket-container')
const messageContainer = document.querySelector('#message-container')
const loginmessageContainer = document.querySelector('#login-message-container')
const showTicketContainer = document.querySelector('#show-ticket-container')
const authContainer = document.querySelector('#auth-container')
const appContainer = document.querySelector('#app-container')

// START OF TICKET

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

export const onIndexTicketSuccess = (tickets) => {
	tickets.forEach((ticket) => {
		const div = document.createElement('div')
		div.innerHTML = `
        <h2>${ticket.customerName}</h2>
        <h3>${ticket.bikeName}</h3>
        <button id="show-ticket-btn" class="showBtn" data-id="${ticket._id}">Show Ticket</button>
        `
		indexTicketContainer.appendChild(div)
	})
	const builtTickets = document.getElementsByClassName('showBtn')

	for (let i = 0; i < builtTickets.length; i++) {
		let singleTicket = builtTickets[i]
		singleTicket.addEventListener('click', showTicketSetter)
	}
}

//  DELETE TICKET
const deleteTicketSetter = function (event) {
	const deleteTicketId = event.target.getAttribute('data-id')

	if (!deleteTicketId) return

	deleteTicket(deleteTicketId)
		.then(onDeleteTicketSuccess)
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
	div.innerHTML = `
    <h3>${ticket.customerName}</h3>
    <p>${ticket.bikeName}</p>
    <p>${ticket.svcDesc}</p>
    <div id="parts-${ticket._id}">
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
    <input id="update-ticket-btn" class="updateBtn" type="submit" value="Update Ticket">
  </form>  
  
  <button id="delete-ticket-btn" class="deleteBtn" data-id="${ticket._id}">Delete Ticket</button>
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
}

export const onFailure = (error) => {
	messageContainer.innerHTML = `
    <h3>ERROR!</h3>
    <p>${error}</p>
    `
}