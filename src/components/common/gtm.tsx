const GTM = () => {
	const script = `<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-LYMPK4GT6B"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'G-LYMPK4GT6B');
	</script>`;
	return <div dangerouslySetInnerHTML={{__html: script}}></div>
}

export default GTM