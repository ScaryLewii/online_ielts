import { ReactSVG } from "react-svg"
import courseIcon from "public/images/course-2.svg"
import rightArrow from "public/images/arrow.svg"
import Link from "next/link"
import { ICourse } from "@/types/types"

const CoursesSample: ICourse[] = []

interface CourseItemProps{
	item: ICourse
}

const Course = () => {
	return (
		<div className="flex gap-5 lg:gap-10 items-center mt-[40px] text-black-mb dark:text-white">
			<div className="w-[150px]">
				<ReactSVG src={courseIcon['src']} />
				<span>Khoá học</span>
			</div>

			<ul className="flex flex-col gap-3 list-none">
				{CoursesSample.map(c => <li key={c.id}><CourseItem item={c} /></li>)}
			</ul>
		</div>
	)
}

const CourseItem = ({ item }: CourseItemProps) => {
	return (
		<figure
			className="p-[10px] rounded-[10px] border bg-black-mb border-black-mb dark:border-white border-opacity-20 dark:bg-white bg-opacity-10
							text-black-mb dark:text-white flex items-center justify-between w-[570px]"
		>
			<span className="font-semibold">{item.name}</span>

			<Link href={"#"}
				className="inline-flex items-center gap-1 bg-[#32BEA6] rounded-lg py-3 px-[10px]"
			>
				<span>Xem ngay</span>
				<ReactSVG src={rightArrow['src']} />
			</Link>
		</figure>
	)
}

export default Course