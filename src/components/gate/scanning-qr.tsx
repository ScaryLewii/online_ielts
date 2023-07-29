import { observer, useObservable } from "@legendapp/state/react"
import { useContext, useEffect } from "react"
import { StateContext } from "../common/layout"
import Image from "next/image"
import qr from "../../../public/images/qr.svg"
import qrwrapper from "../../../public/images/qr-wrapper.svg"

const QRBlock = observer(() => {
	const context = useContext(StateContext)

	return (
		<>
		{context?.isQrScanning.get() && !context?.isLostPasswordPage.get() && 
			<div className="p-10 border border-white rounded-2xl">
				<h2 className="text-[32px] font-semibold text-center mb-3">QR Scan</h2>
				<p className="text-grey">Quét mã QR dưới đây để đăng nhập vào tài khoản học của bạn.</p>

				<div className="relative mt-20 mb-20">
					<Image className="mx-auto" src={qr} width={190} height={190} alt="qr" />
					<Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" src={qrwrapper} width={252} height={252} alt="qr" />
				</div>

				<button className="text-cyan font-semibold mx-auto block" onClick={() => context.isQrScanning.set(false)}>Quay lại</button>
			</div>
		}

		{!context?.isQrScanning.get() && context?.isLostPasswordPage.get() && 
			<div className="p-10 border border-white rounded-2xl">
				<h2 className="text-[32px] font-semibold text-center mb-3">Quên mật khẩu?</h2>
				<p className="text-grey">Không vấn đề gì! Chỉ cần scan QR code dưới đây <br/> và làm theo hướng dẫn để đặt lại mật khẩu mới.</p>

				<div className="relative mt-20 mb-20">
					<Image className="mx-auto" src={qr} width={190} height={190} alt="qr" />
					<Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" src={qrwrapper} width={252} height={252} alt="qr" />
				</div>

				<button className="text-cyan font-semibold mx-auto block" onClick={() => context.isLostPasswordPage.set(false)}>Quay lại</button>
			</div>
		}
		</>
	)
})

export default QRBlock