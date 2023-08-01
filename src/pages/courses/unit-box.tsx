import { FC } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import check from "../../../public/images/check.svg"
import doubleCheck from "../../../public/images/double-check.svg"
import Link from "next/link"
import { IUnit } from "./course-box"
import { nanoid } from "nanoid"
import { IVideo } from "../writing/video"

export interface ILesson {
	active: boolean
	chapterId: number
	checkpoint:boolean
	courseId: number
	description: string
	displayOrder: number
	id: number
	name: string
	requirePoint: number
	slug: string
	timeLength: number
	type: string
	videoUrl: string
}

interface IUnitBlock {
	unit: IUnit,
	lessons: ILesson[],
	videos: IVideo
}

const UnitBox: FC<IUnitBlock> = observer(({ unit, lessons, videos }): JSX.Element => {
	const state = useObservable({
		isExpanded: false,
	})

	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${state.isExpanded.get() && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button className="flex gap-2 lg:gap-4" onClick={() => state.isExpanded.set(v => !v)}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				<h4>{unit?.name}</h4>
			</button>
		</div>
		<ul className={`${state.isExpanded.get() ? "block mb-5" : "hidden"}`}>
			{lessons?.map(lesson => 
				<li key={nanoid()} className="list-none flex items-center justify-between pl-10 pr-3">
					{lesson.slug && lesson.chapterId === unit.id &&
						<>
							<Link href={`/courses/unit/${lesson.slug}`} className="flex items-center gap-5 mb-3">
								<Image src={doubleCheck} width={24} height={24} alt="done task" />
								{lesson.name}
							</Link>
						</>
					}
				</li>
			)}
		</ul>
	</>
})
export default UnitBox