const check = document.getElementById("check");



if (check !== null && check.innerText.trim() !== "") {
  setTimeout(() => {
    check.style.display = "none";
  }, 3500);
}
