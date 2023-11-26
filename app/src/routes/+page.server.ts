import type { Actions } from './$types';
import { codeFormSchema, codeResSchema } from '$lib/zod';
import { API_URL } from '$env/static/private';

export const actions = {
	minimise: async ({ request }) => {
		const code = codeFormSchema.parse(await request.formData());
		const res = await fetch(API_URL + 'minimise/link/', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(code)
		});
		const resCode = codeResSchema.parse(await res.json());
		return { success: true, code: resCode };
	}
} satisfies Actions;
