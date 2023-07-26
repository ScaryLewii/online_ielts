import Image from "next/image"
import Link from "next/link"
import back from "../../../public/images/back.svg"
import { ReactSVG } from "react-svg"

const Breadcrumbs = () => {
	return <div className="text-sm breadcrumbs mb-10 flex items-center gap-4">
		<Link href="/kick-off" className="w-8 h-8 bg-dark inline-flex items-center justify-center rounded hover:opacity-90">
			<ReactSVG src={back["src"]} width={30} height={30} />
		</Link>
		<ul>
			<li>IELTS VIDEO COURSE</li> 
			<li>Level 01: KICK OFF (0 - 2.0)</li> 
			<li>Unit 1: Daily life</li>
			<li className="text-white font-semibold">Practice 01</li>
		</ul>
	</div>
}

export default Breadcrumbs