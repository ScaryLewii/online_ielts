import Breadcrumbs from "@/components/common/breadcrumbs";
import { StateContext } from "@/components/common/layout";
import { IQuestion, IQuiz } from "@/components/types/types";
import CheckboxGroup from "@/pages/practice/checkbox-group";
import RadioGroup from "@/pages/practice/radio-group";
import { nanoid } from "nanoid";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import QuizNav from "./quiz-nav";
import { observer, useObservable } from "@legendapp/state/react"

const QuizContent = observer(function Component() {
	const router = useRouter();
	const context = useContext(StateContext)
	const quizId = router.asPath.split("/").pop() || "0"

	const state = useObservable({ questions: [] })

	useEffect(() => {
		if (!context.quizs.get().length) {
			router.push("/study-route")
		}

		const fetchQuizContent = () => {
	
			context.quizs.get().forEach((q: IQuiz) => {
				q.id === quizId && state.questions.set(JSON.parse(q.content))
				return;
			})
		}
	
		fetchQuizContent()
	}, [context.quizs, quizId, router, state.questions])
	

	if (!state.questions.get().length) {
		return <>Loading...</>
	}

	return <>
		<Breadcrumbs />
		<div className="flex gap-10">
			<div className="xl:flex-grow">
				{state.questions.get().map((c: IQuestion) =>
					c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />
				)}
			</div>
			<QuizNav content={state.questions.get()} />
		</div>
	</>
})

export default QuizContent