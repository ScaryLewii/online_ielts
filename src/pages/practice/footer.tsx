import * as Scroll from 'react-scroll';
import Image from 'next/image';
import clock from "../../../public/images/clock.svg"
import plane from "../../../public/images/plane.svg"

const QAs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

const Footer = () => {
	const CustomLink = Scroll.Link

	return <footer className="xl:absolute bottom-0 left-0 w-full bg-dark py-5 px-5 lg:px-14 text-white flex flex-wrap">
		<div className='flex flex-wrap gap-[10px] lg:basis-3/4'>
			{QAs.map((item, index) => 
				<CustomLink to="#" key={`qa-${index}`} className="inline-flex w-7 h-7 rounded-full border border-white text-sm justify-center items-center hover:bg-cyan hover:text-sea">{item}</CustomLink>
			)}
		</div>
		<div className="flex flex-col items-center flex-grow mt-5 lg:mt-0">
			<div className='flex gap-[10px] items-center mb-4'>
				<Image src={clock} width={24} height={24} alt="clock" />
				<p>07 : 12 : 00</p>
			</div>

			<button className='flex gap-[10px] py-2 px-5 border border-white rounded-md items-center hover:bg-sea'>
				<Image src={plane} width={17} height={14} alt="clock" />
				Submit
			</button>
		</div>
	</footer>
}

export default Footer
