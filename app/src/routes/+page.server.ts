import type { Actions } from './$types';
import { codeFormSchema, codeResSchema } from '$lib/zod';

export const actions = {
	minimise: async ({ request }) => {
		const code = codeFormSchema.parse(await request.formData());
		const res = await fetch('http://localhost:8000/minimise/link/', {
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
