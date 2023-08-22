import TopNav from "../navigation/topnav"
import SideNav from "../navigation/sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from 'next/router'
import { useObservable } from "@legendapp/state/react"
import { ICourse, ICourseCat, ILesson, ILessonProgress, IQuiz, IUnit } from "../../types/types";
import { GlobalContext } from "@/context/context";
import { fetchLessons, useCoursesQuery, useLessonsQuery, useValidToken } from "@/base/query";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/base/base";

const Layout = ({ children }: PropsWithChildren) => {
	const router = useRouter()
	const token = useValidToken().data as string
	const allCourses = useCoursesQuery().data as ICourse[]


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
		categories: ICourseCat[],
		courses: ICourse[],
		units: IUnit[],
		lessons: ILesson[],
		quizs: IQuiz[],
		lessonProgress: ILessonProgress[]
	})

	useEffect(() => {
		fetchData("categories", token, "GET").then(categories => state.categories.set(categories.data.filter((cat: ICourseCat) => cat.level === 1)))

		const _lessonsArray:any = []
		const _unitsArray:any = []
		const _quizArray: any = []
		const _progressArray: any = []
		fetchData("user/courses", token, "GET").then(courses => {
			const _coursesArray: any = []
			courses?.data && courses.data.map((c: any) => {
				const data = {
					...c.course,
					isComplete: c.userCourse.completed
				}
				_coursesArray.push(data)
			})
			state.courses.set(_coursesArray)
			_coursesArray.map((c: any) => {
				fetchData(`courses/lessons/${c.id}`, token, "GET")
					.then(lessons => {
						_lessonsArray.push(...lessons.data.lessons)
						_unitsArray.push(...lessons.data.chapters)
						_progressArray.push(...lessons.data.userLessons)

						const lessonsArr = Object.values(lessons.data.lessons) as ILesson[]
						lessonsArr.map((l: ILesson) => {
							fetchData("lessons/" + l.id + "/quizzes", token, "GET")
								.then(quiz => {
									if (quiz.data.length) {
										let _quiz = Object.values(quiz.data)[0] as IQuiz
										_quiz.chapterId = l.chapterId
										_quizArray.push(_quiz)
									}
								})
						})
					})
				state.units.set(_unitsArray)
				state.lessons.set(_lessonsArray)
				state.quizs.set(_quizArray)
				state.lessonProgress.set(_progressArray)
			})
		})
	}, [state.categories, state.courses, state.lessons, state.lessonProgress, state.quizs, state.units, token])

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
}

export default Layout