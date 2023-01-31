import { store } from './store.js'

// Exporting user auth api calls


export const signUp = (data) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/sign-in`, {
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
	return fetch(`https://polar-stream-21217.herokuapp.com/tickets`, {
    })
}

export const createTicket = (data) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/tickets`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`,
		},
		body: JSON.stringify(data),
	})
}

export const showTicket = (id) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/tickets/${id}`)
}

export const updateTicket = (data, id) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/${id}`, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.userToken}`,
		},
		body: JSON.stringify(data),
	})
}

export const deleteTicket = (id) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/${id}`, {
		method: 'DELETE',
        headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.userToken}`,
		},
	})
}

//Exporting part api calls

export const createPart = (ticketId, data) => {

    const response = fetch(`https://polar-stream-21217.herokuapp.com/${ticketId.toString()}/parts`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response;
}

export const deletePart = (ticketId, partId) => {
	return fetch(`https://polar-stream-21217.herokuapp.com/${ticketId}/parts/${partId}`, {
		method: 'DELETE',
	})
	
}