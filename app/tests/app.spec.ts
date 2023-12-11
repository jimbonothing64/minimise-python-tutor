import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:5173/';

test('test page load', async ({ page }) => {
	await page.goto(BASE_URL);
	await expect(page.getByRole('heading', { name: '🐜 Minimise for Python Tutor' })).toBeVisible();
	await expect(page.getByText('/5600')).toBeVisible();
});

test('test minimise', async ({ page }) => {
	await page.goto(BASE_URL);
	await page.getByPlaceholder('Your python code...').click();
	await page
		.getByPlaceholder('Your python code...')
		.fill(
			'"""Hello world"""\n\n\ndef main():\n    """Hello world"""\n    print("hi" + "bye")\n\n\nmain()'
		);
	await page.getByRole('button', { name: 'Get link' }).click();
	await expect(page.getByRole('heading', { name: 'Minimised code' })).toBeVisible();
	await expect(page.getByText('Your code was reduced by 98')).toBeVisible();
	await page.locator('#link').click();
	await page.getByRole('button', { name: 'Show Code' }).click();
	await expect(page.locator('#link')).toHaveValue(
		`https://pythontutor.com/visualize.html#cumulative=false&heapPrimitives=nevernest&mode=edit&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false&code=def+main%28%29%3A%0A++++print%28%22hi%22%2B%22bye%22%29%0Amain%28%29`
	);
	await expect(page.locator('#minimised_code')).toHaveValue(
		`def main():\n    print("hi"+"bye")\nmain()`
	);
});

test('test minimise tiny', async ({ page }) => {
	await page.goto(BASE_URL);
	await page.getByPlaceholder('Your python code...').click();
	await page
		.getByPlaceholder('Your python code...')
		.fill(
			'"""Hello world"""\n\n\ndef main():\n    """Hello world"""\n    print("hi" + "bye")\n\n\nmain()'
		);
	await page.getByLabel('Tiny Indent').check();
	await page.getByRole('button', { name: 'Get link' }).click();
	await expect(page.getByRole('heading', { name: 'Minimised code' })).toBeVisible();
	await expect(page.getByText('Your code was reduced by 107')).toBeVisible();
	await page.locator('#link').click();
	await page.getByRole('button', { name: 'Show Code' }).click();
	await expect(page.locator('#link')).toHaveValue(
		`https://pythontutor.com/visualize.html#cumulative=false&heapPrimitives=nevernest&mode=edit&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false&code=def+main%28%29%3A%0A+print%28%22hi%22%2B%22bye%22%29%0Amain%28%29`
	);
	await expect(page.locator('#minimised_code')).toHaveValue(
		`def main():\n print("hi"+"bye")\nmain()`
	);
});
