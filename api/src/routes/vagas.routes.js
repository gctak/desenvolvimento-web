const { Router } = require("express");
const router = Router();
const db = require("../database/db");
/*const vagasMock = [
  {
    id: 1,
    titulo: "Dev Frontend React",
    empresa: "TechSimulada",
    tipo: "remoto",
  },
];

router.get("/", (req, res) => {
  res.json(vagasMock);
});

module.exports = router;
*/
router.get("/", (req, res) => {
  const vagas = db
    .prepare(
      `
    SELECT v.*, e.nome AS empresa_nome
    from vagas V
    JOIN empresas e ON e.id = v.empresa_id
    ORDER BY v.created_at DESC
    `,
    )
    .all();

  res.json(vagas);
});

router.post("/", (req, res) => {
  const {
    titulo,
    empresa_id,
    tipo,
    tecnologias,
    salario,
    cep,
    cidade,
    estado,
    descricao,
  } = req.body;

  if (!titulo || !empresa_id || !tipo) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: titulo, empresa_id e tipo" });
  }

  const result = db
    .prepare(
      `INSERT INTO vagas (titulo, empresa_id, tipo, tecnologias, salario, cep, cidade, estado, descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      titulo,
      empresa_id,
      tipo,
      tecnologias || "",
      salario || "",
      cep || "",
      cidade || "",
      estado || "",
      descricao || "",
    );

  const vaga = db
    .prepare("SELECT * FROM vagas WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(vaga);
});

router.get("/:id", (req, res) => {
  const vaga = db
    .prepare(
      `
      SELECT v.*, e.nome AS empresa_nome
      from vagas v
      JOIN empresas e ON e.id = v.empresa_id
      WHERE v.id = ?
      `,
    )
    .get(req.params.id);

  if (!vaga) {
    return res.status(404).json({ erro: "Vaga não encontrada!" });
  }

  res.json(vaga);
});

module.exports = router;
