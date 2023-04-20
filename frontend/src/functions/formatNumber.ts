export function formatNumber(num: number): string {
  const parts = num.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? '.' + parts[1] : '';

  let formattedIntegerPart = '';
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    formattedIntegerPart = integerPart[i] + formattedIntegerPart;
    count++;
    if (count % 3 === 0 && i !== 0) {
      formattedIntegerPart = ',' + formattedIntegerPart;
    }
  }

  return formattedIntegerPart + decimalPart;
}
