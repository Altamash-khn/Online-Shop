const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

mobileMenuBtn.addEventListener("click", function (e) {
  // const currDisplay = getComputedStyle(mobileMenu).display;
  // if (currDisplay === "none") {
  //   mobileMenu.style.display = "flex";
  // } else {
  //   mobileMenu.style.display = "none";
  // }

  mobileMenu.classList.toggle("open");
});
