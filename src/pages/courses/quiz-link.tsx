import { useQuizsQuery } from "@/base/query"
import ExamIcon from "@/components/icons/exam"
import { GlobalContext } from "@/context/context"
import { IQuiz } from "@/types/types"
import { nanoid } from "nanoid"
import Link from "next/link"
import { useContext } from "react"

interface IQuizLink {
	lessonId: number,
	courseId: number
}

const QuizLink = ({lessonId, courseId} : IQuizLink) => {
	const context = useContext(GlobalContext)
	const allQuizs = useQuizsQuery(lessonId, context.cookies.get()).data as IQuiz[]
	const quiz = allQuizs ? allQuizs[0] : null
	
	return <>
		{quiz &&
			<li key={nanoid()} data-quiz-id={quiz.id} className="list-none flex items-center justify-between pl-10 pr-3">
				<Link href={`/courses/${courseId}/lessons/${lessonId}/quiz/${quiz.id}`}
					className="flex items-center gap-5 my-2 text-black-mb dark:text-white">
						<ExamIcon />
						{quiz.title}
				</Link>
			</li>
		}
	</>
}

export default QuizLink