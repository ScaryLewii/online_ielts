import { FC, useRef } from "react";
import Image from "next/image";
import playIcon from "../../../public/images/play.svg"
import { observer, useObservable } from "@legendapp/state/react"
import dynamic from 'next/dynamic';
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

interface IVideoBlock {
	video: string | undefined
}

const VideoBlock: FC<IVideoBlock> = observer(({video}): JSX.Element => {
	console.log('v',video)
	const state = useObservable({
		subtitle: subtitleData[0].text,
	})

	const playerRef = useRef<any>(null);
	const handleSeekClick = (s: any) => {
		state.subtitle.set(s.text)
		playerRef.current?.seekTo(s.time)
	}

	return (
		<>
			<div className="flex gap-5 mb-10 text-white items-start">
				<div className="w-full">
					<VideoPlayer playerRef={playerRef} video={video} />
					<div className="bg-sea-lighter h-[140px] relative">
						<p className="text-center absolute px-8 top-1/2 -translate-y-1/2">
							{state.subtitle.get()}
						</p>
					</div>
				</div>
				<div className="bg-dark-10 rounded-[10px] flex-grow overflow-hidden min-h-full">
					<h3 className="bg-light p-3 text-black font-semibold text-center">Subtitle Section</h3>
					<div className="max-h-[500px] overflow-auto">
					{subtitleData.map((s, index) => 
						<div className="relative" key={`seek-${s.time}-${index}`}>
							<label className="relative flex items-start gap-[10px] px-5 py-8 text-left cursor-pointer hover:bg-dark-15 border-l-4 border-transparent hover:border-cyan peer-checked:border-cyan" htmlFor={`seek-${s.time}-${index}`} onClick={() => handleSeekClick(s)}>
								<Image className="mt-[3px]" src={playIcon} width={20} height={20} alt="play" />
								<span>{s.text}</span>
							</label>
							<input className="absolute opacity-0 peer" type="radio" id={`seek-${s.time}-${index}`} name="seek-to-time" />
						</div>
					)}
					</div>
				</div>
			</div>
			<h2 className="text-xl font-semibold uppercase mt-8 mb-10">Latino or Hispanic? What is the difference?</h2>
		</>
	)
})

export default VideoBlock