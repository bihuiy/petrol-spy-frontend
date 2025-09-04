export function searchBookmarks(bookmarks, query) {
    if (!query) return bookmarks;
  
    const lowerQuery = query.toLowerCase();
  
    return bookmarks.filter(
      (record) =>
        record.bookmark_detail.bookmarked_station.name.toLowerCase().includes(lowerQuery) ||
        record.bookmark_detail.bookmarked_station.address.toLowerCase().includes(lowerQuery) ||
        record.bookmark_detail.bookmarked_station.station_id.toLowerCase().includes(lowerQuery)
    );
  }
  