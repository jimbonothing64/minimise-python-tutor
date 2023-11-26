<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
	let code = '';
	let loading = false;

	const submitCode: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		loading = true;
		return async ({ result, update }) => {
			loading = false;
			update({ reset: false });
		};
	};
</script>

<section class="flex flex-col text-center px-9">
	<form method="POST" action="?/minimise" use:enhance={submitCode} class="flex flex-col">
		<input hidden name="lang" value="python3" />

		<div
			class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
		>
			<div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
				<label for="comment" class="sr-only">Your comment</label>
				<textarea
					id="comment"
					rows="16"
					class="w-full px-0 font-mono text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-offset-0 focus:ring-0 outline-none"
					bind:value={code}
					name="code"
					placeholder="Your python code..."
					required
				></textarea>
			</div>
			<div class="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
				{#if !loading}
					<button
						type="submit"
						class="inline-flex items-center py-2.5 px-4 text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
					>
						Generate link
						<svg
							class="rtl:rotate-180 w-4 h-4 ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</button>
				{:else}
					<button
						disabled
						type="button"
						class="inline-flex items-center py-2.5 px-4 text-center text-gray-900 bg-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-gray-100 hover:text-blue-700"
					>
						<svg
							aria-hidden="true"
							role="status"
							class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="#1C64F2"
							/>
						</svg>
						Generating...
					</button>{/if}
			</div>
		</div>
	</form>
	{#if form?.code && !loading}
		<div class="w-full mb-4 border border-gray-200 rounded-lg dark:border-gray-600">
			<label for="link" class="font-bold">Link:</label>
			<input id="link" bind:value={form.code.link} readonly class=" w-96" />
			<a href={form.code.link} target="_blank">Visit</a>
		</div>
	{/if}
</section>
