import { test } from '@playwright/test';
import { login } from '../utils/MilestoneloginUtil';
import { allureStep } from '../utils/allureUtil';




test('verify that user is able to add project', async ({ page }, testInfo) => {
   const projectName = `Test Project ${Date.now()}`;

   await login(page, testInfo);

   await allureStep(page, testInfo, 'Open projects page', async () => {
      await page.locator('span').filter({ hasText: 'Projects' }).first().click();
   });

   await allureStep(page, testInfo, 'Open add project form', async () => {
      await page.getByRole('button', { name: 'Add Project' }).click();
   });

   await allureStep(page, testInfo, 'Enter project name', async () => {
      await page.locator('[placeholder="e.g. Schoolnet Q3 Exit Study"]').fill(projectName);
   });

   await allureStep(page, testInfo, 'Select company', async () => {
      await page.getByRole('combobox', { name: 'Company' }).click();
      await page.getByRole('option', { name: 'Adani Greens' }).click();
   });

   await allureStep(page, testInfo, 'Select project type', async () => {
      await page.getByRole('combobox', { name: 'Project type' }).click();
      await page.getByRole('option', { name: 'Exit interview' }).click();
   });

   await allureStep(page, testInfo, 'Select questionnaire template', async () => {
      await page.getByRole('combobox', { name: 'Questionnaire template' }).click();
      await page.getByRole('option', {
         name: 'Employee Exit Interview - Comprehensive Template NEW'
      }).click();
   });

   await allureStep(page, testInfo, 'Continue project creation', async () => {
      await page.getByText('Continue').click();
   });

});
 
