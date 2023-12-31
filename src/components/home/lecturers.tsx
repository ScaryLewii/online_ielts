import Image from "next/image"
import lecturer1 from "public/dump/lecturer-2.jpg"
import lecturer2 from "public/dump/lecturer-2.svg"

interface ILecturer {
	name: string,
	title: string,
	description: string,
	imgUrl: string
}


const LecturerData: ILecturer[] = [
	{
		name: "Ms. Linh Phương Nguyễn",
		title: "Thạc sỹ Quản trị Kinh doanh, Đại học Kymenlaakso, Phần Lan",
		imgUrl: lecturer1,
		description: `<ul>
			<li>Cử nhân Quản trị Kinh doanh, Đại học Kymenlaakso, Phần Lan</li><li>IELTS 8.5</li><li>Hơn 10 năm kinh nghiệm giảng dạy Ngoại ngữ</li><li>Tham gia các nghiên cứu khoa học đề tài cấp Tỉnh Vĩnh Phúc, Lào Cai, đề tài cấp Bộ</li>
			<li>Tham gia và phụ trách giảng dạy các chương trình liên kết đào tạo Quốc tế của Học viện Tài chính</li>
		</ul>`
	},
	{
		name: "Mr. Long Nguyễn",
		title: "",
		imgUrl: lecturer2,
		description: "<ul><li>Cử nhân Kinh tế Đầu tư, Học viện Tài chính</li><li>Hơn 03 năm Giảng dạy Ngoại ngữ</li><li>IELTS Speaking 7.5</li><li>Đã đào tạo 100 học viên với đầu ra từ 7.0 trở lên</li></ul>"
	}
]

const LecturersSection = () => {
	return <section id="lecturer" className="py-20">
		<div className="container mx-auto text-white">
			<h2 className="text-[22px] lg:text-[40px] font-semibold uppercase text-shadow-dark text-center">GIẢNG VIÊN THE REAL IELTS</h2>

			{LecturerData.map((data, index) => (
				<div key={data.name} className={`mt-16 flex flex-wrap lg:flex-nowrap gap-10 ${index%2 === 0 && "lg:flex-row-reverse"}`}>
					<div className="w-full relative lg:max-w-[50%]">
						<Image className={`max-w-[300px] md:max-w-full ${index%2 === 0 && "ml-auto"}`} src={data.imgUrl} width={725} height={481} alt={data.name} loading="lazy" />
						<h3 className={`font-bold text-[12px] text-black bg-cyan px-10 py-2 absolute inline-block xl:hidden bottom-1/4 ${index%2 === 0 ? "lg:left-0" : "right-0"}`}>{data.name}</h3>
					</div>

					<div className="lg:max-w-[50%] lg:relative flex flex-col lg:justify-end">
						<h3 className={`font-bold text-[20px] text-black bg-cyan px-10 py-5 lg:absolute bottom-full hidden xl:block lg:translate-y-24 ${index%2 === 0 ? "translate-x-1/2 right-0" : "-translate-x-1/3 left-0"}`}>{data.name}</h3>

						{data.title && <b className="text-cyan">{data.title}</b>}
						<div dangerouslySetInnerHTML={{__html: data.description}}></div>
					</div>
				</div>
			))}
		</div>
	</section>
}

export default LecturersSection