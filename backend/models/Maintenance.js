
import mongoose from 'mongoose'

const maintenanceSchema = new mongoose.Schema({
  machine: { type: String, required: true },
  date: { type: Date, required: true },
  sector: { type: String, required: true },
  status: { type: String, enum: ['Concluída','Pendente','Atrasada'], default: 'Pendente' },
  notes: { type: String }
}, { timestamps: true })

export default mongoose.model('Maintenance', maintenanceSchema)
