import Image from "next/image"
import Link from "next/link"
import globe from "public/images/globe.svg"
import background from "public/login-bg.svg"
import logo from "public/logo.svg"
import LoginForm from "./form"

const LoginPage = () => {
	return <main className="relative bg-sea text-white">
		<Image src={background} width={1920} height={1080} className="w-full h-full absolute top-0 left-0" alt="login page background" />
		<header className="fixed top-5 left-10 z-10">
			<Link href="/">
				<Image src={logo} width={73} height={63} alt="ielts video course logo" />
			</Link>
		</header>
		<section className="container flex flex-wrap xl:justify-around w-screen lg:h-screen items-center relative z-[1]">
			<div className="lg:w-1/2">
				<Image src={globe} width={500} height={500} alt="some fancy stuff" className="mx-auto -mt-10" />
			</div>
			<div className="lg:max-w-1/2">
				<LoginForm />
			</div>
		</section>
	</main>
}

export default LoginPage