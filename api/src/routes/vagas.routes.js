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
module.exports = router;
