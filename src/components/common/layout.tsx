import TopNav from "../navigation/topnav"
import SideNav from "../navigation/sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren, createContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"
import GateWrapper from "../gate/gate-wrapper";
import { ICourse, ICourseCat, ILesson, ILessonProgress, IQuiz, IUnit, IUser } from "../types/types";
import { fetchData } from "@/base/base";
import { GlobalContext } from "@/context/context";


const Layout = ({ children }: PropsWithChildren) => {
	const router = useRouter()

	const state = useObservable({
		isNavOpen: true,
		token: "",
		gate: {
			isQrScanning: false,
			isLostPasswordPage: false,
		},
		user: {},
		categories: [],
		courses: [],
		units: [],
		lessons: [],
		quizs: [],
		lessonProgress: []
	} as unknown as {
		isNavOpen: boolean,
		token: string,
		gate: {
			isQrScanning: boolean,
			isLostPasswordPage: boolean,
		},
		user: IUser,
		categories: ICourseCat[],
		courses: ICourse[],
		units: IUnit[],
		lessons: ILesson[],
		quizs: IQuiz[],
		lessonProgress: ILessonProgress[]
	})

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			return
		}
		state.token.set(token)

		fetchData("user/sso-support", token, "POST").then(user => state.user.set(user.data))
		fetchData("categories", token, "GET").then(categories => state.categories.set(categories.data.filter((cat: ICourseCat) => cat.level === 1)))

		const _lessonsArray:any = []
		const _unitsArray:any = []
		const _quizArray: any = []
		const _progressArray: any = []
		fetchData("user/courses", token, "GET").then(courses => {
			const _coursesArray: any = []
			courses.data && courses.data.map((c: any) => {
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
	}, [state.categories, state.courses, state.lessons, state.lessonProgress, state.quizs, state.token, state.units, state.user])

	if (router.pathname === "/") {
		return <GlobalContext.Provider value={state}>
			{children}
		</GlobalContext.Provider> 
	}

	// if (router.asPath === "/signup" || router.asPath === "/signin") {
	// 	return <GlobalContext.Provider value={state.gate}>
	// 		<GateWrapper>
	// 			{children}
	// 		</GateWrapper>
	// 	</GlobalContext.Provider>
	// }

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