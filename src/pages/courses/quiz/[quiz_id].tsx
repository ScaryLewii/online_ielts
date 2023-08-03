import Breadcrumbs from "@/components/common/breadcrumbs";
import { StateContext } from "@/components/common/layout";
import { IQuestion, IQuiz } from "@/components/types/types";
import CheckboxGroup from "@/pages/practice/checkbox-group";
import RadioGroup from "@/pages/practice/radio-group";
import { nanoid } from "nanoid";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";


const QuizContent = () => {
	const router = useRouter();
	const context = useContext(StateContext)
	const [content, setContent] = useState<IQuestion[]>([])

	useEffect(() => {
        const quizId = router.asPath.split("/").pop() || "0"
		const fetchQuizContent = async () => {
			await context.quizs.get().map((q: IQuiz) => {
				if (q.id === quizId) {
					setContent(JSON.parse(q.content))
				}
			})
		};

		fetchQuizContent();
	}, [context.quizs, router.asPath]);

	if (!content) {
		return <>Loading...</>
	}

	return <>
		<Breadcrumbs />
		{content && content.map(c =>
			c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />
		)}
	</>
}

export default QuizContent