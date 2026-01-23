const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  answer:{
    type:String,
    required:true
  },
  
},
    {timeStamp:true}
);

module.exports=mongoose.model("chatData",chatSchema);