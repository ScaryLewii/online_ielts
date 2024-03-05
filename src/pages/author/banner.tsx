const AuthorBanner = ({background}:
{
	background: string
}) => {
	return (
		<div className="h-[300px] w-full bg-cover bg-no-repeat"
			style={{backgroundImage: `url(${background})`}}
		></div>
	)
}

export default AuthorBanner