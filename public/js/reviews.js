// deleteBtn.onclick = (e) => {
//   e.preventDefault();
//   deleteReview();
// };

function showReview() {
  const deleteBtn = document.getElementById("delete-btn");
  const url = window.location.toString();
  const reviewId = url.split("/").slice(-1)[0];
  if (reviewId != "add") {
    deleteBtn.style.display = "block";
    var getRequest = new XMLHttpRequest();
    getRequest.onreadystatechange = function () {
      if (getRequest.readyState == 4 && getRequest.status == 200) {
        console.log(getRequest.responseText);
        const review = JSON.parse(getRequest.responseText);
        document.getElementById("restaurantRating").value =
          review.restaurantRating;
        document.getElementById("priceRating").value = review.priceRating;
        document.getElementById("serviceRating").value = review.serviceRating;
        document.getElementById("comments").value = review.comments || "";
      }
    };
    getRequest.open("GET", "http://localhost:8080/api/reviews/" + reviewId);
    getRequest.send(null);
  } else {
    deleteBtn.style.display = "none";
  }
}

function setupReviewForm() {
  const url = window.location.toString();
  const reviewId = url.split("/").slice(-1)[0];
  var form = document.getElementById("review-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    console.log("user", user.id);
    if (reviewId != "add") {
      updateReview();
    } else {
      addReview();
    }
  };
}

function addReview() {
  const url = window.location.toString();
  const restaurantId = parseInt(url.split("/").slice(-2)[0]);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    console.log(request.responseText);
    if (request.readyState == 4 && request.status == 201) {
      document.getElementById("error_txt").innerText = "";
      window.location.href = "/restaurant/" + restaurantId;
    } else {
      var msg = JSON.parse(request.responseText);
      document.getElementById("error_txt").innerText = msg.error;
    }
  };
  request.open("POST", "http://localhost:8080/api/reviews/");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(
    JSON.stringify({
      restaurantRating: document.getElementById("restaurantRating").value,
      priceRating: document.getElementById("priceRating").value,
      serviceRating: document.getElementById("serviceRating").value,
      comments: document.getElementById("comments").value,
      review_UserId: user.id,
      review_RestaurantId: restaurantId,
    })
  );
}

function deleteReview() {
  const url = window.location.toString();
  const reviewId = url.split("/").slice(-1)[0];
  const restaurantId = parseInt(url.split("/").slice(-2)[0]);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    console.log(request.responseText);
    if (request.readyState == 4 && request.status == 200) {
      document.getElementById("error_txt").innerText = "";
      window.location.href = "/restaurant/" + restaurantId;
    } else {
      var msg = JSON.parse(request.responseText);
      document.getElementById("error_txt").innerText = msg.error;
    }
  };
  request.open("DELETE", "http://localhost:8080/api/reviews/" + reviewId);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(null);
}

function updateReview() {
  const url = window.location.toString();
  const reviewId = url.split("/").slice(-1)[0];
  const restaurantId = parseInt(url.split("/").slice(-2)[0]);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    console.log(request.responseText);
    if (request.readyState == 4 && request.status == 200) {
      document.getElementById("error_txt").innerText = "";
      window.location.href = "/restaurant/" + restaurantId;
    } else if (request.readyState == 4) {
      var msg = JSON.parse(request.responseText);
      document.getElementById("error_txt").innerText = msg.error;
    }
  };
  request.open("PUT", "http://localhost:8080/api/reviews/" + reviewId);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(
    JSON.stringify({
      restaurantRating: document.getElementById("restaurantRating").value,
      priceRating: document.getElementById("priceRating").value,
      serviceRating: document.getElementById("serviceRating").value,
      comments: document.getElementById("comments").value,
      review_UserId: user.id,
      review_RestaurantId: restaurantId,
    })
  );
}
