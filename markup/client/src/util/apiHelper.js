/* Base URL of your REST API */
const API_URL = 'http://localhost:5000/api';

/* Function to set the API */
export const api = (path, method = 'GET', body = null, credentials = null) => {
	const url = `${API_URL}${path}`

	const options = {
		method: method,
		headers: {}
	}

	if (body) {
		options.body = JSON.stringify(body);
		options.headers['Content-Type'] = 'application/json; charset=utf-8'
	}

	if (credentials) {
		const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
		options.headers.Authorization = `Basic ${encodedCredentials}`
	}

	return fetch(url, options)
}