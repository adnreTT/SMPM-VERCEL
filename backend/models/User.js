
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'gestor' },
  provider: { type: String, default: 'local' }
}, { timestamps: true })

export default mongoose.model('User', userSchema)
