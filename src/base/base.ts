export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getHeaderAuth = (cookies: any) => {
	return { 
		"Content-Type": "application/json",
		"Cookie": cookies['.AspNetCore.SharedCookie']
	}
}

export const fetchData = async (path: string, method: string, cookies: any) => {
	const data: RequestInit = { 
		method: method,
		credentials: 'include'
	}

	if (cookies) {
		data.headers = getHeaderAuth(cookies)
	}

	const request = await fetch(
		baseUrl + path,
		data
	)

	if (request.status === 401) {
		// fetchDataNoToken(path, method)
		console.log('please login again ' + path)
		// window.location.assign('https://ant-edu.ai/auth/login')
		return
	}

	const result = await request.text()
	if (result) {
		return JSON.parse(result)
	}

	return {}
}

export const postData = async (path: string, cookies: any, body: object = {}) => {
	const headers = getHeaderAuth(cookies)
	const data: RequestInit = { 
		method: "POST", 
		credentials: 'include',
		headers: headers,
		body: JSON.stringify(body)
	}
	
	const request = await fetch(
		baseUrl + path,
		data
	)

	if (!request.ok || request.status === 401) {
		console.log(request)
		console.log('please login again' + path)
		return
	}
	
	const result = await request.text()
	if (result) {
		return JSON.parse(result)
	}

	return {}
}