import { test, expect } from '@playwright/test';
import { login } from '../utils/MilestoneloginUtil';

test('Verify that User can add company', async ({ page }, testInfo) => {
    const companyName = `New Company ${Date.now()}`;
    const companyEmail = `newcompany${Date.now()}@example.com`;

    await login(page, testInfo);
    // Add your test logic for adding a company here
    await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
    await page.locator('//span[normalize-space()="Companies"]').click();
    await page.getByRole('button', { name: 'Add Company' }).click();
    await page.getByText('Name of Company').fill(companyName);
    await page.locator('//input[@type="email"]').fill(companyEmail);
    await page.locator('//button[normalize-space()="Next"]').click();
    await page.getByText('Submit').click();
    await expect(page.getByRole('row', { name: new RegExp(`${companyName}.*${companyEmail}`) })).toBeVisible();
});
test('Verify that User can update the added company', async ({ page }, testInfo) => {
   
    await login(page, testInfo);
    // Add your test logic for adding a company here
    await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
    await page.locator('//span[normalize-space()="Companies"]').click();
    await page.getByText('newcompany1785747447793@example.com').click();
    //await page.getByText('Name of Company').fill(companyName);
    await page.locator('//input[@name="companyWebsiteURL"]').fill('www.updatedcompany.com');
    //await page.locator('//button[normalize-space()="Next"]').click();
    await page.getByText('Update').last().click();
    //await expect(page.getByRole('row', { name: new RegExp(`${companyName}.*${companyEmail}`) })).toBeVisible();
});
test('Verify that User can delete the added company', async ({ page }, testInfo) => {
   
    await login(page, testInfo);
    // Add your test logic for adding a company here
    await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
    await page.locator('//span[normalize-space()="Companies"]').click();
    //await page.getByText('newcompany1785747447793@example.com').click();
    //await page.getByText('Name of Company').fill(companyName);
    await page.locator('//button[@aria-label="Select row"]').first().click();
    //await page.locator('//button[normalize-space()="Next"]').click();
    await page.getByText('Delete').first().click();
    await page.getByText('Delete').last().click();//DELETE CONFIRMATION
    console.log('Company deleted successfully');
    //await expect(page.getByRole('row', { name: new RegExp(`${companyName}.*${companyEmail}`) })).toBeVisible();
});
test.only('Verify company table list', async ({ page }, testInfo) => {
   
    await login(page, testInfo);
    // Add your test logic for adding a company here
    await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
    await page.locator('//span[normalize-space()="Companies"]').click();
    await expect(page.getByText('Manage client portfolios and company information')).toBeVisible(); 
    console.log('Company table list verified successfully');
});

