import { test, expect } from '@playwright/test';

test('test page load', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await expect(page.getByRole('heading', { name: '🐜 Minimise for Python Tutor' })).toBeVisible();
	await expect(page.getByText('/5600')).toBeVisible();
});

test('test minimise', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByPlaceholder('Your python code...').click();
	await page
		.getByPlaceholder('Your python code...')
		.fill(
			'"""Hello world"""\n\n\ndef main():\n    """Hello world"""\n    print("hi" + "bye")\n\n\nmain()'
		);
	await page.getByRole('button', { name: 'Get link' }).click();
	await expect(page.getByRole('heading', { name: 'Minimised code' })).toBeVisible();
	await page.getByText('Your code was reduced by 98').click();
	await page.locator('#link').click();
	await expect(page.locator('#link')).toBeVisible();
	await page.getByRole('button', { name: 'Show Code' }).click();
	await page.getByRole('textbox', { name: 'Your python code...' }).click();
});

// test('test minimise tiny', async ({ page }) => {
// 	await page.goto('http://localhost:5173/');
// 	await page.getByPlaceholder('Your python code...').click();
// 	await page
// 		.getByPlaceholder('Your python code...')
// 		.fill(
// 			'"""Hello world"""\n\n\ndef main():\n    """Hello world"""\n    print("hi" + "bye")\n\n\nmain()'
// 		);
// 	await page.getByLabel('Tiny Indent').check();
// 	await page.getByRole('button', { name: 'Get link' }).click();
// 	await expect(page.getByRole('heading', { name: 'Minimised code' })).toBeVisible();
// 	await page.getByText('Your code was reduced by 98').click();
// 	await page.locator('#link').click();
// 	await expect(page.locator('#link')).toBeVisible();
// 	await page.getByRole('button', { name: 'Show Code' }).click();
// 	await page.getByRole('textbox', { name: 'Your python code...' }).click();
// });
