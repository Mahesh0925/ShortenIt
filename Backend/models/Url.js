import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    full_url:{
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 }
});

const shortUrl = mongoose.model("shortUrl", UrlSchema);

export default shortUrl;