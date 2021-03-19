 export const formatDate = (dateStr) => {
  const parsedDate = new Date(dateStr);
  return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString()}`
 }
