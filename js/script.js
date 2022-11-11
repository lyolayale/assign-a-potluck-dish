/*
- Aurthor: Me
- Purpose: JS scope practice --> with functions, loops, & dom manipulation
- Date: 2022-11-01 🍂
*/

//=====================
// ==== variables ====
//=====================

// invite button
const addGuestButton = document.querySelector(".invite");
// label for the invite button
const guestInputLabel = document.querySelector(".add-guest label");
// text input box
const guestInput = document.querySelector(".add-guest input");
// unordered list (not yet visible)
const guestList = document.querySelector(".guest-list");
// span class for number of guests attending
const guestCount = document.querySelector(".attendance");
// alert when guest list is full (not yet visible)
const guestFull = document.querySelector(".alert");
// assign dish button
const assignButton = document.querySelector(".assign");
//assignment list --> people & dishes
const assignedItems = document.querySelector(".assigned-items");

//==========================
// ==== event listeners ====
//==========================

// ---- click event ----
addGuestButton.addEventListener("click", function () {
  const guest = guestInput.value;
  if (guest !== "") {
    addToList(guest);
    updateGuestCount();
    clearInput();
  }
});

// ---- keydown event ----
document.addEventListener("keydown", function (e) {
  const guest = guestInput.value;
  if (guest !== "" && e.key === "Enter") {
    addToList(guest);
    updateGuestCount();

    setTimeout(function () {
      clearInput();
    }, 1000);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    window.location.reload();
  }
});

//====================
// ==== functions ====
//====================

// ---- clear input ----
const clearInput = function () {
  guestInput.value = "";
};

// ---- add a guest ----
const addToList = function (guest) {
  const listItem = document.createElement("li");
  listItem.style.textShadow = "5px -5px 10px #333";
  listItem.innerText = guest;
  guestList.append(listItem);
};

// ---- limit guest count ----
const updateGuestCount = function () {
  const guest = document.querySelectorAll(".guest-list li");
  guestCount.innerText = guest.length;

  if (guest.length === 8) {
    addGuestButton.classList.add("hide");
    guestInput.classList.add("hide");
    guestInputLabel.classList.add("hide");
    guestFull.classList.remove("hide");
  }
};

//=====================================
// ==== assign random dishes logic ====
//=====================================

// ---- assign dishes ----
const assignItems = function () {
  const potluckItems = [
    "potato salad",
    "hummus",
    "cookies",
    "fruit",
    "assorted cold meats",
    "assorted cheeses",
    "tortilla chips with salsa",
    "brisket",
    "ribs",
    "assorted cold veggies",
    "chicken & dumplings",
    "chicken pot pie"
  ];

  const allGuests = document.querySelectorAll(".guest-list li");

  for (let guest of allGuests) {
    const randomPotluckIndex = Math.floor(Math.random() * potluckItems.length);
    let randomPotluckItem = potluckItems.splice([randomPotluckIndex], 1);
    const listItem = document.createElement("li");
    listItem.innerText = `${guest.innerText} is bringing ${randomPotluckItem}.`;
    assignedItems.append(listItem);
  }
};

// ---- initiate assigned dishes & disabling assignment dish button ----
assignButton.addEventListener("click", function () {
  assignItems();
  assignButton.disabled = true;
  assignButton.innerText = "The menu is complete!";
});
