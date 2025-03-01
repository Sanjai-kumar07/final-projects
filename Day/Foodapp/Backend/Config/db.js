import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sanjaismart77:sanjaisds2976@cluster0.wc6jy.mongodb.net/food-app?retryWrites=true&w=majority&appName=Cluster0")
     .then(()=>console.log("DB Connected"))
}


// mongodb+srv://sanjaismart77:sanjaisds2976@cluster0.wc6jy.mongodb.net/food-app?retryWrites=true&w=majority&appName=Cluster0

// "mongodb+srv://sanjaismart77:sanjaisds2976@cluster0.wc6jy.mongodb.net/food-app"