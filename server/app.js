const express= require('express');
const jwt=require('jsonwebtoken');
const ProductData= require('./model/ProductData');
const UserData= require('./model/UserData');
const cors=require('cors');
const bodyParser=require('body-parser');

const app=express();

app.use(cors());
app.use(bodyParser.json());
 

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request");
    }
    let token=req.headers.authorization.split( ' ' )[1]
    if(token=== 'null'){
return res.status(401).send('Unauthorised request');
    }
    let payload=jwt.verify(token, 'key');
    if(!payload){
        return res.status(401).send('Unauthorised request');
    }
    req.userId=payload.subject
    next()
}





app.get('/kurthas',(req,res)=>{
 
 
    ProductData.find({type:'Kurthas'})
    .then((data)=>{
        res.send(data)
    })

})
app.get('/sarees',(req,res)=>{
 
 
    ProductData.find({type:'Sarees'})
    .then((data)=>{
        res.send(data)
    })

})

app.get('/jeans',(req,res)=>{
 
 
    ProductData.find({type:'Jeans'})
    .then((data)=>{
        res.send(data)
    })

})
app.get('/gowns',(req,res)=>{
 
 
    ProductData.find({type:'Gowns'})
    .then((data)=>{
        res.send(data)
    })

})
app.get('/adminedit',(req,res)=>{
 
 
    ProductData.find()
    .then((data)=>{
        res.send(data)
    })

})
app.post('/product',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    const id=req.body.id;

    ProductData.findOne({_id:id})
.then(function(product)
{
    res.send(JSON.parse(JSON.stringify(product)));
});

});


app.post('/insert', verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    console.log(req.body);
    var product={
       
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        productDate:req.body.product.productDate,
        productAvail:req.body.product.productAvail,
        productNumber:req.body.product.productNumber,
        description:req.body.product.description,
        price:req.body.product.price,
        imageUrl:req.body.product.imageUrl,
        type:req.body.product.type
    }
    var product=new ProductData(product);
    console.log(product);
product.save();

});

app.post('/remove', verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
   const id=req.body.id;

   ProductData.deleteOne({_id:id})
   .then((product)=>
   {
       res.send("deleted product with id");
   })

    
});




app.post('/edit', verifyToken,(req,res)=>
{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var product=
{
  _id:req.body.product['_id'],
  productId:req.body.product['productId'],
  productName:req.body.product['productName'],
  productCode:req.body.product['productCode'],
  productDate:req.body.product['productDate'],
  description:req.body.product['description'],
  price:req.body.product['price'],
  productNumber:req.body.product['productNumber'],
  productAvail:req.body.product['productAvail'],
  imageUrl:req.body.product['imageUrl'],
  type:req.body.product['type']
} 
ProductData.updateOne({_id:product._id},
                      {
                        $set:
                        {
                          productId:product.productId,
                          productName:product.productName,
                          productCode:product.productCode,
                          productDate:product.productDate,
                          productAvail:product.productAvail,
                          productNumber:product.productNumber,
                          description:product.description,
                          price:product.price,
                          imageUrl:product.imageUrl,
                          type:product.type
                        }
                      })
.then((product)=>
{
    console.log(product);
res.send("Updated One Document!");
})
});



app.get('/payment',(req,res)=>
{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id=req.body.id;

    ProductData.findOne({_id:id})
.then(function(product)
{
    res.send(JSON.parse(JSON.stringify(product)));
});
});
  
  
 












app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    
    var user={
        userName:req.body.user.userName,
    usermobile:req.body.user.usermobile,
    userPassword:req.body.user.userPassword,
    userEmail:req.body.user.userEmail,
    userAddress:req.body.user.userAddress,
    zipcode:req.body.user.zipcode
    }
    console.log(user);
   
                var usersign=new UserData(user);
                usersign.save((err,registerdData )=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        let payload={ subject:registerdData._id}
                        let token=jwt.sign(payload,"key")
                        res.status(200).send({token});
                    }
                })
               
});

app.post('/login',function(req,res){
 res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTION")
    let user=req.body;
    

    var password=req.body.user.userPassword;
    // console.log(userPassword);
     
    var email=req.body.user.userEmail;
    var usertype=req.body.user.usertype;
    // console.log(userEmail);
    let status="invalid";



    UserData.findOne({userEmail:email,userPassword:password},(err,userdata)=>{
     if (err){
     console.log(err) ; 
     res.send({status});
     }
     else{ 
         if(!userdata){
         console.log("invalid entry") ;
        res.send({status});    
        }
        
        else if(email=='admin@gmail.com'&& password=="admin@12345"){
            let payload={subject:userdata._id}
            let token1=jwt.sign(payload,"key")
             res.status(200).send({token1});
        }



     else{
      let payload={subject:userdata._id}
     let token=jwt.sign(payload,"key")
     res.status(200).send({token});
    
     }
    }
    
 });

              
});



   
app.listen(3000,function(){
    console.log('listening to port 3000');
});
