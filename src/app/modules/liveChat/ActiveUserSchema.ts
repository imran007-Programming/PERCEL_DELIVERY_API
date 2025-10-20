import  mongoose  from 'mongoose';
const activeUserSchema=new mongoose.Schema({
    userId:String,
    roomId:String,
    userName:String,
    socketId:String,
    lastSeen:{type:Date,default:Date.now}
},{
    versionKey:false
}

)

export const ActiveUser=mongoose.model("ActiveUser",activeUserSchema)