import mongoose from "mongoose";

const connectMongo = async () => {
    if(mongoose.connection.readyState >= 1){
        return; // already connected
    }

    const uri = process.env.MONGODB_URI as string; // Type assertion

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    return mongoose.connect(uri);
}

export default connectMongo;