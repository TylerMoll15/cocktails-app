var express = require('express');
var app = express();
var port = 3000;
var pgp = require('pg-promise')();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
module.exports = app;

const dev_dbConfig = {
  host: 'db',
  port: '5432',
  database: 'cocktails_db',
  user: 'postgres',
  password: 'pwd'
};

/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = { rejectUnauthorized: false };
}
const db = pgp(dbConfig);
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');

// // use res.render to load up an ejs view file

// index page
app.get(`/`, function (req, res) {
  res.render('pages/main');
});

// about page
app.get('/reviews', function (req, res) {
  res.render('pages/reviews');
});

app.get(`/home`, (req, res) => {
  res.render('pages/main')
});

//BUG WHERE IF DRINK NAME HAS QUOTES, WEBSITE CRASHES
app.get('/cocktails', function (req, res) {
  var drink = req.query.reviewText;
  var reviewTextBody = req.query.reviewTextBody;
  var today = new Date();
  var date_string = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  var insert_statement = `INSERT INTO cocktails (id, cocktail_title, review, review_date) VALUES ((SELECT MAX(id) + 1 from cocktails), '${drink}', '${reviewTextBody}', '${date_string}');`;
  // insert_statement = `DELETE FROM cocktails WHERE id>1;`;
  var get_cocktails = `SELECT * FROM cocktails;`;

  db.task('get-everything', task => {
    return task.batch([
      task.any(insert_statement),
      task.any(get_cocktails)
    ]);
  })
    .then(info => {
      console.log(info[1]);
      res.render('pages/reviews');
    });
});

app.get(`/cocktails/getReviews/:cocktail`, (req, res) => {
  var cocktailName = req.params['cocktail'];
  cocktailName = cocktailName.slice(1, cocktailName.length);
  //console.log(cocktailName);
  var getReviewsQuery = `SELECT * FROM cocktails WHERE cocktail_title='${cocktailName}';`;
  var getAllReviews = `SELECT * FROM cocktails;`;


  db.task('get-everything', task => {
    return task.batch([
      task.any(getReviewsQuery),
      task.any(getAllReviews)
    ]);
  })
    .then(reviews => {
      console.log(reviews);
      if(reviews[0][0]) res.send(reviews[0]);
      else res.send(reviews[1])
    });
})

app.get("/drinks", (request, response) => {
  response.send({message: "Mojito"});
});

app.get("/drinkMath", (request, response) => {
  var drinkNumber = 10;
  var amountOfDrinks = 15;
  response.send({number: drinkNumber * amountOfDrinks});
});


// function removeQuotes(drinkName){
//   for(i = 0; i < drinkName.length; i++) if(drinkName[i] == '\'') drinkName[i] = '';
//   return drinkName;
// }


app.listen(port);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Server running → PORT 3000`);
});

//How do I connect db to heroku?
//Are my mocha tests ok?