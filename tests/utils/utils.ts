import { Locator, Page } from "@playwright/test";

export async function dragAndDrop(
  page: Page,
  dragLocator: Locator,
  dropLocator: Locator,
  targetPosition?: { x: number;  y: number }
) {
  const dragBoundingBox = await dragLocator.boundingBox();
  const dropBoundingBox = await dropLocator.boundingBox();

  // moving the mouse to the center of the drag HTML element
  dragBoundingBox && await page.mouse.move(dragBoundingBox.x + dragBoundingBox.width / 2, dragBoundingBox.y + dragBoundingBox.height / 2);

  // activating the drag action
  await page.mouse.down();

  // if targetPosition is undefined, defining the center of the
  // drop HTML element as the target position
  const targetX = targetPosition?.x || dragBoundingBox && dragBoundingBox.x + dragBoundingBox.width / 2
  const targetY = targetPosition?.y || dropBoundingBox && dropBoundingBox.y + dropBoundingBox.height / 2

  // moving the mouse to the (targetX, targetY) coordinates of the
  // drop element
  targetX && targetY && await page.mouse.move(targetX, targetY);

  // releasing the mouse and terminating the drop option
  await page.mouse.up();
}