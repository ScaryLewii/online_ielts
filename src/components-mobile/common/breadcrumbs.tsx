import Link from "next/link"
import { useRouter } from "next/router"
import back from "public/images/back.svg"
import { ReactSVG } from "react-svg"

interface IBreadcrumbsMobile {
	title: string,
	isSubMenu?: boolean,
	parentPage?: string
}

const MobileBreadcrumbs = ({title, isSubMenu, parentPage}: IBreadcrumbsMobile) => {
	const router = useRouter()

	return (
		<div className={`flex items-center px-5 py-3 sticky z-[15] top-0 bg-sea border-b border-gray-500
			${!isSubMenu && !parentPage ? 'justify-center' : 'justify-between'}
		`}>
			{isSubMenu &&
				<button className="w-8 h-8 bg-dark inline-flex items-center justify-center rounded hover:opacity-90"
					onClick={() => router.back()}
				>
					<ReactSVG src={back['src']} />
				</button>
			}
			{parentPage &&
				<Link className="w-8 h-8 bg-dark inline-flex items-center justify-center rounded hover:opacity-90"
					href={parentPage}>
					<ReactSVG src={back['src']} />
				</Link>
			}
			<span className="text-white text-lg">{title}</span>

			{isSubMenu || parentPage &&
				<div aria-hidden className="w-8"></div>
			}
		</div>
	)
}

export default MobileBreadcrumbs