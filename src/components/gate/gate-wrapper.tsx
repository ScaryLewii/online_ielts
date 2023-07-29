import { PropsWithChildren } from "react"
import Image from "next/image"
import background from "../../../public/login-bg.svg"
import logo from "../../../public/logo.svg"
import Link from "next/link"
import localFont from 'next/font/local'
import globe from "../../../public/images/globe.svg"
import { TypeAnimation } from 'react-type-animation';
import { useEffect } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

const nicoFont = localFont({ 
	src: '../../../public/fonts/NicoMoji-Regular.ttf',
	variable: '--font-nico'
})

const GateWrapper = ({ children }: PropsWithChildren) => {
	const router = useRouter()

	useEffect(() => {
		const handleGetSession = async () => {
			const session = await getSession()
			if (session) {
				router.push('/study-route')
			}   
		}
		
		handleGetSession()
	}, [])

	return (
		<main className="relative bg-sea text-white">
			<Image src={background} width={1920} height={1080} className="w-full h-full absolute top-0 left-0" alt="login page background" />
			<header className="fixed top-5 left-10 z-10">
				<Link href="/">
					<Image src={logo} width={73} height={63} alt="ielts video course logo" />
				</Link>
			</header>
			<section className="container flex flex-wrap xl:justify-around w-screen lg:h-screen items-center relative z-[1] mx-auto pt-20 xl:pt-0">
				<div className="flex-grow xl:w-1/2 xl:flex-grow-0">
					<TypeAnimation className={`${nicoFont.className} text-shadow text-[45px] text-center uppercase`}
						sequence={[
							'HAVE A NICE DAY!',
							1000,
							'have a nice day!',
							1000
						]}
						wrapper="h1"
						speed={50}
						repeat={Infinity}
					/>
					<Image src={globe} width={500} height={500} alt="some fancy stuff" className="mx-auto -mt-10" />
				</div>
				<div className="mx-auto xl:max-w-1/2">
					{children}
				</div>
			</section>
		</main>
	)
}

export default GateWrapper