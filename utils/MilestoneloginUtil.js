import { test, expect } from '@playwright/test';
import { attachScreenshot } from './allureUtil';
import properties from '../config.properties';


export const login = async (page, testInfo) => {
    await page.goto(properties.stgurl);
    await attachScreenshot(page, 'Login Page', testInfo);
    await page.locator('[id="email"]').fill(properties.email);
    await page.locator('[id="password"]').fill(properties.password);
    await page.locator('//button[@type="submit"]').click();
    await attachScreenshot(page, 'Filled Credentials', testInfo);
    // Add assertions to verify successful login
    await expect(page).not.toHaveURL(/\/login$/);
    await attachScreenshot(page, 'Dashboard Page', testInfo);
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the dashboard

};
