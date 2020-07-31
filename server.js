
var express=require('express');
var app=express();
var sqlite3=require('sqlite3');
var db=new sqlite3.Database('db/comments.db');
var bodyParser=require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
//route
app.get('/', function(request,response){
    response.send('Hello World');
     
})
app.get('/comments', function(request,response){
    console.log('GET request received at /comments');
    db.all('SELECT * FROM comments',function(err, rows){
        if(err){ 
            console.log("Error:"+ err);
        }else{
            response.send(rows); 
        }
    }) 
})

app.post('/comments', function(request,response){
    console.log('POST request received at /comments');
     db.run('INSERT INTO comments VALUES(?,?)',[request.body.name,request.body.comment],
       function(err){
         if(err){
             console.log("Error: " +err);
         }else{
             response.status(200).redirect('index.html');
         }
     });
});
app.listen(3000, function(){
    console.log('server is running on port 3000');
});
  