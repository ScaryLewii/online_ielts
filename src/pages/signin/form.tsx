import { observer, useObservable } from "@legendapp/state/react"
import Image from "next/image"
import emailIcon from "../../../public/images/email.svg"
import lockIcon from "../../../public/images/lock.svg"
import { useRouter } from 'next/navigation'
import { useContext } from "react"
import { signIn } from "next-auth/react"
import { StateContext } from "@/components/common/layout"
import Link from "next/link"

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
	loginRequestedData: IRequestedData,
}

const SigninForm = observer(function Component() {
	const router = useRouter()
	const context = useContext(StateContext)
	const state = useObservable({
		email: "",
		password: "",
		loginRequestedData: {
			data: null,
			errors: "",
			isSuccess: true
		},
	} as unknown as IState)

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
		{!context?.isQrScanning.get() && !context?.isLostPasswordPage.get() &&
			<div className="p-10 border border-white rounded-2xl">
				<h2 className="text-[32px] font-semibold text-center mb-10">Đăng nhập</h2>
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
						<input type="password" id="password" name="password" placeholder="Mật khẩu" required 
							className="h-12 bg-white min-w-[300px] w-full rounded-full px-12" 
							value={state.password.get()}
							onChange={e => state.password.set(e.target.value)}
						/>
						<Image src={lockIcon} width={17} height={16} alt="password" className="absolute top-1/2 -translate-y-1/2 left-5" />
					</label>

					<label className="text-white flex gap-3 mb-5 items-center justify-center relative cursor-pointer">
						<input className="absolute hidden" type="checkbox" />
						<span className="border border-white rounded-sm block w-5 h-5"></span>
						<span>Lưu mật khẩu</span>
					</label>

					<button type="submit" className="text-[20px] font-semibold bg-cyan rounded-full py-2 px-10 mx-auto block hover:opacity-90">Đăng nhập</button>

					<span className="my-5 text-white text-center block cursor-pointer" 
						onClick={() => context.isLostPasswordPage.set((v: boolean) => !v)}
					>
							Quên mật khẩu?
					</span>

					<div className="text-white text-center">
						Bạn mới tham gia Ant Edu? 
						<Link href="/signup" className="text-cyan font-semibold cursor-pointer ml-3">
							Tạo mới tài khoản
						</Link>
					</div>
				</form>
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

export default SigninForm