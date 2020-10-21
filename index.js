let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let Datastore = require('nedb');
let db = new Datastore('titles.db');
db.loadDatabase();


app.post('/title',(req,res)=>{
    let obj = {
        title : req.body.title,
        type : req.body.type
    }
    db.insert(obj,(err,newDocs)=>{
        if(err){
            res.json({task:"task failed"});
        }else{
            res.json({task: "success"});
        }
    })
});

app.use('/',express.static('public'));

app.get('/getTitle', (req,res)=>{
    db.find({},(err,docs)=>{
        if(err){
            res.json({task:"task failed"})
        }else{
            let obj = {data:docs};
            res.json(obj);
        }
    })
});

app.listen(8000,()=>{
    console.log('listening at localhost:8000');
})