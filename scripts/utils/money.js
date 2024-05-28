export function money_to_string(amount, currency) {
  return currency + ' ' + new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
  }).format(amount)
}
