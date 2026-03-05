import { ROOMS, formatRange } from "../utils/bookingUtils";

export default function BookingList({
  bookings,
  search,
  setSearch,
  filterRoom,
  setFilterRoom,
  filterDate,
  setFilterDate,
  today,
  selectedDate,
  getHighlightClass,
  onDelete,
}) {
  return (
    <section className="card">
      <div className="list-header">
        <h2>Bookings</h2>

        <div className="filters">
          <input
            className="search"
            type="text"
            placeholder="Search room/date/time/title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filterRoom} onChange={(e) => setFilterRoom(e.target.value)}>
            <option value="All">All rooms</option>
            {ROOMS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
            <option value="All">All dates</option>
            <option value="Today">Today ({today})</option>
            <option value="Selected">Selected date ({selectedDate || "—"})</option>
          </select>
        </div>
      </div>

      <div className="legend">
        <span className="tag tag-today">Today</span>
        <span className="tag tag-selected">Selected date</span>
        <span className="tag tag-search">Search match</span>
      </div>

      {bookings.length === 0 ? (
        <div className="empty">No bookings found.</div>
      ) : (
        <ul className="list">
          {bookings.map((b) => (
            <li key={b.id} className={`item ${getHighlightClass(b)}`}>
              <div className="item-main">
                <div className="item-top">
                  <div className="pill">{b.room}</div>
                  <div className="meta">
                    <span className="mono">{b.date}</span>
                    <span className="dot">•</span>
                    <span className="mono">{formatRange(b.startTime, b.endTime)}</span>
                  </div>
                </div>

                {b.title ? (
                  <div className="title">{b.title}</div>
                ) : (
                  <div className="title title-muted">(No title)</div>
                )}
              </div>

              <button className="btn btn-ghost" type="button" onClick={() => onDelete(b.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}