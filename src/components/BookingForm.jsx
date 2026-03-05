import { ROOMS } from "../utils/bookingUtils";

export default function BookingForm({
  room,
  setRoom,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  title,
  setTitle,
  error,
  success,
  onSubmit,
}) {
  return (
    <section className="card">
      <h2>Create Booking</h2>

      <form onSubmit={onSubmit} className="form">
        <div className="row">
          <label>
            Room
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              {ROOMS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>

        <div className="row">
          <label>
            Start Time
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>

          <label>
            End Time
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
        </div>

        <label>
          Title (optional)
          <input
            type="text"
            placeholder="e.g., Sprint Planning"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
          />
        </label>

        {error ? <div className="msg msg-error">{error}</div> : null}
        {success ? <div className="msg msg-success">{success}</div> : null}

        <button className="btn btn-primary" type="submit">
          Book Room
        </button>

      </form>
    </section>
  );
}