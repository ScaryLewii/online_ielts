import Image from "next/image"
import certificate from "../../../public/images/certificate.svg"
import conquer from "../../../public/images/conquer.svg"
import contract from "../../../public/images/contract.svg"

const RouteBox = () => {
	return <div className="border border-white bg-dark rounded-lg p-8">
		<div className="flex gap-4 mb-10 items-start">
			<Image src={contract} width={35} height={35} alt="course" />

			<div className="font-semibold mb-14">
				<h4 className="text-cyan text-[36px] mb-2 leading-7">03</h4>
				<p>Khóa học đã đăng kí</p>
			</div>
		</div>

		<div className="flex gap-4 mb-10 items-start">
			<Image src={certificate} width={35} height={35} alt="course" />

			<div className="font-semibold mb-14">
				<h4 className="text-cyan text-[36px] mb-2 leading-7">01</h4>
				<p>Khóa học đã hoàn thành</p>
			</div>
		</div>

		<div className="flex gap-4 mb-10 items-start">
			<Image src={conquer} width={35} height={35} alt="course" />

			<div className="font-semibold">
				<h4 className="text-cyan text-[36px] mb-2 leading-7">122/465</h4>
				<p>Hoạt động đã hoàn thành</p>
			</div>
		</div>
	</div>
}

export default RouteBox