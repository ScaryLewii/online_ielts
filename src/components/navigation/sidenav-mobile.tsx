import Image from "next/image"
import Link from "next/link"
import logo from "public/logo.svg"

import { useCategoriesQuery, useCoursesQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react"
import { ReactSVG } from "react-svg"
import { ICategory, ICourse } from "../../types/types"
import NavIcon from "../icons/nav"
import { dashboardNav } from "./dashboard-nav"
import { fetchData } from "@/base/base"

const SideNavMobile = observer(() => {
	const router = useRouter()
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())
	const { isFetched: isFinishFetchUserInfo, data: userInfo } = useUserInfoQuery(context.cookies.get())

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

	return <div className="bg-blue-mb dark:bg-sea-light text-white fixed z-20 top-0 left-0 bottom-0 min-h-full lg:relative">
		<div className={`sidenav-wrapper sticky top-0 pt-6 min-w-[275px] ${context.isNavOpen.get() ? "flex flex-col justify-between" : "hidden"}`}>
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
					<ul className="sidenav">
						<li className="bottom-nav__item">
							<Link href={"/"} className={`bottom-nav__link}`}>
								<div className="relative z-[1] flex gap-3 items-center py-3">
									{/* <ReactSVG src={nav.icon["src"]} className="fill-white" /> */}
									Quay về trang chủ
								</div>
							</Link>
						</li>
						<li className="bottom-nav__item">
							<Link href={"/"} className={`bottom-nav__link}`}>
								<div className="relative z-[1] flex gap-3 items-center py-3">
									{/* <ReactSVG src={nav.icon["src"]} className="fill-white" /> */}
									Kiểm tra đầu vào
								</div>
							</Link>
						</li>

						{dashboardNav.map(nav => 
							<li key={nav.url} className="bottom-nav__item">
								<Link href={nav.url} className={`bottom-nav__link}`}>
									<div className="relative z-[1] flex gap-3 items-center py-3">
										<ReactSVG src={nav.icon["src"]} className="fill-white" />
										{nav.label}
									</div>
								</Link>
							</li>
						)}

						{isFinishFetchUserInfo && 
							<li className="bottom-nav__item">
								{!userInfo.userName &&
									<Link href={"https://ant-edu.ai/auth/login"} className={`bottom-nav__link}`}>
										<div className="relative z-[1] flex gap-3 items-center py-3">
											{/* <ReactSVG src={nav.icon["src"]} className="fill-white" /> */}
											Đăng nhập
										</div>
									</Link>
								}

								{userInfo.userName &&
									<button onClick={() => fetchData("signout", "POST", context.cookies.get())} className={`bottom-nav__link}`}>
										<div className="relative z-[1] flex gap-3 items-center py-3">
											{/* <ReactSVG src={nav.icon["src"]} className="fill-white" /> */}
											Đăng xuất
										</div>
									</button>
								}
							</li>
						}
					</ul>
				</nav>
			</div>
		</div>
	</div>
})

export default SideNavMobile