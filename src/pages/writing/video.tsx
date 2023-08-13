import { FC, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import playIcon from "../../../public/images/play.svg"
import repeatIcon from "../../../public/images/repeat.svg"
import engIcon from "../../../public/images/eng.svg"
import previousIcon from "../../../public/images/previous.svg"
import nextIcon from "../../../public/images/next.svg"
import playVideoIcon from "../../../public/images/play-video.svg"
import fullscreenIcon from "../../../public/images/full-screen.svg"
import { observer, useObservable } from "@legendapp/state/react"
import dynamic from 'next/dynamic';
import UpdateBlock from "@/components/common/update";
import { nanoid } from "nanoid";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { ILesson } from "@/components/types/types";
import { GlobalContext } from "@/context/context";
const VideoPlayer = dynamic(() => import("./videoPlayer"), {ssr: false});

const subtitleData = [
	{
		text: "English is the official language of Belize and Guyana; Dutch and Sranan Tongo are spoken in Suriname.",
		time: 5
	},
	{
		text: "It excludes countries like Brazil and others in Latin America, where the predominantly language isn't Spanish.",
		time: 10
	},
	{
		text: "English is the official language of Belize and Guyana; Dutch and Sranan Tongo are spoken in Suriname.",
		time: 15
	},
	{
		text: "And that's probably why the US government introduced the term in the 1970 Census during Richard Nixon's presidency.",
		time: 20
	},
	{
		text: "English is the official language of Belize and Guyana; Dutch and Sranan Tongo are spoken in Suriname.",
		time: 25
	},
]

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

	const state = useObservable({
		subtitle: subtitleData[0].text,
		isPlaying: false,
		lessonId: 0
	})

	useEffect(() => {
		const param = router.asPath.split("/").pop() as string
		const currentLesson = parseInt(param)
		state.lessonId.set(currentLesson)
	})

	const playerRef = useRef<any>(null);
	const handleSeekClick = (s: any) => {
		state.subtitle.set(s.text)
		playerRef.current?.seekTo(s.time)
	}

	const handleClickFullscreen = () => {
		playerRef.current && screenfull.request(playerRef.current?.wrapper)
	}

	const checkValidLesson = (lessons: ILesson[], id: number) => {
		return lessons.some(l => l.id === id)
	}

	const goToLesson = (isNext: boolean) => {
		const currentLesson = state.lessonId.get()
		const previousLesson = checkValidLesson(context.lessons.get(), currentLesson - 1) ? currentLesson - 1 : currentLesson
		const nextLesson = checkValidLesson(context.lessons.get(), currentLesson + 1) ? currentLesson + 1 : currentLesson

		if (isNext) {
			router.push("/courses/lesson/" + nextLesson)
			return
		}

		router.push("/courses/lesson/" + previousLesson)
	}

	return (
		<>
			<div className="flex gap-5 mb-10 text-white items-start">
				<div className="w-full">
					<VideoPlayer playerRef={playerRef} video={url} isPlaying={state.isPlaying.get()} lessonId={state.lessonId.get()} />
					{/* <div className="bg-sea-lighter h-[140px] relative">
						<p className="text-center absolute px-8 top-1/2 -translate-y-1/2">
							{state.subtitle.get()}
						</p>
					</div> */}
					<div className="flex justify-between items-center py-3 px-5 bg-sea-lighter mt-[4px]">
						<div className="flex gap-5">
							<button onClick={() => playerRef.current?.seekTo(0)}>
								<Image src={repeatIcon} width={24} height={24} alt="repeat" />
							</button>

							<button>
								<Image src={engIcon} width={24} height={24} alt="change language" />
							</button>
						</div>

						<div className="flex gap-5">
							<button onClick={() => goToLesson(false)}>
								<Image src={previousIcon} width={35} height={35} alt="previous" />
							</button>

							<button onClick={() => state.isPlaying.set(v => !v)}>
								<Image src={playVideoIcon} width={48} height={48} alt="play" className="rounded-full overflow-hidden" />
							</button>

							<button onClick={() => goToLesson(true)}>
								<Image src={nextIcon} width={35} height={35} alt="next" />
							</button>
						</div>

						<div>
							<button onClick={() => handleClickFullscreen()}>
								<Image src={fullscreenIcon} width={24} height={24} alt="fullscreen" />
							</button>
						</div>
					</div>
				</div>
				<div className="bg-dark-10 rounded-[10px] flex-grow overflow-hidden min-h-full">
					<h3 className="bg-light p-3 text-black font-semibold text-center">Subtitle Section</h3>
					<div className="max-h-[500px] overflow-auto">
						<UpdateBlock />
					{/* {subtitleData.map((s, index) => 
						<div className="relative" key={nanoid()}>
							<label className="relative flex items-start gap-[10px] px-5 py-8 text-left cursor-pointer hover:bg-dark-15 border-l-4 border-transparent hover:border-cyan peer-checked:border-cyan" htmlFor={nanoid()} onClick={() => handleSeekClick(s)}>
								<Image className="mt-[3px]" src={playIcon} width={20} height={20} alt="play" />
								<span>{s.text}</span>
							</label>
							<input className="absolute opacity-0 peer" type="radio" id={nanoid()} name="seek-to-time" />
						</div>
					)} */}
					</div>
				</div>
			</div>
			{/* <h2 className="text-xl font-semibold uppercase mt-8 mb-10 text-white">Latino or Hispanic? What is the difference?</h2> */}
		</>
	)
})

export default VideoBlock