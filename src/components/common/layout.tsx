import { useAllLessonsProgressQuery, useAllLessonsQuery, useAllUnitsQuery, useCategoriesQuery, useCoursesQuery, useUserQuery, useValidToken } from "@/base/query";
import { GlobalContext } from "@/context/context";
import { observer, useObservable } from "@legendapp/state/react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import dashboardbg from "../../../public/images/dashboard-bg.svg";
import { ICategory, ICourse, ILesson, ILessonProgress, IQuiz, IUnit } from "../../types/types";
import SideNav from "../navigation/sidenav";
import TopNav from "../navigation/topnav";
import Gtag from "./gtag";

const Layout = observer(({ children }: PropsWithChildren) => {
	const { isFetched: isFinishFetchToken, data: saveToken} = useValidToken()
	const { isFetched: isFinishFetchOldUser, data: oldUser  } = useUserQuery(saveToken)

	const allCategories = useCategoriesQuery().data as ICategory[]
	const allCourses = useCoursesQuery().data as ICourse[]
	const allLessons = useAllLessonsQuery(allCourses)
	const lessonsProgress = useAllLessonsProgressQuery(allCourses)
	const allUnits = useAllUnitsQuery(allCourses)

	const state = useObservable({
		isSessonValid: true,
		isNavOpen: true,
		categories: [],
		courses: [],
		units: [],
		lessons: [],
		quizs: [],
		lessonProgress: []
	} as unknown as {
		isSessonValid: boolean,
		isNavOpen: boolean,
		categories: ICategory[],
		courses: ICourse[],
		units: IUnit[],
		lessons: ILesson[],
		quizs: IQuiz[],
		lessonProgress: ILessonProgress[]
	})

	if (isFinishFetchToken && typeof window !== undefined && !saveToken) {
		window.location.assign('https://ant-edu.ai/auth/login')
		return
	}

	if (isFinishFetchOldUser && typeof window !== undefined && !oldUser) {
		window.location.assign('https://ant-edu.ai/auth/login')
		return
	}

	state.categories.set(allCategories)
	state.courses.set(allCourses)
	const allLessonsData = allLessons.map(array => array.data)
	state.lessons.set(Object.values(allLessonsData).flat())
	const allLessonsProgressData = lessonsProgress.map(array => array.data)
	state.lessonProgress.set(Object.values(allLessonsProgressData).flat())
	const allUnitsData = allUnits.map(array => array.data)
	state.units.set(Object.values(allUnitsData).flat())

	return (
		<GlobalContext.Provider value={state}>
			<div className="dashboard-wrapper flex">
				<Gtag />
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