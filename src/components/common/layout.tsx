import TopNav from "../navigation/topnav"
import SideNav from "../navigation/sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"
import { ICourse, ICategory, ILesson, ILessonProgress, IQuiz, IUnit } from "../../types/types";
import { GlobalContext } from "@/context/context";
import { fetchLessons, useAllLessonsQuery, useAllUnitsQuery, useCategoriesQuery, useCoursesQuery, useLessonsQuery, useUnitsQuery, useValidToken } from "@/base/query";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/base/base";

const Layout = observer(({ children }: PropsWithChildren) => {
	const router = useRouter()
	const token = useValidToken().data as string
	const allCategories = useCategoriesQuery().data as ICategory[]
	const allCourses = useCoursesQuery().data as ICourse[]
	const allLessons = useAllLessonsQuery(allCourses)

	const state = useObservable({
		isNavOpen: true,
		categories: [],
		courses: [],
		units: [],
		lessons: [],
		quizs: [],
		lessonProgress: []
	} as unknown as {
		isNavOpen: boolean,
		categories: ICategory[],
		courses: ICourse[],
		units: IUnit[],
		lessons: ILesson[],
		quizs: IQuiz[],
		lessonProgress: ILessonProgress[]
	})

	state.categories.set(allCategories)
	state.courses.set(allCourses)
	const allLessonsData = allLessons.map(array => array.data)
	state.lessons.set(allLessonsData)

	if (router.pathname === "/") {
		return <GlobalContext.Provider value={state}>
			{children}
		</GlobalContext.Provider>
	}

	return (
		<GlobalContext.Provider value={state}>
			<div className="dashboard-wrapper flex">
				<SideNav />
				<main className="bg-sea w-full min-h-screen relative" style={{gridArea: "dashboard"}}>
					<Image src={dashboardbg} alt="background" loading="lazy" className="absolute top-0 left-0 z-0 max-h-full" />
					<TopNav />
						<>{children}</>
				</main>
			</div>
		</GlobalContext.Provider>
	)
})

export default Layout