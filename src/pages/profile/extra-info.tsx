import Image from "next/image"
import penIcon from "../../../public/images/pen.svg"

const ExtraInfo = () => {
	return <>
		<div className="flex items-center gap-3 mt-14">
			<h1 className="text-xl text-cyan font-semibold">Thông tin đầu vào</h1>
			<button className="hover:bg-slate-400 rounded-sm">
				<Image src={penIcon} width={24} height={24} alt="edit profile" />
			</button>
		</div>

		<div className="w-full max-w-xs mt-5">
			<p className="text-white font-semibold">Loại bài thi bạn đang luyện tập *</p>
			<div className="py-3 px-4 rounded-lg mt-2 bg-dark">IELTS</div>
		</div>
		<div className="w-full max-w-xs mt-5">
			<p className="text-white font-semibold">Mục tiêu *</p>
			<div className="py-3 px-4 rounded-lg mt-2 bg-dark">9.0</div>
		</div>
		<div className="w-full max-w-xs mt-5">
			<p className="text-white font-semibold">Loại tài khoản *</p>
			<div className="py-3 px-4 rounded-lg mt-2 bg-dark">Student</div>
		</div>
	</>
}

export default ExtraInfo