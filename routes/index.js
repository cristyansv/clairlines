var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '207.223.165.157',
  user     : 'clairlines',
  password : '22clairlines',
  database : 'clairlines'
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/query', function (req, res) {

  console.log(req.body.query);

  connection.query(req.body.query, function(err, rows) {
      if(err){
        res.send(err);
      }else {
        res.send(rows);
      }
  });
});

router.get("/getUserById/:id", function (req, res) {
  connection.query("Select * from Pasajero where ID_pasajero = "+req.params.id, function(err, rows) {
    if(err){
      res.send(err);
    }else {
      res.send(rows);
    }
  });
});





module.exports = router;
