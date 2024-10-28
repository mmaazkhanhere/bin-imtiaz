export function formatDate(dateString: string): string {
  // Parse the ISO date string into a Date object
  const date = new Date(dateString);

  // Format the date as 'DD MMMM YYYY' (e.g., '27 October 2024')
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate;
}
