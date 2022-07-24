import mongoose from 'mongoose';

async function connect() {
    try {
		const uri = "mongodb+srv://quang:1234567890@cluster0.n55cuss.mongodb.net/food?retryWrites=true&w=majority";
        await mongoose.connect(
            process.env.MONGODB_URL || uri,
            {}
        );
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Connect to database failed');
    }
}
export default {connect};