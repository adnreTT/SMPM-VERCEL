import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Preencha todos os campos" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciais inválidas" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Credenciais inválidas" });
    const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user._id.toString(), name: user.name, email: user.email }});
  } catch(e){ console.log(e); return res.status(500).json({ error:"Erro interno" }); }
});

router.post("/register", async (req,res)=>{
  try{
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({error:"Preencha todos os campos"});
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({error:"E-mail já cadastrado"});
    const passwordHash = await bcrypt.hash(password,10);
    const user = await User.create({name,email,passwordHash,role:"gestor",provider:"local"});
    const token = jwt.sign({sub:user._id.toString(),email:user.email},process.env.JWT_SECRET,{expiresIn:"7d"});
    return res.status(201).json({token,user:{id:user._id.toString(),name:user.name,email:user.email}});
  }catch(e){console.log(e);return res.status(500).json({error:"Erro ao registrar"});}
});

export default router;
