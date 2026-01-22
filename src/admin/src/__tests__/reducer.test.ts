import rootReducer from '../reducer'  // Replace
import { createStore } from 'redux'

describe('Root Reducer', () => {
  test('combines reducers', () => {
    const store = createStore(rootReducer)
    expect(store.getState()).toMatchObject({})  // No crash on empty
  })

  test('clamps default in settings', () => {
    const state = rootReducer({ settings: {} }, { type: 'INIT' })
    expect(state.settings.defaultSort).toBe('name')  // Clamped
  })
})