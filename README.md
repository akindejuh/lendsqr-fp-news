# FP News - Implementation Plan Documentation
 FP News is a minimalistic news application that's set up using a Bare React Native Project. This document details the steps involved in creating the application, which include the environment setup, development, REST API integration, Google Auth, project management using Notion, testing, and deployment with Firebase.

## Table of Contents
* [Quick Demo](#demo)
* [Main Features](#main-features)
* [Notion Breakdown](#notion-breakdown)
* [Implementation](#implementation-process)
* [Installation](#installation)
* [Download](#downloads)

## Demo
Demo Video: [Demo](https://drive.google.com/file/d/1TfhEfKXeO-hT0AU7JVnBMFwgfYZwmE-N/view?usp=sharing)

## Main Features
Below are the features of FP News:
- Firebase Remote-config for app envs
- Firebase Performance
- Firebase Messaging
- Firebase Analytics
- Firebase Crashlytics
- Google Authentication
- AppCenter CodePush
- React Navigation: Stack, Bottom Tabs
- Sharing Feature
- UserTheme: 'light' | 'dark' | 'system' mode 
- Redux for State Management
- Sign Out

## Notion BreakDown
Notion Link: [Notion](https://gbenga2540.notion.site/4a6e456c89364497b3b2b3f365e59ef6?v=855dd89badcb4d4c97dcea77a24b65b1&pvs=4)

## Implementation Process
#### Project Initialization
1. **Setting Up the Project**
   - Installed a fresh copy of a Bare React Native CLI project.
   - Performed initial cleanup and established a project structure to streamline development.
   - Wrote the backend API service and deployed it to onRender

2. **Installing Essential Packages**
   - Installed essential packages including `axios`, `redux`, `encrypted-storage`, among others. These packages are lightweight and support automatic linking.

3. **Configuration**
   - Set up configuration files in the `src/configs` directory.
   - Added necessary scripts in the `package.json` file for streamlined development and build processes.

#### Component and Screen Development
4. **Creating Modified Components**
   - Developed custom components such as screens, texts, and buttons to enhance reusability and maintainability.

5. **App Icons and Splash Screen**
   - Implemented custom app icons and splash screen for a polished user experience.

6. **Screen Development**
   - Developed key screens independently:
     - **Login**
     - **Sign Up**
     - **Profile**
     - **News Listing**
     - **News Detail**

#### Navigation and State Management
7. **Navigation and Routing**
   - Used `@react-navigation/native` for navigation.
   - Set up navigation types and routes by customizing the ReactNavigation namespace.

8. **Redux for State Management**
   - Utilized Redux for state management, handling themes, asynchronous processes for news listing, and news detail data.
   - User data management was handled by Firebase.

#### Integration and Testing
9. **Setting Up Test Accounts**
   - Created test accounts for Microsoft App Center and Firebase to facilitate development and testing.

10. **Firebase Integration**
    - Integrated Firebase for:
      - Analytics
      - Crashlytics
      - Notifications (Messaging)
      - Performance Monitoring
      - Remote Configuration

11. **Microsoft App Center Integration**
    - Used Microsoft App Center for over-the-air (OTA) updates.

#### Additional Features
12. **News Sharing Feature**
    - Added a feature for sharing news articles using the `react-native-share` package.


## Installation
```sh
# Clone the repository
git clone https://github.com/gbenga2540/lendsqr-fp-news.git

# Navigate into the folder
cd lendsqr-fp-news

# Install Packages using Yarn or npm 
yarn install

# Install iOS Pods
yarn pod:install

# Run on Android Emulator or Device
yarn android

# Run on iOS Simulator or Device
yarn ios
```
    
## Downloads
- [Firebase](https://appdistribution.firebase.dev/i/0fd480240967c6b2)
- [Google Drive](https://drive.google.com/file/d/1GgkzBWrMsNS7Gp1PjQtcDhW5-amqUQTt/view?usp=sharing)
