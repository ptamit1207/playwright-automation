import { test, expect } from '@playwright/test';
import { login } from '../utils/MilestoneloginUtil';
import { allureStep } from '../utils/allureUtil';

test('Verify that User can add company', async ({ page }, testInfo) => {
    const companyName = `New Company ${Date.now()}`;
    const companyEmail = `newcompany${Date.now()}@example.com`;

    await login(page, testInfo);

    await allureStep(page, testInfo, 'Open companies page', async () => {
        await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
        await page.locator('//span[normalize-space()="Companies"]').click();
    });

    await allureStep(page, testInfo, 'Open add company form', async () => {
        await page.getByRole('button', { name: 'Add Company' }).click();
    });

    await allureStep(page, testInfo, 'Enter company details', async () => {
        await page.getByText('Name of Company').fill(companyName);
        await page.locator('//input[@type="email"]').fill(companyEmail);
    });

    await allureStep(page, testInfo, 'Submit company form', async () => {
        await page.locator('//button[normalize-space()="Next"]').click();
        await page.getByText('Submit').click();
    });

    await allureStep(page, testInfo, 'Verify added company is visible', async () => {
        await expect(page.getByRole('row', { name: new RegExp(`${companyName}.*${companyEmail}`) })).toBeVisible();
    });
});
test('Verify that User can update the added company', async ({ page }, testInfo) => {
   
    await login(page, testInfo);

    await allureStep(page, testInfo, 'Open companies page', async () => {
        await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
        await page.locator('//span[normalize-space()="Companies"]').click();
    });

    await allureStep(page, testInfo, 'Open company details', async () => {
        await page.getByText('newcompany1785747447793@example.com').click();
    });

    await allureStep(page, testInfo, 'Update company website URL', async () => {
        await page.locator('//input[@name="companyWebsiteURL"]').fill('www.updatedcompany.com');
    });

    await allureStep(page, testInfo, 'Save company changes', async () => {
        await page.getByText('Update').last().click();
    });
});
test('Verify that User can delete the added company', async ({ page }, testInfo) => {
   
    await login(page, testInfo);

    await allureStep(page, testInfo, 'Open companies page', async () => {
        await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
        await page.locator('//span[normalize-space()="Companies"]').click();
    });

    await allureStep(page, testInfo, 'Select company row', async () => {
        await page.locator('//button[@aria-label="Select row"]').first().click();
    });

    await allureStep(page, testInfo, 'Delete selected company', async () => {
        await page.getByText('Delete').first().click();
        await page.getByText('Delete').last().click();//DELETE CONFIRMATION
    });

    console.log('Company deleted successfully');
});
test('Verify company table list', async ({ page }, testInfo) => {
   
    await login(page, testInfo);

    await allureStep(page, testInfo, 'Open companies page', async () => {
        await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is fully loaded
        await page.locator('//span[normalize-space()="Companies"]').click();
    });

    await allureStep(page, testInfo, 'Verify company table list', async () => {
        await expect(page.getByText('Manage client portfolios and company information')).toBeVisible();
    });

    console.log('Company table list verified successfully');
});
