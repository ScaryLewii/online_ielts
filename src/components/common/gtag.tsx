import Script from 'next/script'

function Gtag() {
	return <>
		{`
			<!-- Google tag (gtag.js) -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-G37C3SSMSN"></script>
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
			
				gtag('config', 'G-G37C3SSMSN');
			</script>
		`}
	</>
}

export default Gtag