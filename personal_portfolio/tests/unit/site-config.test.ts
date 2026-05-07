import { describe, it, expect, beforeEach } from 'vitest';
import { resolveRoute, siteConfig } from '@/lib/site-config';

describe('siteConfig helper', () => {
  beforeEach(() => {
    siteConfig.basePath = '';
  });

  it('normalizes path with empty basePath', () => {
    expect(resolveRoute('/')).toBe('/');
    expect(resolveRoute('/about')).toBe('/about');
    expect(resolveRoute('about')).toBe('/about');
  });

  it('prepends basePath correctly', () => {
    siteConfig.basePath = '/test-base';
    expect(resolveRoute('/')).toBe('/test-base');
    expect(resolveRoute('/about')).toBe('/test-base/about');
    expect(resolveRoute('about')).toBe('/test-base/about');
  });

  it('avoids double-prefixing when path already includes basePath', () => {
    siteConfig.basePath = '/test-base';
    expect(resolveRoute('/test-base/about')).toBe('/test-base/about');
  });

  it('handles basePath with extra slashes', () => {
    siteConfig.basePath = '/test-base//';
    expect(resolveRoute('/')).toBe('/test-base');
    expect(resolveRoute('/about')).toBe('/test-base/about');
  });
});
