import Script from 'next/script'

function Gtag() {
	return <>
		<Script id="google-analytics">
			{`
				window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
				ga('create', 'G-LYMPK4GT6B', 'auto');
				ga('send', 'pageview');
			`}
		</Script>
		<Script src="https://www.google-analytics.com/analytics.js" />
	</>
}

export default Gtag