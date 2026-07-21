import { test, expect } from "@playwright/test";

test.describe("Primary Chat Flow", () => {
  test("allows user to navigate and test the interactive motion button", async ({ page }) => {
    // API Call Mocking - Real endpoint çağırılmır
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/plain",
        body: "Hello! This is a mocked AI response.",
      });
    });

    await page.goto("/button-demo");

    // Interactive button check
    const sendButton = page.getByRole("button", { name: /send message/i });
    await expect(sendButton).toBeVisible();

    await sendButton.click();
    
    // Check loading or success transition
    await expect(page.getByRole("button")).toBeVisible();
  });
});