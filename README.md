# React Meeting Room Booking System

A small React application that allows users to book meeting rooms while preventing scheduling conflicts. The system validates booking times, prevents overlapping bookings for the same room, and displays existing bookings clearly.

---

# Features

- Book a meeting room with:
  - Room selection
  - Date
  - Start time
  - End time
  - Optional meeting title
- Prevent overlapping bookings for the same room and date
- Validate time ranges (start time must be earlier than end time)
- Display existing bookings in a clear list
- Show meaningful error messages when a booking fails
- Search functionality for filtering bookings
- Visual highlighting of bookings based on search and selected date

---

## Project Structure
```
src/
├── components/
│   ├── BookingForm.jsx      
│   └── BookingList.jsx      
├── utils/
│   └── bookingUtils.js      
├── App.jsx                  
├── main.jsx                 
└── index.css               
```

### Components

**BookingForm**
- Handles user input for creating bookings
- Displays validation and error messages

**BookingList**
- Displays all bookings
- Provides search and filtering
- Allows deletion of bookings

**bookingUtils**
- Contains helper functions used across the app

---


# Search Functionality

Users can search bookings using a text input.  
The search checks the following fields:

- Room name
- Date
- Start time
- End time
- Booking title

The search is case-insensitive and filters results dynamically.
<img width="1440" height="900" alt="Screenshot 2026-03-05 at 12 57 48 PM" src="https://github.com/user-attachments/assets/cedeee4e-783f-4d3a-998d-4ca78359d754" />

---

# Highlighting

Bookings are visually highlighted based on:

- Search matches
- Selected date
- Today's bookings

This helps users quickly identify relevant bookings.
<img width="710" height="592" alt="Screenshot 2026-03-05 at 1 11 48 PM" src="https://github.com/user-attachments/assets/cfbe93e1-9d44-4e89-b48e-d17f7f622693" />

---

# Overlap Detection Logic

To prevent conflicting bookings, the system checks whether the new booking overlaps with any existing booking for the same room and date.

The times are first converted into minutes using a helper function to simplify comparison.

Two bookings overlap if the following condition is true:
startA < endB AND startB < endA

Where:
- startA, endA → start and end time of the new booking
- startB, endB → start and end time of an existing booking

This approach allows back-to-back meetings such as:
10:00 – 11:00
11:00 – 12:00

but prevents overlaps like:
10:00 – 11:00
10:30 – 11:30


If an overlap is detected, a clear error message is shown indicating the conflicting booking.

---

# AI-Assisted Parts

AI assistance was used during development for:

- Generating the initial project structure
- Creating helper utility functions
- Providing suggestions for React component separation
- Generating the initial UI layout

---

# Corrections Made After AI Generation

After reviewing the generated code, the following improvements and corrections were made:

- Verified and adjusted the overlap detection logic to correctly handle edge cases.
- Simplified and organized the component structure.
- Improved variable naming and readability.
- Ensured validation properly handles invalid time ranges.
- Cleaned up unnecessary code to keep the implementation focused and maintainable.

---

# Improvements Beyond AI

Several enhancements were implemented beyond the initial generated code:

- Separation of logic into reusable utility functions
- Modular React component architecture
- Search and filtering functionality
- Visual highlighting of bookings
- Clear and descriptive error messages


---

# Production Considerations

Before deploying this feature to production, the following would be verified:

- Additional edge case testing for booking validation
- Time zone handling and consistent date formatting
- Accessibility improvements for form controls
- Responsive UI testing across devices
- Integration with a backend API and database
- Multi-user concurrency handling to avoid booking conflicts

---

# Future Improvements (If Given 2 More Days)

With additional development time, the following improvements could be implemented:

- Editing and updating existing bookings
- Calendar or timeline-based booking visualization
- Backend API integration with persistent storage
- User authentication and role-based access
- Automated unit tests for booking logic
- Real-time updates for multi-user booking environments

---


---

# How to Run the Project

# 1. Clone the repository
git clone https://github.com/sanketkharat28/MeetingRoomBookingAssignment.git

# 2. Navigate into the project
cd MeetingRoomBookingAssignment

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

Then open the application in the browser.

---

# Author

**Sanket Kharat**
