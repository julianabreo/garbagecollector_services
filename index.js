console.log('start process');

const ConductoresWs = require('./controllers/ConductoresWs');
const Conductor = require('./models/Conductor');


var  express = require('express');
var bodyP = require('body-parser');
var cors = require('cors');
const { json } = require('body-parser');

var app  = express();
var router =express.Router();

app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());
app.use(cors());
app.use('/API', router);

// getConductores
router.route('/getConductores').get((request, response) => {
    ConductoresWs.getConductores().then(result => {
       response.json(result[0])
    });
});

// getConductores
router.route('/getConductorByid/:id_conductor').get((request, response) => {
   ConductoresWs.getConductorByid(request.params.id_conductor).then(result => {
      response.json(result[0])
   });
});

// postConductores
router.route('/postConductor').post((request, response) => {
    let conductor = {...request.body}
    ConductoresWs.postConductor(conductor).then(result => {
       response.json('se ha insertedo con exito el conductor');
    }, (err) => {
       console.log(err.message);
       response.json(err.message)
    });
});

// putConductores
router.route('/putConductor').put((request, response) => {
    let conductor = {...request.body}
    ConductoresWs.putConductor(conductor).then(result => {
       response.json('se ha actualizado con exito el conductor');
    }, (err) => {
       console.log(err.message);
       response.json(err.message)
    });
});

// deletetConductores
router.route('/deleteConductor').delete((request, response) => {
    let conductor = {...request.body}
    ConductoresWs.deleteConductor(conductor).then(result => {
       response.json('se ha eliminado exito el conductor');
    }, (err) => {
       console.log(err.message);
       response.json(err.message)
    });
});



var portcnx = process.env.PORT || 5000;
app.listen(portcnx);
console.log('end process'); 