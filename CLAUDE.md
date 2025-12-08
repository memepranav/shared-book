# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SharedBook is a React Native mobile application built with TypeScript. The project uses React Native 0.82.1 with React 19.1.1 and is configured to run on both iOS and Android platforms.

## Development Commands

### Initial Setup
```bash
# Install Node dependencies
npm install

# For iOS: Install Ruby bundler (first time only)
bundle install

# For iOS: Install CocoaPods dependencies (required before first run and after native dependency updates)
cd ios && bundle exec pod install && cd ..
```

### Running the App
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Testing and Code Quality
```bash
# Run tests with Jest
npm test

# Run ESLint
npm run lint
```

## Architecture

### Tech Stack
- **React Native**: 0.82.1
- **React**: 19.1.1
- **TypeScript**: 5.8.3
- **Testing**: Jest 29.6.3
- **Navigation/UI**: react-native-safe-area-context for safe area handling

### Project Structure
- `App.tsx` - Main application entry point using SafeAreaProvider
- `__tests__/` - Jest test files
- `android/` - Android native code and configuration
- `ios/` - iOS native code and configuration
- `UI References/` - Design reference images (webp format) for UI implementation

### Key Patterns
- The app uses `SafeAreaProvider` from `react-native-safe-area-context` for handling device safe areas
- Color scheme detection with `useColorScheme()` for dark/light mode support
- The main app uses `@react-native/new-app-screen` as a template component

## Native Dependencies

When adding or updating native dependencies:
1. Run `npm install` to update package.json
2. For iOS: Run `cd ios && bundle exec pod install && cd ..` to update CocoaPods
3. Rebuild the app for both platforms

## iOS Development

This project uses Bundler to manage CocoaPods installation. Always use `bundle exec pod install` instead of `pod install` directly to ensure version consistency.

## UI References

The `UI References/` directory contains design mockups in webp format. These include:
- Onboarding screens
- Home page designs
- Account details pages
- Theme references

Refer to these when implementing new UI features to maintain design consistency.
