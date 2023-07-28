import { FC } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import check from "../../../public/images/check.svg"
import doubleCheck from "../../../public/images/double-check.svg"
import Link from "next/link"

interface ITask {
	name: string,
	href?: string | URL,
	time: string
}

export interface ILesson {
	name: string,
	time: string,
	finish?: string,
	tasks: ITask[]
}

interface ILessonProps {
	lesson: ILesson
}

const LessonBox: FC<ILessonProps> = observer(({ lesson }): JSX.Element => {
	const state = useObservable({
		isExpanded: false,
	})

	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${state.isExpanded.get() && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button className="flex gap-2 lg:gap-4" onClick={() => state.isExpanded.set(v => !v)}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				<h4>{lesson.name}</h4>
			</button>
			<div className="flex gap-2 lg:gap-10 items-center">
				<p>{lesson.time}</p>
				{lesson.finish && 
					<div className="flex items-center gap-2 bg-green py-1 px-3 rounded-md">
						<Image src={check} width={24} height={24} alt="check" />
						{lesson.finish}
					</div>
				}
			</div>
		</div>
		<ul className={`${state.isExpanded.get() ? "block mb-5" : "hidden"}`}>
			{lesson.tasks.map((task, index) => 
				<li key={`task-${index}`} className="list-none flex items-center justify-between pl-10 pr-3">
					{task.href &&
						<>
							<Link href={task.href} className="flex items-center gap-5 mb-3">
								<Image src={doubleCheck} width={24} height={24} alt="done task" />
								{task.name}
							</Link>
							<p>{task.time}</p>
						</>
					}
				</li>
			)}
		</ul>
	</>
})
export default LessonBox