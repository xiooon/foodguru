function setupLogin() {
  var form = document.getElementById("login-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      console.log(request);
      if (request.readyState == 4 && request.status == 200) {
        document.getElementById("error_txt").innerText = "";
        localStorage.setItem("user", request.responseText);
        window.location.href = "/";
      } else {
        var msg = JSON.parse(request.responseText);
        document.getElementById("error_txt").innerText = msg.error;
      }
    };
    request.open("POST", "http://44.206.247.202:3000/api/login");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(
      JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
    );
  };
}

function setupRegister() {
  var form = document.getElementById("register-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 201) {
        document.getElementById("error_txt").innerText = "";
        window.location.href = "/login";
      } else {
        var msg = JSON.parse(request.responseText);
        document.getElementById("error_txt").innerText = msg.error;
      }
    };
    request.open("POST", "http://44.206.247.202:3000/api/signup");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(
      JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        mobile: document.getElementById("mobile").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
      })
    );
  };
}
