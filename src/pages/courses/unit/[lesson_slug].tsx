import { StateContext } from "@/components/common/layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ILesson } from "../unit-box";
import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";

const LessonContent = () => {
	const router = useRouter()
	const context = useContext(StateContext)

	const [content, setContent] = useState<ILesson | null>(null)
	
	useEffect(() => {
		const fetchLessonContent = () => {
			context.lessons.get().map((lesson: ILesson) => {
				const url = lesson.slug as string
				if (router.asPath.includes(url)) {
					console.log('l',lesson)
					setContent(lesson)
				}
			})

			console.log(content)
		};

		fetchLessonContent();
	}, [context.lessons.get()]);

	return <>
		<Breadcrumbs />
		<VideoBlock video={content?.videoUrl} />
		<VocabularyBlock />
	</>
}

export default LessonContent