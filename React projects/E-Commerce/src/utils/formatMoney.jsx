export function FormatMoney(cents) {
    return `$${(cents/100).toFixed(2)}`
}