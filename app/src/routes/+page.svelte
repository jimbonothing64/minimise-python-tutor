<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	import toast, { Toaster } from 'svelte-french-toast';

	export let form: ActionData;

	let code = '';
	let loading = false;

	$: codeLengthURL = getURLEncodedByteCount(code);
	$: minimisedCodeLengthURL = getURLEncodedByteCount(form?.code?.code || '');

	const submitCode: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		loading = true;
		return async ({ result, update }) => {
			loading = false;
			if (result.type !== 'success') {
				toast.error('Minimisation unsuccessful. Check you are entering valid Python 3.');
			}
			update({ reset: false });
		};
	};

	const handleLinkCopy = () => {
		if (!loading && form?.code?.link) {
			navigator.clipboard.writeText(form.code.link);
			toast.success('Copied link to clipboard.');
		}
	};

	const handleCodeCopy = () => {
		if (!loading && form?.code?.code) {
			navigator.clipboard.writeText(form.code.code);
			toast.success('Copied minimised code to clipboard.');
		}
	};

	/**
	 * Get the length like Python Tutor does.
	 * The current max length is 5600 including other params.
	 * @param str code to get length of.
	 */
	const getURLEncodedByteCount = (str: string) => {
		const params = {
			code: str,
			cumulative: 'false',
			heapPrimitives: 'nevernest',
			mode: 'edit',
			origin: 'opt-frontend.js',
			py: '311',
			rawInputLstJSON: '[]',
			textReferences: 'false'
		};
		const encode = (k: string, v: string) => encodeURIComponent(k) + '=' + encodeURIComponent(v);
		const url = Object.entries(params)
			.map((el) => encode(...el))
			.join('&');
		return url.length;
	};
</script>

<Toaster />

<section class="flex flex-col text-center px-9">
	<form method="POST" action="?/minimise" use:enhance={submitCode} class="flex flex-col">
		<input hidden name="lang" value="python3" />

		<div
			class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
		>
			<div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
				<label for="code" class="sr-only">Your code</label>
				<textarea
					id="code"
					rows="16"
					class="w-full px-0 font-mono text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-offset-0 focus:ring-0 outline-none"
					bind:value={code}
					name="code"
					placeholder="Your python code..."
					required
				></textarea>
			</div>
			<div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
				<p>{codeLengthURL}/5600</p>
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
		<div
			class="flex flex-col w-full border border-gray-200 rounded-lg dark:border-gray-600 text-left p-6 gap-3"
		>
			<div class="flex justify-between">
				<h3 class="text-2xl font-bold leading-none">Minimised code</h3>
				<button
					on:click={() => handleLinkCopy()}
					type="button"
					class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
				>
					<svg
						class="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 18"
					>
						<path
							d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
						/>
					</svg>
					<span class="sr-only">Copy to clipboard</span>
				</button>
			</div>
			<div class="flex gap-5">
				<input
					id="link"
					bind:value={form.code.link}
					on:focus={() => handleLinkCopy()}
					readonly
					class=" w-96"
				/>
				<a
					href={form.code.link}
					target="_blank"
					class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center"
				>
					<svg
						class="w-[16px] h-[16px]"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 18"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
						/>
					</svg></a
				>
			</div>
			<textarea
				id="minimised_code"
				class="w-full resize-none px-0 font-mono text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-offset-0 focus:ring-0 outline-none"
				bind:value={form.code.code}
				on:focus={() => handleCodeCopy()}
				rows="16"
				readonly
				name="code"
				placeholder="Your python code..."
				required
			></textarea>
			<p>{minimisedCodeLengthURL}/5600</p>
		</div>
	{/if}
</section>
