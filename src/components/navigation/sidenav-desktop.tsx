import Image from "next/image"
import Link from "next/link"
import course from "public/images/course.svg"
import exam from "public/images/exam.svg"
import interactive from "public/images/interactive.svg"
import live from "public/images/live.svg"
import review from "public/images/review.svg"
import logo from "public/logo.svg"

import { useCategoriesQuery, useCoursesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react"
import { ReactSVG } from "react-svg"
import { ICategory, ICourse } from "../../types/types"
import DashboardNav from "./dashboard-nav"
import NavIcon from "../icons/nav"

const mainNav = [
	{
		label: "Sự kiện trực tuyến",
		url: "/live",
		icon: live,
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
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())

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
			state.availableCategories.set(categories?.filter((cat : ICategory) => courses?.some((course: ICourse) => course.categoryId === cat.id)))
			return
		}
	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses, state.availableCategories])


	const getActiveClass = (url: string) => {
		if (router.asPath.includes(url)) return "is-active pointer-events-none"
		return ""
	}

	return <div className="bg-blue-mb dark:bg-sea-light text-white fixed z-20 top-0 left-0 bottom-0 min-h-full lg:relative">
		<div className={`sidenav-wrapper sticky top-0 pt-6 min-w-[275px] shadow-md ${context.isNavOpen.get() ? "flex flex-col justify-between" : "hidden"}`}>
			<div>
				<div className="flex justify-between items-start">
					<Link href="/" className="inline-block mb-8 px-6">
						<Image src={logo} alt={"logo"} />
					</Link>

					<button className="mt-4 mr-3" onClick={() => context.isNavOpen.set((v: boolean) => !v)}>
						<NavIcon />
					</button>
				</div>

				<nav className="sidenav px-6">
					<h2 className="font-semibold mb-5">Danh mục</h2>
					<ul className="sidenav">
						<li key={nanoid()} className="sidenav__item">
							<Link key={nanoid()} href="/study-route" className={`sidenav__link mb-2 relative ${getActiveClass("/study-route")}`}>
								<ReactSVG src={course["src"]} className="fill-white absolute -left-[35px]" />
								Lộ trình học của tôi
							</Link>

							<ul className="block">
								<li className="sidenav-child__item">
									<Link href="/study-route" className={`sidenav-child__link hover:text-cyan ${getActiveClass("/study-route")}`}>Lộ trình học</Link>
								</li>
								<li className="sidenav-child__item">
									<Link href="/all-courses" className={`sidenav-child__link hover:text-cyan ${getActiveClass("/all-courses")}`}>Các khóa học</Link>
								</li>
							</ul>
						</li>

						{mainNav.map(nav =>
							<li key={nanoid()} className="sidenav__item">
								<Link href={nav.url} className={`sidenav__link mb-2 relative group ${getActiveClass(nav.url)}`}>
									<ReactSVG src={nav.icon["src"]} className="fill-white group-hover:fill-sea absolute -left-[35px]" />
									{nav.label}
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>

			<DashboardNav />
		</div>
	</div>
})

export default SideNav