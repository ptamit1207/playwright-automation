import { allure } from 'allure-playwright';

export async function attachScreenshot(page, name, testInfo) {
  if (!testInfo) {
    throw new Error('testInfo is required to attach screenshots.');
  }

  await testInfo.attach(name, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}

export async function allureStep(page, testInfo, name, action) {
  return allure.step(name, async () => {
    try {
      const result = await action();
      await attachScreenshot(page, name, testInfo);
      return result;
    } catch (error) {
      await attachScreenshot(page, `${name} - failed`, testInfo).catch(() => {});
      throw error;
    }
  });
}
