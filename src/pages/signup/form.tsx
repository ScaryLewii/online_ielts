import { observer, useObservable } from "@legendapp/state/react"
import Image from "next/image"
import emailIcon from "../../../public/images/email.svg"
import lockIcon from "../../../public/images/lock.svg"
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { useContext } from "react"
import Link from "next/link"
import { env } from "process"
import { StateContext } from "@/context/context"

interface IRequestedData {
	data: object,
	errors: string,
	isSuccess?: boolean
}

interface IState {
	email: string,
	password: string,
	signupRequestedData: IRequestedData,
}

const SignupForm = observer(function Component() {
	const router = useRouter()
	const context = useContext(StateContext)
	const state = useObservable({
		email: "",
		password: "",
		signupRequestedData: {
			data: null,
			errors: "",
			isSuccess: true
		},
	} as unknown as IState)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const payload = {
			"email": state.email.get(),
			"password": state.password.get()
		};

		const url = env.SIGNUP_API_URL || ""
		const res = await fetch(url, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		})
		
		const resData = await res.json()
		// error response => will work after API is fixed

		if (!resData.isSuccess) {
			state.signupRequestedData.isSuccess?.set(false)
			state.signupRequestedData.errors.set(resData.errors[0].message)
			return
		}

		state.signupRequestedData.isSuccess?.set(true)
		state.signupRequestedData.errors.set("")

		await signIn("credentials", {
			redirect: false,
			email: state.email.get(),
			password: state.password.get()
		}).then(() => router.push('/study-route'))
	}

	return <div className="text-sm">
		{!context.isQrScanning.get() && !context.isLostPasswordPage.get() &&
		<>
			<div className="p-10 border border-white rounded-2xl">
				<h2 className="text-[32px] font-semibold text-center mb-10">Đăng ký</h2>
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

					<button type="submit" className="text-[20px] font-semibold bg-cyan rounded-full py-2 px-10 mx-auto block hover:opacity-90">Đăng ký</button>
					<div className="text-white mt-5 text-center">
						Bạn đã là thành viên Ant Edu?
						<Link href="/signin" className="text-cyan font-semibold cursor-pointer ml-3">Đăng nhập</Link>
					</div>
				</form>
			</div>
		</>
		}

		{state.signupRequestedData.get() && !state.signupRequestedData.isSuccess?.get() && 
			<div className="toast toast-top toast-end">
				<div className="alert alert-error">
					<span>{state.signupRequestedData.errors.get()}</span>
				</div>
			</div>
		}
	</div>
})

export default SignupForm