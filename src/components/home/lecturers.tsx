import Image from "next/image"

interface ILecturer {
	name: string,
	title: string,
	description: string,
	imgUrl: string
}

const LecturerData: ILecturer[] = [
	{
		name: "Mr. Arkadius Kalinowski (Arek K)",
		title: "Thạc sỹ Ngôn ngữ Anh, University of Gdansk / University of Hamburg (Erasmus+)",
		imgUrl: "https://placehold.co/725x481",
		description: "<ul><li>Cử nhân Khoa học Chính trị: Công dân và Giáo dục Công dân, Angelus Silesius University of Applied Sciences</li><li>Chứng chỉ Giảng viên Quốc tế, Hellebaek Friskole / One World Foundation</li><li>Chứng chỉ TESOL về giảng dạy ngoại ngữ</li><li>Đã từng giảng dạy và làm việc nhiều dự án tại Châu Âu và Singapore, Việt Nam,...</li></ul>"
	},
	{
		name: "Mr. Long Nguyễn",
		title: "",
		imgUrl: "https://placehold.co/725x481",
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
						<Image className={`max-w-[300px] md:max-w-full ${index%2 === 0 && "ml-auto"}`} src={data.imgUrl} width={725} height={481} alt={data.name} loading="lazy" unoptimized={true} />
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