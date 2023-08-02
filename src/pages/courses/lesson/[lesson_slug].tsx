import { StateContext } from "@/components/common/layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ILesson } from "../unit-box";
import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";

const Videos = [
    {
        "id": 129,
        "slug": "lesson-1",
        "url": "https://youtu.be/d3nLOSkUveM"
    },
    {
        "id": 130,
        "slug": "lesson-2",
        "url": "https://youtu.be/GJSJ-uxLzfI"
    },
    {
        "id": 131,
        "slug": "lesson-3",
        "url": "https://youtu.be/OyLMP3TdfdQ"
    },
    {
        "id": 132,
        "slug": "lesson-1",
        "url": "https://youtu.be/3VSq20pMJMM"
    },
    {
        "id": 133,
        "slug": "lesson-2",
        "url": "https://youtu.be/eUzz6rKZGlk"
    },
    {
        "id": 134,
        "slug": "lesson-3",
        "url": "https://youtu.be/OLpC_r8bCDg"
    },
    {
        "id": 135,
        "slug": "lesson-1",
        "url": "https://youtu.be/ifM8cE-xwp4"
    },
    {
        "id": 138,
        "slug": "lesson-1",
        "url": "https://youtu.be/X-6cOn1C92Y"
    }
]

const LessonContent = () => {
	const router = useRouter()
	const context = useContext(StateContext)
	const [video, setVideo] = useState("")
    
	const [content, setContent] = useState<ILesson | null>(null)
	
	useEffect(() => {
		setVideo(Videos[Math.floor(Math.random() * Videos.length)].url)
		const fetchLessonContent = () => {
			context.lessons.get().map((lesson: ILesson) => {
				const url = lesson.slug as string
				if (router.asPath.includes(url)) {
					setContent(lesson)
				}
			})
		};

		fetchLessonContent();
	}, [context.lessons.get(), content]);

	return <>
		<Breadcrumbs />
		{content && <VideoBlock url={video} /> }
		<VocabularyBlock />
	</>
}

export default LessonContent