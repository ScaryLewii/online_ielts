import Breadcrumbs from "@/components/common/breadcrumbs";
import { IAnswer, IQuestion, IQuiz, IUserAnswer } from "@/types/types";
import CheckboxGroup from "@/pages/practice/checkbox-group";
import RadioGroup from "@/pages/practice/radio-group";
import { nanoid } from "nanoid";
import { useRouter } from "next/router"
import { useContext, useEffect } from "react";
import QuizNav from "../../../../quiz/quiz-nav";
import { observer, useObservable } from "@legendapp/state/react"
import { QuizContext, GlobalContext } from "@/context/context";
import { useQuizsQuery } from "@/base/query";

interface IQuizContent {
	id: string,
	title: string
	questions: IQuestion[]
	answers: IAnswer[]
	userAnswers: IQuestion[]
	isSubmit: boolean
}

const QuizContent = observer(function Component() {
	const router = useRouter();
	
	const lessonId = router.query.lesson_id as string
	const quizId = router.query.quiz_id as string
	const quiz = useQuizsQuery(+lessonId).data?.[0] as IQuiz

	const state = useObservable({	
		id: "",
		title: "",
		questions: [],
		answers: [],
		userAnswers: [],
		isSubmit: false
	} as unknown as IQuizContent)

	useEffect(() => {
		if (!quiz) {
			router.push("/study-route")
			return
		}

		const content = JSON.parse(quiz?.content)
		state.questions.set(content)
		state.title.set(quiz.title)
	
		const answers: any = []
		content.map((c: IQuestion) => {
			const _a = c.answers.filter(a => a.right)[0]
			answers.push({
				id: _a.id,
				content: _a.content
			})
		})
		state.answers.set(answers)
	}, [quiz, router, state.answers, state.questions, state.title])

	return <>
		<Breadcrumbs title="" />
		<div className="p-5 pt-0 xl:px-10 xl:pb-5">
			<h1 className="text-white font-semibold text-2xl" data-id={quizId}>{state.title.get()}</h1>
		</div>
		<QuizContext.Provider value={state}>
			<div className="p-5 xl:p-10 xl:pt-0 relative z-[1]">
				{state.questions.get().map((c: IQuestion) =>
					c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />
				)}
			</div>
			<QuizNav id={quizId} content={state.questions.get()} />
		</QuizContext.Provider>
	</>
})

export default QuizContent