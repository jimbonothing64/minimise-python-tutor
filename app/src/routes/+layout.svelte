<script lang="ts">
	import '../app.css';
</script>

<main class="text-gray-900 dark:text-white bg-white dark:bg-gray-800 pt-10">
	<section class="text-center">
		<h1
			class="mb-4 px-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			Minimise for Python Tutor
		</h1>
		<p
			class="mb-6 px-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Shorten code and generate a sharable Python Tutor link for long Python3 code. Are your code
			examples too long for Python Tutor? We minimise your code by removing comments, docscrings,
			extra spaces and replacing spaces with tabs. Paste your code below and click generate.
		</p>
	</section>
	<slot />
</main>
