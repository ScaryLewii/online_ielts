import Image from "next/image"
import penIcon from "../../../public/images/pen.svg"
import { observer, useObservable } from "@legendapp/state/react"
import { IProfileView } from "."

const ProfileEdit = observer(({ handleSwitchView }: IProfileView) => 
	<form>
		<div className="flex items-center gap-[285px]">
			<h1 className="text-xl text-cyan font-semibold">Thông tin cá nhân</h1>

			<div className="flex gap-3 items-center">
				<div onClick={handleSwitchView} className="py-3 px-8 cursor-pointer font-semibold border border-white rounded-lg hover:text-cyan hover:border-cyan">
					Hủy
				</div>
				<button className="py-3 px-8 bg-cyan rounded-lg hover:opacity-90 font-semibold">
					Lưu
				</button>
			</div>
		</div>

		<div className="flex flex-wrap gap-10">
			<div className="flex flex-wrap gap-10 xl:max-w-[60%]">
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Họ và tên đệm *</p>
					<input type="text" className="input input-bordered w-full max-w-xs bg-dark mt-2 border border-white" required defaultValue="Nguyen Ngoc" />
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Tên *</p>
					<input type="text" className="input input-bordered w-full max-w-xs bg-dark mt-2 border border-white" required defaultValue="Tran" />
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Ngày tháng năm sinh *</p>
					<input type="date" className="input input-bordered w-full max-w-xs bg-dark mt-2 border border-white" required defaultValue="2000-11-11" />
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Tên tài khoản/Email *</p>
					<input type="email" className="input input-bordered w-full max-w-xs bg-dark mt-2 border border-white" required defaultValue="ngoctran@gmail.com" />
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Số điện thoại *</p>
					<input type="phone" className="input input-bordered w-full max-w-xs bg-dark mt-2 border border-white" required defaultValue="0888888888" />
				</div>
				<div className="w-full max-w-xs mt-5">
					<p className="text-white font-semibold">Mật khẩu *</p>
					<input type="password" className="input input-bordered w-full max-w-xs bg-dark mt-2 border border-white" required defaultValue="1234asdf" />
				</div>
			</div>
		</div>
	</form>
)

export default ProfileEdit