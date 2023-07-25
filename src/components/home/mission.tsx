import Image from 'next/image'
import misson from '../../../public/dump/mission.svg'

const MissionSection = () => {
	return <section id="mission" className="py-20">
		<div className="container mx-auto flex flex-wrap gap-[30px] lg:justify-around text-white">
			<Image loading="lazy" src={misson} width={600} height={400} alt="some alt" className="flex-grow" />

			<div className="lg:basis-1/2">
				<h2 className="text-[22px] lg:text-[40px] text-shadow uppercase">SỨ MỆNH - THE REAL IELTS</h2>

				<ul className="mt-10 flex flex-col gap-10">
					<li className="c-list__item">Khóa học IELTS Viết và Đọc qua video được thiết kế dành cho những học viên bị hạn chế về khoảng cách địa lý và muốn có sự chủ động trong việc lên lớp và luyện tập, giúp học viên có thể tối ưu hóa được thời gian học và luyện của bản thân với mạng Internet cùng hệ thống luyện thi ứng dụng Trí tuệ Nhân tạo được phát triển độc quyền bới Ant Edu. 
</li>
					<li className="c-list__item">Vượt qua nỗi lo về chi phí xa tầm với, bỏ qua rào cản về địa lý khiến cho việc cập nhật xu hướng đề thi chậm trễ, học viên có thể tự tin học cùng với những Giảng viên hàng đầu của Ant Edu và luyện tập trên hệ thống hiện đại và tối ưu nhất cho người học hơn bao giờ hết.
</li>
				</ul>
			</div>
		</div>
	</section>
}



export default MissionSection