import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        mongoose.connection.on('connected', ()=>console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGO_URI}`);
    }catch(err){
        console.log(`Error: ${err.message}`)
        process.exit(1);
    }

}

export default connectDB;