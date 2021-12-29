   function APIcall(){
    var searchQuery = document.getElementById("searchQuery");

    //cocktail api call
    console.log(searchQuery.value);
    var url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery.value}`;
    $.ajax({url:url, dataType:"json"}).then((data) => {
      try {
        //holds all relevant drink data
        var drinkArr = [data.drinks[0].strDrink, data.drinks[0].strDrinkThumb, data.drinks[0].strInstructions, data.drinks[0].strAlcoholic, data.drinks[0].strGlass];

        //displays cocktail with html added
        displayCocktail(nullSet(drinkArr[0]), nullSet(drinkArr[1]), nullSet(drinkArr[2]), nullSet(drinkArr[3]), nullSet(drinkArr[4]));

        //review button grabbing and event listening
        var reviewButton = document.getElementById("reviewButton");
        reviewButton.addEventListener("click", buttonCallback);
      }
      catch (error){
        console.log("No data");
        console.error(error);
        displayError();
      }
    });
}


  function displayCocktail(drinkName, drinkImage, drinkInstructions, alcohol, glass){
    //specifies word preceding alcohol
    if(alcohol == "Alcoholic") alcohol = "has alcohol";
    else if (alcohol == "Non alcoholic") alcohol = "is non-alcoholic";
    else alcohol = "has optional alcohol";
    
    //cocktail html
    var html = `
      <div class="card">
      <div class="card-header text-dark bg-white d-flex justify-content-center"><strong
              id="drinkName">${drinkName}</strong></div>
      <div class="card-body">
          <img class="card-img-top rounded float-left img-fluid" style="max-width:40%;" src="${drinkImage}"
              alt="${drinkName}">
          <div id="textDiv" class="container-sm float-right">
              <strong>Glass Type</strong>
              <p>${glass}</p>

              <strong>Instructions</strong>
              <p id="drinkInstructions">${drinkInstructions}</p>

              <strong>The ${drinkName} ${alcohol}</strong>
              <br>
              <br>
              <button id="reviewButton" class="btn btn-outline-success my-2 my-sm-0 data-toggle=" modal"
                  data-target="#reviewModal" type="submit">Add Review</button>
          </div>
      </div>
    </div>
    
    ${buildModal(drinkName)}
    `;

    var drinkResult = document.getElementById("drinkResult");
    drinkResult.innerHTML = html;
  };

  function displayError(){
    var html = `
    <div class="card text-white bg-danger mb-3" style="opacity: 0.7">
    <div class="card-body">
    No data was found
    </div>
    </div>`;

    var drinkResult = document.getElementById("drinkResult");
    drinkResult.innerHTML = html;
  }

  function nullSet(curr){
    if(curr == null) {
      curr = '-';
      return curr;
    }  
    else return curr;
  }

  function buttonCallback(){
    $('#reviewModal').modal();
  }


  function buildModal(drinkName){
    var modal = `
        <!-- Modal -->
        <div class="modal fade" id="reviewModal" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="reviewModalLabel"><strong>Add Review</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
             
            <div class="modal-body">
                <div id="modalLabels" class="container float-left">
                <label id="drinkLabel">Cocktail Name</label>
                <br> <br>
                <label id="reviewLabel">Enter your review here</label>
                </div>
          
                <div id="reviewBody" class="container float-right">
                 <form action="/cocktails">
                  <input id="reviewText" name="reviewText" type="text" value="${drinkName}" readonly>
                  <br> <br>
                  
                  <input id="reviewTextBody" name="reviewTextBody" type="text">
                  <br>
                  <button type="submit" class="btn btn-success float-right" >Submit</button>
                  </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
    return modal;
  }