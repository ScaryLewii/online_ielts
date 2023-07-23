import Image from "next/image"
import penIcon from "../../../public/images/pen.svg"
import ImageUpload from "@/components/form/image-upload"
import { observer, useObservable } from "@legendapp/state/react"

interface IState {
	profileImage: File | null
}

import { IProfileView } from "."

const ProfileInfo = observer(({ handleSwitchView }: IProfileView) => {
	const state = useObservable({
		profileImage: (null),
	} as unknown as IState)

	const handleImageChange = (file: File | null) => {
		state.profileImage.set(file)
	}

	return <>
		<div className="flex items-center gap-3">
			<h1 className="text-xl text-cyan font-semibold">Thông tin cá nhân</h1>
			<button onClick={handleSwitchView} className="hover:bg-slate-400 rounded-sm">
				<Image src={penIcon} width={24} height={24} alt="edit profile" />
			</button>
		</div>

		<div className="flex flex-wrap gap-10">
			<div className="flex flex-wrap gap-10 xl:max-w-[60%]">
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

			<div className="xl:pt-10">
				<ImageUpload onImageChange={handleImageChange} />
				<h2 className="font-semibold text-[30px] mt-5">Ngoc Tran</h2>
			</div>
		</div>
	</>
})

export default ProfileInfo