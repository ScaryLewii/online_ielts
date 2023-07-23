import Image from "next/image";
import { useState, ChangeEvent, MouseEventHandler, useRef } from "react";
import cameraIcon from "../../../public/images/camera.svg"

interface IImageUpload {
	onImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<IImageUpload> = ({ onImageChange }) => {
	const [image, setImage] = useState<File | null>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setImage(files[0]);
			onImageChange(files[0]);
		}
	}

	const openInputFileDialog: MouseEventHandler<HTMLButtonElement> = () => {
		const inputFile = inputFileRef.current;
		if (!inputFile) return;
		inputFile.click();
	};

	return (
		<div className="relative group">
			<button onClick={openInputFileDialog}>
				<Image
					src={image ? URL.createObjectURL(image) : "https://placehold.co/150x150"}
					alt="Profile"
					width={150}
					height={150}
					className="border-[7px] border-dark rounded-full w-[150px] h-[150px] mx-auto group-hover:border-cyan"
					unoptimized={true}
				/>
				<div className="flex justify-center items-center w-[50px] h-[50px] bg-dark rounded-full
					absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[55%]
					group-hover:bg-cyan
				">
					<Image src={cameraIcon} width={20} height={20} alt="upload" />
				</div>
			</button>
			<input ref={inputFileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
		</div>
	);
};

export default ImageUpload;