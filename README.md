
# Appagon

Appagon is a React Native application designed to map user-reported outages. It leverages Expo for universal development and integrates mapping services to provide a comprehensive user experience.

## Features

- **Cross-Platform Support:** Runs on both iOS and Android devices.
- **Interactive Mapping:** Displays user-reported outages on a map.
- **State Management:** Utilizes Redux for efficient application state management.
- **Backend Integration:** Communicates with a backend to fetch and submit outage data.

## Project Structure

```plaintext
.
├── .expo/               # Expo configuration files
├── .github/ISSUE_TEMPLATE/  # Templates for issues and feature requests
├── android/             # Android-specific project files
├── app/                 # Main application source code
├── assets/              # Static assets (images, fonts, etc.)
├── ios/                 # iOS-specific project files
├── .gitignore           # Files and directories ignored by Git
├── app.json             # Expo project configuration
├── babel.config.js      # Babel configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript compiler configuration
├── yarn.lock            # Ensures consistent dependency versions
```

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- **Node.js** and **Yarn**
- **Expo CLI**, which can be installed globally using:
  ```bash
  npm install -g expo-cli
  ```

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/juan-chocolon/appagon.git
   cd appagon
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   yarn start
   ```

4. **Run the application:**
   - Open the Expo Go app on your mobile device and scan the QR code.
   - Alternatively, use simulators:
     - **iOS Simulator:** Use Xcode to open the `ios/` directory.
     - **Android Emulator:** Use Android Studio to open the `android/` directory.

## Development and Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository** and clone it to your local machine.
2. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes** and commit them with descriptive messages:
   ```bash
   git commit -m "Description of changes"
   ```
4. **Push to your branch** and open a pull request to the main repository.

### Running Simulators Locally

- **iOS Simulator:** Use Xcode to open the `ios/` directory and run the application.
- **Android Emulator:** Use Android Studio to set up and launch the app.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For issues or feature requests, please use the [GitHub Issues](https://github.com/juan-chocolon/appagon/issues) page.

---

Happy coding! 🚀
