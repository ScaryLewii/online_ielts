import Link from "next/link"
import { useEffect, useState } from "react"

export type TAlertModal = 'LOGIN' | 'ROOM_FULL'

const AlertModal = ({type, message, onClose} : {type: TAlertModal, message?: string, onClose?: () => void}) => {
	const [isShow, setIsShow] = useState(true)

	useEffect(() => {
		if(!isShow){
			onClose?.()
		}
	}, [isShow])
	return <>
		{isShow && <>
			<div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black bg-opacity-70 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full">
				<div className="absolute w-full max-w-md max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="p-6 text-center">
							<svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
							</svg>

							{type === "LOGIN" && <>
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Login session is invalid! Please login again!</h3>
								<Link href="https://ant-edu.ai/auth/login" type="button" className="text-gray-500 bg-cyan hover:opacity-60 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Login</Link>
							</>}

							{type === "ROOM_FULL" && message && <>
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
								<button onClick={() => setIsShow(false)} type="button" className="text-gray-500 bg-cyan hover:opacity-60 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
							</>}
						</div>
					</div>
				</div>
			</div>
		</>}
	</>
}

export default AlertModal