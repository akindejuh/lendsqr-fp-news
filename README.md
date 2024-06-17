# FP News - Implementation Plan Documentation
 FP News is a minimalistic news application that's set up using a Bare React Native Project. This document details the steps involved in creating the application, which include the environment setup, development, Rapid REST API integration, Google Auth, project management using Notion, testing, deployment and Firebase.

## Table of Contents

* [Main Features](#Features)
* [Installation](#Installation)
* [Download the React Native APK Test App]()
* [Tech Stack](#Tech%Stack)



* [Screenshots](#Screenshots)



## Features
Below are the main features of FP News:
- Google's Authentication/Sign In
- Included the following Firebase services
* Crashlytics
* Performance
* Remote-config
* Messaging
- Middleware to log all user activities and screen change using Firebase event
- A button that throws a runtime error when pressed.
- Goggle sign in feature 
- Implemented light and dark mode feature 
- Added logout feature




## Installation
How can you install this app locally?

```sh
git clone https://github.com/gbenga2540/lendsqr-fp-news.git
cd lendsqr-fp-news
yarn install
yarn android #command to run on Android Emulator
yarn ios #command to run on iOS Simulator
```
    
## Download the apk via Firebase app tester

- [Android APK: ](https://appdistribution.firebase.dev/i/878df552558db865)

## Download the apk via google drive

-[Android APK: ](https://drive.google.com/file/d/1N6kp6NwcocgqQCCykseNG1k8PO9k5fKX/view?usp=sharing)


## Tech Stack

**Client:** Bare React-Native, Redux Toolkit, Codepush, Firebase

**Server:** RapidAPI endpoint

## Screenshots

- Login screen
![](/src/assets/images/signin.jpg)

- Signup screen
![](/src/assets/images/signup.jpg)

- News Listing screen
![](/src/assets/images/newslist.jpg)

- News Details Screen
![](/src/assets/images/newsdetail.jpg)

- Log Out 
![](/src/assets/images/logout.jpg)

