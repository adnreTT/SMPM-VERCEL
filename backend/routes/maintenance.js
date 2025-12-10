
/**
 * @swagger
 * tags:
 *   name: Manutencoes
 *   description: Gestão de manutenções de máquinas
 */


import express from 'express'
import Maintenance from '../models/Maintenance.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()
router.use(verifyToken)


/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Lista todas as manutenções
 *     tags: [Manutencoes]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get('/', async (req,res) => {
  const list = await Maintenance.find().sort({ date: 1 })
  res.json(list)
})

router.get('/:id', async (req,res) => {
  const m = await Maintenance.findById(req.params.id)
  if(!m) return res.status(404).json({ error: 'Não encontrado' })
  res.json(m)
})


/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Cria uma nova manutenção
 *     tags: [Manutencoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               machine:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               sector:
 *                 type: string
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Criado com sucesso
 */
router.post('/', async (req,res) => {
  try{
    const { machine, date, sector, status, notes } = req.body
    const m = await Maintenance.create({ machine, date, sector, status, notes })
    res.status(201).json(m)
  }catch(e){
    res.status(400).json({ error: 'Dados inválidos' })
  }
})

router.put('/:id', async (req,res) => {
  const m = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if(!m) return res.status(404).json({ error: 'Não encontrado' })
  res.json(m)
})

router.delete('/:id', async (req,res) => {
  const m = await Maintenance.findByIdAndDelete(req.params.id)
  if(!m) return res.status(404).json({ error: 'Não encontrado' })
  res.json({ ok: true })
})

export default router
