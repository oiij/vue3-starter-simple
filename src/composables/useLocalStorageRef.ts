import type { UnwrapRef } from 'vue'

/**
 * localStorage Reactive Functions
 * @param key - localStorage key
 * @param defaultValue - 初始化value
 * @returns Ref Value
 */

export function useLocalStorageRef<T>(key: string, defaultValue: T): Ref<UnwrapRef<T> >
export function useLocalStorageRef<T>(key: string, defaultValue?: T): Ref<UnwrapRef<T> | undefined> {
  function setValue() {
    localStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  }
  function loadValue(): T | undefined {
    const localStorageValue = localStorage.getItem(key)

    if (localStorageValue) {
      try {
        const jsonValue = JSON.parse(localStorageValue)
        if (typeof jsonValue === typeof defaultValue)
          return jsonValue

        else
          return setValue()
      }
      catch {
        return setValue()
      }
    }
    else {
      return setValue()
    }
  }
  const value = ref<T | undefined>(loadValue())
  watch(value, () => {
    localStorage.setItem(key, JSON.stringify(value.value))
  }, {
    deep: true,
  })
  function handleStorageEvent(ev: StorageEvent) {
    if (ev.key === key)
      value.value = loadValue() as UnwrapRef<T | undefined>
  }
  onMounted(() => {
    window.addEventListener('storage', handleStorageEvent)
  })
  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageEvent)
  })
  return value
}
