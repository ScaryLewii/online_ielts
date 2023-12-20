import Image from "next/image"
import { SetStateAction } from "react"
import { ReactSVG } from "react-svg"
import greenCheck from "public/images/green-check.svg"
import { IEvent } from "@/types/types"

const EventCard = ({event, handleOpenModal, registerLive, isSuccess}: 
	{
		event: IEvent,
		handleOpenModal?: (value: SetStateAction<boolean>) => void,
		registerLive?: (id: number) => Promise<void>,
		isSuccess?: boolean
	}
) => {
	return (
		<>
		{event &&
			<article className="rounded-[16px] overflow-hidden bg-white">
				<Image className="w-full" src={event.thumbnail || "https://placehold.co/307x148"} width={307} height={148} alt={event.title} unoptimized />
				<div className="p-[20px] flex flex-col gap-[14px]">
					<h2 className="font-bold">{event.title} cùng {event.presenter}</h2>
					<div>
						<div>Ngày: <span className="font-bold">{new Date(event.startTime).toLocaleDateString("en-US")}</span></div>
						<div>Giờ: <span className="font-bold">{new Date(event.startTime).getUTCHours()}h</span></div>
					</div>
					<div dangerouslySetInnerHTML={{__html: event.summary}}></div>

					{!!handleOpenModal && !!registerLive &&
						<div className="flex items-center justify-between gap-[16px] mt-[10px]">
							<div>
								<button
									onClick={() => handleOpenModal(true)} 
									className="bg-white border-2 border-black rounded-full py-[11px] px-[22px] text-sea font-bold">
										Chi tiết
								</button>
							</div>
							<div>
								<button
									className="bg-cyan border-2 border-cyan rounded-full py-[11px] px-[22px] text-sea font-bold"
									onClick={() => registerLive}
								>
									Đăng ký ngay
								</button>
							</div>
						</div>
					}

					{isSuccess &&
						<div className="flex items-center gap-[10px] mt-[10px]">
							<ReactSVG src={greenCheck["src"]} />
							<span className="font-bold text-[#12C024]">Đăng ký thành công</span>
						</div>
					}
				</div>
			</article>
		}
		</>
	)
}

export default EventCard