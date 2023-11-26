<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
	let code = '';
	const lang = 'python3';
</script>

<section class="flex flex-col text-center">
	<form
		method="POST"
		action="?/minimise"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		class="flex flex-col"
	>
		<textarea bind:value={code} name="code"></textarea>
		<input hidden name="lang" value="python3" />
		<button>Generate link</button>
	</form>
	{#if form?.code}
		{form.code.link}
	{/if}
</section>
