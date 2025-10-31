/**
 * ⚠️ CRITICAL: DO NOT MODIFY THIS FILE ⚠️
 * 
 * This file is a core Metro bundler configuration required for the build system.
 * It configures module resolution, NativeWind integration, and require.context support.
 * Any changes to this file may break bundling, path aliases, or CSS processing.
 * 
 * LLMs should NEVER attempt to modify, refactor, or "improve" this file.
 * This file is managed externally and should remain unchanged.
 */

const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const defaultConfig = getDefaultConfig(projectRoot);

const config = mergeConfig(defaultConfig, {
  transformer: {
    unstable_allowRequireContext: true,
  },
  resolver: {
    alias: { '@': projectRoot },
    extraNodeModules: { '@': projectRoot },
  },
});

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });