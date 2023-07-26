import Link from "next/link"
import Image from "next/image"
import pin from "../../../public/pin.svg"
import facebook from "../../../public/facebook.svg"
import instagram from "../../../public/instagram.svg"
import tiktok from "../../../public/tiktok.svg"
import bct from "../../../public/bct.svg"
import bct2 from "../../../public/bct-2.svg"

const ContactSection = () => {
	return <section id="contact" className="pb-10 mt-20 lg:mt-[100px] text-white border-t-[1px]">
		<div className="text-center">
			<h2 className="uppercase text-[16px] lg:text-[30px] font-semibold bg-sea -translate-y-1/2 inline-block lg:px-16 max-w-[70%] lg:max-w-none">CÔNG TY CỔ PHẦN GIÁO DỤC VÀ ĐÀO TẠO ANT EDU</h2>
		</div>
		<div className="container flex flex-wrap justify-center lg:justify-around lg:pt-20">
			<div>
				<div className="flex items-center flex-wrap justify-center md:justify-start">
					<Image src={pin} width={26} height={25} alt="location" />
					<p>Tầng 2, Sevin Office, CT1A Nam Đô Complex</p>
				</div>

				<p className="mt-4">Số 609 Trương Định, Phường Thịnh Liệt, Quận Hoàng Mai,<br /> Thành phố Hà Nội, Việt Nam</p>
				<Link href="https://www.google.com/maps/place/T%C3%B2a+Nh%C3%A0+Nam+%C4%90%C3%B4/@20.9792145,105.844598,17z/data=!4m15!1m8!3m7!1s0x3135ac43b89a863f:0x3c1be946b6a6fe49!2zNjA5IFRyxrDGoW5nIMSQ4buLbmgsIFRo4buLbmggTGnhu4d0LCBIYWkgQsOgIFRyxrBuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!3b1!8m2!3d20.9809276!4d105.8451667!16s%2Fg%2F11hknrcqvl!3m5!1s0x3135ac43979e5609:0x2c13059d68b7ab55!8m2!3d20.9794457!4d105.8449844!16s%2Fg%2F11ck75jkp5?hl=vi-VN&entry=ttu" 
					target="_blank" className="text-cyan font-semibold block mt-3 hover:underline hover:text-white">Xem bản đồ →</Link>

				<div className="flex items-center mt-5 gap-5">
					<Link href="#">
						<Image src={bct} width={118} height={45} alt="xac nhan" />
					</Link>

					<Link href="#">
						<Image src={bct2} width={118} height={45} alt="xac nhan" />
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center mt-10 lg:mt-0">
				<Link href="mailto:info@ant-edu.vn" className="text-black px-7 py-3 bg-cyan font-semibold text-center hover:opacity-90 focus:opacity-90">info@ant-edu.vn</Link>
				<div className="flex gap-3 mt-5">
					<Link className="hover:text-cyan hover:underline" href="tel:0922985555">092 298 55 55</Link> | <Link className="hover:text-cyan hover:underline" href="tel:0922985555">092 298 55 55</Link>
				</div>
				<div className="mt-8 flex gap-7">
					<Link href="#">
						<Image src={facebook} width={30} height={30} alt="facebook" />
					</Link>
					<Link href="#">
						<Image src={instagram} width={30} height={30} alt="instagram" />
					</Link>
					<Link href="#">
						<Image src={tiktok} width={30} height={30} alt="tiktok" />
					</Link>
				</div>
			</div>
		</div>
	</section>
}

export default ContactSection