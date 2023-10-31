import Image from "next/image"
import Link from "next/link"
import course from "../../../public/images/course.svg"
import exam from "../../../public/images/exam.svg"
import interactive from "../../../public/images/interactive.svg"
import live from "../../../public/images/live.svg"
import review from "../../../public/images/review.svg"
import logo from "../../../public/logo.svg"

import { useCategoriesQuery, useCoursesQuery, useValidToken } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react"
import { ReactSVG } from "react-svg"
import nav from "../../../public/nav.svg"
import { ICategory, ICourse } from "../../types/types"
import DashboardNav from "./dashboard-nav"

const mainNav = [
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
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchToken, data: saveToken} = useValidToken()
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(saveToken)
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(saveToken)

	const state = useObservable({
		availableCategories: []
	} as unknown as {
		availableCategories: ICategory[]
	})

	if (!context) {
		return <>Loading...</>
	}

	useEffect(() => {
		if (isFinishFetchCourses && isFinishFetchCategories && typeof window !== undefined) {
			state.availableCategories.set(categories.filter((cat : ICategory) => courses.some((course: ICourse) => course.categoryId === cat.id)))
			return
		}
	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses, state.availableCategories])


	const getActiveClass = (url: string) => {
		if (router.asPath.includes(url)) return "is-active pointer-events-none"
		return ""
	}

	return <div className={`bg-sea-light text-white fixed z-20 top-0 left-0 lg:relative`}>
		<div className={`sidenav-wrapper sticky top-0 pt-6 min-w-[275px] ${context.isNavOpen.get() ? "block" : "hidden"}`}>
			<div className="flex justify-between items-start">
				<Link href="/" className="inline-block mb-8 px-6">
					<Image src={logo} alt={logo} />
				</Link>

				<button className="mt-4 mr-3" onClick={() => context.isNavOpen.set((v: boolean) => !v)}>
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

						{ state.availableCategories.get()?.map((cat: ICategory) => {
							if (cat.level === 1 && cat.active) {
								return (
									<ul key={nanoid()} className={`/categories/${cat.id === +router.asPath ? "block" : "hidden"}`}>
										<li className="sidenav-child__item">
											<Link href={`/categories/${cat.id}`}
												className={`sidenav-child__link hover:text-cyan ${getActiveClass('/categories/' + cat.id)}`}>
													{cat.name}
											</Link>
										</li>
									</ul>
								)
							}
						})}
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