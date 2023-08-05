import Breadcrumbs from "@/components/common/breadcrumbs";
import { StateContext } from "@/components/common/layout";
import { IAnswer, IQuestion, IQuiz, IUserAnswer } from "@/components/types/types";
import CheckboxGroup from "@/pages/practice/checkbox-group";
import RadioGroup from "@/pages/practice/radio-group";
import { nanoid } from "nanoid";
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react";
import QuizNav from "./quiz-nav";
import { observer, useObservable } from "@legendapp/state/react"

interface IQuizContent {
	title: string
	questions: IQuestion[]
	answers: IAnswer[]
	userAnswers: IUserAnswer[]
	isSubmit: boolean
}

export const QuizContext = createContext<any>({})

const QuizContent = observer(function Component() {
	const router = useRouter();
	const context = useContext(StateContext)
	const quizId = router.asPath.split("/").pop() || "0"

	const state = useObservable({
		title: "",
		questions: [],
		answers: [],
		userAnswers: [],
		isSubmit: false
	} as unknown as IQuizContent)

	useEffect(() => {
		if (!context.quizs.get().length) {
			router.push("/study-route")
		}

		const fetchQuizContent = () => {
			context.quizs.get().forEach((q: IQuiz) => {
				if (q.id === quizId) {
					const content = JSON.parse(q.content)
					state.questions.set(content)
					state.title.set(q.title)
	
					const answers: any = []
					content.map((c: IQuestion) => {
						const _a = c.answers.filter(a => a.right)[0]
						answers.push({
							id: _a.id,
							content: _a.content
						})
					})
					state.answers.set(answers)
	
					return;
				}
			})
		}
	
		fetchQuizContent()
	}, [context.quizs, quizId, router, state.answers, state.questions, state.title])

	if (!state.questions.get().length) {
		return <>Loading...</>
	}

	return <>
		<div className="p-5 xl:p-14">
			<Breadcrumbs title="" />
			<h1 className="text-white font-semibold text-2xl">{state.title.get()}</h1>
		</div>
		<QuizContext.Provider value={state}>
			<div className="p-5 xl:p-14 xl:pt-0">
				{state.questions.get().map((c: IQuestion) =>
					c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />
				)}
			</div>
			<QuizNav content={state.questions.get()} />
		</QuizContext.Provider>
	</>
})

export default QuizContent