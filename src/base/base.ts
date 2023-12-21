export const baseUrl = "https://apitest.ant-edu.ai/api/"
// export const baseUrl = "https://localhost:5001/api/"

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
		window.location.assign('https://ant-edu.ai/auth/login')
		return
	}

	const result = await request.text()
	return JSON.parse(result)
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
		// postDataNoToken(path, body)
		return
	}
	
	const result = await request.text()
	
	return JSON.parse(result)
}