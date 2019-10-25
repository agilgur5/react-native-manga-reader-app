export function dupDate (date) {
  return new Date(date.valueOf())
}

export function nextDay (date, days = 1) {
  const newDate = dupDate(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}
