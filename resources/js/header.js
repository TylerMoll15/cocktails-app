var main_title = "Home";
var reviews_title = "Reviews";

document.addEventListener("DOMContentLoaded", () => { 
    var searchQuery = document.getElementById("searchQuery");
    var searchButton = document.getElementById("searchButton");
    var seachForm = document.getElementById("searchForm");
    var callback = APIcall;

    searchForm.action = "/home"

    //changes callback depending on page title
    if(document.title == reviews_title) {
        searchForm.action = "/reviews";
        callback = queryReviews;
    }
    searchQuery.addEventListener("search", callback);
    searchButton.addEventListener("click", callback);
});