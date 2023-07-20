interface IMissionData {
	character: string,
	title: string,
	description: string
}

const missionData: IMissionData[] = [
	{
		character: "v",
		title: "Video learning",
		description: " - Học viên học qua video"
	},
	{
		character: "l",
		title: "Live Q&A",
		description: " - Hệ thống hỏi đáp thông qua các cuộc đối thoại ngắn với Giảng viên sau khi học lý thuyết để giải đáp các thắc mắc của bài học. Học viên có thể dễ dàng đặt lịch để kết nối đến Giảng viên và gửi trước nội dung câu hỏi"
	},
	{
		character: "i",
		title: "Interactive",
		description: " - Chuỗi seminar, workshop chữa bài hàng tuần, các buổi chia sẻ của Giảng viên, Cố vấn và KOCs/KOLs được tổ chức định kỳ để học viên có thể tham gia tương tác, học hỏi, đối thoại và áp dụng trực tiếp trên các buổi thảo luận trực tuyến này"
	},
	{
		character: "v",
		title: "View (review)",
		description: " - Tự đánh giá năng lực bằng các bài kiềm tra định kỳ ở cuối các bài học thông qua hệ thống gần 1000 bài tập được phân loại theo trình độ và các nhóm kỹ năng, chiến thuật"
	},
	{
		character: "e",
		title: "Exam",
		description: " - Sau khi học và luyện tập, học viên có thể thử thách bản thân bằng hệ thống khảo thí với AI của Ant Edu với ngân hàng đề thi được mô phỏng theo bài thi thật, và đăng ký lịch thi trực tiếp với Trung tâm Khảo thí của Ant Edu để có được chứng chỉ với mục tiêu cá nhân."
	}
]

const missionBoxStyle = {
	'border': '1px solid rgba(255, 255, 255, 0.43)',
	'background': 'rgba(105, 105, 105, 0.33)'
}

const MethodSection = () => {
	return <section id="method" className="py-20">
		<div className="container mx-auto text-white text-center">
			<h2 className="text-[22px] lg:text-[40px] text-shadow uppercase">Phương pháp học V-LIVE</h2>
			<p className="italic mt-3">Phương pháp V-LIVE giúp theo sát học viên từ đầu vào cho đến mục khảo thí đầu ra</p>
			
			<div className={`grid xl:grid-cols-5 gap-[30px] mt-20`}>
				{missionData.map((data, index) => 
					<div key={data.title} className="relative px-5 py-20 flex justify-center items-center min-h-[280px]" style={missionBoxStyle}>
						<b className="uppercase text-[20px]
									w-[50px] h-[50px] 
									inline-flex justify-center items-center 
									border border-cyan rounded-full bg-sea 
									absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
							{data.character}
						</b>
						<b className={`
								uppercase absolute bottom-0 block text-[150px] leading-[110px] 
								text-cyan opacity-[0.05]
								${index < 2 && "left-1"}
								${index > 2 && "right-1"}
								${index === 2 && "left-1/2 -translate-x-1/2"}
						`}>{data.character}</b>

						<p><b className="text-cyan">{data.title}</b>{data.description}</p>
					</div>
				)}
			</div>
		</div>
	</section>
}

export default MethodSection