const vagas = [
  {
    id: 1,
    titulo: "Desenvolvedor(a) FrontEnd React",
    empresa: "Empresa Simulada",
    tipo: "remoto",
    tecnologias: ["React", "TypeScript", "CSS"],
    salario: "R$6.000 - R$9.000",
    local: "Remoto",
  },
  {
    id: 2,
    titulo: "Estágio em Segurança da Informação/Cybersecurity",
    empresa: "Hakai Security",
    tipo: "Presencial",
    tecnologias: ["Redes", "Linux", "Python", "Cybersecurity"],
    salario: "R$ 1.500 - R$ 2.200",
    local: "São Paulo",
  },
];
function criarCard(vaga) {
  const article = document.createElement("article");
  article.className = "job-card";
  article.dataset.id = vaga.id;

  const badgeClass =
    {
      remoto: "job-card__badge--remote",
      presencial: "job-card__badge--onsite",
      hibrido: "job-card__badge--hybrid",
    }[vaga.tipo] || "";

  const tipoLabel =
    {
      remoto: "Remoto",
      presencial: "Presencial",
      hibrido: "Híbrido",
    }[vaga.tipo] || vaga.tipo;

  //Header
  const header = document.createElement("div");
  header.className = "job-card__header";

  const badge = document.createElement("span");
  badge.className = `job-card__badge ${badgeClass}`;
  badge.textContent = tipoLabel;

  const title = document.createElement(h3);
  title.className = "job-card__title";
  title.textContent = vaga.titulo;

  const company = document.createElement("p");
  company.className = "job-card__company";
  company.textContext = vaga.empresa;

  header.append(badge, title, company);

  //Body
  const body = document.createElement("div");
  body.className = "job-card__body";

  const tech = document.createElement("p");
  tech.className = "job-card__tech";
  tech.textContent = vaga.tecnologias.join(", ");

  const salary = document.createElement("p");
  salary.className = "job-card__salary";
  salary.textContent = vaga.salario;

  const location = document.createElement("p");
  location.className = "job-card__location";
  location.textContent = vaga.local;

  body.append(tech, salary, location);

  //Adiciona o header e o body dentro do article
  article.append(header, body);

  return article;
}

function renderizarVagas(lista) {
  const grid = document.getElementById("jobs-grid");
  if (!grid) return;

  grid.replaceChildren();

  if (lista.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empyt-msg";
    emptyMsg.textContent = "Nenhuma vaga encontrada";
    grid.appendChild(emptyMsg);
    return;
  }

  const fragment = document.createDocumentFragment();
  lista.forEach((vaga) => fragment.appendChild(criarCard(vaga)));
  grid.appendChild(fragment);
}

//Inicializa a renderização
renderizarVagas(vagas);
