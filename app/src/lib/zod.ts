import z from 'zod';
import { zfd } from 'zod-form-data';

export const codeSchema = z.object({ code: z.string(), lang: z.string(), indentation: z.string() });

export const codeResSchema = z.object({ code: z.string(), lang: z.string(), link: z.string() });

export const codeFormSchema = zfd.formData({
	code: z.string(),
	lang: z.string(),
	tinyIndent: zfd.checkbox()
});
