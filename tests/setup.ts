/* eslint-disable import/newline-after-import,import/first */
import '@testing-library/jest-dom';
import { theme } from 'antd';
// mock indexedDB to test with dexie
// refs: https://github.com/dumbmatter/fakeIndexedDB#dexie-and-other-indexeddb-api-wrappers
import 'fake-indexeddb/auto';
import React from 'react';

if (typeof window !== 'undefined') {
  // test with canvas
  await import('vitest-canvas-mock');
} else {
  // test with polyfill crypto
  const { Crypto } = await import('@peculiar/webcrypto');

  Object.defineProperty(global, 'crypto', {
    value: new Crypto(),
    writable: true,
  });
}

// remove antd hash on test
theme.defaultConfig.hashed = false;

// 将 React 设置为全局变量，这样就不需要在每个测试文件中导入它了
(global as any).React = React;
