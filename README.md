# Project Setup Guide

Welcome to the project setup guide! This document will walk you through the steps required to configure your environment using the `install.sh` script. 

## Tech Stack

This project utilizes the following technologies as defined in the `package.json`:

- **Vue.js**: A progressive JavaScript framework used for building user interfaces.
- **Nuxt.js**: A framework built on top of Vue.js that enables server-side rendering, static site generation, and more.
- **PrimeVue**: A rich set of UI components for Vue.js, used to build the user interface of the application.
- **Pinia**: A state management library for Vue.js, serving as the successor to Vuex.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Less**: A CSS preprocessor that extends CSS with dynamic behavior such as variables, mixins, and functions.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code, ensuring code quality and consistency.

These dependencies ensure that the project is structured with modern front-end practices, enabling a seamless development experience.

## Prerequisites

Before running the `install.sh` script, please ensure that you have the following installed on your machine:

- **mkcert**: A simple tool to make locally trusted development certificates.
- **nss**: Network Security Services, required by `mkcert` on macOS.

You can install these prerequisites using Homebrew:

```bash
brew install mkcert nss
```

## Running the `install.sh` Script

The `install.sh` script will guide you through setting up your project, generating SSL certificates, and optionally cleaning up template files.

### Steps to Run the Script

1. **Navigate to the Project Root Directory**:

   Open your terminal and navigate to the root directory of your project where the `install.sh` script is located:

   ```bash
   cd path/to/your/project
   ```

2. **Make the Script Executable**:

   If the script is not already executable, you can make it executable by running:

   ```bash
   chmod +x install.sh
   ```

3. **Run the Script**:

   Run the script by entering:

   ```bash
   ./install.sh
   ```

4. **Provide the Required Information**:

   The script will prompt you for the following information:
   
   - **Domain Name**: Enter the domain name you want to use (e.g., `mysite.com`).
   - **Project Name**: Enter the project name. This name will be sanitized to replace any non-alphabetic characters with dashes and reduce multiple dashes to a single dash.
   - **Lucee Admin Password**: Enter a password for the Lucee admin interface.

5. **Remove Template Files (Optional)**:

   After generating the necessary configuration files, the script will ask if you want to remove the original template files. You can choose "yes" or "no" depending on your preference.

6. **Install SSL Certificates**:

   The script will automatically generate and install local SSL certificates for your domain using `mkcert`. These certificates will be used to serve your project over HTTPS.

7. **Build the Project**:

   Once the setup is complete, you can build your project by running:

   ```bash
   make build
   ```

8. **Access Your Project**:

   After the build process, you can access your project by navigating to your domain in a web browser.

## Troubleshooting

If you encounter any issues while running the script, consider the following:

- **Bash Version**: Ensure you are running the script in a Bash shell version 4.0 or later, or use the included script that is compatible with Bash 3.2.
- **File Paths**: Double-check that all template files are in the correct directories as expected by the script.
- **Permissions**: Make sure the `install.sh` script has execute permissions (`chmod +x install.sh`).

## Additional Information

For more details about the project setup or troubleshooting, please refer to the project documentation or contact the development team.

---

Thank you for using this setup guide! We hope it helps you get up and running quickly.

