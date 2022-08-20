const user = JSON.parse(localStorage.getItem("user"));

function changeDisplay(classname, display) {
  const collection = document.getElementsByClassName(classname);
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.display = display;
  }
}

if (user) {
  changeDisplay("showUser", "block");
  changeDisplay("showAnon", "none");
} else {
  changeDisplay("showUser", "none");
  changeDisplay("showAnon", "block");
}

document.getElementById("logout").onclick = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
