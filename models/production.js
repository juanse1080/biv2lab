import { model, Schema as _Shema } from 'mongoose';
import timestamp from 'mongoose-timestamp';
const Schema = _Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },
    education: String,
    photo:String,
    // production: [{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     refer: production,
    // }],
    biography: String, 
    deleted_at: {
        type: Date, 
        default: null,
        null: true,
    },
});
UserSchema.plugin(timestamp);
export default User = model('User', UserSchema);