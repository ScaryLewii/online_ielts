import Breadcrumbs from "@/components/common/breadcrumbs";
import { IAnswer, IQuestion, IQuiz, IUserAnswer } from "@/components/types/types";
import CheckboxGroup from "@/pages/practice/checkbox-group";
import RadioGroup from "@/pages/practice/radio-group";
import { nanoid } from "nanoid";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";
import QuizNav from "./quiz-nav";
import { observer, useObservable } from "@legendapp/state/react"
import { QuizContext, GlobalContext } from "@/context/context";

interface IQuizContent {
	id: string,
	title: string
	questions: IQuestion[]
	answers: IAnswer[]
	userAnswers: IUserAnswer[]
	isSubmit: boolean
}

const QuizContent = observer(function Component() {
	const router = useRouter();
	const context = useContext(GlobalContext)
	const quizId = router.asPath.split("/").pop() || "0"

	const state = useObservable({
		id: "",
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
		<div className="p-5 xl:px-10 xl:py-5">
			<Breadcrumbs title="" />
			<h1 className="text-white font-semibold text-2xl" data-id={quizId}>{state.title.get()}</h1>
		</div>
		<QuizContext.Provider value={state}>
			<div className="p-5 xl:p-10 xl:pt-0">
				{state.questions.get().map((c: IQuestion) =>
					c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />
				)}
			</div>
			<QuizNav id={quizId} content={state.questions.get()} />
		</QuizContext.Provider>
	</>
})

export default QuizContent