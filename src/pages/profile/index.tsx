import Link from "next/link"
import Image from "next/image"
import penIcon from "../../../public/images/pen.svg"
import ImageUpload from "@/components/form/image-upload"
import { useState } from "react"

interface IState {
	profileImage: File | null
}

const Profile = () => {
	const [image, setImage] = useState<File | null>(null);

	const handleImageChange = (file: File | null) => {
		setImage(file)
	};

	
	return <div className="text-white">
		<div className="flex items-center gap-3">
			<h1 className="text-xl text-cyan font-semibold">Thông tin cá nhân</h1>
			<Link href="/profile-edit" className="hover:bg-slate-400 rounded-sm">
				<Image src={penIcon} width={24} height={24} alt="edit profile" />
			</Link>
		</div>

		<div className="flex justify-between flex-wrap">
			<div className="flex flex-wrap justify-between">
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Họ và tên đệm *</p>
					<div className="py-3 px-4 rounded-lg mt-2 bg-dark">Nguyen Ngoc</div>
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Tên *</p>
					<div className="py-3 px-4 rounded-lg mt-2 bg-dark">Tran</div>
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Ngày tháng năm sinh *</p>
					<div className="py-3 px-4 rounded-lg mt-2 bg-dark">11/11/2000</div>
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Tên tài khoản/Email *</p>
					<div className="py-3 px-4 rounded-lg mt-2 bg-dark">ngoctran@gmail.com</div>
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Số điện thoại *</p>
					<div className="py-3 px-4 rounded-lg mt-2 bg-dark">0888888888</div>
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Mật khẩu *</p>
					<div className="py-3 px-4 rounded-lg mt-2 bg-dark">******</div>
				</div>
			</div>

			<div>
				<ImageUpload onImageChange={handleImageChange} />
				<h2 className="font-semibold text-[30px] mt-5">Ngoc Tran</h2>
			</div>
		</div>

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
	</div>
}

export default Profile