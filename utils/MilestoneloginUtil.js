import { expect } from '@playwright/test';
import { allureStep } from './allureUtil';
import properties from '../config.properties';


export const login = async (page, testInfo) => {
    await allureStep(page, testInfo, 'Open login page', async () => {
        await page.goto(properties.stgurl);
    });

    await allureStep(page, testInfo, 'Enter login credentials', async () => {
        await page.locator('[id="email"]').fill(properties.email);
        await page.locator('[id="password"]').fill(properties.password);
    });

    await allureStep(page, testInfo, 'Submit login form', async () => {
        await page.locator('//button[@type="submit"]').click();
        await expect(page).not.toHaveURL(/\/login$/);
    });

    await allureStep(page, testInfo, 'Verify dashboard page', async () => {
        await page.waitForTimeout(5000); // Wait for 5 seconds to observe the dashboard
    });

};


