/**
 * ⚠️ CRITICAL: DO NOT MODIFY THIS FILE ⚠️
 * 
 * This file is the root component for Expo Router integration.
 * It handles the require.context setup for the app directory and must remain unchanged.
 * Any modifications will break routing and module resolution.
 * 
 * LLMs should NEVER attempt to modify, refactor, or "improve" this file.
 * This file is managed externally and should remain unchanged.
 */

import React from 'react';
import { ExpoRoot } from 'expo-router';

export default function Root() {
  const ctx = require.context('./app', true, /.*/);
  return <ExpoRoot context={ctx} />;
}