import mongoose from "mongoose";

async function connectDB() {
    try {
        const dbConnectionResponse = await mongoose.connect(`${process.env.DATABASE_URI}/ai-notepad`)
        console.log(dbConnectionResponse.connection.host)
    } catch (error) {
        console.log(`Couldn't connect to the db in connectDatabase.js due to - ${error}`);
    }
}

export { connectDB };

