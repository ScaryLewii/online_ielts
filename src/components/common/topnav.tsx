import Image from "next/image"
import bellIcon from "../../../public/images/bell.svg"

const TopNav = () => {
	return <div className="absolute top-0 w-full min-h-[50px] p-4 flex justify-between text-white z-10" style={{
		"background": "linear-gradient(0deg, rgba(3, 35, 92, 0.30) 0%, rgba(0, 183, 240, 0.60) 100%)",
	}}>
		<div></div>
		<div className="flex gap-5 items-center">
			<button className="relative w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-sea">
				<Image src={bellIcon} width={25} height={25} alt="notification" />
				<span className="flex justify-center items-center text-xs font-semibold w-4 h-4 rounded-full bg-red absolute right-[5px] top-[5px]">3</span>
			</button>

			<span className="hidden lg:block h-8 w-[1px] bg-white"></span>

			<button className="flex gap-5 items-center group">
				<h3 className="group-hover:underline">Ngoc Tran</h3>
				<Image className="rounded-full border-2 border-white group-hover:border-cyan" src="https://placehold.co/45x45" width={45} height={45} alt="profile image" unoptimized={true} />
			</button>
		</div>
	</div>
}

export default TopNav