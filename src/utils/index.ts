const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export function abbreviateNumber(number: number):string {
  const powerOfTen = (Math.log10(number) / 3) | 0;

  if (powerOfTen === 0) return `${number}`;

  const suffix = SI_SYMBOL[powerOfTen];
  const scale = Math.pow(10, powerOfTen * 3);

  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}
