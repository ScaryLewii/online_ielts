"use client"

import { useAllLivesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICourse, IEvent } from "@/types/types"
import { useObservable } from "@legendapp/state/react"
import moment from "moment"
import Link from "next/link"
import calendar from "public/images/calendar.svg"
import social from "public/images/social-network.svg"
import { useContext, useEffect, useState } from "react"
import Calendar from "react-calendar"
import Countdown from 'react-countdown'
import { ReactSVG } from "react-svg"

type ValuePiece = Date | null;
type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const RouteBox = ({isPersonal, isFuture} : {isPersonal?: boolean, isFuture?: boolean}) => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchLives, data: allLives } = useAllLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchMyLives, data: myLives } = useAllLivesQuery(context.cookies.get())

	const [allEvents, setAllEvents] = useState<IEvent[]>([])
	const [activeDate, setActiveDate] = useState<DateValue>(new Date())
	const [futureEventDate, setFutureEventDate] = useState<DateValue>(null)
	const [activeEvent, setActiveEvent] = useState<IEvent | null>(null)

	useEffect(() => {
		const handleState = () => {
			if (!isFinishFetchLives || !isFinishFetchMyLives) return

			if (isPersonal) {
				setAllEvents(myLives)
			}

			if (isFuture) {
				setAllEvents(allEvents?.filter(e => moment(e.startTime) >= moment(new Date())) || null)
			}

			if (!isPersonal && !isFuture) {
				setAllEvents(allLives)
			}

			setFutureEventDate(new Date(allEvents?.find(e => moment(e.startTime) >= moment(new Date()))?.startTime || "") || moment(new Date()))
		}
		handleState()
	}, [allLives, myLives, isFinishFetchLives, isFinishFetchMyLives])

	useEffect(() => {
		if (futureEventDate && allEvents) {
			setActiveEvent(allEvents?.find(x => moment(x.startTime).format("DD-MM-YYYY") === moment(futureEventDate.toString()).format("DD-MM-YYYY")) || null)
		}
	}, [allEvents, futureEventDate])

	return <div className="max-w-[400px]">
		{isPersonal && <h2 className="font-bold text-[24px] text-black-mb dark:text-white border-l-[7px] border-cyan pl-[13px] mb-[20px]">Timeline của bạn</h2>}
		{isFinishFetchLives &&
			<Calendar locale={"vi-VN"} className="bg-sea rounded-[10px] p-[20px] mb-[18px] border border-cyan"
				onChange={setActiveDate} value={activeDate}
				tileClassName={({ date, view }) => {
					if (allEvents?.find((x: IEvent) => moment(x.startTime).format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY"))) {
						return 'has-event'
					}
				}} 
			/>
		}

		{futureEventDate && activeEvent &&
			<div className="flex flex-col gap-[20px] border border-white rounded-[10px] bg-white bg-opacity-20 py-[16px] px-[24px]">
				<div className="flex flex-col gap-[16px]">
					<h2 className="font-bold text-[14px]">
						{activeEvent.title} cùng {activeEvent.presenter}
					</h2>
					<div className="flex items-center gap-[20px]">
						<ReactSVG src={calendar["src"]} />
						<span className="font-bold text-[14px]">{moment(activeEvent.startTime).format("DD/MM/YYYY")} - {new Date(activeEvent.startTime).getHours()}h</span>
					</div>
					<div className="flex items-center gap-[20px]">
						<ReactSVG src={social["src"]} />
						<Link href={activeEvent.joinRoomLink || activeEvent.facebookEventLink} target="_blank" className="italic text-[14px] text-cyan">{activeEvent.joinRoomLink || activeEvent.facebookEventLink || "updating..."}</Link>
					</div>
				</div>
			
				<div className="flex flex-col gap-[8px] text-center">
					<h2 className="font-bold text-[13px] text-[#FFC848]">COMING SOON...</h2>
					<Countdown 
						date={futureEventDate.toString()}
						zeroPadTime={2}
						renderer={props => <div className="flex items-center justify-center gap-[12px]">
							<div className="flex flex-col gap-[4px]"> 
								<span className="x-countdown font-bold flex justify-center items-center w-[48px] h-[48px] rounded-[8px] border border-[#0D2654] bg-gradient-to-b from-[#041A42] to-[#000D23]">{props.days}</span>
								<span>Ngày</span>
							</div>
							<div className="flex flex-col gap-[4px]"> 
								<span className="x-countdown font-bold flex justify-center items-center w-[48px] h-[48px] rounded-[8px] border border-[#0D2654] bg-gradient-to-b from-[#041A42] to-[#000D23]">{props.hours}</span>
								<span>Giờ</span>
							</div>
							<div className="flex flex-col gap-[4px]"> 
								<span className="x-countdown font-bold flex justify-center items-center w-[48px] h-[48px] rounded-[8px] border border-[#0D2654] bg-gradient-to-b from-[#041A42] to-[#000D23]">{props.minutes}</span>
								<span>Phút</span>
							</div>
						</div>}
					/>
				</div>
			</div>
		}
	</div>
}

export default RouteBox