// firebase-admin.js
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// caminho absoluto para o JSON
const serviceAccount = JSON.parse(fs.readFileSync("./config/serviceAccountKey.json", "utf-8"));


// inicializa o Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { admin, db };
