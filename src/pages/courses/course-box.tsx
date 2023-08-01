import { useContext, useEffect, useState } from "react"
import UnitBox, { ILesson } from "./unit-box"
import { StateContext } from "@/components/common/layout"
import { nanoid } from "nanoid"
import { IVideo } from "../writing/video"

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
	const [videos, setVideos] = useState<IVideo[]>([])

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
					const lessonArray = data.data.lessons
					const videosArray: any = []
					data.data.lessons.forEach(
						(l: ILesson) => {
							l.videoUrl && videosArray.push({id: l.id, slug: l.slug, url: l.videoUrl})
						}
					)
					// console.log('vvvv', videosArray)
					setLessons(lessonArray)
					setVideos(videosArray)
					// data.data.lessons.map(l => )
					// context.lessons.set({
					// 	active: data.data.lessons.active,
					// 	chapterId: data.data.lessons.chapterId,
					// 	checkpoint:  data.data.lessons.checkpoint,
					// 	courseId:  data.data.lessons.courseId,
					// 	description:  data.data.lessons.description,
					// 	displayOrder:  data.data.lessons.displayOrder,
					// 	id:  data.data.lessons.id,
					// 	name:  data.data.lessons.name,
					// 	requirePoint:  data.data.lessons.requirePoint,
					// 	slug:  data.data.lessons.slug,
					// 	timeLength:  data.data.lessons.timeLength,
					// 	type:  data.data.lessons.type,
					// 	videoUrl:  data.data.lessons.videoUrl
					// })
					context.lessons.set(lessonArray)
					context.videos.set(videosArray)
				})
		};

		fetchUnits();
	}, [context.courses.get()]);

	return <section className="text-white">
		<h3 className="font-semibold mb-5">{state?.name}</h3>
		{units && units.map((unit: IUnit) =>
			<UnitBox key={nanoid()} unit={unit} lessons={lessons} videos={videos} />
		)}
	</section>
}

export default CourseBox