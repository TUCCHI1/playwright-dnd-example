import { test, expect } from "@playwright/test";

test("drag-and-drop test", async ({ page }) => {
  // navigating to the Ant slider component test page
  await page.goto("https://x2f9rh.csb.app/");

  // the value corresponding to the 100% of the slider
  const maxValue = 20;
  // drag-and-drop target value in parcentage
  const targetValue = 0.4; // 40%

  // retrieving the slider handle HTML element
  const sliderHandle = page.locator(".ant-slider-handle").first();
  // retrieving the slider HTML element
  const slider = page.locator(".ant-slider.ant-slider-horizontal").first();

  // getting the slider bouding box size
  const sliderBoundingBox = await slider.boundingBox();

  // performing the drag-and-drop interaction
  await sliderHandle.dragTo(sliderHandle, {
    force: true,
    targetPosition: {
      // moving the slider to the target value in %
      x: sliderBoundingBox ? sliderBoundingBox.width * targetValue : 0,
      y: 0
    }
  })

  // retrieving the input HTML element
  const input = page.locator(".ant-input-number-input").first();
  // getting the "value" HTML attribute
  const value = await input.getAttribute("value");

  // calculationg the expected value
  const expectedValue = `${maxValue * targetValue}`;

  expect(value).toEqual(expectedValue);
})