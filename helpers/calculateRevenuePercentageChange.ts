export function calculateRevenuePercentageChange(
  current: number,
  previous: number
): number | null {
  if (previous === 0) {
    if (current === 0) {
      return 0; // No change
    }
    return null;
  }

  const change = ((current - previous) / previous) * 100;
  return change;
}
