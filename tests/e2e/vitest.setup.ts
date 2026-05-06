import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import {
  mockFormatElevationStyle,
  mockGetCurrentInstance,
  mockGetCurrentInstanceName,
  mockIsCssColor,
  mockIsParsableColor,
  mockParseColor,
  mockGetForeground,
  mockConvertToUnit,
  mockToKebabCase,
  resetAllMocks
} from './fixtures'

// Mock du module utils - IMPORTANT: utiliser le même chemin que dans vos imports
vi.mock('@origam/utils', async (importOriginal) => {
  const actual = await importOriginal() as any

  return {
    ...actual,
    formatElevationStyle: mockFormatElevationStyle,
    getCurrentInstance: mockGetCurrentInstance,
    getCurrentInstanceName: mockGetCurrentInstanceName,
    isCssColor: mockIsCssColor,
    isParsableColor: mockIsParsableColor,
    parseColor: mockParseColor,
    getForeground: mockGetForeground,
    convertToUnit: mockConvertToUnit,
    toKebabCase: mockToKebabCase,
  }
})

// Configuration globale de Vue Test Utils
config.global.mocks = {
  $t: (key: string) => key,
  $route: {
    params: {},
    query: {}
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  }
}

// Mock des fonctions globales
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Configuration globale - nettoyage avant chaque test
beforeEach(() => {
  vi.clearAllMocks()
  resetAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})