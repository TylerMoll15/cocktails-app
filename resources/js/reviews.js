document.addEventListener("DOMContentLoaded", () => { 
        if(document.title == "Reviews"){
            document.getElementById("reviewsTable").style.display = 'none';
            var reviewsDiv = document.getElementById("reviewsDiv");
            reviewsDiv.style.display = 'block';
        }
});

function queryReviews(){
        var searchQuery = document.getElementById("searchQuery");
    
        //cocktail api call
        console.log(searchQuery.value);
        var url = `/cocktails/getReviews/:${searchQuery.value}`;
        $.ajax({url:url, dataType:"json"}).then((res) => {
          var reviewsBody = document.getElementById("reviewBody");
          reviewsBody.innerHTML = '';
          reviewsDiv.style.display = 'none';

          try {
            console.log(res);
            res.forEach(review => {
                var reviewRow = document.createElement("tr");
                var cocktail = document.createElement("td");
                var reviewValue = document.createElement("td");
                var date = document.createElement("td");

                cocktail.innerHTML = review.cocktail_title;
                reviewValue.innerHTML = review.review;
                date.innerHTML = review.review_date;
                reviewRow.appendChild(cocktail);
                reviewRow.appendChild(reviewValue);
                reviewRow.appendChild(date);
                reviewsBody.appendChild(reviewRow);
                reviewsBody.appendChild(reviewRow);
                //makes table visible  
                document.getElementById("reviewsTable").style.display = 'block';
            });
          }
          catch (error){
            console.log("No data");
            console.error(error);
            displayError();
          }
        });
}