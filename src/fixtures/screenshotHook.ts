import { PlaywrightTestArgs, TestInfo } from '@playwright/test';

export async function screenshotAfterTest({ page }: PlaywrightTestArgs, testInfo:TestInfo) {
    try {
            await page.waitForLoadState('load');
            //await page.waitForLoadState('networkidle');
              //await page.waitForLoadState('domcontentloaded');
              const screenshot = await page.screenshot({ fullPage: true, timeout: 60000, animations:"disabled"});
              await testInfo.attach('Screenshot', {
                  body: screenshot,
                  contentType: 'image/png',
              });
        

    } catch (error) {
        console.log("Error in screenshot hook");
        console.log(error);
    }
};