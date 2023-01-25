const indexTicketContainer = document.querySelector('#index-ticket-container')
const messageContainer = document.querySelector('#message-container')
const showTicketContainer = document.querySelector('#show-ticket-container')

// START OF TICKET

export const onIndexTicketSuccess = (tickets) => {
	tickets.forEach((ticket) => {
		const div = document.createElement('div')
		div.innerHTML = `
        <h2>${ticket.customerName}</h2>
        <h3>${ticket.bikeName}</h3>
        <button data-id="${ticket._id}">Show Ticket</button>
        `

		indexTicketContainer.appendChild(div)
	})
}

export const onFailure = (error) => {
	messageContainer.innerHTML = `
    <h3>ERROR! </h3>
    <p>${error}</p>
    `
}

export const onCreateTicketSuccess = () => {
	location.reload()
	messageContainer.innerText = 'Ticket Created!'
}

export const onShowTicketSuccess = (ticket) => {
	const div = document.createElement('div')
	div.innerHTML = `
    <h3>${ticket.customerName}</h3>
    <p>${ticket.bikeName}</p>
    <p>${ticket.svcDesc}</p>
    ${buildParts(ticket)}
    <br>
    <br>
    <button>Add Part</button>

    <form data-id="${ticket._id}">
    <input type="text" name="customerName" value="${ticket.customerName}">
    <input type="text" name="bikeName" value="${ticket.bikeName}">
    <input type="text" name="svcDesc" value="${ticket.svcDesc}">
    <input type="submit" value="Update Ticket">
  </form>

  <button data-id="${ticket._id}">Delete Ticket</button>
    `
	showTicketContainer.appendChild(div)
}

export const onUpdateTicketSuccess = () => {
	location.reload()
	messageContainer.innerText = 'Ticket Updated!'
}

export const onDeleteTicketSuccess = () => {
	location.reload()
	messageContainer.innerText = 'Ticket Deleted!'
}

function buildParts(ticket) {
	let string = ''
	ticket.parts.forEach((part) => {
		string += `<p id='${part._id}'><b>Name:</b> ${part.partName}<br><b>Part Number:</b> ${part.partNumber}</p>
        <button ="${part.id}">Delete Part</button>
        `
	})
	return string
}
