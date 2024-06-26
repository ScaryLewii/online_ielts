import { fetchData } from "@/base/base"
import AlertModal from "@/components/common/alert-modal"
import { GlobalContext } from "@/context/context"
import { IEvent } from "@/types/types"
import moment from "moment"
import Image from "next/image"
import close from "public/images/close.svg"
import greenCheck from "public/images/green-check.svg"
import { Fragment, useContext, useEffect, useState } from "react"
import ReactPlayer from "react-player/lazy"
import { ReactSVG } from "react-svg"

const EventCard = ({ event, isSuccess, onRegisterSuccess, isCarouselItem }:
	{
		event: IEvent,
		isSuccess?: boolean,
		onRegisterSuccess?: () => void,
		isCarouselItem?: boolean,
	}
) => {
	const context = useContext(GlobalContext)
	const [modalOpen, setModalOpen] = useState(false)
	const [modalReviewOpen, setModalReviewOpen] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isRegistered, setIsRegisterd] = useState(false)
	const [isEnded, setIsEnded] = useState(false)
	const [isUpcoming, setIsUpcoming] = useState(false)
	const [badgeClass, setBadgeClass] = useState('')

	useEffect(() => {
    setIsEnded(Date.now() - new Date(event.endTime).getTime() > 0)
		setIsUpcoming(Date.now() - new Date(event.startTime).getTime() < 0)
		setBadgeClass(!isEnded &&!isUpcoming? 'badge-success' : isEnded? 'badge-dark' : 'badge-warning')
  }, [event.endTime, event.startTime, isEnded, isUpcoming])

	const tempVideo = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

	const registerLive = async (id: number) => {
		const data = await fetchData(`live-schedules/${id}/register`, "POST", context.cookies.get())
		if (data?.isSuccess) {
			setIsRegisterd(true)
			onRegisterSuccess?.()
		}
		else if (data.errors) {
			switch (data?.errors?.[0]?.code) {
				case 401:
					setErrorMessage("Bạn cần đăng nhập để thực hiện hành động này")
					break;
				case 1:
					setErrorMessage(data?.errors?.[0]?.message)
				default:
					break;
			}
			return
		}
	}

	const onJoinRoom = () => {
		window.open(event.joinRoomLink)
	}

	return (
		<>
			{event &&
				<article className={`rounded-[16px] overflow-hidden bg-white ${isCarouselItem && 'h-full'}`}>
					<div className="relative overflow-hidden">
						<div className="absolute z-[2] flex flex-col [&>span:first-child]:z-[2]">
							{event.liveScheduleConditions.length < 1 &&
								<span className="bg-[#12C024] text-white px-3 py-1 rounded-br-[16px]">Free</span>
							}

							{!!event.liveScheduleConditions.length &&
								event.liveScheduleConditions.map((condition, index) => (
									<Fragment key={condition.id}>
										{condition.conditionType === "" && (
											<span className="bg-[#12C024] text-white px-3 pb-1 pt-5 -mt-4 rounded-br-[16px]">Free</span>
										)}

										{condition.conditionType === "FinishSurvey" && (
											<span className="bg-[#0084FF] text-white px-3 pb-1 pt-5 -mt-4 rounded-br-[16px]">Survey</span>
										)}

										{condition.conditionType === "PayCoin" && (
											<span className="bg-[#FFBD00] text-white px-3 pb-1 pt-5 -mt-4 rounded-br-[16px]">Token</span>
										)}
									</Fragment>
								))
							}
						</div>
						<div className="pb-[56.25%]"></div>
						<Image className="w-full h-full absolute top-0 left-0" src={event.thumbnail || "https://placehold.co/307x148"} width={307} height={148} alt={event.title} unoptimized />
					</div>
					<div className="p-[20px] flex flex-col gap-[14px]">
						<h2 className="font-bold cursor-pointer" onClick={() => setModalOpen(true)}>{event.title} cùng {event.presenter}</h2>
						<div>
							<div>Ngày: <span className="font-bold">{moment(event.startTime).format("DD-MM-YYYY")}</span></div>
							<div>Giờ: <span className="font-bold">{new Date(event.startTime).getHours()}h - {new Date(event.endTime).getHours()}h</span></div>
							<div className={`badge ${badgeClass}`}>{!isEnded && !isUpcoming ? "Đang diễn ra" : isEnded ? "Đã kết thúc" : "Sắp diễn ra"}</div>
						</div>
						<div dangerouslySetInnerHTML={{ __html: event.summary }}></div>

						
						<div className="flex flex-wrap items-center justify-between gap-[16px] mt-[10px]">
							{!isEnded && <div>
								<button
									onClick={() => setModalOpen(true)}
									className="bg-white border-2 border-black rounded-full py-[11px] px-[22px] text-sea font-bold">
									Chi tiết
								</button>
							</div>}
							{(!isSuccess && event.maxParticipants > event.registeredCount && !isRegistered && !isEnded) &&
								<div>
									<button
										className="bg-cyan border-2 border-cyan rounded-full py-[11px] px-[22px] text-sea font-bold"
										onClick={() => registerLive(event.id)}
									>
										Đăng ký ngay
									</button>
								</div>
							}
						</div>
						
						{event.maxParticipants <= event.registeredCount && !isSuccess && isUpcoming &&
							<div className="flex items-center gap-[10px] mt-[10px]">
								<span className="font-bold text-[#EB3131]">Live hết slot đăng ký</span>
							</div>
						}

						{(isSuccess || isRegistered) &&
							<div>
								<div className="flex items-center gap-[10px] mt-[10px]">
									<ReactSVG src={greenCheck["src"]} />
									<span className="font-bold text-[#12C024]">Đăng ký thành công</span>
								</div>
							</div>
						}

						{
							isEnded &&
							<div className="flex justify-center items-center">
								<button
									onClick={() => setModalReviewOpen(true)}
									className="bg-white border-2 border-black rounded-full py-[11px] px-[22px] text-sea font-bold">
									Xem lại
								</button>
							</div>
						}
					</div>
				</article>
			}

			{event && modalOpen && <>
				<div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-[99]" onClick={() => setModalOpen(false)}></div>
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
					<Image src={event.infographic || event.thumbnail || "https://placehold.co/889x500"} className="absolute top-0 left-0 w-full h-full object-cover" unoptimized alt="" width={889} height={500} />

					<button
						title="Close"
						className="absolute top-[10px] right-[10px] h-[20px] w-[20px] z-20 flex justify-center items-center cursor-pointer"
						onClick={() => setModalOpen(false)}
					>
						<ReactSVG src={close["src"]} />
					</button>

					<div className="w-[889px] h-[500px] py-[40px] px-[60px] z-10 relative pr-[40%]">
						{event.liveScheduleConditions.length < 1 &&
							<span className="text-[#12C024] border border-[#12C024] rounded-[10px] p-[10px]">
								Sự kiện miễn phí
							</span>
						}

						<h2 className={`text-[28px] mt-[12px] mb-[55px]`} style={{ color: event?.decoration?.titleColor || event?.decoration?.defaultColor }}>{event.title}</h2>

						<div className={`italic text-[12px] `} style={{ color: event?.decoration?.titleColor || event?.decoration?.defaultColor }} dangerouslySetInnerHTML={{ __html: event.description }}></div>

						<div className={`flex gap-[13px] text-[16px] mt-[30px] mb-[55px]`} style={{ color: event?.decoration?.titleColor || event?.decoration?.defaultColor }}>
							<span>{new Date(event.startTime).toLocaleDateString("en-US")}</span>
							<span>|</span>
							<span>{new Date(event.startTime).getHours()}h - {new Date(event.endTime).getHours()}h</span>
							<span>|</span>
							<span>Online: {event.platform}</span>
						</div>

						{(isSuccess || isRegistered) &&
							<div className="flex items-center gap-[10px] mt-[10px]">
								<ReactSVG src={greenCheck["src"]} />
								<span className="font-bold text-[#12C024]">Đăng ký thành công</span>
								{new Date() > new Date(event.startTime) && <button
									onClick={onJoinRoom}
									className="rounded-full py-[10px] px-[22px] bg-[#12C024]">
									Vào phòng
								</button>}
							</div>
						}

						{(!isSuccess && !isRegistered) &&
							<button
								onClick={() => { registerLive(event.id); setModalOpen(false); }}
								className="rounded-full py-[10px] px-[22px] bg-[#12C024]">
								Đăng ký ngay
							</button>
						}
					</div>
				</div>
			</>
			}

			{
				event && modalReviewOpen &&
				<>
					<div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-[99]" onClick={() => setModalReviewOpen(false)}></div>
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
						<button
							title="Close"
							className="absolute top-[10px] right-[10px] h-[20px] w-[20px] z-20 flex justify-center items-center cursor-pointer"
							onClick={() => setModalReviewOpen(false)}
						>
							<ReactSVG src={close["src"]} />
						</button>
						<div className="w-[889px] h-[500px] bg-yellow">
							<ReactPlayer
								url={event.offlineLink || tempVideo}
								className="react-player absolute top-0 left-0"
								controls
								width="100%"
								height="100%"
							/>
						</div>
					</div>
				</>
			}

			{errorMessage && <AlertModal type="ROOM_FULL" message={errorMessage} onClose={() => setErrorMessage('')} />}
		</>
	)
}

export default EventCard