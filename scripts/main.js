const myPhoto = document.getElementById("myPhoto");
const myLink = document.getElementById("myLink");
const myTooltip = document.getElementById("myTooltip");
const myCaption = document.getElementById("myCaption");

const photos = [
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Historical_instruments.jpg/500px-Historical_instruments.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
    href: "https://commons.wikimedia.org/wiki/File:Historical_instruments.jpg",
    alt: "Historical instruments",
    tooltip: "A.E.Booth95, CC BY-SA 4.0, via Wikimedia Commons",
    caption: `<a href="https://commons.wikimedia.org/wiki/File:Historical_instruments.jpg">A.E.Booth95</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons`,
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/ContemporaryBalletLeap.jpg/250px-ContemporaryBalletLeap.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
    href: "https://commons.wikimedia.org/wiki/File:ContemporaryBalletLeap.jpg",
    alt: "A contemporary ballet dance leap",
    tooltip: "Lambtron, CC BY-SA 4.0, via Wikimedia Commons",
    caption: `<a href="https://commons.wikimedia.org/wiki/File:ContemporaryBalletLeap.jpg">Lambtron</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons`,
  },
];

// Preload so the swap is instant (avoids flicker in Safari)
photos.forEach((p) => {
  new Image().src = p.src;
});

let currentPhoto = 0;

myPhoto.addEventListener("click", function (event) {
  // Prevent navigation on the click that changes the image.
  event.preventDefault();

  // Switch to the other photo.
  currentPhoto = currentPhoto === 0 ? 1 : 0;
  const photo = photos[currentPhoto];

  // Update the image and its destination.
  myPhoto.src = photo.src;
  myPhoto.alt = photo.alt;

  // Update both the href property and HTML attribute.
  myLink.href = photo.href;
  myLink.setAttribute("href", photo.href);

  // Safari workaround: force the link to redraw so the URL preview may refresh.
  myLink.style.display = "none";
  void myLink.offsetHeight; // forces the browser to apply the change
  myLink.style.display = "";

  // Update the tooltip text, including the link's destination.
  myTooltip.textContent = `${photo.tooltip} (${photo.href})`;

  // Update the caption under the image.
  myCaption.innerHTML = photo.caption;
});

// Use the link for hover/focus so touch and keyboard users get the tooltip too
function showTooltip() {
  myTooltip.style.visibility = "visible";
  myTooltip.style.opacity = "1";
}
function hideTooltip() {
  myTooltip.style.visibility = "hidden";
  myTooltip.style.opacity = "0";
}
myLink.addEventListener("mouseenter", showTooltip);
myLink.addEventListener("mouseleave", hideTooltip);
myLink.addEventListener("focus", showTooltip);
myLink.addEventListener("blur", hideTooltip);

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  let myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Welcome to Bard Spell Performance Advice, ${myName}`;
  }
}
if (!localStorage.getItem("name")) {
  setUserName();
} else {
  let storedName = localStorage.getItem("name");
  myHeading.textContent = `Welcome to Bard Spell Performance Advice, ${storedName}`;
}
myButton.addEventListener("click", () => {
  setUserName();
});
