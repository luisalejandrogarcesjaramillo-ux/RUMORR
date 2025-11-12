export function getOrCreateAnonId(): string {
  if (typeof window === 'undefined') return 'server'
  try {
    const key = 'anonId'
    let id = localStorage.getItem(key)
    if (!id) {
      id = generateId()
      localStorage.setItem(key, id)
    }
    return id
  } catch (e) {
    return 'unknown'
  }
}

function generateId() {
  // Generate simple random ID
  return 'a_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}
