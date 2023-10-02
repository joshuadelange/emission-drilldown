export function setFilters (filters) {
  const existingParams = getFilters()
  const newParams = new URLSearchParams({ ...existingParams, ...filters })
  window.location.hash = newParams.toString()
}

export function clearFilters () {
  window.location.hash = ''
}

export function getFilters () {
  const rawHashParams = window.location.hash.replace('#', '')
  const hashParams = Object.fromEntries(new URLSearchParams(rawHashParams))
  return hashParams
}
