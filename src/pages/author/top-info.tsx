import Link from "next/link"
import { ReactSVG } from "react-svg"
import facebookIcon from "public/images/facebook.svg"
import instaIcon from "public/images/insta.svg"
import tiktokIcon from "public/images/tiktok.svg"
import share from "public/images/share.svg"
import ShareIcon from "@/components/icons/share"

const TopInfo = ({
	name,
	address,
	facebook,
	instagram,
	tiktok,
}: {
	name: string
	address: string
	facebook: string
	instagram: string
	tiktok: string	
}) => {	
	return (
		<div className="text-black-mb dark:text-white">
			<h1 className="mb-3 font-bold text-2xl lg:text-5xl">{name}</h1>

			<div className="flex justify-between items-end">
				<div className="flex flex-col gap-3">
					<p>{address}</p>

					<ul className="flex gap-6 list-none">
						<li>
							<Link href={facebook || ''} target="_blank" rel="noreferrer">
								<ReactSVG src={facebookIcon['src']} />
							</Link>
						</li>
						<li>
							<Link href={instagram || ''} target="_blank" rel="noreferrer">
								<ReactSVG src={instaIcon['src']} />
							</Link>
						</li>
						<li>
							<Link href={tiktok || ''} target="_blank" rel="noreferrer">
								<ReactSVG src={tiktokIcon['src']} />
							</Link>
						</li>
					</ul>
				</div>

				<button className="font-medium text-base flex gap-2 p-3 rounded-lg border border-black-mb dark:border-white">
					<ShareIcon />
					<span>Chia sẻ</span>
				</button>
			</div>
		</div>
	)
}

export default TopInfo