// controllers/pessoaController.js

import {admin} from "../config/firebaseAdmin.js";

// se já inicializou no seu index.js, não precisa inicializar de novo aqui
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const pessoaRef = db.collection("Pessoa");

// GET - listar todas as pessoas
export const getAll = async (req, res) => {
  try {
    const snapshot = await pessoaRef.get();
    let pessoas = [];

    for (const doc of snapshot.docs) {
        const data = doc.data(); // pega os campos salvos no Firestore

        pessoas.push({
          Id: doc.id,   // ID do documento
          Nome: data.Nome,
          CPF: data.CPF,
          Idade: data.Idade,
          Telefone: data.Telefone,
          Email: data.Email
        });
        
    }

    console.log(pessoas);

    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET by ID
export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await pessoaRef.doc(id).get();
    
        if (!doc.exists) {
          return res.status(404).json({ message: "Pessoa não encontrada" });
        }
    
        res.status(200).json({ id: doc.id, ...doc.data() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};


// POST - adicionar pessoa
export const create = async (req, res) => {
  try {
    const data = req.body;
    const docRef = await pessoaRef.add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - atualizar pessoa
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await pessoaRef.doc(id).update(data);
    res.status(200).json({ id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - remover pessoa
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await pessoaRef.doc(id).delete();
    res.status(200).json({ message: "Pessoa removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
