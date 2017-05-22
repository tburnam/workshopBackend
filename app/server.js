import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static('static'));
// enables static assets from folder static
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("../workshop-87264-firebase-adminsdk-wx890-751dabcaa1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://workshop-87264.firebaseio.com"
});

// default index route
app.get('/', (req, res) => {
  // var imageURL = "http://i2.cdn.cnn.com/cnnnext/dam/assets/141013104244-hendrix4-horizontal-large-gallery.jpeg"
  // var title = "Jimi Hendrix"
  // var content = "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  // var time = getDateTime()
  //
  var db = admin.database();
  var ref = db.ref("posts/");
  // ref.push({imageURL, title, content, time})
  //
  // var imageURL = "http://www.konbini.com/fr/files/2014/06/Bob-Dylan-bd.jpg"
  // var title = "Bob Dylan"
  // var content = "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  // var time = getDateTime()
  //
  // ref.push({imageURL, title, content, time})

  var imageURL = "http://www.uofmusic.com/wp-content/uploads/2016/03/Jimmy_Page_7.jpg"
  var title = "Jimmy Page"
  var content = "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  var time = getDateTime()

  ref.push({imageURL, title, content, time})

  res.send('hi');
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
