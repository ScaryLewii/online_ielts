import { useLessonsQuery, useSubtitleQuery } from "@/base/query";
import { GlobalContext, SubtitleContext } from "@/context/context";
import { ILesson, ISubtitle } from "@/types/types";
import { observer, useObservable } from "@legendapp/state/react";
import { nanoid } from "nanoid";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import screenfull from "screenfull";
import engIcon from "../../../public/images/eng.svg";
import fullscreenIcon from "../../../public/images/full-screen.svg";
import nextIcon from "../../../public/images/next.svg";
import pauseVideoIcon from "../../../public/images/pause-video.svg";
import playVideoIcon from "../../../public/images/play-video.svg";
import playIcon from "../../../public/images/play.svg";
import previousIcon from "../../../public/images/previous.svg";
import repeatIcon from "../../../public/images/repeat.svg";
const VideoPlayer = dynamic(() => import("./videoPlayer"), {ssr: false});

export interface IVideo {
	id: number,
	slug: string,
	url: string
}

interface IVideoUrl {
	url: string
}

const VideoBlock = observer(({url}: IVideoUrl): JSX.Element => {
	const router = useRouter()
	const context = useContext(GlobalContext)
	
	const courseId = router.query.course_id as string
	const lessons = useLessonsQuery(+courseId, context.cookies.get()).data as ILesson[]

	const lessonId = router.query.lesson_id as string
	const subtitles = useSubtitleQuery(+lessonId, context.cookies.get()).data as ISubtitle[]

	const state = useObservable({
		isPlaying: false,
		lessonId: 0
	})

	const subtitleState = useObservable("")

	state.lessonId.set(+lessonId)

	const playerRef = useRef<any>(null);
	const handleSeekClick = (s: ISubtitle) => {
		subtitleState.set(s.content)
		playerRef.current?.seekTo(s.startAt)
	}

	const handleClickFullscreen = () => {
		playerRef.current && screenfull.request(playerRef.current?.wrapper)
	}

	const checkValidLesson = (lessons: ILesson[], id: number) => {
		return lessons.some(l => l.id === id)
	}

	const goToLesson = (isNext: boolean) => {
		const currentLesson = state.lessonId.get()
		const previousLesson = checkValidLesson(lessons, currentLesson - 1) ? currentLesson - 1 : currentLesson
		const nextLesson = checkValidLesson(lessons, currentLesson + 1) ? currentLesson + 1 : currentLesson

		if (isNext) {
			router.push(`/courses/${courseId}/lessons/${nextLesson}`)
			return
		}
		
		router.push(`/courses/${courseId}/lessons/${previousLesson}`)
	}

	return (
		<>
			<div className="flex flex-col xl:flex-row gap-5 mb-10 text-white items-start">
				<div className="w-full">
					<SubtitleContext.Provider value={subtitleState}>
						<VideoPlayer playerRef={playerRef} video={url} isPlaying={state.isPlaying.get()} lessonId={state.lessonId.get()} />
						<div className="bg-sea-lighter h-[140px] relative">
							<p className="absolute px-8 top-1/2 -translate-y-1/2 text-center w-full">
								{subtitleState.get() || "..."}
							</p>
						</div>
					</SubtitleContext.Provider>

					<div className="flex justify-between items-center py-3 px-5 bg-sea-lighter mt-[4px] relative z-[1]">
						<div className="flex gap-5">
							<button title="repeat" onClick={() => playerRef.current?.seekTo(0)}>
								<Image src={repeatIcon} width={24} height={24} alt="repeat" />
							</button>

							<button title="change language">
								<Image src={engIcon} width={24} height={24} alt="change language" />
							</button>
						</div>

						<div className="flex gap-5">
							<button title="previous" onClick={() => goToLesson(false)}>
								<Image src={previousIcon} width={35} height={35} alt="previous" />
							</button>

							<button onClick={() => state.isPlaying.set(v => !v)} 
								className="rounded-full w-[48px] h-[48px] inline-flex justify-center items-center bg-white">
								{!state.isPlaying.get() &&
									<Image src={playVideoIcon} width={30} height={30} alt="play" className="rounded-full overflow-hidden" />
								}

								{state.isPlaying.get() &&
									<Image src={pauseVideoIcon} width={30} height={30} alt="play" className="rounded-full overflow-hidden" />
								}
							</button>

							<button title="next" onClick={() => goToLesson(true)}>
								<Image src={nextIcon} width={35} height={35} alt="next" />
							</button>
						</div>

						<div>
							<button title="fullscreen" onClick={() => handleClickFullscreen()}>
								<Image src={fullscreenIcon} width={24} height={24} alt="fullscreen" />
							</button>
						</div>
					</div>
				</div>
				<div className="bg-dark-10 rounded-[10px] flex-grow overflow-hidden min-h-full w-full xl:w-[40%]">
					<h3 className="bg-light p-3 text-black font-semibold text-center">Subtitle Section</h3>
					<div className="overflow-auto max-h-[60vh]">
						{subtitles?.map(s => 
							<div className="relative" key={nanoid()}>
								<label className="relative flex items-start gap-[10px] px-5 py-8 text-left cursor-pointer hover:bg-dark-15 border-l-4 border-transparent hover:border-cyan peer-checked:border-cyan" htmlFor={nanoid()} onClick={() => handleSeekClick(s)}>
									<Image className="mt-[3px]" src={playIcon} width={20} height={20} alt="play" />
									<span>{s.content}</span>
								</label>
								<input className="absolute opacity-0 peer" type="radio" id={nanoid()} name="seek-to-time" />
							</div>
						)}
					</div>
				</div>
			</div>
			{/* <h2 className="text-xl font-semibold uppercase mt-8 mb-10 text-white">Latino or Hispanic? What is the difference?</h2> */}
		</>
	)
})

export default VideoBlock