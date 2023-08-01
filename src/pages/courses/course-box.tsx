import { useContext, useEffect, useState } from "react"
import UnitBox, { ILesson } from "./unit-box"
import { StateContext } from "@/components/common/layout"
import { nanoid } from "nanoid"

export interface IUnit {
	id: number,
	name?: string,
}

export interface ICourse {
	id: number,
	name: string,
	slug: string
}

const CourseBox = (id: any) => {
	const context = useContext(StateContext)
	const [state, setState] = useState<ICourse | null>(null)
	const [units, setUnits] = useState<IUnit[]>([])
	const [lessons, setLessons] = useState<ILesson[]>([])

	useEffect(() => {
		const fetchUnits = async () => {
			setState(context.courses.get().filter((course: any) => course.id === id.id)[0])
			const token = localStorage.getItem("token") || context.session.token.get()
			if (!token) {
				return
			}
			const url = "https://apionline.ant-edu.ai/api/admin/lessons/get-by-course/" + id.id
			const headers = { 
				'Content-Type' : 'application/json',
				'Authorization': 'Bearer ' + token
			};
			fetch(url, {headers})
				.then(res => res.json())
				.then(data => {
					setUnits(data.data.chapters)
					setLessons(data.data.lessons)
					context.lessons.set(data.data.lessons)
				})
		};

		fetchUnits();
	}, [context.courses.get()]);

	return <section className="text-white">
		<h3 className="font-semibold mb-5">{state?.name}</h3>
		{units && units.map((unit: IUnit) =>
			<UnitBox key={nanoid()} unit={unit} lessons={lessons} />
		)}
	</section>
}

export default CourseBox