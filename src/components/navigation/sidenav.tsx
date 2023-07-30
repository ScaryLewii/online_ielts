import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/logo.svg"
import course from "../../../public/images/course.svg"
import live from "../../../public/images/live.svg"
import interactive from "../../../public/images/interactive.svg"
import review from "../../../public/images/review.svg"
import exam from "../../../public/images/exam.svg"

import { ReactSVG } from "react-svg"
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"
import { useContext, useEffect } from "react"
import { StateContext } from "../common/layout"
import nav from "../../../public/nav.svg"
import DashboardNav from "./dashboard-nav"
import { env } from "process"
import { useSession } from "next-auth/react"
import { nanoid } from "nanoid"

const mainNav = [
	// {
	// 	label: "Khóa học của tôi",
	// 	url: "/study-route",
	// 	icon: course,
	// 	children: [
	// 		{
	// 			label: "Lộ trình học",
	// 			url: "/study-route",
	// 		},
	// 		{
	// 			label: "Level 1: Kick-off",
	// 			url: "/kick-off",
	// 		},
	// 		{
	// 			label: "Level 2: Speed-up",
	// 			url: "/speed-up",
	// 		},
	// 		{
	// 			label: "Level 3: Modest",
	// 			url: "/modest",
	// 		},
	// 		{
	// 			label: "Level 4: Fluent",
	// 			url: "/fluent",
	// 		},
	// 		{
	// 			label: "Level 5: Advanced",
	// 			url: "/advanced",
	// 		}
	// 	]
	// },
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

const SideNav = observer(() => {
	const router = useRouter()
	const navState = useContext(StateContext)
	const {data: session, status} = useSession()

	const getActiveClass = (url: string) => {
		if (router.asPath == url) return "is-active"
		return ""
	}

	return <div className={`bg-sea-light text-white fixed z-20 top-0 left-0 lg:relative`}>
		<div className={`sidenav-wrapper sticky top-0 pt-6 min-w-[275px] ${navState.isOpen.get() ? "block" : "hidden"}`}>
			<div className="flex justify-between items-start">
				<Link href="/" className="inline-block mb-8 px-6">
					<Image src={logo} width={80} height={75} alt={logo} />
				</Link>

				<button className="mt-4 mr-3" onClick={() => navState.isOpen.set((v: boolean) => !v)}>
					<Image src={nav} width={23} height={23} alt="nav control" />
				</button>
			</div>

			<nav className="sidenav px-6">
				<h2 className="font-semibold mb-5">Danh mục</h2>
				<ul className="sidenav">
					<li key={nanoid()} className="sidenav__item">
						<Link key={nanoid()} href="/study-route" className={`sidenav__link mb-2 relative ${getActiveClass("/study-route")}`}>
							<ReactSVG src={course["src"]} className="fill-white absolute -left-[35px]" />
							Khóa học của tôi
						</Link>

						{
							session && session?.courseCategories.map((course, index) => {
								if (course.level === 0) {
									return (
										<ul key={nanoid()} className={`/courses/${course.slug === router.asPath ? "block" : "hidden"}`}>
											<li className="sidenav-child__item">
												<Link href={`/courses/${course.slug}`}
													className={`sidenav-child__link hover:text-cyan ${getActiveClass('/courses/' + course.slug)}`}>
														{course.name}
												</Link>
											</li>
										</ul>
									)
								}
							})
						}
					</li>

					{mainNav.map(nav =>
						<li key={nanoid()} className="sidenav__item">
							<Link href={nav.url} className={`sidenav__link mb-2 relative ${getActiveClass(nav.url)}`}>
								<ReactSVG src={nav.icon["src"]} className="fill-white absolute -left-[35px]" />
								{nav.label}
							</Link>

							{nav.children &&
								<ul className={`${nav.children.some(n => n.url === router.asPath) ? "block" : "hidden"}`}>
									{nav.children.map(navChild =>
										<li key={nanoid()} className="sidenav-child__item">
											<Link href={navChild.url} className={`sidenav-child__link hover:text-cyan ${getActiveClass(navChild.url)}`}>{navChild.label}</Link>
										</li>
									)}
								</ul>
							}
						</li>
					)}
				</ul>
			</nav>

			<DashboardNav />
		</div>
	</div>
})

export default SideNav