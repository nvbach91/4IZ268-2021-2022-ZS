export const useFilters = () => {
  const dateFormat = (date: string|number) => {
    if (!date) return null
    return new Date(date).toLocaleString('cs-CZ', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
  }

  return {
    dateFormat
  }
}
