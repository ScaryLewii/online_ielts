import { IAuthor } from "@/types/types"
import AuthorBanner from "./banner"
import Card from "./card"
import Video from "./video"
import TopInfo from "./top-info"
import MiddleInfo from "./middle-info"
import Course from "./course"

const data = {
	id: 271,
	name: "Ms. Hannah Vân Anh",
	slug: "Ms. Hannah Vân Anh",
	description: "<ul><li>Đại sứ thương hiệu The Real IELTS</li><li>Hot Tiktoker 130.000 followers</li></ul>",
	introduce: "<ul><li>Đại sứ thương hiệu The Real IELTS</li><li>Hot Tiktoker 130.000 followers</li><li>Hot Youtuber 50.000 subscriber</li></ul>",
	introVideo: "https://www.youtube.com/watch?v=QndrsAZK88o",
	email: "",
	phoneNumber: "",
	address: "Thanh Xuan, Hanoi",
	avatar: "https://placehold.co/600x400/000000/FFF",
	cover: "https://placehold.co/600x400",
	facebook: "",
	instagram: "",
	twitter: "",
	tiktok: "",
	featured: true,
	quote: 'asljfbasjlgbasjlg',
} as IAuthor

const Author = () => {

	return <div className="z-[2] relative pb-[80px]">
		<AuthorBanner background={data.cover} />

		<div className="flex gap-20 px-20 -mt-[160px]">
			<div className="flex flex-col gap-[30px]">
				<Card name={data.name} avatar={data.avatar} introduce={data.introduce} />
				<Video videoSrc={data.introVideo} />
			</div>
			
			<div className="w-full">
				<TopInfo name={data.name} address={data.address} facebook={data.facebook} instagram={data.instagram} tiktok={data.tiktok} />
			
				<MiddleInfo description={data.description} quote={data.quote} />

				<Course />
			</div>
		</div>
	</div>
}

export default Author