import { useEffect, useMemo, useState } from "react";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import {
  ROOMS,
  formatRange,
  intervalsOverlap,
  pad2,
  sortBookings,
  timeToMinutes,
  todayISO,
  uid,
} from "./utils/bookingUtils";


export default function App() {
  const [bookings, setBookings] = useState([]);

  // Form state
  const [room, setRoom] = useState(ROOMS[0]);
  const [date, setDate] = useState(todayISO());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [title, setTitle] = useState("");

  // Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Search/filters
  const [search, setSearch] = useState("");
  const [filterRoom, setFilterRoom] = useState("All");
  const [filterDate, setFilterDate] = useState("All"); // All | Today | Selected

  const today = todayISO();
  const selectedDate = date;

  const filteredBookings = useMemo(() => {
    const q = search.trim().toLowerCase();

    return bookings.filter((b) => {
      if (filterRoom !== "All" && b.room !== filterRoom) return false;

      if (filterDate === "Today" && b.date !== today) return false;
      if (filterDate === "Selected" && b.date !== selectedDate) return false;

      if (!q) return true;
      const hay = `${b.room} ${b.date} ${b.startTime} ${b.endTime} ${b.title || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [bookings, search, filterRoom, filterDate, today, selectedDate]);

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  function validateAndCreateBooking() {
    clearMessages();

    if (!room) return setError("Please select a room."), false;
    if (!date) return setError("Please select a date."), false;
    if (!startTime || !endTime) return setError("Please select start and end time."), false;

    const s = timeToMinutes(startTime);
    const e = timeToMinutes(endTime);

    if (s === e) {
      setError("Start time and end time cannot be the same.");
      return false;
    }
    if (s > e) {
      setError("Invalid time range: start time must be earlier than end time.");
      return false;
    }

    // Overlap detection: same room + same date
    const sameSlot = bookings.filter((b) => b.room === room && b.date === date);
    for (const b of sameSlot) {
      const bs = timeToMinutes(b.startTime);
      const be = timeToMinutes(b.endTime);
      if (intervalsOverlap(s, e, bs, be)) {
        setError(
          `Booking conflict in ${room} on ${date}: ${formatRange(startTime, endTime)} overlaps with existing booking ${formatRange(
            b.startTime,
            b.endTime
          )}${b.title ? ` (${b.title})` : ""}.`
        );
        return false;
      }
    }

    const newBooking = {
      id: uid(),
      room,
      date,
      startTime,
      endTime,
      title: title.trim(),
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => sortBookings([...prev, newBooking]));
    setSuccess("Booking created successfully.");
    return true;
  }

  function onSubmit(e) {
    e.preventDefault();
    const ok = validateAndCreateBooking();
    if (ok) {
      setTitle("");
      // optional UX: bump end time +60 mins
      const newE = Math.min(timeToMinutes(startTime) + 60, 24 * 60 - 1);
      const hh = Math.floor(newE / 60);
      const mm = newE % 60;
      setEndTime(`${pad2(hh)}:${pad2(mm)}`);
    }
  }

  function removeBooking(id) {
    clearMessages();
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setSuccess("Booking deleted.");
  }

  function clearAll() {
    clearMessages();
    if (!confirm("Clear all bookings?")) return;
    setBookings([]);
    setSuccess("All bookings cleared.");
  }

  function getHighlightClass(b) {
    const q = search.trim().toLowerCase();
    const matchesSearch = q
      ? `${b.room} ${b.date} ${b.startTime} ${b.endTime} ${b.title || ""}`.toLowerCase().includes(q)
      : false;

    const isToday = b.date === today;
    const isSelected = b.date === selectedDate;

    if (matchesSearch) return "highlight highlight-search";
    if (isSelected) return "highlight highlight-selected";
    if (isToday) return "highlight highlight-today";
    return "";
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Meeting Room Booking</h1>
        </div>

        <button className="btn btn-danger" type="button" onClick={clearAll} disabled={bookings.length === 0}>
          Clear All
        </button>
      </header>

      <div className="grid">
        <BookingForm
          room={room}
          setRoom={setRoom}
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          title={title}
          setTitle={setTitle}
          error={error}
          success={success}
          onSubmit={onSubmit}
        />

        <BookingList
          bookings={filteredBookings}
          search={search}
          setSearch={setSearch}
          filterRoom={filterRoom}
          setFilterRoom={setFilterRoom}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          today={today}
          selectedDate={selectedDate}
          getHighlightClass={getHighlightClass}
          onDelete={removeBooking}
        />
      </div>
    </div>
  );
}