import userIcon from "../../../public/images/user.svg"
import settingIcon from "../../../public/images/setting.svg"
import supportIcon from "../../../public/images/support.svg"
import Link from "next/link"
import { ReactSVG } from "react-svg"
import { useRouter } from 'next/router'

export const dashboardNav = [
	{
		label: "Cài đặt",
		url: "/setting",
		icon: settingIcon,
	},
	{
		label: "Hỗ trợ",
		url: "/support",
		icon: supportIcon,
	}
]

const DashboardNav = () => {
	const router = useRouter()

	const getActiveClass = (url: string) => {
		if (router.asPath.includes(url)) return "is-active"
		return ""
	}

	return (
		<nav className="mt-auto pt-7 px-6 border-t border-[rgba(255, 255, 255, 0.50)]">
			<h2 className="font-semibold mb-5">Quản trị</h2>
			<ul className="bottom-nav">
				{dashboardNav.map(nav => 
					<li key={nav.url} className="bottom-nav__item">
						<Link href={nav.url} className={`bottom-nav__link ${getActiveClass(nav.url)}`}>
							<div className="relative z-[1] flex gap-3 items-center py-3">
								<ReactSVG src={nav.icon["src"]} className="fill-white" />
								{nav.label}
							</div>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default DashboardNav