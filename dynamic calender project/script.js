const calendarBody = document.getElementById("calendar-body");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Populate month dropdown
months.forEach((month, index) => {
  let option = document.createElement("option");
  option.value = index;
  option.textContent = month;
  monthSelect.appendChild(option);
});

// Populate year dropdown (range: 2000–2030)
for (let i = 2000; i <= 2030; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

// Set default to current month/year
const today = new Date();
monthSelect.value = today.getMonth();
yearSelect.value = today.getFullYear();

function generateCalendar(month, year) {
  calendarBody.innerHTML = "";
  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.textContent = date;

        // Highlight today
        if (
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          cell.classList.add("today");
        }

        // Style weekends
        if (j === 0 || j === 6) {
          cell.classList.add("weekend");
        }

        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

// Initial render
generateCalendar(today.getMonth(), today.getFullYear());

// Update calendar on change
monthSelect.addEventListener("change", () => {
  generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
});
yearSelect.addEventListener("change", () => {
  generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
});
