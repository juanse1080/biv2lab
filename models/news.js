import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: { type: 'String', required: true },
    photo: { type: 'String', required: true },
    description: { type: 'String', required: true },
}, { timestamps: true });

let Post = mongoose.model('New', newSchema);

export default Post;