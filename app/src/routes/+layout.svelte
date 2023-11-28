<script lang="ts">
	import '../app.css';
</script>

<main class="text-gray-900 dark:text-white bg-white dark:bg-gray-800 pt-10 min-h-screen">
	<section class="text-center">
		<h1
			class="mb-4 px-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			&#128028; Minimise for Python Tutor
		</h1>
		<p
			class="mb-6 px-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Are your code examples too long for Python Tutor? Shorten code and generate a sharable Python
			Tutor link for long Python3 code. We minimise your code by removing comments, docscrings and
			extra spaces. Paste your code below and click get link.
		</p>
	</section>
	<slot />
</main>

<footer class="mt-auto bg-white rounded-lg shadow m-4 dark:bg-gray-800">
	<div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
			><a href="https://github.com/jimbonothing64" target="_blank" class="hover:underline"
				>James Napier</a
			> 2023
		</span>
		<ul
			class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<li>
				<a
					href="https://github.com/jimbonothing64/minimise-python-tutor"
					target="_blank"
					class="hover:underline me-4 md:me-6">GitHub</a
				>
			</li>
			<li>
				<a
					href="https://github.com/jimbonothing64/minimise-python-tutor"
					target="_blank"
					class="hover:underline me-4 md:me-6">Help</a
				>
			</li>
		</ul>
	</div>
</footer>
