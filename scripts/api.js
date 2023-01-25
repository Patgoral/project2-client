// Exporting user auth api calls

// Exporting ticket api calls

export const indexTickets = () => {
	return fetch(`http://localhost:8000/tickets`)
}

export const createTicket = (data) => {
	return fetch(`http://localhost:8000/tickets`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const showTicket = (id) => {
	return fetch(`http://localhost:8000/tickets/${id}`)
}

export const updateTicket = (data, id) => {
	return fetch(`http://localhost:8000/tickets/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const deleteTicket = (id) => {
	return fetch(`http://localhost:8000/tickets/${id}`, {
		method: 'DELETE',
	})
}

//Exporting part api calls

