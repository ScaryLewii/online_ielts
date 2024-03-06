import Image from "next/image"
import star from "public/images/star-2.svg"
import { ReactSVG } from "react-svg"

const AuthorBanner = ({name, avatar, introduce}:
{
	name: string
	avatar: string
	introduce: string | TrustedHTML
}) => {
	return (
		<figure className="rounded-lg shadow-lg bg-white overflow-hidden text-black">
			<div className="relative h-[370px] w-[340px]">
				<Image
					className="absolute top-0 bottom-0 right-0 left-0 object-cover h-full"
					src={avatar}
					width={340}
					height={370}
					alt={name}
					unoptimized
				/>
			</div>

			<div className="flex flex-col gap-3 p-5">
				<h2 className="font-bold text-2xl text-[#0075CD]">Giới thiệu</h2>
				<div dangerouslySetInnerHTML={{__html: introduce}}></div>

				<hr className="bg-[#B7B7B7] opacity-50" />

				<div className="flex justify-between items-center">
					<p className="uppercase text-sm">Người theo dõi: </p>
					<b>12500+</b>
				</div>

				<div className="flex justify-between items-center">
					<p className="uppercase text-sm">Khóa học: </p>
					<b>2 khóa </b>
				</div>

				<div className="flex justify-between items-center">
					<p className="uppercase text-sm">đánh giá: </p>
					<b className="inline-flex items-center gap-1">
						5
						<ReactSVG src={star['src']} />
					</b>
				</div>
			</div>
		</figure>
	)
}

export default AuthorBanner