export function searchBookmarks(bookmarks, query) {
  if (!query) return bookmarks;

  const lowerQuery = query.toLowerCase();

  return bookmarks.filter(
    (bookmark) =>
      bookmark.bookmarked_station.name.toLowerCase().includes(lowerQuery) ||
      bookmark.bookmarked_station.address.toLowerCase().includes(lowerQuery) ||
      bookmark.bookmarked_station.station_id.toLowerCase().includes(lowerQuery)
  );
}
