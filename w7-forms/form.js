const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const choosingMany = travelRange.value === "many";
  notesContainer.hidden = !choosingMany;
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSelectedCampuses() {
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  if (!firstName || !lastName || !email) {
    output.textContent = "Please enter your first name, last name, and email.";
    return;
  }

  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus.";
    return;
  }

  if (type === "many" && !note) {
    output.textContent = "Please add travel notes when choosing multiple campuses.";
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "Please select at least two campuses.";
    return;
  }

  if (!availableDate || availableDate <= getLocalDateString()) {
    output.textContent = "Please choose a date later than today.";
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Preference Submitted";
  output.append(heading);

  const details = [
    `${firstName} ${lastName}`,
    `Email: ${email}`,
    `Availability: ${availableDate}`,
    `Campuses: ${selectedCampuses.join(", ")}`,
    `Preference Level: ${type === "many" ? "Two or more campuses" : "One campus"}`
  ];

  if (note) {
    details.push(`Travel Notes: ${note}`);
  }

  details.forEach(detail => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    output.append(paragraph);
  });

  form.reset();
  updateNotesField();
});