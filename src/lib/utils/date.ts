export function getDate(date: Date) {
    return new Date(date).toLocaleDateString("en-Us", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  export function getDateTime(date: Date) {
    return new Date(date).toLocaleTimeString("en-Us", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }