
var express = require('express');
var app = express();






var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let unixDate;
  let dateObj; 

  let isUnix=/^\d+$/.test(date);

  if(!date){
    dateObj= new Date(); 
  }
  else if(date && isUnix){
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);  
  }
  else if(date && !isUnix){
    dateObj = new Date(date);
  }

  if(dateObj.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
    return;
  }

    unixDate = dateObj.getTime();
    utcDate = dateObj.toUTCString();
  
  res.json({unix: unixDate, utc: utcDate});
});



var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
