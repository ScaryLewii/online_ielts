import Link from "next/link"
import back from "../../../public/images/back.svg"
import { ReactSVG } from "react-svg"
import { useRouter } from "next/router"

interface IBreadcrumbs {
	title: string
}

const Breadcrumbs = ({title}: IBreadcrumbs) => {
	const router = useRouter()
	return <div className="text-sm breadcrumbs flex items-center gap-4 p-5 xl:px-10 sticky z-[15] top-0 bg-sea">
		<button onClick={() => router.back()} className="w-8 h-8 bg-dark inline-flex items-center justify-center rounded hover:opacity-90">
			<ReactSVG src={back["src"]} width={30} height={30} />
		</button>

		<div className="text-white font-semibold">Quay lại</div>
	</div>
}

export default Breadcrumbs