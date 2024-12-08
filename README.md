# Appagon - React Native App with Expo Router

Welcome to the Appagon repository! This guide will help you set up the project, instll dependencies, and deploy the app in either an iOS or Android simulator using Expo.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Folder Structure](#folder-structure)
5. [Additional Resources](#additional-resources)

---

## Prerequisites

Before starting, ensure you have the following tools installed on your system:

### General Requirements
- **Node.js**: Install from [Node.js official website](https://nodejs.org/).
- **Yarn Package Manager**: Install Yarn globally:
  ```bash
  npm install -g yarn
  ```
- **Git**: Ensure Git is installed to clone the repository. Install from [Git official website](https://git-scm.com/).
- **Expo CLI**: Install Expo CLI globally:
  ```bash
  npm install -g expo-cli
  ```

### For iOS Deployment
- **macOS with Xcode**:
  - Install Xcode from the Mac App Store.
  - Open Xcode, go to Preferences > Locations, and ensure the Command Line Tools are set.
  - Install CocoaPods for managing iOS dependencies:
    ```bash
    sudo gem install cocoapods
    ```
- **Expo Go App**: Download from the App Store to test the app on a physical device.

### For Android Deployment
- **Android Studio**:
  - Install Android Studio from [Android Studio official website](https://developer.android.com/studio).
  - During setup, ensure the following are installed:
    - Android SDK
    - Android SDK Platform-Tools
    - Android Emulator
  - Set up an Android Virtual Device (AVD) via Android Studio.
- **Expo Go App**: Download from the Google Play Store to test the app on a physical device.

---

## Installation

### Step 1: Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/juan-chocolon/appagon.git
cd appagon
```

### Step 2: Install Dependencies
Use Yarn to install project dependencies:
```bash
yarn install
```

---

## Running the App

### Step 1: Start the Expo Development Server
To start the Expo development server, run:
```bash
yarn start
```
This will launch the Expo Dev Tools in your browser, providing QR codes for testing on physical devices and options to launch simulators.

### Step 2: Run on iOS Simulator
1. Ensure Xcode is installed and a simulator is available.
2. In the Expo Dev Tools, click on the "Run on iOS simulator" option, or run:
   ```bash
   yarn ios
   ```

### Step 3: Run on Android Emulator
1. Ensure Android Studio is installed and an emulator is running.
2. In the Expo Dev Tools, click on the "Run on Android device/emulator" option, or run:
   ```bash
   yarn android
   ```

### Step 4: Test on Physical Devices
- Scan the QR code from the Expo Dev Tools using the Expo Go app on your device.

---

## Folder Structure

This project uses the Expo Router for routing. Below is the general structure of the repository:

```
appagon/
├── app/              # Contains the main application code and screens
├── assets/           # Static assets (images, fonts, etc.)
├── node_modules/     # Yarn dependencies
├── package.json      # Project metadata and scripts
├── yarn.lock         # Dependency lock file
├── .gitignore        # Ignored files and folders
└── README.md         # This file
```

---

## Additional Resources
- [Expo Router Documentation](https://expo.github.io/router/docs)
- [Yarn Documentation](https://yarnpkg.com/getting-started)
- [Expo CLI Documentation](https://docs.expo.dev/workflow/expo-cli/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Android Studio Setup](https://developer.android.com/studio/install)
- [Xcode Setup](https://developer.apple.com/xcode/)

---

If you encounter any issues, feel free to open an issue in the repository or consult the official documentation linked above.

