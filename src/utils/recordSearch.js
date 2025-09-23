export function searchRecords(priceRecords, query) {
  if (!query) return priceRecords;

  const lowerQuery = query.toLowerCase();

  return priceRecords.filter(
    (record) =>
      record.bookmark_detail.bookmarked_station.name.toLowerCase().includes(lowerQuery) ||
      record.bookmark_detail.bookmarked_station.address.toLowerCase().includes(lowerQuery) ||
      record.bookmark_detail.bookmarked_station.station_id.toLowerCase().includes(lowerQuery) ||
      record.bookmark_detail.bookmarked_station.station_id
        .toLowerCase()
        .includes(lowerQuery) ||
        record.bookmark_detail.tag?.toLowerCase().includes(lowerQuery)
  );
}
