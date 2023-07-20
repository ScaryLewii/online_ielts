import Image from 'next/image'

const MissionSection = () => {
	return <section id="mission" className="py-20">
		<div className="container mx-auto flex flex-wrap gap-[30px] lg:justify-around text-white">
			<Image loading="lazy" src={"https://placehold.co/689x406"} width={600} height={400} alt="some alt" unoptimized={true} />

			<div>
				<h2 className="text-[22px] lg:text-[40px] text-shadow uppercase">SỨ MỆNH - THE REAL IELTS</h2>

				<ul className="mt-10 flex flex-col gap-10">
					<li className="c-list__item">teasdasd</li>
					<li className="c-list__item">teasdasd</li>
				</ul>
			</div>
		</div>
	</section>
}

export default MissionSection