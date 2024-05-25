import Image from "next/image"
import qrIcon from "../../../public/images/qr-icon.svg"
import gplus from "../../../public/images/gplus.svg"
import { useContext } from "react"
import { observer } from "@legendapp/state/react"
import { GlobalContext } from "@/context/context"

const GateCta = observer(() => {
	const context = useContext(GlobalContext)

	return <>
		{!context.isQrScanning.get() && !context.isLostPasswordPage.get() &&
			<div className="flex justify-between mt-9 gap-5">
				<button className="bg-light text-black inline-flex items-center py-2 px-4 rounded-lg gap-3 hover:opacity-90"
					onClick={() => context.isQrScanning.set((v: boolean) => !v)}
				>
					<span className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-white">
						<Image src={qrIcon} width={16} height={16} alt="qr scanning" />
					</span>
					Quét mã QR học viên
				</button>

				<button className="bg-red text-black-mb dark:text-white inline-flex items-center py-2 px-4 rounded-lg gap-3 hover:opacity-90">
					<span className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-rose-800">
						<Image src={gplus} width={16} height={16} alt="gplus" />
					</span>
					Đăng nhập với Google
				</button>
			</div>
		}
	</>
})

export default GateCta