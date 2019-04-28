import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: 'String', required: true },
    last_name: { type: 'String', required: true },
    birthdate: { type: Date, required: true },
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    role: { type: Number, default: 1 },
    education: { type: 'String', required: true },
    photo: { type: 'String' },
    production: { type: [{ type: Schema.Types.ObjectId, ref: 'Product' }] },
    biography: { type: 'String' },
}, { timestamps: true });

let User = mongoose.model('User', userSchema);

export default User;