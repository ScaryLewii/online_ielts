import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const LivePage = () => {
	const router = useRouter()
	useEffect(() => {
		const handleGetSession = async () => {
			const session = await getSession()
			if (!session) {
				router.push('/login')
			}   
		}
		
		handleGetSession()
	}, [])

	return <h1>afasfasf</h1>
}

export default LivePage