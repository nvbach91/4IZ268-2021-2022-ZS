export const useFilters = () => {
  const dateFormat = (date: string) => {
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
