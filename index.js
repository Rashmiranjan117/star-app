const imageInput = document.getElementById("imageInput");
const imageContainer = document.getElementById("imageContainer");
const uploadButton = document.getElementById("uploadButton");
let clear = document.getElementById("clear");
const displayImg = document.getElementById("primary");
let blue = "./assets/Blue umbrella.png"; //rgb(0, 0, 255)
let pink = "./assets/Pink umbrella.png"; //rgb(255, 192, 203)
let yellow = "./assets/Yello umbrella.png"; //rgb(255, 255, 0)
let logo = document.getElementById("logo");
const container = document.querySelector(".container");
var colorSpans = document.querySelectorAll("#colors span");
let initialClass = document.querySelector(".blue");
let bg_blue = "#B8E7E1";
let bg_pink = "#FCC8D1";
let bg_yellow = "#FDF7C3";
let loader = document.querySelector(".loader");

colorSpans.forEach(function (span) {
  span.addEventListener("click", function (e) {
    displayImg.src = "";
    var computedStyle = getComputedStyle(this);
    colorSpans.forEach((item) => {
      item.classList.remove("light");
    });
    var color = computedStyle.backgroundColor;
    this.classList.add("light");
    showLoadingState();
    loader.classList.add("overlay");
    logo.style.display = "none";
    setTimeout(function () {
      if (color === "rgb(0, 0, 255)") {
        displayImg.src = "./assets/Blue umbrella.png";git 
        container.style.backgroundColor = bg_blue;
      } else if (color === "rgb(255, 192, 203)") {
        displayImg.src = "./assets/Pink umbrella.png";
        container.style.backgroundColor = bg_pink;
      } else if (color === "rgb(255, 255, 0)") {
        displayImg.src = "./assets/Yello umbrella.png";
        container.style.backgroundColor = bg_yellow;
      }
      hideLoadingState();
      logo.style.display = "block";
      loader.classList.remove("overlay");
    }, 3000);
  });
});

window.addEventListener("load", () => {
  displayImg.src = blue;
  container.classList.add("light");
  container.style.backgroundColor = bg_blue;
  imageContainer.append(displayImg);
});

uploadButton.addEventListener("click", function () {
  imageInput.click();
  logo.style.display = "block";
});

imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  clear.style.display = "inline-block";
  const extension = file.name.split(".").pop().toLowerCase();

  if (extension === "jpg" || extension === "png") {
    reader.onload = function () {
      const imageUrl = reader.result;

      logo.src = imageUrl;
      logo.alt = "Selected Image";
      imageContainer.append(logo);
    };
    reader.readAsDataURL(file);
  } else {
    console.error("Unsupported file type. Please select a .jpg or .png image.");
    imageInput.value = "";
    alert("Unsupported file type. Please select a .jpg or .png image.");
  }
});

clear.addEventListener("click", () => {
  logo.src = "";
  logo.style.display = "none";
  clear.style.display = "none";
});

function showLoadingState() {
  loader.style.display = "block";
}

function hideLoadingState() {
  loader.style.display = "none";
}
