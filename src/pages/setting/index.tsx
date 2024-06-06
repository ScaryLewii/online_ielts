import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"
import MoonIcon from "@/components/icons/moon";
import SunIcon from "@/components/icons/sun";
import { useTheme } from "next-themes";
import { MobileView } from "react-device-detect";

const SettingPage = () => {
	const { setTheme, resolvedTheme } = useTheme();

	return <>
	<MobileView>
		<MobileBreadcrumbs title="Settings" isSubMenu />
	</MobileView>
	
	<div className="text-black-mb dark:text-white lg:max-w-[600px] relative z-[1] p-5 xl:p-10">
		<div className="flex justify-between items-center pb-10 mb-10 border-b border-black-mb dark:border-white lg:hidden">
			<h2 className="text-xl font-semibold">Theme sáng / tối</h2>

			{resolvedTheme === "dark" &&
				<button onClick={() => setTheme('light')}><MoonIcon /></button>
			}

			{resolvedTheme === "light" &&
				<button onClick={() => setTheme('dark')}><SunIcon /></button>
			}
		</div>
		
		
		<div className="pb-10 border-b border-black-mb dark:border-white">
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
					<span>Các cập nhật mới về khóa học</span> 
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
	</>

}

export default SettingPage