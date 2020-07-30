const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost:27017/DressLockerDb');
// mongoose.connect('mongodb+srv://user_kp:12345@mycluster.dtwrb.azure.mongodb.net/DressLockerDb?retryWrites=true&w=majority');
const Schema=mongoose.Schema;

var UserSchema=new Schema({
    
    userName:String,
    userUName:String,
    userPassword:String,
    userEmail:String,
    usertype:String
});

var Userdata=mongoose.model('user',UserSchema,'users');
module.exports=Userdata;
