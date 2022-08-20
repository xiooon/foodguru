function showRestaurants() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      console.log(JSON.parse(request.responseText));
      let restaurants = JSON.parse(request.responseText);
      let html = "";
      if (restaurants.length > 0) {
        for (let i = 0; i < restaurants.length; i++) {
          const restaurant = restaurants[i];
          html += `<a class="card" href="/restaurant/${restaurant.id}">
              <div class="title">
                <p class="restaurant-name">${restaurant.restaurantName}</p>
                 <div class="card-info">
                  <p>${restaurant.address}</p>
                  <p>${restaurant.category}</p>
                </div>
              </div>
              <img src="/img/${restaurant.img}" alt="" class="card-img" /> 
            </a>`;
        }
        var div = document.getElementById("restaurants");
        div.innerHTML = html;
      }
    }
  };
  request.open("GET", "http://localhost:8080/api/restaurants");
  request.send(null);
}

function checkReviewManage(userid, reviewId, review_RestaurantId) {
  if (user && +user.id == +userid) {
    return `
        <a href="/review/${review_RestaurantId}/${reviewId}">Update Review</a>
        `;
  }
  return "";
}

function showRestaurant() {
  const url = window.location.toString();
  const id = parseInt(url.split("/").slice(-1)[0]);

  var addReview = document.getElementById("addReview");
  if (user) {
    addReview.onclick = () => {
      window.location.href = "/review/" + id + "/add";
    };
  } else {
    addReview.style.display = "none";
  }

  if (!isNaN(id)) {
    var getRestaurantRequest = new XMLHttpRequest();
    getRestaurantRequest.onreadystatechange = function () {
      if (
        getRestaurantRequest.readyState == 4 &&
        getRestaurantRequest.status == 200
      ) {
        console.log(JSON.parse(getRestaurantRequest.responseText));
        const restaurant = JSON.parse(getRestaurantRequest.responseText);
        document.getElementById("restaurantImg").src = "/img/" + restaurant.img;
        document.getElementById("restaurantName").innerText =
          restaurant.restaurantName;
        document.getElementById("description").innerText =
          restaurant.description || "-";
        document.getElementById("address").innerText = restaurant.address;
        document.getElementById("category").innerText = restaurant.category;
      }
    };
    getRestaurantRequest.open(
      "GET",
      "http://44.206.247.202:3000/api/restaurants/" + id
    );
    getRestaurantRequest.send(null);
  }
}

function showRestaurantReviews() {
  const url = window.location.toString();
  const id = parseInt(url.split("/").slice(-1)[0]);
  if (!isNaN(id)) {
    console.log(id);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        console.log(JSON.parse(request.responseText));
        const reviews = JSON.parse(request.responseText);
        let html = "";
        if (reviews.length > 0) {
          for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            html += `
                          <div class="review">
                          ${checkReviewManage(
                            review.review_UserId,
                            review.id,
                            review.review_RestaurantId
                          )}
                <p class="title"><span>@${
                  review.username
                }</span><span>${new Date(review.datePosted).toLocaleDateString(
              "en-US"
            )}</span></p>
                <p><span class='review-text'>Restaurant</span> ${
                  review.restaurantRating
                }&#9733;</p>
                <p><span class='review-text'>Price</span> ${
                  review.priceRating
                }&#9733;</p>
                <p><span class='review-text'>Service</span> ${
                  review.serviceRating
                }&#9733;</p>
                <p>${review.comments}</p>
              </div>
              `;
          }
          var div = document.getElementById("reviews");
          div.innerHTML = html;
        }
      }
    };
    request.open("GET", "http://44.206.247.202:3000/api/reviews/restaurant/" + id);
    request.send(null);
  }
}
