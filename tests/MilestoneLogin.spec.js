import { test, expect } from '@playwright/test';
import { login } from '../utils/MilestoneloginUtil';

test('Login with valid credentials', async ({ page }, testInfo) => {
    await login(page, testInfo);
  
});
