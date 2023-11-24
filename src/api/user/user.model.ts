import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

export const privateFields = ['__v', 'password', 'createdAt', 'updatedAt', '_id'];

const userSchema = new Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    businessName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    this.id = this._id

    if (!this.isModified('password')) {
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})


export type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)