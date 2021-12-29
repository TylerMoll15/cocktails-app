   function APIcall(){
    var searchQuery = document.getElementById("searchQuery");
    //resets error card
    document.getElementById("drinkResult").style.display = "none";

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

        //make gif inivisible
        var gif = document.getElementById("cocktailsDemo");
        gif.style.display = "none";
      }
      catch (error){
        document.getElementById("mainDiv").style.display = 'none';
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

    var drinkName_ = document.getElementById("drinkName");
    var glass_ = document.getElementById("glass");
    var drinkImage_ = document.getElementById("drinkImage");
    var drinkInstructions_ = document.getElementById("drinkInstructions");
    var alcohol_ = document.getElementById("alcohol");

    //setting card values
    drinkName_.innerHTML = drinkName;
    drinkImage_.src = drinkImage;
    drinkImage_.alt = drinkName;
    glass_.innerHTML = glass;
    drinkInstructions_.innerHTML = drinkInstructions;
    alcohol_.innerHTML = `The ${drinkName} ${alcohol}`;

    document.getElementById("mainDiv").style.display = "inline";
    document.getElementById("reviewText").value = drinkName;

  };

  function displayError(){
    document.getElementById("drinkResult").style.display = "inline";
    document.getElementById("cocktailsDemo").style.display = "none";
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