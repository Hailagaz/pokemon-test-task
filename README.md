# Pokemon Trainer Form

## Project Overview
This project is a Pokemon Trainer Form built for the **Luna Edge technical interview**. It allows users to enter their **first name** and **last name**, select a **team of 4 Pokemon**, and submit the form to display their chosen Pokemon in a **modal**.

## Tech Stack
- **React** (with TypeScript)  
- **Axios** (for API requests)  
- **Tailwind CSS** (for styling)  
- **React Hook Form** (for validation)  
- **Storybook** (for UI documentation & testing)  
- **Vite** (as the build tool)  

## Running the App & Storybook
- **Run the application:**
  ```sh
  yarn vite
  ```
- **Run Storybook:**
  ```sh
  yarn storybook
  ```
- **Build the project:**
  ```sh
  yarn build
  ```

## Features & Functionality
- **Name Input Validation:** First and last names must be **2-12 characters**, containing only **A-Z/a-z**.
- **Pokemon Selection:** Users can **search & select exactly 4 Pokemon** using a dropdown.
- **Live Validation:** Invalid inputs display **error messages**.
- **Modal Display:** After submission, a modal shows the **selected Pokemon team**.
- **Storybook UI Documentation:** Components are documented & visually tested.

## Validation & Testing
- **Form validation** is handled using **React Hook Form**.
- **Error messages** appear for incorrect input.
- **Storybook** provides a UI testing environment.

## Contributors
- **Oleh Cherniavskyi** ([github](https://github.com/Hailagaz))

### Test
- Test github desktop