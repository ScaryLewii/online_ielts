import { fetchData } from "@/base/base"
import AlertModal from "@/components/common/alert-modal"
import { GlobalContext } from "@/context/context"
import { IEvent } from "@/types/types"
import Image from "next/image"
import close from "public/images/close.svg"
import greenCheck from "public/images/green-check.svg"
import { useContext, useState } from "react"
import { ReactSVG } from "react-svg"

const EventCard = ({event, isSuccess}: 
	{
		event: IEvent,
		isSuccess?: boolean
	}
) => {
	const context = useContext(GlobalContext)
	const [modalOpen, setModalOpen] = useState(false)
	const [isRoomFull, setIsRoomFull] = useState(false)
	const [isRegistered, setIsRegisterd] = useState(false)

	const registerLive = async (id: number) => {
		const data = await fetchData(`live-schedules/${id}/register`, "POST", context.cookies.get())
		if (data.errors[0].code === 1) {
			setIsRoomFull(true)
			return
		}

		setIsRegisterd(true)
	}

	return (
		<>
		{event &&
			<article className="rounded-[16px] overflow-hidden bg-white">
				<Image className="w-full" src={event.thumbnail || "https://placehold.co/307x148"} width={307} height={148} alt={event.title} unoptimized />
				<div className="p-[20px] flex flex-col gap-[14px]">
					<h2 className="font-bold">{event.title} cùng {event.presenter}</h2>
					<div>
						<div>Ngày: <span className="font-bold">{new Date(event.startTime).toLocaleDateString("en-US")}</span></div>
						<div>Giờ: <span className="font-bold">{new Date(event.startTime).getHours()}h - {new Date(event.endTime).getHours()}h</span></div>
					</div>
					<div dangerouslySetInnerHTML={{__html: event.summary}}></div>

					{!isSuccess && event.maxParticipants > event.registeredCount &&
						<div className="flex flex-wrap items-center justify-between gap-[16px] mt-[10px]">
							<div>
								<button
									onClick={() => setModalOpen(true)} 
									className="bg-white border-2 border-black rounded-full py-[11px] px-[22px] text-sea font-bold">
										Chi tiết
								</button>
							</div>
							<div>
								<button
									className="bg-cyan border-2 border-cyan rounded-full py-[11px] px-[22px] text-sea font-bold"
									onClick={() => registerLive(event.id)}
								>
									Đăng ký ngay
								</button>
							</div>
						</div>
					}

					{event.maxParticipants <= event.registeredCount && !isSuccess &&
						<div className="flex items-center gap-[10px] mt-[10px]">
							<span className="font-bold text-[#EB3131]">Live hết slot đăng ký</span>
						</div>
					}

					{(isSuccess || isRegistered) &&
						<div className="flex items-center gap-[10px] mt-[10px]">
							<ReactSVG src={greenCheck["src"]} />
							<span className="font-bold text-[#12C024]">Đăng ký thành công</span>
						</div>
					}
				</div>
			</article>
		}

		{event && modalOpen && <>
			<div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70" onClick={() => setModalOpen(false)}></div>
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Image src={"https://placehold.co/889x500"} unoptimized alt="" width={889} height={500} />
				<button
					className="absolute top-[10px] right-[10px] h-[20px] w-[20px] flex justify-center items-center"
					onClick={() => setModalOpen(false)}
				>
					<ReactSVG src={close["src"]} />
				</button>

				<button
					onClick={() => {registerLive(event.id);setModalOpen(false);}} 
					className="rounded-full py-[10px] px-[22px] bg-[#12C024] absolute left-[50px] bottom-[50px]">
					Đăng ký ngay
				</button>
			</div>
		</>
		}

		{isRoomFull && <AlertModal type="ROOM_FULL" />}
		</>
	)
}

export default EventCard