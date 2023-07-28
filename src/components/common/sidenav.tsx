import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/logo.svg"
import course from "../../../public/images/course.svg"
import live from "../../../public/images/live.svg"
import interactive from "../../../public/images/interactive.svg"
import review from "../../../public/images/review.svg"
import exam from "../../../public/images/exam.svg"
import userIcon from "../../../public/images/user.svg"
import settingIcon from "../../../public/images/setting.svg"
import supportIcon from "../../../public/images/support.svg"
import { ReactSVG } from "react-svg"
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"
import { useContext } from "react"
import { StateContext } from "./layout"
import nav from "../../../public/nav.svg"

const mainNav = [
	{
		label: "Khóa học của tôi",
		url: "/study-route",
		icon: course,
		children: [
			{
				label: "Lộ trình học",
				url: "/study-route",
			},
			{
				label: "Level 1: Kick-off",
				url: "/kick-off",
			},
			{
				label: "Level 2: Speed-up",
				url: "/speed-up",
			},
			{
				label: "Level 3: Modest",
				url: "/modest",
			},
			{
				label: "Level 4: Fluent",
				url: "/fluent",
			},
			{
				label: "Level 5: Advanced",
				url: "/advanced",
			}
		]
	},
	{
		label: "Live",
		url: "/live",
		icon: live,
		children: [
			{
				label: "Chat với giáo viên",
				url: "/live"
			},
			{
				label: "Đặt lịch hẹn giáo viên",
				url: "/live2"
			}
		]
	},
	{
		label: "Interactive",
		url: "/interactive",
		icon: interactive,
	},
	{
		label: "Review",
		url: "/review",
		icon: review,
	},
	{
		label: "Exam",
		url: "/exam",
		icon: exam,
	}
]

const dashboardNav = [
	{
		label: "Tài khoản của tôi",
		url: "/profile",
		icon: userIcon,
	},
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

interface INav {
	isNavOpen: boolean
}

const SideNav = observer(() => {
	const router = useRouter()
	const state = useContext(StateContext)

	const getActiveClass = (url: string) => {
		if (router.asPath == url) return "is-active"
		return ""
	}

	return <div className={`bg-sea-light text-white fixed z-20 top-0 left-0 lg:relative`}>
		<div className={`sidenav-wrapper sticky top-0 pt-6 min-w-[275px] ${state.isNavOpen.get() ? "block" : "hidden"}`}>
			<div className="flex justify-between items-start">
				<Link href="/" className="inline-block mb-8 px-6">
					<Image src={logo} width={80} height={75} alt={logo} />
				</Link>

				<button className="mt-4 mr-3" onClick={() => state.isNavOpen.set((v: any) => !v)}>
					<Image src={nav} width={23} height={23} alt="nav control" />
				</button>
			</div>

			<nav className="sidenav px-6">
				<h2 className="font-semibold mb-5">Danh mục</h2>
				<ul className="sidenav">
					{mainNav.map(nav =>
						<li key={nav.url || nav.label} className="sidenav__item">
							<Link href={nav.url} className={`sidenav__link mb-2 relative ${getActiveClass(nav.url)}`}>
								<ReactSVG src={nav.icon["src"]} className="fill-white absolute -left-[35px]" />
								{nav.label}
							</Link>

							{nav.children &&
								<ul className={`${nav.children.some(n => n.url === router.asPath) ? "block" : "hidden"}`}>
									{nav.children.map(navChild =>
										<li key={navChild.url} className="sidenav-child__item">
											<Link href={navChild.url} className={`sidenav-child__link hover:text-cyan ${getActiveClass(navChild.url)}`}>{navChild.label}</Link>
										</li>
									)}
								</ul>
							}
						</li>
					)}
				</ul>
			</nav>

			<nav className="mt-[200px] pt-7 px-6 border-t border-[rgba(255, 255, 255, 0.50)]">
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
		</div>
	</div>
})

export default SideNav