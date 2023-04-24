<script>
	import Footer from '../components/Footer.svelte';
	import Greeting from '../components/Greeting.svelte';
	import Input from '../components/Input.svelte';
	import '../styles/app.css';
</script>

<main class="w-full flex justify-center items-center flex-col gap-10 mb-20">
	<Greeting name="Download audio or video of any youtube video you want" />
	<Input />
	<Footer />
</main>
