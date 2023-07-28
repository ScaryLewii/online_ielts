import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SettingPage = () => {
	const router = useRouter()
	useEffect(() => {
		const handleGetSession = async () => {
			const session = await getSession()
			if (!session) {
				router.push('/login')
			}   
		}
		
		handleGetSession()
	}, [])

	return <div className="text-white lg:max-w-[600px]">
		<div className="pb-10 border-b border-white">
			<h2 className="text-xl font-semibold mb-8">Thông báo cho tôi khi....</h2>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Tôi đã đạt được mục tiêu định kỳ</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Bài kiểm tra của tôi đã được chấm xong</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Bài kiểm tra của tôi đã được chấm xong</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Các cập nhật mới về tính năng</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
		</div>

		<div className="pt-10">
			<h2 className="text-xl font-semibold mb-8">Đồng bộ lịch học và thi của tôi với...</h2>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Google Calendar</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Microsoft Outlook</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
			<div className="form-control mb-4">
				<label className="label cursor-pointer">
					<span>Microsoft Teams</span> 
					<input type="checkbox" className="toggle toggle-cyan" />
				</label>
			</div>
		</div>
	</div>
}

export default SettingPage