import { store } from './store.js'


const indexTicketContainer = document.querySelector('#index-ticket-container')
const messageContainer = document.querySelector('#message-container')
const loginmessageContainer = document.querySelector('#login-message-container')
const showTicketContainer = document.querySelector('#show-ticket-container')
const authContainer = document.querySelector('#auth-container')
const appContainer = document.querySelector('#app-container')

// START OF TICKET

const showTicketInfo= () => {
    console.log('click')
}

export const onIndexTicketSuccess = (tickets) => {
	tickets.forEach((ticket) => {
		const div = document.createElement('div')
		div.innerHTML = `
        <h2>${ticket.customerName}</h2>
        <h3>${ticket.bikeName}</h3>
        <button id="show-ticket-btn" data-id="${ticket._id}">Show Ticket</button>
        `
        
        div.addEventListener('click', showTicketInfo())

		indexTicketContainer.appendChild(div)
	})
    const showTicketBtn = document.querySelector('#show-ticket-btn')

    
}

export const onFailure = (error) => {
	messageContainer.innerHTML = `
    <h3>ERROR! </h3>
    <p>${error}</p>
    `
}

export const onCreateTicketSuccess = () => {
	messageContainer.innerText = 'Ticket Created!'
}

export const onShowTicketSuccess = (ticket) => {
	const div = document.createElement('div')
	div.innerHTML = `
    <h3>${ticket.customerName}</h3>
    <p>${ticket.bikeName}</p>
    <p>${ticket.svcDesc}</p>
    <div id="parts-${ticket._id}">
      ${buildParts(ticket)}
    </div>
   
    <form class="addpart" ticket-id="${ticket._id}">
    <input type="text" name="partName" placeholder="Part Name" />
    <input type="text" name="partNumber" placeholder="Part Number" />
    <input id="addpart" type="submit" value="Add Part">
  </form>
  <br>
    <form data-id="${ticket._id}">
    <input type="text" name="customerName" value="${ticket.customerName}">
    <input type="text" name="bikeName" value="${ticket.bikeName}">
    <input type="text" name="svcDesc" value="${ticket.svcDesc}">
    <input id="update-ticket-btn" type="submit" value="Update Ticket">
  </form>  
  
  <button id="delete-ticket-btn" data-id="${ticket._id}">Delete Ticket</button>
    `
	showTicketContainer.appendChild(div)
}

export const onUpdateTicketSuccess = () => {
	messageContainer.innerText = 'Ticket Updated!'
}

export const onDeleteTicketSuccess = () => {
	messageContainer.innerText = 'Ticket Deleted!'
}

export function buildParts(ticket) {
	let string = ''
	ticket.parts.forEach((part) => {
		string += `<p id='${part._id}'><b>Name:</b> ${part.partName}<br><b>Part Number:</b> ${part.partNumber}</p>
        <button id="removepart" ticket-id='${ticket._id}' part-id='${part._id}'>Delete Part</button>       
        `
	})
    
	return string
}

// USER ACTIONS
export const onSignUpSuccess = () => {
    loginmessageContainer.innerHTML = 'You\'ve created a new user! Now Sign In'
}

export const onSignInSuccess = (userToken) => {
    messageContainer.innerHTML = 'Successful Login!'
    store.userToken = userToken
    appContainer.classList.remove('hide')
    authContainer.classList.add('hide')

}