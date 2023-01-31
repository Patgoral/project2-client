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
const authContainer = document.querySelector('#auth-container')
const appContainer = document.querySelector('#app-container')
const modalBody = document.querySelector('#modal-body')
const modalCloseBtn = document.querySelector('#closeModal')
const signOutBtn = document.querySelector('#signout-button')

export const reloadIndexElements = () => {
	while (indexTicketContainer.firstChild) {
		indexTicketContainer.children[0].remove()
	}
}


const modalCloser = () => {
    $('#showModal').modal('toggle')
    modalBody.children[0].remove()
}

modalCloseBtn.addEventListener('click', modalCloser)

// START OF TICKET
export const onIndexTicketSuccess = (tickets) => {
	tickets.forEach((ticket) => {
		const div = document.createElement('div')
		div.innerHTML = `
        <h2>${ticket.customerName}</h2>
        <h3>${ticket.bikeName}</h3>
        <h5>${ticket.svcDesc}</h5>
        <button class="showBtn btn-info" data-toggle="modal" data-target="#showModal" data-id="${ticket._id}" >Show Ticket</button>
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
	// if (!showTicketId) return

	showTicket(showTicketId)
		.then((res) => res.json())
		.then((res) => {
			onShowTicketSuccess(res.ticket)
		})
        console.log(ticket.owner)
        console.log(store.userToken)
		.catch(onFailure)
}
//  DELETE TICKET
const deleteTicketSetter = function (event) {
	const deleteTicketId = event.target.getAttribute('data-id')

	if (!deleteTicketId) return

	deleteTicket(deleteTicketId)
		.then(reloadIndexElements)
		.then(indexTickets)
		.then((res) => res.json())
		.then((res) => {
			onIndexTicketSuccess(res.tickets)
		})
		.catch(onEditTicketFailure)
        onEvent()
        modalCloser()
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
		.then(reloadIndexElements)
		.then(indexTickets)
		.then((res) => res.json())
		.then((res) => {
			onIndexTicketSuccess(res.tickets)
		})
        .catch(onEditTicketFailure)
        onEvent()
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
			onCreatePartSuccess()
            modalCloser()
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
const onShowTicketSuccess = (ticket) => {
	const div = document.createElement('div')
	div.innerHTML = `
   <div id="modal-ticket">
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
        <button class="addPartBtn" id="add-part-btn" type="submit">Add Part</button>
      </form>
      <br>
        <form class ="updateTicketForm" data-id="${ticket._id}">
        <input type="text" name="customerName" value="${ticket.customerName}">
        <input type="text" name="bikeName" value="${ticket.bikeName}">
        <input type="text" name="svcDesc" value="${ticket.svcDesc}">
        <button id="update-ticket-btn" class="btn-success" type="submit">Update Ticket</button<
      </form>  
      <br>
      <button id="delete-ticket-btn" class="deleteBtn btn-danger" data-id="${
				ticket._id
			}">Delete Ticket</button>
   </div>
    `

	modalBody.appendChild(div)

	// DELETE TICKET
	const deleteTickets = document.getElementsByClassName('deleteBtn')

	for (let i = 0; i < deleteTickets.length; i++) {
		let singleTicket = deleteTickets[i]
		singleTicket.addEventListener('click', deleteTicketSetter,)
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

    // DELETE PART 
const deleteParts = document.getElementsByClassName('deletePartBtn')

for (let i = 0; i < deleteParts.length; i++) {
    let singlePart = deleteParts[i]
    singlePart.addEventListener('click',deletePartSetter)
}

// BUILD PARTS CONTAINER
function buildParts(ticket) {
	let string = ''
	ticket.parts.forEach((part) => {
		string += `<p id='${part._id}'><b>Part Name:</b> ${part.partName}<br><b>Part Number:</b> ${part.partNumber}
        <br><button class="deletePartBtn btn-danger" id="delete-part-btn" ticket-id='${ticket._id}'  part-id='${part._id}'>Delete Part</button></p>       
        `
	})

	return string
}

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
    signOutBtn.classList.remove('hide')
}

export const onSignOutSuccess = () => {
    messageContainer.innerHTML = 'Logout Successful!'
    appContainer.classList.add('hide')
	authContainer.classList.remove('hide')
    signOutBtn.classList.add('hide')
    
}

// SUCCESS DIALOGUE


const onEditTicketFailure = () => {
	messageContainer.innerText = 'You may only update/delete tickets you created.'
}

const onEvent = () => {
    messageContainer.innerText = ""
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

