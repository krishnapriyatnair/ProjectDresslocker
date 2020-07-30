const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/DressLockerDb',err =>{
    if (err){
        console.error(err)
    }
    else{
        console.log("connected to db" );
    }
});

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:String,
    price:Number,
    productCode:String,
    productDate:String,
    productNumber:Number,
     productAvail:String,
     description:String,
     imageUrl:String,
     type:String
});
module.exports=mongoose.model('data',productSchema,'datas')