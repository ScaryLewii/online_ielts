import { FC, useContext, useEffect } from "react"
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
	lessons: ILesson[]
}

const UnitBox: FC<IUnitBlock> = observer(({ unitId }): JSX.Element => {
	const context = useContext(StateContext)
	const router = useRouter()

	const state = useObservable({
		isExpanded: false,
		lessons: []
	} as unknown as IUnitBlockState)

	useEffect(() => {
		const lessons = context.lessons.get().filter((l: ILesson) => l.chapterId === unitId)
		console.log(unitId)
		state.lessons.set(lessons)
	}, [router.asPath])

	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${state.isExpanded.get() && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button className="flex gap-2 lg:gap-4" onClick={() => state.isExpanded.set(v => !v)}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				<h4>{}</h4>
			</button>
		</div>
		<ul className={`${state.isExpanded.get() ? "block mb-5" : "hidden"}`}>
			{state.lessons.get().map(l => 
				<li key={nanoid()} data-id={l.id} className="list-none flex items-center justify-between pl-10 pr-3">
					{l.slug && l.chapterId === unitId &&
						<>
							<Link href={`/courses/lesson/${l.id}`}
								className="flex items-center gap-5 mb-3">
									<Image src={doubleCheck} width={24} height={24} alt="done task" />
									{l.name}
							</Link>
						</>
					}
				</li>
			)}
		</ul>
	</>
})
export default UnitBox