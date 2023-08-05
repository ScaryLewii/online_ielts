import * as Scroll from 'react-scroll';
import Image from 'next/image';
import clock from "../../../../public/images/clock.svg"
import plane from "../../../../public/images/plane.svg"
import { IQuestion } from '@/components/types/types';
import { nanoid } from 'nanoid';
import { FC } from 'react';

interface QuizNavContent {
	content: IQuestion[]
}

const QuizNav: FC<QuizNavContent> = ({content}) => {
	const CustomLink = Scroll.Link

	return <div className="relative w-[30%] pl-5">
		<div className="sticky top-5 right-0 border border-white rounded-lg p-4 lg:w-[280px]">
			<div className="flex gap-[10px] items-center mb-10">
				<Image src={clock} width={24} height={24} alt="clock" />
				<p>07 : 12 : 00</p>
			</div>

			<div className="flex flex-wrap gap-2 mb-10">
				{content.map((item: IQuestion, index) => 
					<CustomLink to={item.id} key={nanoid()}
						smooth={true} offset={-100} duration={500}
						className="inline-flex w-7 h-7 rounded-full border border-white text-sm justify-center items-center hover:bg-cyan hover:text-sea">
							{++index}
					</CustomLink>
				)}
			</div>

			<button className="flex gap-[10px] py-2 px-5 border border-white rounded-md items-center hover:bg-sea">
				<Image src={plane} width={17} height={14} alt="submit" />
				Submit
			</button>
		</div>
	</div>
}

export default QuizNav
