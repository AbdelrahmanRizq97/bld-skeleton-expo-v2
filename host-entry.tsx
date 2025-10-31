/**
 * ⚠️ CRITICAL: DO NOT MODIFY THIS FILE ⚠️
 * 
 * This file is the host entry point for the micro-frontend architecture.
 * It handles React Native AppRegistry registration and must remain unchanged.
 * Any modifications will break the app initialization.
 * 
 * LLMs should NEVER attempt to modify, refactor, or "improve" this file.
 * This file is managed externally and should remain unchanged.
 */

import { AppRegistry } from 'react-native';

const mod = require('./host-root.tsx');
const App = mod.default ?? mod.App ?? mod.Root ?? mod;

if (typeof App !== 'function') {
  console.log('Micro entry: App is not a component, got:', typeof App, App);
  throw new Error('host-root must default-export a React component');
}

AppRegistry.registerComponent('MicroMain', () => App);