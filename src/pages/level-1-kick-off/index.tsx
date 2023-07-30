import Image from "next/image"
import Link from "next/link"
import pin2 from "../../../public/images/pin2.svg"
import hat from "../../../public/images/hat.svg"
import arrow from "../../../public/images/arrow-right.svg"
import { ReactSVG } from "react-svg"
import lessonsData from "./data.json"
import UnitBox from "./unit-box"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const KickOffPage = () => {
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/signin")
		},
	})
	
	return <div className="flex gap-14 flex-wrap text-white">
		<div className="w-full lg:w-auto lg:min-w-[650px] border border-white py-5 px-5">
			{lessonsData.map((data, index) => <UnitBox key={`unit-${index}`} props={data} />)}
		</div>
		<div>
			<h3 className="text-xl font-semibold">Schedule</h3>
			<div className="flex items-center gap-2 mt-5">
				<Image src={pin2} width={24} height={24} alt="start date" />
				<p>Start date: February 21, 2023</p>
			</div>
			<div className="flex items-center gap-2 mt-5">
				<Image src={hat} width={24} height={24} alt="start date" />
				<p>Estimated end date: August 9, 2023</p>
			</div>

			<button className="py-4 px-8 bg-cyan rounded-full mt-10 flex items-center gap-2 hover:opacity-90">
				<span className="text-black font-semibold">Continue Your Study</span>
				<ReactSVG src={arrow["src"]} width={16} height={11} className="fill-black" />
			</button>
		</div>
	</div>
}

export default KickOffPage