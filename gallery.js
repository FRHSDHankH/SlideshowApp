let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $(".details").hide(); // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $(".moreIndicator").click(() => {
    $(".moreIndicator").toggleClass("rot90 rot270");
    $(".details").slideToggle();
  });
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $("#nextPhoto").click(() => {
    showNextPhoto();
  });
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $("#prevPhoto").click(() => {
    showPrevPhoto();
  });
  // Call fetchJSON() to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: "json",
    success: (data) => {
      mImages = data.images;
      swapPhoto();
    },
    error: (xhr, status, error) => {
      console.error("Failed to load JSON:", status, error);
    },
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  let currentImage = mImages[mCurrentIndex];
  $("#photo").attr("src", currentImage.imgPath);
  $(".location").html(`<strong>Make & Model: </strong>${currentImage.imgLocation}`);
  $(".description").html(`<strong>Description: </strong>${currentImage.description}`);
  $(".date").html(`<strong>Year Created: </strong>${currentImage.date}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  startTimer();
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0;
  }
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  startTimer();
  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1;
  }
  swapPhoto();
}

let mTimer;

// Starter code for the timer function
function startTimer() {
  if (mTimer) {
    clearInterval(mTimer);
  }
  mTimer = setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
}

$(document).keydown(function (event) {
  const key = event.key;
  if (key === "ArrowRight" || key === " ") {
    showNextPhoto();
  } else if (key === "ArrowLeft") {
    showPrevPhoto();
  } else if (key === "ArrowDown") {
    $(".moreIndicator").removeClass("rot270").addClass("rot90");
    $(".details").slideDown();
  } else if (key === "ArrowUp") {
    $(".moreIndicator").removeClass("rot90").addClass("rot270");
    $(".details").slideUp();
  }
});
