import { useAllLessonsProgressQuery, useAllLessonsQuery, useAllUnitsQuery, useCategoriesQuery, useCoursesQuery, useUserQuery, useValidToken } from "@/base/query";
import { GlobalContext } from "@/context/context";
import { observer, useObservable } from "@legendapp/state/react";
import Image from "next/image";
import { PropsWithChildren, useEffect } from "react";
import dashboardbg from "../../../public/images/dashboard-bg.svg";
import { ICategory, ICourse, ILesson, ILessonProgress, IQuiz, IUnit } from "../../types/types";
import SideNav from "../navigation/sidenav";
import TopNav from "../navigation/topnav";
import Gtag from "./gtag";
import AlertModal from "./alert-modal";

const Layout = observer(({ children }: PropsWithChildren) => {
	const saveToken = useValidToken().data as string
	const { isFetched: isFinishFetchOldUser, data: oldUser  } = useUserQuery(saveToken)
	const { isFetched: isFinishFetchCategories, data: allCategories } = useCategoriesQuery(saveToken)
	const { isFetched: isFinishFetchCourses, data: allCourses } = useCoursesQuery(saveToken)
	const allLessons = useAllLessonsQuery(allCourses, saveToken)
	const lessonsProgress = useAllLessonsProgressQuery(allCourses, saveToken)
	const allUnits = useAllUnitsQuery(allCourses, saveToken)

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

	useEffect(() => {
		if (isFinishFetchOldUser && typeof window !== undefined && !oldUser) {
			// window.location.assign('https://ant-edu.ai/auth/login')
			console.log('not login')
			state.isSessonValid.set(false)
		}

		if (isFinishFetchCategories && typeof window !== undefined && !allCategories) {
			// window.location.assign('https://ant-edu.ai/auth/login')
			console.log('not login')
			state.isSessonValid.set(false)
		}

		if (isFinishFetchCourses && typeof window !== undefined && !allCourses) {
			// window.location.assign('https://ant-edu.ai/auth/login')
			console.log('not login')
			state.isSessonValid.set(false)

		}
	}, [allCategories, allCourses, isFinishFetchCategories, isFinishFetchCourses, isFinishFetchOldUser, oldUser, state.isSessonValid])

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
			
			{state.isSessonValid.get() === false && <AlertModal />}
		</GlobalContext.Provider>
	)
})

export default Layout