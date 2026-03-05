export const ROOMS = ["Room1", "Room2", "Room3"];

export function pad2(n) {
  return String(n).padStart(2, "0");
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function timeToMinutes(t) {
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + mm;
}

export function intervalsOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

export function sortBookings(bookings) {
  return [...bookings].sort((x, y) => {
    if (x.date !== y.date) return x.date.localeCompare(y.date);
    if (x.room !== y.room) return x.room.localeCompare(y.room);
    return timeToMinutes(x.startTime) - timeToMinutes(y.startTime);
  });
}

export function formatRange(start, end) {
  return `${start}–${end}`;
}

export function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}