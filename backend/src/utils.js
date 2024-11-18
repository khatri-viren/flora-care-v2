export function convertFirestoreTimestampToDate(timestamp) {
  try {
    if (
      timestamp &&
      typeof timestamp.seconds === "number" &&
      typeof timestamp.nanoseconds === "number"
    ) {
      return new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
    }
  } catch (error) {
    console.error("Error formatting time:", error);
  }
  return new Date();
}
