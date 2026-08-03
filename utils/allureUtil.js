

export async function attachScreenshot(page, name, testInfo) {
  if (!testInfo) {
    throw new Error('testInfo is required to attach screenshots.');
  }

  await testInfo.attach(name, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}
