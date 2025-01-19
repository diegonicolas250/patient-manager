# Patient-manager

PatientApp is an application built with React Native and Expo, designed to manage patient information


### **Folder Structure**
The application is organized in a modular way to keep the code clean and scalable:

- **`components`**: Reusable components like forms, modals, and patient views.

- **`helpers`**: Helper functions that encapsulate logic.

- **`types`**: TypeScript type definitions

- **`screens`**: Main screens of the app.

- **`hooks`**: Custom hooks to manage patient data.

### Design Decisions

- **No React Navigation**  
  I avoided using React Navigation to keep the app simple, though it could be useful for more complex features like item detail screens or multiple auth stacks.

- **State Management with usePatients Hook**  
  The `usePatients` hook handles fetching and updating patient data. It manages the state of the patient list and ensures that the UI re-renders whenever the patient data changes, simplifying state management within the app.

- **Expo Image Picker**  
  I used the Expo Image Picker for selecting avatar images

## Installation

To run the app locally, follow these steps:

   ```bash
   git clone https://github.com/diegonicolas250/patient-manager.git
   cd patient-manager
   npm install
   expo start
   ```
