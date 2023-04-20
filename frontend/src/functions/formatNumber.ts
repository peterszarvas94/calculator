const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

export function formatNumber(num: number): string {
  const str = num.toString();
  const parts = str.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? '.' + parts[1] : '';

  let formattedIntegerPart = '';

  const parsedIntegerPart = parseInt(integerPart);
  if (isNaN(parsedIntegerPart)) {
    return str.toString();
  }

  formattedIntegerPart = formatter.format(parsedIntegerPart);

  return formattedIntegerPart + decimalPart;
}


