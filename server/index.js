var express = require('express');
var app = express();
var fs = require('fs');
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const multer = require('multer');


const storage = multer.diskStorage({
    destination : function(req, file, cb){
     cb(null, './server/uploads/');//http://www.webticsa.com/memes/assets/
    },

    filename : function(req, file, cb){
        var ruta = file.originalname;
        cb(null, ruta);
        req.body.document = ruta; 
    }
});
const upload = multer({storage : storage});

var username = '293fc34d-d534-4e71-8c03-0d45a245d508';
var password = 'jek6Yz7E4Sha';
var environment_id = '2d3a404e-0481-4daa-a807-5e5ebc759eae';
var discovery = new DiscoveryV1({
  username: username,
  password: password,
  version: 'v1',
  version_date: '2017-11-07'
});

app.use(express.static('client'));
/* app.use(express.static('client'));
discovery.getEnvironments({}, function(error, data) {
    console.log(JSON.stringify(data, null, 2));
});

discovery.getCollections({ environment_id: environment_id }, function(error, data) {
    console.log(JSON.stringify(data, null, 2));
});
 */
/* discovery.query({ environment_id: '2d3a404e-0481-4daa-a807-5e5ebc759eae', collection_id: 'b1e8321c-e132-421b-b8a9-5f77c37cede7', query: 'diabetes' }, function(error, data) {
    console.log(JSON.stringify(data, null, 2));
});
 */

/* 
var file = fs.readFileSync('{/path/to/file}');

discovery.addDocument({ environment_id: '{environment_id}', collection_id: '{collection_id}', file: '{file}' },
function(error, data) {
  console.log(JSON.stringify(data, null, 2));
}); */

app.post('/addDocument',upload.single('document'),function(req, res){
    console.log(req.body.document);
     var file = fs.readFileSync('./server/uploads/'+req.body.document);

    discovery.addDocument({ environment_id: '2d3a404e-0481-4daa-a807-5e5ebc759eae', collection_id: 'b1e8321c-e132-421b-b8a9-5f77c37cede7', file: file },
        function(error, data) {
            if(error){
                console.log(JSON.stringify(data, null, 2));
                res.status(500).send({mensaje:'listo'});
            }
            else{
                console.log(JSON.stringify(data, null, 2));
                res.status(200).send({mensaje:'listo'});
            }
            
        }); 
});

app.get('/data', function(req, res){
  discovery.query({ environment_id: '2d3a404e-0481-4daa-a807-5e5ebc759eae', collection_id: 'b1e8321c-e132-421b-b8a9-5f77c37cede7', query: 'diabetes' }, function(error, data) {
    res.status(200).send(JSON.stringify(data, null, 2));
});
    
});



app.listen(process.env.PORT || 3000, function(){
    console.log('servidor en puerto 3000');
});