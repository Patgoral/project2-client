import { store } from './store.js'

// Exporting user auth api calls


export const signUp = (data) => {
	return fetch(`http://localhost:8000/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`http://localhost:8000/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}
// Exporting ticket api calls

export const indexTickets = () => {
	return fetch(`http://localhost:8000/tickets`, {
        headers: {
                'Authorization': `Bearer ${store.userToken}`,
        },
    })
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

export const createPart = (ticketId, data) => {
    return fetch(`http://localhost:8000/tickets/${ticketId}/parts/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const deletePart = (ticketId, partId) => {
	return fetch(`http://localhost:8000/tickets/${ticketId}/parts/${partId}`, {
		method: 'DELETE',
	})
	
}