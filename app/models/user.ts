import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    isProfessor: { type: Boolean }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = function(password: any) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);