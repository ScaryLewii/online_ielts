import { useSingleAuthorQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { IAuthor } from "@/types/types"
import { useRouter } from "next/router"
import { useContext } from "react"
import AuthorBanner from "./banner"
import Card from "./card"
import Course from "./course"
import MiddleInfo from "./middle-info"
import TopInfo from "../../components/author/top-info"
import Video from "./video"

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
	const {isReady, query} = useRouter()
	const context = useContext(GlobalContext)
	const authorId = query.author_id as string
	
	const { isFetched: isFinishFetchAuthor, data: authorData} = useSingleAuthorQuery(+authorId, context.cookies.get()) 

	if ( !isReady || !isFinishFetchAuthor) return <span className="loading loading-bars"></span>;

	return <div className="z-[2] relative pb-[80px]">
		<AuthorBanner background={authorData.cover || authorData.avatar || data.cover} />

		<div className="flex gap-20 px-20 -mt-[160px]">
			<div className="flex flex-col gap-[30px]">
				<Card name={authorData.name} avatar={authorData.avatar} introduce={authorData.introduce} />
				<Video videoSrc={authorData.introVideo} />
			</div>
			
			<div className="w-full">
				<TopInfo
					name={authorData.name} 
					address={authorData.address || ''} 
					facebook={authorData.facebook || ''} 
					instagram={authorData.instagram || ''} 
					tiktok={authorData.tiktok || ''} />
			
				<MiddleInfo description={authorData.description} quote={authorData.quote} />

				<Course />
			</div>
		</div>
	</div>
}

export default Author