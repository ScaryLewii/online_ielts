import LivePageDesktop from "@/components/live/desktop"
import LivePageMobile from "@/components/live/mobile"
import { useEffect, useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const LivePage = () => {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
    setIsClient(true)
  }, [])

	if (!isClient) {
		return null
	}

	return (
		<>
			<BrowserView>
				<LivePageDesktop />
			</BrowserView>

			<MobileView>
				<LivePageMobile />
			</MobileView>
		</>
	)
}

export default LivePage