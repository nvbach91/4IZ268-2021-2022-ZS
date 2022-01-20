export function useGreeting(time) {
  const currentHour = time.getHours()

  if (currentHour < 3 || currentHour >= 20) return 'Good evening'
  if (currentHour < 12) return 'Good morning'
  return 'Good afternoon'
}
