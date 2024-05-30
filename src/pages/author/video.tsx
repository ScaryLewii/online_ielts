import { ReactSVG } from "react-svg"
import youtube from "public/images/youtube.svg"
import play from "public/images/play-2.svg"
import { useState } from "react"
import Image from "next/image"
import ReactPlayer from "react-player"
import { createPortal } from "react-dom"

const Video = ({
	videoSrc
}: {
	videoSrc: string
}) => {
	const [isOpenVideo, setIsOpenVideo] = useState(false)

	return (
		<>
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<ReactSVG src={youtube['src']} />

					<span className="text-black-mb dark:text-white text-base font-semibold">Video giới thiệu</span>
				</div>

				<div
					itemType="button"
					className="relative w-full pb-[56.25%] rounded-lg overflow-hidden cursor-pointer"
					onClick={() => setIsOpenVideo(true)}
				>
					<Image
						className="absolute top-0 bottom-0 right-0 left-0 object-cover h-full"
						src={'https://placehold.co/600x400/000000/FFF'}
						width={340}
						height={370}
						alt={'video introduce'}
						unoptimized
					/>
					
					<ReactSVG src={play['src']} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				</div>
			</div>

			{isOpenVideo &&
				createPortal(
					<>
						<div className="fixed top-0 bottom-0 left-0 right-0 z-[888] bg-black opacity-80"
							onClick={() => setIsOpenVideo(false)}
						></div>
						<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-[70vw] pb-[56.25vw]">
							<ReactPlayer
								url={videoSrc}
								width="100%"
								height="100%"
								className="absolute w-full h-full top-0 left-0"
							/>
						</div>
					</>,
					document.body
				)
			}
		</>
	)
}

export default Video