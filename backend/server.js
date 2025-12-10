
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import maintenanceRoutes from './routes/maintenance.js'
import User from './models/User.js'
import Maintenance from './models/Maintenance.js'
import bcrypt from 'bcryptjs'
import swaggerDocs from './swagger.js'

const app = express()

// CORS liberado para desenvolvimento
app.use(cors())
app.use(express.json())

// Swagger UI em /docs
swaggerDocs(app)

app.get('/health', (req,res) => res.json({ ok: true }))
app.use('/auth', authRoutes)
app.use('/api/maintenance', maintenanceRoutes)

const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smpm'

async function seed(){
  const userCount = await User.countDocuments()
  if(userCount === 0){
    const passwordHash = await bcrypt.hash('123456', 10)
    await User.create({ name: 'Admin SMPM', email: 'admin@smpm.com', passwordHash, role: 'gestor', provider: 'local' })
    console.log('Usuário seed criado: admin@smpm.com / 123456')
  }
  const mCount = await Maintenance.countDocuments()
  if(mCount === 0){
    const today = new Date()
    const addDays = (d) => new Date(today.getTime() + d*24*60*60*1000)
    await Maintenance.insertMany([
      { machine: 'M1', date: addDays(-2), sector: 'Corte',    status: 'Concluída', notes: 'Troca de correia' },
      { machine: 'M2', date: addDays(1),  sector: 'Solda',    status: 'Pendente',  notes: 'Inspeção preventiva' },
      { machine: 'M3', date: addDays(-1), sector: 'Pintura',  status: 'Atrasada',  notes: 'Reaperto de bicos' }
    ])
    console.log('Manutenções seed inseridas')
  }
}

mongoose.connect(URI).then(async () => {
  console.log('Mongo conectado')
  await seed()
  app.listen(PORT, () => console.log('API ouvindo na porta', PORT))
}).catch(err => {
  console.error('Erro Mongo:', err.message)
  process.exit(1)
})
