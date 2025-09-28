function generateId() {
  return crypto?.randomUUID() ?? Date.now().toString()
}

export default generateId
