import { ReactSVG } from "react-svg"
import courseIcon from "public/images/course-2.svg"
import rightArrow from "public/images/arrow.svg"
import Link from "next/link"

const Course = () => {
	return (
		<div className="flex gap-10 items-center mt-[40px] text-white">
			<div className="w-[150px]">
				<ReactSVG src={courseIcon['src']} />
				<span>CHÂM NGÔN</span>
			</div>

			<ul className="flex flex-col gap-3 list-none">
				<li>
					<figure
						className="p-[10px] rounded-[10px] border border-white border-opacity-20 bg-white bg-opacity-10
							text-white flex items-center justify-between w-[570px]
						"
					>
						<span className="font-semibold">IELTS Courses - Advance</span>

						<Link href={"/"}
							className="inline-flex items-center gap-1 bg-[#32BEA6] rounded-lg py-3 px-[10px]"
						>
							<span>Xem ngay</span>
							<ReactSVG src={rightArrow['src']} />
						</Link>
					</figure>
				</li>

				<li>
					<figure
						className="p-[10px] rounded-[10px] border border-white border-opacity-20 bg-white bg-opacity-10
							text-white flex items-center justify-between w-[570px]
						"
					>
						<span className="font-semibold">IELTS Courses - Advance</span>

						<Link href={"/"}
							className="inline-flex items-center gap-1 bg-[#32BEA6] rounded-lg py-3 px-[10px]"
						>
							<span>Xem ngay</span>
							<ReactSVG src={rightArrow['src']} />
						</Link>
					</figure>
				</li>

				<li>
					<figure
						className="p-[10px] rounded-[10px] border border-white border-opacity-20 bg-white bg-opacity-10
							text-white flex items-center justify-between w-[570px]
						"
					>
						<span className="font-semibold">IELTS Courses - Advance</span>

						<Link href={"/"}
							className="inline-flex items-center gap-1 bg-[#32BEA6] rounded-lg py-3 px-[10px]"
						>
							<span>Xem ngay</span>
							<ReactSVG src={rightArrow['src']} />
						</Link>
					</figure>
				</li>
			</ul>
		</div>
	)
}

export default Course