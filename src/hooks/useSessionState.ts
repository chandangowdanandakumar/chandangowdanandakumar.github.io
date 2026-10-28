import { useState } from 'react'

type Codec<T> = { serialize?: (value: T) => string; deserialize?: (raw: string) => T }

// Shared "read sessionStorage on mount, write on every update" pattern.
// Previously each of Experience (active tab index), Projects (tech filter),
// and App (one-time loader flag) hand-rolled this get/parse/set sequence
// slightly differently.
export function useSessionState<T>(
  key: string,
  initial: T,
  { serialize = String, deserialize = (raw: string) => raw as unknown as T }: Codec<T> = {}
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const raw = sessionStorage.getItem(key)
    return raw === null ? initial : deserialize(raw)
  })

  const set = (next: T) => {
    setValue(next)
    sessionStorage.setItem(key, serialize(next))
  }

  return [value, set]
}
