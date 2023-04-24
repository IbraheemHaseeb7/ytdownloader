<script>
	//@ts-nocheck

	// STATE VARIABLE
	let link = '';

	// SEND THE REQUEST TO API ROUTE TO DOWNLOAD THE GIVEN VIDEO
	async function handleDownload(e) {
		const temp = JSON.stringify({ link: link, type: e });
		await fetch('http://localhost:3000/download', {
			method: 'POST',
			body: temp,

			// IMPORTANT IF WORKING WITH JSON
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				// FINAL RESPONSE FROM THE SERVER
				if (res) link = '';
			});
	}
</script>

<div class="w-full flex justify-center items-center">
	<form class="w-1/3 grid grid-cols-2 grid-rows-3 max-sm:grid-cols-1 max-sm:w-3/4 max-lg:w-2/3">
		<input
			class="w-full p-2.5 col-span-3 max-sm:col-span-2 rounded-lg outline-none hover:bg-hoveringColor focus:bg-hoveringColor active:bg-hoveringColor transition-all"
			placeholder="Enter the link..."
			value={link}
			type="url"
			on:change={(e) => (link = e.target.value)}
		/>
		<button on:click={() => handleDownload('audio')} class="select-none">Download Audio</button>
		<button
			on:click={() => handleDownload('video')}
			class="select-none max-sm:row-start-3 max-sm:row-end-4">Download Video</button
		>
	</form>
</div>
