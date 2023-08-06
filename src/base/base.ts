export const baseUrl = "https://apionline.ant-edu.ai/api/"

export const getHeaderAuth = (token: string) => {
	return { 
		'Content-Type' : 'application/json',
		'Authorization': 'Bearer ' + token
	}
}

export const fetchData = async (path: string, token: string, method: string) => {
	const headers = getHeaderAuth(token)
	const request = await fetch(
		baseUrl + path,
		{ method: method, headers }
	)

	if (!request.ok) {
		// console.log('please login again')
		window.location.assign('https://ant-edu.ai/user/login')
		return null
	}
	
	return request.json()
}