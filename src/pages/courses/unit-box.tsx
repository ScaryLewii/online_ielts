import { FC, useContext, useEffect, useState } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import doubleCheck from "../../../public/images/double-check.svg"
import Link from "next/link"
import { nanoid } from "nanoid"
import { StateContext } from "@/components/common/layout"
import { ILesson, IUnit } from "./types"
import { useRouter } from "next/router"
interface IUnitBlock {
	unitId: number
}

interface IUnitBlockState {
	isExpanded: boolean,
	unit: IUnit,
	lessons: ILesson[]
}

const UnitBox: FC<IUnitBlock> = ({ unitId }): JSX.Element => {
	const context = useContext(StateContext)
	const [isExpanded, setIsExpanded] = useState(false)
	const [unit, setUnit] = useState<IUnit | null>(null)
	const [lessons, setLessons] = useState<ILesson[]>([])

	useEffect(() => {
		const units = Object.values(context.units.get()) as IUnit[]
		setUnit(units.filter((u: IUnit) => u.id === unitId)[0])

		const lessons = Object.values(context.lessons.get()) as ILesson[]
		setLessons(lessons.filter((l: ILesson) => l.chapterId === unitId))
	}, [])
	
	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${isExpanded && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button className="flex gap-2 lg:gap-4" onClick={() => setIsExpanded(v => !v)}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				{unit?.name}
			</button>
		</div>
		{lessons &&
			<ul className={`${isExpanded ? "block mb-5" : "hidden"}`}>
				{lessons.map(l => 
					<li key={nanoid()} data-id={l.id} className="list-none flex items-center justify-between pl-10 pr-3">
						{l.chapterId === unitId &&
							<Link href={`/courses/lesson/${l.slug}`}
								className="flex items-center gap-5 mb-3">
									{l.name}
							</Link>
						}
					</li>
				)}
			</ul>
		}
	</>
}

export default UnitBox