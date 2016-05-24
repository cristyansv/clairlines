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


router.post('/nuevotrayecto', function (req, res) {


    var data = req.body;


    var consulta = `insert INTO Trayecto (idtrayecto, idavion, idviaje, horasalida, fechasalida, horallegada, fechallegada)`+
    `VALUES ('${data.idtrayecto}', ${data.actualAvion}, ${data.actualViaje}, '${data.fechaSalida} ${data.horaSalida}', '${data.fechaSalida}', '${data.fechaLlegada} ${data.horaLlegada}', '${data.fechaLlegada}')`;


    var empleados = "";

    for(var i = 0; i<data.abordo.length; i++){
        var str;
        if(i == data.abordo.length-1){
            str = `(${data.abordo[i].idempleado}, '${data.idtrayecto}')`;
        }else{
            str = `(${data.abordo[i].idempleado}, '${data.idtrayecto}'),`;
        }
        empleados+= str;
    }
    
    
    
    var abordo = `insert into Personalabordo (idempleado, idtrayecto) VALUES ${empleados};`;



    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            connection.query(abordo, function(err, rows) {
                if(err){
                    res.send(err);
                }else {
                    res.send(rows);
                }
            });

        }
    });

});


router.get("/getAviones", function (req, res) {
    connection.query("Select * from Avion", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getEmpleados", function (req, res) {
    connection.query("Select * from Empleado join Cargos on Empleado.idcargo = Cargos.idcargo", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getPasajeros", function (req, res) {
    connection.query("Select * from Pasajero", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getAeropuertos", function (req, res) {
    connection.query("Select * from Aeropuerto", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getPersonalabordo", function (req, res) {
    connection.query("Select * from Personalabordo", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getTiquetes", function (req, res) {
    connection.query("Select * from Tiquete", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getTrayectos", function (req, res) {
    connection.query("Select * from Trayecto", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getViajes", function (req, res) {
    connection.query("Select * from Viaje", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getCargos", function (req, res) {
    connection.query("Select * from Cargos", function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});



router.post('/nuevoPasajero', function (req, res) {


  var nombre = req.body.nombre;
  var cedula = req.body.cedula;


  var consulta = "insert into Pasajero (nombre, cedula) values ('"+nombre+"','"+cedula+"')";

    console.log(consulta);

  connection.query(consulta, function(err, rows) {
    if(err){
      res.send(err);
    }else {
      res.send(rows);
    }
  });
});

module.exports = router;


router.post('/nuevoAvion', function (req, res) {


  var nroasientos = req.body.nroasientos;
  var disponibilidad = req.body.disponibilidad;
  var modelo = req.body.modelo;


  var consulta = "insert into Avion  (nroasientos, disponibilidad, modelo) values ("+nroasientos+","+disponibilidad+",'"+modelo+"')";

    console.log(consulta);


  connection.query(consulta, function(err, rows) {
    if(err){
      res.send(err);
    }else {
      res.send(rows);
    }
  });
});


router.post('/deshabilitar', function (req, res) {

    console.log(req.body.aviones);

    var aviones = req.body.aviones;

    var string = "";

    for(var i=0; i<aviones.length; i++){
        if(i==aviones.length-1){
            string+=aviones[i];
        }else{
            string+=(aviones[i]+",");
        }
    }

    var consulta = "UPDATE Avion set disponibilidad=0 where idavion in("+string+");";

    console.log(consulta);


    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.post('/activar', function (req, res) {

    console.log(req.body.aviones);

    var aviones = req.body.aviones;

    var string = "";

    for(var i=0; i<aviones.length; i++){
        if(i==aviones.length-1){
            string+=aviones[i];
        }else{
            string+=(aviones[i]+",");
        }
    }

    var consulta = "UPDATE Avion set disponibilidad=1 where idavion in("+string+");";

    console.log(consulta);


    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});




module.exports = router;


router.post('/nuevoEmpleado', function (req, res) {


    var cedula = req.body.cedula;
    var nombre = req.body.nombre;
     var apellido = req.body.apellido;
     var idcargo = req.body.idcargo;


  var consulta = "insert into Empleado (cedula, nombre, apellido, idcargo) values ("+cedula+",'"+nombre+"','"+apellido+"', "+idcargo+")";


    console.log(consulta);

  connection.query(consulta, function(err, rows) {
    if(err){
      res.send(err);
    }else {
      res.send(rows);
    }
  });
});




module.exports = router;


router.post('/nuevoAeropuerto', function (req, res) {

    var id = req.body.id;
    var nombre = req.body.nombre;
    var ciudad = req.body.ciudad;


  var consulta = "insert into Aeropuerto (idaeropuerto, nombreaeropuerto, ciudad) values ('"+id+"', '"+nombre+"','"+ciudad+"')";

    console.log(consulta);


  connection.query(consulta, function(err, rows) {
    if(err){
      res.send(err);
    }else {
      res.send(rows);
    }
  });
});

module.exports = router;

router.post('/nuevoPersonalabordo', function (req, res) {


    var idempleado = req.body.idempleado;
    var idtrayecto = req.body.idtrayecto;


    console.log(idempleado,idtrayecto);


    var consulta = "insert into Personalabordo (idempleado, idtrayecto) values ("+idempleado+", "+idtrayecto+")";


    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


module.exports = router;



router.post('/nuevoTiquete', function (req, res) {


    var idtiquete = req.body.idtiquete;
    var precio= req.body.precio;
    var idpasajero= req.body.idpasajero;
    var idtrayecto= req.body.idtrayecto;



    console.log(idtiquete,precio,idpasajero,idtrayecto);


    var consulta = "insert into Tiquete (idtiquete, precio, idpasajero, idtrayecto) values ("+idtiquete+", "+precio+", "+idpasajero+",, "+idtrayecto+")";


    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


module.exports = router;



router.post('/nuevoTrayecto', function (req, res) {


    var idtrayecto = req.body.idtrayecto;
    var idavion= req.body.idavion;
    var idviaje= req.body.idviaje;
    var horasalida= req.body.horasalida;
    var fechasalida= req.body.fechasalida;
    var horallegada= rq.body.horallegada;
    var fechallegada=rq.body.fechallegada;



    console.log(idtrayecto,idavion,idviaje,horasalida,fechasalida,horallegada,fechallegada);


    var consulta = "insert into Trayecto (idtrayectp, idavion, idpasajero, horasalida, fechasalida, horallegada, fechallegada)" +
        " values ("+idtrayecto+", "+idavion+", "+idviaje+","+horasalida+","+fechasalida+","+horallegada+","+fechallegada+")";


    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

module.exports = router;



router.post('/nuevoViaje', function (req, res) {



    var origen = req.body.origen;
    var destino = req.body.destino;
    var tarifa = req.body.tarifa;

    console.log(origen, destino, tarifa);

    var consulta = `insert into Viaje (idaeropuertoorigen, idaeropuertodestino, tarifa) values ('${origen}', '${destino}', '${tarifa}')`;

    console.log(consulta);


    connection.query(consulta, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


module.exports = router;


router.get("/getEmpleadoById/:id", function (req, res) {
    connection.query("Select * from Empleado where idempleado = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getPasajeroById/:id", function (req, res) {
    connection.query("Select * from Pasajero where idpasajero = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getTiqueteById/:id", function (req, res) {
    connection.query("Select * from Tiquete where idtiquete = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getTrayectoById/:id", function (req, res) {
    connection.query("Select * from Trayecto where idetrayecto = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getViajeById/:id", function (req, res) {
    connection.query("Select * from Viaje where idviaje = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getAvionById/:id", function (req, res) {
    connection.query("Select * from Avion where idavion = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getAeropuertoById/:id", function (req, res) {
    connection.query("Select * from Aeropuerto where idaeropuerto = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getCargoById/:id", function (req, res) {
    connection.query("Select cargo from Cargo where id = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getAeropuertoByCiudad/:id" , function (req, res) {
    connection.query("Select * from Aeropuerto where ciudad = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getAeropuertoByNombreAeropuerto/:id", function (req, res) {
    connection.query("Select * from Aeropuerto where nombreaeropuerto = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getAvionByDisponibilidad/:id", function (req, res) {
    connection.query("Select * from Avion where disponibilidad = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getAvionByNroasientos/:id", function (req, res) {
    connection.query("Select * from Avion where nroasientos = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getAvionByModelo/:id", function (req, res) {
    connection.query("Select * from Avion where modelo = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});



router.get("/getEmpleadoBycedula/:id", function (req, res) {
    connection.query("Select * from Empleado where cedula = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getEmpleadoBynombre/:id", function (req, res) {
    connection.query("Select * from Empleado where nombre = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getEmpleadoByapellido/:id", function (req, res) {
    connection.query("Select * from Empleado where apellido = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});


router.get("/getEmpleadoBycargo/:id", function (req, res) {
    connection.query("Select * from Empleado where cargo = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getEmpleadoBycategoria/:id", function (req, res) {
    connection.query("Select * from Empleado where categoria = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getPasajeroBycedula/:id", function (req, res) {
    connection.query("Select * from Aeropuerto where cedula = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getPasajeroBynombre/:id", function (req, res) {
    connection.query("Select * from Aeropuerto where nombre = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getPersonal_a_bordoByidempleado/:id", function (req, res) {
    connection.query("Select * from Persona_a_bordo where idempleado = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

router.get("/getPersonal_a_bordoByidtrayecto/:id", function (req, res) {
    connection.query("Select * from Persona_a_bordo where idtrayecto = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});




router.get("/getTarifaByIdviaje/:id", function (req, res) {
    connection.query("Select * from Aeropuerto where idviaje = "+req.params.id, function(err, rows) {
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});
