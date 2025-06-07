import { test, expect } from '@playwright/test';

// Define test data
const validTrainer = {
  firstName: 'Ash',
  lastName: 'Ketchum',
};

const invalidTrainer = {
  firstName: 'A', // too short
  lastName: '123', // contains numbers
};

test.describe('Pokemon Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should display the form correctly', async ({ page }) => {
    // Check form elements are visible
    await expect(page.getByLabel('First name')).toBeVisible();
    await expect(page.getByLabel('Last name')).toBeVisible();
    await expect(page.getByText('Select your Pokemon team')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('should validate trainer name fields', async ({ page }) => {
    // Test invalid first name
    await page.getByLabel('First name').fill(invalidTrainer.firstName);
    await page.getByLabel('Last name').fill(validTrainer.lastName);
    await expect(page.getByText('First name must be 2-12 letters.')).toBeVisible();

    // Test invalid last name
    await page.getByLabel('First name').fill(validTrainer.firstName);
    await page.getByLabel('Last name').fill(invalidTrainer.lastName);
    await expect(page.getByText('Last name must be 2-12 letters.')).toBeVisible();

    // Test valid names
    await page.getByLabel('First name').fill(validTrainer.firstName);
    await page.getByLabel('Last name').fill(validTrainer.lastName);
    await expect(page.getByText('First name must be 2-12 letters.')).not.toBeVisible();
    await expect(page.getByText('Last name must be 2-12 letters.')).not.toBeVisible();
  });

  test('should allow selecting up to 4 Pokemon', async ({ page }) => {
    // Open Pokemon selector
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    
    // Select first Pokemon
    await page.getByText('Pikachu').click();
    await expect(page.getByRole('img', { name: /pikachu/i })).toBeVisible();

    // Select second Pokemon
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    await page.getByText('Eevee').click();
    await expect(page.getByRole('img', { name: /eevee/i })).toBeVisible();

    // Verify submit button is disabled with only 2 Pokemon
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

    // Select 2 more Pokemon to reach 4
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    await page.getByText('Charmander').click();
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    await page.getByText('Squirtle').click();

    // Verify submit button is enabled with 4 Pokemon
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  test('should show error when trying to select more than 4 Pokemon', async ({ page }) => {
    // Open Pokemon selector and select 4 Pokemon
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    await page.getByText('Pikachu').click();
    await page.getByText('Eevee').click();
    await page.getByText('Charmander').click();
    await page.getByText('Squirtle').click();

    // Try to select a 5th Pokemon
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    await page.getByText('Bulbasaur').click();
    
    // Verify the Pokemon list remains at 4
    const selectedPokemons = await page.locator('img').count();
    expect(selectedPokemons).toBe(4);
  });

  test('should submit the form successfully', async ({ page }) => {
    // Fill in valid trainer info
    await page.getByLabel('First name').fill(validTrainer.firstName);
    await page.getByLabel('Last name').fill(validTrainer.lastName);

    // Select 4 Pokemon
    await page.getByRole('button', { name: /select your Pokemon team/i }).click();
    await page.getByText('Pikachu').click();
    await page.getByText('Eevee').click();
    await page.getByText('Charmander').click();
    await page.getByText('Squirtle').click();

    // Submit the form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify modal is shown
    await expect(page.getByText('Congratulations,')).toBeVisible();
    await expect(page.getByText('You have successfully registered as a Pokemon Trainer!')).toBeVisible();
  });
});
