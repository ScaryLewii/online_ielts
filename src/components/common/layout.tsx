import TopNav from "../navigation/topnav"
import SideNav from "../navigation/sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren, createContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"
import GateWrapper from "../gate/gate-wrapper";
import { ILesson, IQuiz } from "../types/types";

export const StateContext = createContext<any>(null)
const baseUrl = "https://apionline.ant-edu.ai/api/"

const Layout = observer(({ children }: PropsWithChildren) => {
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
		quizs: []
	})

	useEffect(() => {
		const _token = router.query.token as string || router.asPath.split("=")[1]
		const token = _token || localStorage.getItem("token")
		if (!token) {
			return
		}

		localStorage.setItem("token", token)
		state.token.set(token)

		const headers = { 
			'Content-Type' : 'application/json',
			'Authorization': 'Bearer ' + token
		};
		
		const fetchUserData = (path: string) => {
			fetch(baseUrl + path,{ method: 'POST', headers })
				.then(res => res.json())
				.then(user => state.user.set(user.data));
		};


		const fetchCategories = (path: string) => {
			fetch(baseUrl + path, { headers })
				.then(res => res.json())
				.then(categories => state.categories.set(categories.data))
		};

		const _lessonsArray:any = []
		const _unitsArray:any = []
		const _quizArray: any = []
		const fetchLessons = (path: string) => {
			fetch(baseUrl + path, { headers })
				.then(res => res.json())
				.then(lessons => {
					_lessonsArray.push(...lessons.data.lessons)
					_unitsArray.push(...lessons.data.chapters)

					const lessonsArr = Object.values(lessons.data.lessons) as ILesson[]
					lessonsArr.map((l: ILesson) => {
						fetch(baseUrl + "lessons/" + l.id + "/quizzes", { headers })
							.then(res => res.json())
							.then(quiz => {
								if (quiz.data.length) {
									let _quiz = Object.values(quiz.data)[0] as IQuiz
									_quiz.chapterId = l.chapterId
									_quizArray.push(_quiz)
								}
							})
					})
				})
		};

		const fetchCourses = (path: string) => {
			fetch(baseUrl + path, { headers })
				.then(res => res.json())
				.then(courses => {
					const _coursesArray: any = []
					courses.data && courses.data.map((c: any) => _coursesArray.push(c.course))
					state.courses.set(_coursesArray)
					_coursesArray.map((c: any) => {
						fetchLessons(`courses/lessons/${c.id}`)
						state.units.set(_unitsArray)
						state.lessons.set(_lessonsArray)
						state.quizs.set(_quizArray)
					})
				})
		}

		fetchUserData("user/sso-support");
		fetchCategories("categories");
		fetchCourses("user/courses");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (router.pathname === "/") {
		return <StateContext.Provider value={state}>
			{children}
		</StateContext.Provider> 
	}

	if (router.asPath === "/signup" || router.asPath === "/signin") {
		return <StateContext.Provider value={state.gate}>
			<GateWrapper>
				{children}
			</GateWrapper>
		</StateContext.Provider>
	}

	// window.location.assign('https://ant-edu.ai/user/profile')

	return (
		<StateContext.Provider value={state}>
			<div className="dashboard-wrapper flex">
				<SideNav />
				<main className="bg-sea w-full min-h-screen relative pt-14" style={{gridArea: "dashboard"}}>
					<Image src={dashboardbg} width={1920} height={1080} alt="background" loading="lazy" className="absolute top-0 left-0 z-0" />
					<TopNav />
					<section className="relative z-[1] p-5 xl:p-14">
						{children}
					</section>
				</main>
			</div>
		</StateContext.Provider>
	)
})

export default Layout