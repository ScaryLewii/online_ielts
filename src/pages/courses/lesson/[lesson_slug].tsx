import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";
import { ILesson } from "../../../types/types";
import { GlobalContext } from "@/context/context";

const LessonContent = () => {
	const router = useRouter()
	const context = useContext(GlobalContext)
    
	const [content, setContent] = useState<ILesson | null>(null)

	const lessonId = parseInt(router.asPath.split("/").pop() || "0")
	const getLessonContent = () => {
		context.lessons.get().map((lesson: ILesson) => {
			if (lesson.id === lessonId) {
				setContent(lesson)
			}
		})
	}

	useEffect(() => {
		if (context.lessons.get().length) {
			getLessonContent();
			return
		}
	
		if (!context.lessons.get().length) {
			router.push("/study-route");
		}
	})

	return <>
		{content?.name && <Breadcrumbs title={content.name} />}
		<div className="p-5 pt-0 xl:px-10 xl:pb-5">
			{content?.videoUrl && <VideoBlock url={content.videoUrl} /> }
			{content?.id && <VocabularyBlock lessonId={content.id} />}
		</div>
	</>
}

export default LessonContent