import { observer, useObservable } from "@legendapp/state/react"
import Image from "next/image"
import emailIcon from "../../../public/images/email.svg"
import lockIcon from "../../../public/images/lock.svg"
import qrIcon from "../../../public/images/qr-icon.svg"
import qr from "../../../public/images/qr.svg"
import qrwrapper from "../../../public/images/qr-wrapper.svg"
import gplus from "../../../public/images/gplus.svg"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { getSession, signIn, getProviders } from "next-auth/react"

interface IError {
	code: number,
	message: string
}
interface IRequestedData {
	data: object,
	errors: string,
	isSuccess?: boolean
}

interface IState {
	email: string,
	password: string,
	isSaveLoginInfo: boolean,
	isLoginSuccess: boolean,
	isRegisterPage: boolean,
	isQrScanning: boolean,
	isLostPasswordPage: boolean,
	loginRequestedData: IRequestedData,
}

const LoginForm = observer(function Component() {
	const router = useRouter()
	const state = useObservable({
		email: "",
		password: "",
		isSaveLoginInfo: false,
		isLoginSuccess: false,
		isRegisterPage: false,
		isQrScanning: false,
		isLostPasswordPage: false,
		loginRequestedData: {
			data: null,
			errors: "",
			isSuccess: true
		},
	} as unknown as IState)

	useEffect(() => {
		const handleGetSession = async () => {
			const session = await getSession()
			if (session) {
				router.push('/study-route')
			}   
		}
		
		handleGetSession()
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await signIn("credentials", {
			redirect: false,
			email: state.email.get(),
			password: state.password.get()
		}).then(res => {
			if (!res?.ok) {
				state.loginRequestedData.isSuccess?.set(false)
				state.loginRequestedData.errors?.set(res?.error as string)
				return
			}

			state.loginRequestedData.isSuccess?.set(true)
			router.push('/study-route')
		})
	}

	return <div className="text-sm">
		{!state.isQrScanning.get() && !state.isLostPasswordPage.get() &&
		<div className="p-10 border border-white rounded-2xl">
			<h2 className="text-[32px] font-semibold text-center mb-10">{state.isRegisterPage.get() ? "Đăng ký" : "Đăng nhập"}</h2>
			<form onSubmit={handleSubmit} className="text-black">
				<label htmlFor="email" className="mb-5 relative block">
					<input type="text" id="email" name="email" placeholder="Email" required 
						className="h-12 bg-white min-w-[300px] w-full rounded-full px-12" autoFocus={true}
						value={state.email.get()}
						onChange={e => state.email.set(e.target.value)}
					/>
					<Image src={emailIcon} width={18} height={11} alt="email" className="absolute top-1/2 -translate-y-1/2 left-5" />
				</label>

				<label htmlFor="password" className="mb-5 relative block">
					<input type="text" id="password" name="password" placeholder="Mật khẩu" required 
						className="h-12 bg-white min-w-[300px] w-full rounded-full px-12" 
						value={state.password.get()}
						onChange={e => state.password.set(e.target.value)}
					/>
					<Image src={lockIcon} width={17} height={16} alt="password" className="absolute top-1/2 -translate-y-1/2 left-5" />
				</label>

				{!state.isRegisterPage.get() && <>
					<label className="text-white flex gap-3 mb-5 items-center justify-center relative cursor-pointer">
						<input className="absolute hidden" type="checkbox" />
						<span className="border border-white rounded-sm block w-5 h-5"></span>
						<span>Lưu mật khẩu</span>
					</label>

					<button type="submit" className="text-[20px] font-semibold bg-cyan rounded-full py-2 px-10 mx-auto block hover:opacity-90">Đăng nhập</button>

					<span className="my-5 text-white text-center block cursor-pointer" onClick={() => state.isLostPasswordPage.set(v => !v)}>Quên mật khẩu?</span>
					<div className="text-white text-center">Bạn mới tham gia Ant Edu? <span className="text-cyan font-semibold cursor-pointer" onClick={() => state.isRegisterPage.set(isRegister => !isRegister)}>Tạo mới tài khoản</span></div>
				</>}

				{state.isRegisterPage.get() && <>
					<button type="submit" className="text-[20px] font-semibold bg-cyan rounded-full py-2 px-10 mx-auto block hover:opacity-90">Đăng ký</button>
					<div className="text-white mt-5 text-center">Bạn đã là thành viên Ant Edu? <span className="text-cyan font-semibold cursor-pointer" onClick={() => state.isRegisterPage.set(isRegister => !isRegister)}>Đăng nhập</span></div>
				</>}
			</form>
		</div>
		}

		{state.isQrScanning.get() && !state.isLostPasswordPage.get() && 
			<div className="p-10 border border-white rounded-2xl">
				<h2 className="text-[32px] font-semibold text-center mb-3">QR Scan</h2>
				<p className="text-grey">Quét mã QR dưới đây để đăng nhập vào tài khoản học của bạn.</p>

				<div className="relative mt-20 mb-20">
					<Image className="mx-auto" src={qr} width={190} height={190} alt="qr" />
					<Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" src={qrwrapper} width={252} height={252} alt="qr" />
				</div>

				<button className="text-cyan font-semibold mx-auto block" onClick={() => state.isQrScanning.set(v => !v)}>Quay lại</button>
			</div>
		}

		{!state.isQrScanning.get() && state.isLostPasswordPage.get() && 
			<div className="p-10 border border-white rounded-2xl">
				<h2 className="text-[32px] font-semibold text-center mb-3">Quên mật khẩu?</h2>
				<p className="text-grey">Không vấn đề gì! Chỉ cần scan QR code dưới đây <br/> và làm theo hướng dẫn để đặt lại mật khẩu mới.</p>

				<div className="relative mt-20 mb-20">
					<Image className="mx-auto" src={qr} width={190} height={190} alt="qr" />
					<Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" src={qrwrapper} width={252} height={252} alt="qr" />
				</div>

				<button className="text-cyan font-semibold mx-auto block" onClick={() => state.isLostPasswordPage.set(v => !v)}>Quay lại</button>
			</div>
		}

		{!state.isQrScanning.get() && !state.isLostPasswordPage.get() &&
		<div className="flex justify-between mt-9 gap-5">
			<button className="bg-light text-black inline-flex items-center py-2 px-4 rounded-lg gap-3 hover:opacity-90" onClick={() => state.isQrScanning.set(v => !v)}>
				<span className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-white">
					<Image src={qrIcon} width={16} height={16} alt="qr scanning" />
				</span>
				Quét mã QR học viên
			</button>

			<button className="bg-red text-white inline-flex items-center py-2 px-4 rounded-lg gap-3 hover:opacity-90">
				<span className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-rose-800">
					<Image src={gplus} width={16} height={16} alt="gplus" />
				</span>
				Đăng nhập với Google
			</button>
		</div>
		}

		{state.loginRequestedData.get() && !state.loginRequestedData.isSuccess?.get() && 
			<div className="toast toast-top toast-end">
				<div className="alert alert-error">
					<span>{state.loginRequestedData.errors.get()}</span>
				</div>
			</div>
		}
	</div>
})

export default LoginForm