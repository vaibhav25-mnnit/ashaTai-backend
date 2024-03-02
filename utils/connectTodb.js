import mongoose from 'mongoose'

async function connectTodb() {
    try {
        await mongoose.connect(process.env.MONGODB_DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to database 🤘')
    } catch (err) {
        console.log(err)
    }
}

export default connectTodb

