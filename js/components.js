function displayError(message = "Unknown error") {
  return `<div class="error">${message}</div>`;
}


const americanTimeConverter = (launchDate) => {
  const getDate = new Date(launchDate);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(getDate);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(getDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(getDate);
  const date = `${month} ${day}, ${year}`;

  return date;
}