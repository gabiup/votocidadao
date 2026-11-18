/* ============================================================
   VOTO CIDADÃO — JavaScript (vanilla)
   Versão Consolidada, Corrigida e Funcional
   ============================================================ */

/* ===== DADOS DE REGIÕES E CARGOS ===== */
const REGIOES = {
  brasil: { nome: "Brasil", estados: ["AC","AM","AP","PA","RO","RR","TO","AL","BA","CE","MA","PB","PE","PI","RN","SE","DF","GO","MT","MS","ES","MG","RJ","SP","PR","RS","SC"], zona: null },
  norte: { nome: "Norte", estados: ["AC","AM","AP","PA","RO","RR","TO"], zona: "norte" },
  nordeste: { nome: "Nordeste", estados: ["AL","BA","CE","MA","PB","PE","PI","RN","SE"], zona: "nordeste" },
  "centro-oeste": { nome: "Centro-Oeste", estados: ["DF","GO","MT","MS"], zona: "centro" },
  sudeste: { nome: "Sudeste", estados: ["ES","MG","RJ","SP"], zona: "sudeste" },
  sul: { nome: "Sul", estados: ["PR","RS","SC"], zona: "sul" },
};

const UF_NOMES = {
  AC:"Acre",AM:"Amazonas",AP:"Amapá",PA:"Pará",RO:"Rondônia",RR:"Roraima",TO:"Tocantins",
  AL:"Alagoas",BA:"Bahia",CE:"Ceará",MA:"Maranhão",PB:"Paraíba",PE:"Pernambuco",PI:"Piauí",
  RN:"Rio Grande do Norte",SE:"Sergipe",
  DF:"Distrito Federal",GO:"Goiás",MT:"Mato Grosso",MS:"Mato Grosso do Sul",
  ES:"Espírito Santo",MG:"Minas Gerais",RJ:"Rio de Janeiro",SP:"São Paulo",
  PR:"Paraná",RS:"Rio Grande do Sul",SC:"Santa Catarina",
};

const CARGOS = {
  presidente: { nome:"Presidente da República", nivel:"nacional", temVice:true, oQueFaz:"Administra o governo federal, sanciona ou veta leis aprovadas pelo Congresso, propõe o orçamento da União, representa o Brasil no exterior e comanda as Forças Armadas.", salario:"R$ 41.650 / mês (2026)", beneficios:"Moradia oficial, segurança pessoal 24h, verba de representação e aposentadoria especial.", mandato:"4 anos, com direito a 1 reeleição" },
  governador: { nome:"Governador(a)", nivel:"estadual", temVice:true, oQueFaz:"Chefe do Poder Executivo estadual. Administra a máquina pública do estado, propõe e sanciona leis estaduais e gerencia segurança pública, saúde e educação estaduais.", salario:"R$ 22.000 a 33.000 / mês (varia por estado)", beneficios:"Moradia oficial, segurança pessoal, veículo oficial e verba de representação.", mandato:"4 anos, com direito a 1 reeleição", regional: { sudeste:{salario:"R$ 28.000 a 33.000 / mês",beneficios:"Moradia oficial, segurança pessoal, veículo oficial e verba de representação (varia de estado pra estado)."}, sul:{salario:"R$ 25.000 a 30.000 / mês",beneficios:"Moradia oficial, segurança pessoal e verba de representação."}, nordeste:{salario:"R$ 22.000 a 28.000 / mês",beneficios:"Moradia oficial, segurança pessoal e veículo oficial."}, norte:{salario:"R$ 20.000 a 26.000 / mês",beneficios:"Moradia oficial, segurança pessoal e veículo oficial."}, "centro-oeste":{salario:"R$ 24.000 a 30.000 / mês",beneficios:"Moradia oficial, segurança pessoal, veículo oficial e verba de representação."} } },
  senador: { nome:"Senador(a)", nivel:"estadual", temVice:false, oQueFaz:"Representa o estado no Congresso Nacional. Vota leis federais, aprova indicações para cargos como ministros do STF e fiscaliza o Executivo.", salario:"R$ 33.763 / mês", beneficios:"Verba de gabinete, cota de passagens aéreas, auxílio-moradia e plano de saúde.", mandato:"8 anos (renovação alternada de 1/3 e 2/3 do Senado)", regional: { sudeste:{oQueFaz:"Representa o estado no Senado. Vota leis federais e fiscaliza o Executivo, com foco em comissões de infraestrutura e economia. Cada candidato elege consigo dois suplentes."}, sul:{oQueFaz:"Representa o estado no Senado. Atua em comissões de agricultura e meio ambiente."}, nordeste:{oQueFaz:"Representa o estado no Senado. Atua em comissões de desenvolvimento regional e saúde."}, norte:{oQueFaz:"Representa o estado no Senado. Atua em comissões de meio ambiente e povos tradicionais."}, "centro-oeste":{oQueFaz:"Representa o estado no Senado. Atua em comissões de agronegócio e infraestrutura."} } },
  "deputado-federal": { nome:"Deputado(a) Federal", nivel:"estadual", temVice:false, oQueFaz:"Representa o estado na Câmara dos Deputados. Propõe e vota projetos de lei federais e emendas constitucionais.", salario:"R$ 46.366 / mês", beneficios:"Verba de gabinete, cota parlamentar, auxílio-moradia e passagens aéreas.", mandato:"4 anos" },
  "deputado-estadual": { nome:"Deputado(a) Estadual", nivel:"estadual", temVice:false, oQueFaz:"Representa a população na Assembleia Legislativa do estado. Propõe e vota leis estaduais e fiscaliza o governo estadual.", salario:"R$ 25.000 a 35.000 / mês (varia por estado)", beneficios:"Verba de gabinete, cota parlamentar e auxílio-moradia.", mandato:"4 anos", regional: { sudeste:{salario:"R$ 30.000 a 35.000 / mês",beneficios:"Verba de gabinete, cota parlamentar, auxílio-moradia e passagens aéreas."}, sul:{salario:"R$ 26.000 a 32.000 / mês",beneficios:"Verba de gabinete, cota parlamentar e auxílio-moradia."}, nordeste:{salario:"R$ 25.000 a 30.000 / mês",beneficios:"Verba de gabinete e cota parlamentar."}, norte:{salario:"R$ 22.000 a 28.000 / mês",beneficios:"Verba de gabinete e cota parlamentar."}, "centro-oeste":{salario:"R$ 26.000 a 32.000 / mês",beneficios:"Verba de gabinete, cota parlamentar e auxílio-moradia."} } },
  "deputado-distrital": { nome:"Deputado(a) Distrital", nivel:"estadual", temVice:false, oQueFaz:"Representa a população do Distrito Federal na Câmara Legislativa. Propõe e vota leis distritais e fiscaliza o GDF.  ", salario:"R$ 28.000 a 32.000 / mês", beneficios:"Verba de gabinete, cota parlamentar e auxílio-moradia.", mandato:"4 anos", regional: { "centro-oeste":{salario:"R$ 28.000 a 32.000 / mês",beneficios:"Verba de gabinete, cota parlamentar e auxílio-moradia."} } },
};

const CARGO_ORDER = ["presidente","governador","senador","deputado-federal","deputado-estadual","deputado-distrital"];
const AVATAR_COLORS = ["#159AAE","#1E4FA6","#2FA84F","#E4402F","#0A5C6B","#7A5300"];
const FONTES_AGENCIAS = ["Agência Lupa","Aos Fatos","Projeto Comprova"];

/* ===== CANDIDATOS REAIS PARA PRESIDENTE ===== */
const CANDIDATOS_PRESIDENTE = [
  {
    "id": 1,
    "numero": 13,
    "coligacao": "BRASIL PRONTO PRA MAIS",
    "composicao_coligacao": "PSB / PDT / FEDERAÇÃO BRASIL DA ESPERANÇA - FE BRASIL (PT / PC do B / PV) / FEDERAÇÃO PSOL REDE (PSOL / REDE)",
    "presidente": {
      "nome_urna": "LULA",
      "nome_completo": "LUIZ INÁCIO LULA DA SILVA",
      "partido_sigla": "PT",
      "genero": "MASCULINO",
      "grau_instrucao": "ENSINO FUNDAMENTAL COMPLETO",
      "ocupacao": "TORNEIRO MECÂNICO",
      "uf_nascimento": "PE",
      "foto": "img/fotos-candidatos/presidencia/lula.png"
    },
    "vice": {
      "nome_urna": "GERALDO ALCKMIN",
      "partido_sigla": "PSB",
      "ocupacao": "MÉDICO",
      "uf_nascimento": "SP"
    }
  },
  {
    "id": 2,
    "numero": 14,
    "coligacao": null,
    "composicao_coligacao": "MISSÃO",
    "presidente": {
      "nome_urna": "RENAN SANTOS",
      "nome_completo": "RENAN ANTONIO FERREIRA DOS SANTOS",
      "partido_sigla": "MISSÃO",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR INCOMPLETO",
      "ocupacao": "EMPRESÁRIO",
      "uf_nascimento": "SP",
      "foto": "img/fotos-candidatos/presidencia/renan.png"
    },
    "vice": {
      "nome_urna": "CORONEL MEDINA",
      "partido_sigla": "MISSÃO",
      "ocupacao": "POLICIAL MILITAR",
      "uf_nascimento": "RS"
    }
  },
  {
    "id": 3,
    "numero": 16,
    "coligacao": null,
    "composicao_coligacao": "PSTU",
    "presidente": {
      "nome_urna": "HERTZ DIAS",
      "nome_completo": "HERTZ DA CONCEICAO DIAS",
      "partido_sigla": "PSTU",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "PROFESSOR DE ENSINO FUNDAMENTAL",
      "uf_nascimento": "MA",
      "foto": "img/fotos-candidatos/presidencia/hertz.png"
    },
    "vice": {
      "nome_urna": "VANESSA PORTUGAL",
      "partido_sigla": "PSTU",
      "ocupacao": "PROFESSOR DE ENSINO FUNDAMENTAL",
      "uf_nascimento": "MG"
    }
  },
  {
    "id": 4,
    "numero": 21,
    "coligacao": null,
    "composicao_coligacao": "PCB",
    "presidente": {
      "nome_urna": "EDMILSON COSTA",
      "nome_completo": "EDMILSON SILVA COSTA",
      "partido_sigla": "PCB",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "APOSENTADO",
      "uf_nascimento": "MA",
      "foto": "img/fotos-candidatos/presidencia/edmilson.png"
    },
    "vice": {
      "nome_urna": "CLEUSA SANTOS",
      "partido_sigla": "PCB",
      "ocupacao": "SERVIDOR PÚBLICO CIVIL APOSENTADO",
      "uf_nascimento": "GO"
    }
  },
  {
    "id": 5,
    "numero": 22,
    "coligacao": null,
    "composicao_coligacao": "PL",
    "presidente": {
      "nome_urna": "FLÁVIO BOLSONARO",
      "nome_completo": "FLAVIO NANTES BOLSONARO",
      "partido_sigla": "PL",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "SENADOR",
      "uf_nascimento": "RJ",
      "foto": "img/fotos-candidatos/presidencia/flavio.png"
    },
    "vice": {
      "nome_urna": "ALFREDO GASPAR",
      "partido_sigla": "PL",
      "ocupacao": "DEPUTADO",
      "uf_nascimento": "AL"
    }
  },
  {
    "id": 6,
    "numero": 27,
    "coligacao": null,
    "composicao_coligacao": "DEMOCRACIA CRISTÃ",
    "presidente": {
      "nome_urna": "CLARIANA BARÃO",
      "nome_completo": "CLARIANA ZACARKIM BARAO",
      "partido_sigla": "DC",
      "genero": "FEMININO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "ADVOGADO",
      "uf_nascimento": "MT",
      "foto": "img/fotos-candidatos/presidencia/clariana.png"
    },
    "vice": {
      "nome_urna": "FABIANA TORQUATO",
      "partido_sigla": "DC",
      "ocupacao": "ADVOGADO",
      "uf_nascimento": "SP"
    }
  },
  {
    "id": 7,
    "numero": 28,
    "coligacao": null,
    "composicao_coligacao": "PRTB",
    "presidente": {
      "nome_urna": "PABLO MARÇAL",
      "nome_completo": "PABLO HENRIQUE COSTA MARCAL",
      "partido_sigla": "PRTB",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "DIRETOR DE EMPRESAS",
      "uf_nascimento": "GO",
      "foto": "img/fotos-candidatos/presidencia/pablo.png"
    },
    "vice": {
      "nome_urna": "LEONARDO AVALANCHE",
      "partido_sigla": "PRTB",
      "ocupacao": "SERVIDOR PÚBLICO ESTADUAL",
      "uf_nascimento": "GO"
    }
  },
  {
    "id": 8,
    "numero": 29,
    "coligacao": null,
    "composicao_coligacao": "PCO",
    "presidente": {
      "nome_urna": "RUI COSTA PIMENTA",
      "nome_completo": "RUI COSTA PIMENTA",
      "partido_sigla": "PCO",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "JORNALISTA E REDATOR",
      "uf_nascimento": "SP",
      "foto": "img/fotos-candidatos/presidencia/rui.png"
    },
    "vice": {
      "nome_urna": "ANTÔNIO CARLOS",
      "partido_sigla": "PCO",
      "ocupacao": "SERVIDOR PÚBLICO ESTADUAL",
      "uf_nascimento": "RJ"
    }
  },
  {
    "id": 9,
    "numero": 30,
    "coligacao": null,
    "composicao_coligacao": "NOVO",
    "presidente": {
      "nome_urna": "ROMEU ZEMA",
      "nome_completo": "ROMEU ZEMA NETO",
      "partido_sigla": "NOVO",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "EMPRESÁRIO",
      "uf_nascimento": "MG",
      "foto": "img/fotos-candidatos/presidencia/zema.png"
    },
    "vice": {
      "nome_urna": "EDUARDO GIRÃO",
      "partido_sigla": "NOVO",
      "ocupacao": "SENADOR",
      "uf_nascimento": "CE"
    }
  },
  {
    "id": 10,
    "numero": 35,
    "coligacao": null,
    "composicao_coligacao": "DEMOCRATA",
    "presidente": {
      "nome_urna": "VETERINÁRIO WILSON GRASSI",
      "nome_completo": "WILSON GRASSI JUNIOR",
      "partido_sigla": "DEMOCRATA",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "VETERINÁRIO",
      "uf_nascimento": "SP",
      "foto": "img/fotos-candidatos/presidencia/grassi.png"
    },
    "vice": {
      "nome_urna": "SUÊD HAIDAR",
      "partido_sigla": "DEMOCRATA",
      "ocupacao": "EMPRESÁRIO",
      "uf_nascimento": "MA"
    }
  },
  {
    "id": 11,
    "numero": 55,
    "coligacao": null,
    "composicao_coligacao": "PSD",
    "presidente": {
      "nome_urna": "RONALDO CAIADO",
      "nome_completo": "RONALDO RAMOS CAIADO",
      "partido_sigla": "PSD",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "MÉDICO",
      "uf_nascimento": "GO",
      "foto": "img/fotos-candidatos/presidencia/caiado.png"
    },
    "vice": {
      "nome_urna": "GILBERTO KASSAB",
      "partido_sigla": "PSD",
      "ocupacao": "ENGENHEIRO",
      "uf_nascimento": "SP"
    }
  },
  {
    "id": 12,
    "numero": 70,
    "coligacao": "BRASIL DOS NOSSOS SONHOS",
    "composicao_coligacao": "AGIR / AVANTE",
    "presidente": {
      "nome_urna": "ESCRITOR AUGUSTO CURY",
      "nome_completo": "AUGUSTO JORGE CURY",
      "partido_sigla": "AVANTE",
      "genero": "MASCULINO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "ESCRITOR E CRÍTICO",
      "uf_nascimento": "SP",
      "foto": "img/fotos-candidatos/presidencia/cury.png"
    },
    "vice": {
      "nome_urna": "JÚLIO DELGADO",
      "partido_sigla": "AVANTE",
      "ocupacao": "ADVOGADO",
      "uf_nascimento": "MG"
    }
  },
  {
    "id": 13,
    "numero": 80,
    "coligacao": null,
    "composicao_coligacao": "UP",
    "presidente": {
      "nome_urna": "SAMARA",
      "nome_completo": "SAMARA MARTINS DA SILVA FEITOSA",
      "partido_sigla": "UP",
      "genero": "FEMININO",
      "grau_instrucao": "SUPERIOR COMPLETO",
      "ocupacao": "ODONTÓLOGO",
      "uf_nascimento": "MG",
      "foto": "img/fotos-candidatos/presidencia/samara.png"
    },
    "vice": {
      "nome_urna": "RAQUEL BRÍCIO",
      "partido_sigla": "UP",
      "ocupacao": "VIGILANTE",
      "uf_nascimento": "PA"
    }
  }
];

/* ===== GERADOR DE CANDIDATOS ===== */
const NOMES = ["Marina","Eduardo","Fernanda","Carlos","Juliana","Rafael","Beatriz","André","Camila","Otávio","Renata","Bruno","Larissa","Tiago","Patrícia","Gustavo","Vera","Sérgio","Aline","Rodrigo"];
const SOBRENOMES = ["Almeida","Barros","Castro","Duarte","Ferreira","Guimarães","Henriques","Lima","Martins","Nogueira","Oliveira","Pereira","Queiroz","Ramos","Silveira","Teixeira","Vasconcelos","Xavier"];
const PARTIDOS = ["PT","PSDB","MDB","PL","PSOL","UNIÃO","PDT","REPUBLICANOS","PSD","NOVO","PP","PSB"];
const PAUTAS = ["educação pública","geração de emprego","segurança pública","saúde pública","meio ambiente e clima","infraestrutura urbana","agricultura familiar","tecnologia e inovação","direitos das mulheres","assistência social"];

function seedRand(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return function() { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
function pick(arr, r) { return arr[Math.floor(r() * arr.length)]; }
function initials(nome) { return nome ? nome.split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase() : "VC"; }

/* ===== GERADOR DE CANDIDATOS APENAS PARA FALLBACK SEGURO ===== */
function generateCandidates(cargo, uf, count) {
  if (cargo === "presidente") return CANDIDATOS_PRESIDENTE;

  const chaveGovernador = `${cargo}-${uf}`.toLowerCase();
  if (cargo === "governador" && window.CandidatosGovernadores && window.CandidatosGovernadores[chaveGovernador]) {
    return window.CandidatosGovernadores[chaveGovernador];
  }

  // SE FOR SENADOR OU DEPUTADO, NUNCA GERA DADOS FALSOS: retorna vazio para forçar o modular ou logar erro
  console.warn("Nenhum dado estático encontrado para:", cargo, uf);
  return [];
}

/* ===== GERADOR DE DOSSIÊ PADRONIZADO E EDUCATIVO (1000+ CANDIDATOS) ===== */
/* ===== GERADOR DE DOSSIÊ PADRONIZADO E LÚDICO (LEGISLATIVO + EXECUTIVO) ===== */
function candidateDossie(c) {
  // 1. Mantém os dossiês detalhados intactos para Presidente e Governador
  if (window.DOSSIES_CANDIDATOS && DOSSIES_CANDIDATOS[c.id]) {
    return { isPresidente: true, ...DOSSIES_CANDIDATOS[c.id] };
  }

  if (c.cargo === "governador") {
    return {
      isPresidente: true,
      trajetoria: [{ ano: "2026", texto: `Candidatura registrada para o Governo do Estado de ${c.uf} por ${c.nome}.` }],
      projetos: [{ titulo: "Diretrizes de Governo", texto: "Propostas de gestão administrativa, segurança e infraestrutura para o estado." }],
      investigacoes: [{ tema: "Regularidade Eleitoral", status: "Certidões regulares emitidas pelo TSE." }],
      fonte: "TSE — DivulgaCandContas"
    };
  }

  // 2. Retorna indicador de que é legislativo para o renderDossieModal tratar a exibição limpa
  return { isLegislativo: true };
}

/* ===== ESTADO GLOBAL ===== */
let currentRegion = "sudeste";
let seniorMode = false;
let candidatosState = { cargo: "presidente", region: "sudeste", uf: "SP", search: "", cargoDD: false, regionDD: false, ufDD: false };

/* ===== ROTEAMENTO ===== */
function parseHash() {
  const hash = window.location.hash.slice(1) || "/";
  const [path, query] = hash.split("?");
  return { path: path || "/", params: new URLSearchParams(query || "") };
}

function navigate(path) {
  if (path === "/candidatos") {
    window.location.hash = "/candidatos?cargo=presidente";
  } else {
    window.location.hash = path;
  }
}

/* ===== ROTEAMENTO E SINCRONIZAÇÃO DE ROTA ===== */
function onHashChange() {
  const route = parseHash();
  
  const cargoUrl = route.params.get("cargo");
  const regiaoUrl = route.params.get("regiao");
  const ufUrl = route.params.get("uf");
  const idCandidatoUrl = route.params.get("id"); // <--- NOVO: Captura o ID do candidato

  if (route.path.startsWith("/candidatos") && !cargoUrl && !idCandidatoUrl) {
    window.location.hash = "/candidatos?cargo=presidente";
    return;
  }

  if (cargoUrl && cargoUrl !== candidatosState.cargo) {
    candidatosState.cargo = cargoUrl;
    if (cargoUrl === "presidente") {
      candidatosState.region = "brasil";
      candidatosState.uf = "BR";
    } else {
      if (regiaoUrl && regiaoUrl !== "brasil") candidatosState.region = regiaoUrl;
      else if (candidatosState.region === "brasil") candidatosState.region = "sudeste";
      
      if (ufUrl && ufUrl !== "BR") candidatosState.uf = ufUrl;
      else if (candidatosState.uf === "BR") candidatosState.uf = "SP";
    }
  }

  window.scrollTo(0, 0);
  renderPage(route);

  // <--- NOVO: Se houver um ID na URL, abre o modal do dossiê automaticamente após renderizar a página
  if (idCandidatoUrl) {
    setTimeout(() => {
      openDossie(idCandidatoUrl);
    }, 150);
  }
}

window.addEventListener("hashchange", onHashChange);

/* ===== RENDERIZAÇÃO PRINCIPAL ===== */
function renderPage(route) {
  const main = document.getElementById("main-content");
  const path = route.path;

  updateActiveNav(path);

  if (path === "/") { renderHome(main); }
  else if (path.startsWith("/candidatos")) { renderCandidatos(main, route.params); }
  else if (path === "/guia-do-eleitor") { renderGuiaDoEleitor(main); }
  else if (path === "/fale-conosco") { renderFaleConosco(main); }
  else if (path === "/links-uteis") { renderLinksUteis(main); }
  else { renderHome(main); }
}

function updateActiveNav(path) {
  const tags = { "nav-home":"/", "nav-candidatos":"/candidatos", "nav-guia":"/guia-do-eleitor", "nav-contato":"/fale-conosco", "nav-links":"/links-uteis" };
  Object.entries(tags).forEach(([id, prefix]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isActive = prefix === "/" ? path === "/" : path.startsWith(prefix);
    el.classList.toggle("bg-white/20", isActive);
  });
}

/* ===== PÁGINA: HOME ===== */
function renderHome(main) {
  main.innerHTML = `
    <section class="teal-shell relative overflow-hidden">
      <span class="blob blob-a"></span>
      <span class="blob blob-b"></span>

      <div class="wrap relative pt-6 pb-8 z-20">
        <div class="grid lg:grid-cols-[1fr_240px] gap-8 items-center max-w-[980px] mx-auto">
          
          <div class="text-left">
            <span class="pill bg-white/20 text-white inline-flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              apartidário • verificado
            </span>

            <h1 class="font-display text-[28px] sm:text-[38px] leading-[1.1] mt-3.5" style="color:#c7f1f3">
              Entenda o que cada cargo faz:<br>
              <span class="text-white">Vote com clareza.</span>
            </h1>

            <p class="mt-3 text-[14.5px] text-white/85 leading-relaxed max-w-[500px]">
              Salários, responsabilidades e histórico resumido de cada candidato (são mais candidatos do que voce imagina viu). Quanto mais voce se informar sobre os candidatos, maiores as chances de transformar realidades com seu voto. <b>Rumo às Eleições 2026.</b>
            </p>

            <div class="flex gap-3 mt-5 flex-wrap">
              <a href="#/candidatos" onclick="navigate('/candidatos');return false" class="btn btn-primary">Ver candidatos</a>
              <a href="#/guia-do-eleitor" onclick="navigate('/guia-do-eleitor');return false" class="btn btn-outline text-white border-white/50 btn-guia-eleitor">Guia do Eleitor</a>
            </div>
          </div>

          <div id="urna-parallax" class="hidden lg:block shrink-0 transition-transform duration-75 ease-out">
            <div class="bg-[var(--teal-ink)] border-2 border-white/20 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] w-56 text-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div class="bg-[#D1E8E2] text-[var(--ink)] rounded-lg p-2.5 mb-3 font-data border border-black/20 shadow-inner">
                <span class="text-[9px] uppercase tracking-widest text-[var(--teal-deep)] font-bold block">Justiça Eleitoral</span>
                <div class="text-[11px] font-bold mt-1">SEU VOTO:</div>
                <div class="text-[13px] font-bold text-center my-1 tracking-wider text-[var(--teal-deep)]">100% CIDADÃO</div>
              </div>
              <div class="grid grid-cols-3 gap-1.5 text-center font-data font-bold text-xs bg-black/20 p-2 rounded-xl mb-3">
                <span class="bg-white/10 p-1 rounded">1</span><span class="bg-white/10 p-1 rounded">2</span><span class="bg-white/10 p-1 rounded">3</span>
                <span class="bg-white/10 p-1 rounded">4</span><span class="bg-white/10 p-1 rounded">5</span><span class="bg-white/10 p-1 rounded">6</span>
                <span class="bg-white/10 p-1 rounded">7</span><span class="bg-white/10 p-1 rounded">8</span><span class="bg-white/10 p-1 rounded">9</span>
              </div>
              <div class="flex gap-1">
                <span class="bg-white text-black text-[8px] font-bold flex-1 py-1 text-center rounded">BRANCO</span>
                <span class="bg-[var(--red)] text-white text-[8px] font-bold flex-1 py-1 text-center rounded">CORRIGE</span>
                <span class="bg-[var(--green)] text-white text-[8px] font-bold flex-1 py-1 text-center rounded">CONFIRMA</span>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-8" id="carousel-container"></div>
      </div>
    </section>

    <section class="wrap py-12">
      <div class="mb-6 flex items-end justify-between">
        <div>
          <span class="pill pill-blue">CONSULTAS POR REGIÕES BRASILEIRAS</span>
          <h2 class="font-display text-[28px] mt-2 text-[var(--ink)]">Escolha sua região</h2>
          <p class="text-[var(--ink-soft)] text-[14px] mt-1">Selecione a região e o estado para consultar Governador, Senador e Deputados da sua área.</p>
        </div>

        <div class="hidden sm:flex gap-2 shrink-0">
          <button onclick="scrollRegioes(-1)" aria-label="Região anterior" class="w-10 h-10 rounded-full bg-white border border-[var(--line)] text-[var(--teal-deep)] flex items-center justify-center shadow-sm hover:bg-[var(--paper-dim)]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onclick="scrollRegioes(1)" aria-label="Próxima região" class="w-10 h-10 rounded-full bg-white border border-[var(--line)] text-[var(--teal-deep)] flex items-center justify-center shadow-sm hover:bg-[var(--paper-dim)]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <div id="regioes-scroller" class="flex gap-3 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x scroll-smooth rounded-2xl">
        ${Object.entries(REGIOES).map(([k, v]) => {
          const isSelected = currentRegion === k;
          return `
            <button type="button" onclick="selectHomeRegion('${k}')" class="flex-none w-[170px] sm:w-[190px] bg-white rounded-2xl p-3.5 border-2 text-center transition-all snap-start shadow-[0_4px_16px_rgba(6,56,66,0.06)] hover:-translate-y-1 ${isSelected ? 'border-[var(--teal)] ring-2 ring-[var(--teal)]/20' : 'border-[var(--line)] opacity-85 hover:opacity-100'}">
              <div class="bg-[#EAF5F5] rounded-xl p-2.5 mb-3 flex items-center justify-center h-[90px] relative overflow-hidden">
                <img src="img/mapa-${k}.png" alt="Mapa da região ${v.nome}" class="w-full h-full object-contain"/>
              </div>
              <h3 class="font-display text-[16px] text-[var(--ink)] mb-1">${v.nome}</h3>
              <p class="text-[11.5px] text-[var(--ink-soft)] leading-snug truncate-2-lines min-h-[32px]">
                ${k === 'brasil' ? 'Todo o território nacional.' : v.estados.map(u => UF_NOMES[u]).join(', ')}
              </p>
            </button>
          `;
        }).join('')}
      </div>

      <div class="mt-6 bg-white rounded-2xl p-4 border border-[var(--line)] shadow-[0_6px_20px_rgba(6,56,66,0.05)] grid sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <div>
          <label for="home-estado-select" class="text-[12px] font-bold text-[var(--ink-soft)] block mb-1.5">Estado</label>
          <select id="home-estado-select" class="w-full bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3.5 py-3 text-[14px] font-semibold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
            ${currentRegion === 'brasil' 
              ? `<option value="BR" selected>Nacional (Todos os Estados)</option>`
              : REGIOES[currentRegion].estados.map(u => `<option value="${u}">${UF_NOMES[u]} (${u})</option>`).join('')
            }
          </select>
        </div>

        <div>
          <label for="home-cargo-select" class="text-[12px] font-bold text-[var(--ink-soft)] block mb-1.5">Cargo</label>
          <select id="home-cargo-select" class="w-full bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3.5 py-3 text-[14px] font-semibold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
            ${CARGO_ORDER.map(k => `<option value="${k}">${CARGOS[k].nome}</option>`).join('')}
          </select>
        </div>

        <button onclick="submitHomeConsult()" class="btn bg-[var(--teal-deep)] text-white hover:bg-[var(--teal-ink)] text-[14px] py-3.5 px-6 whitespace-nowrap">
          Consultar candidatos
        </button>
      </div>
    </section>

    <!-- SEÇÃO TUDO SOBRE O E-TÍTULO -->
    <!-- ========================================== -->
    <section class="bg-white py-12">
      <div class="wrap mx-auto">
        <div class="text-left mb-8">
          <span class="pill pill-blue">DOCUMENTO DIGITAL OFICIAL</span>
          <h2 class="font-display text-[26px] sm:text-[30px] mt-2 text-[var(--ink)]">Tudo sobre o e-Título para as Eleições</h2>
          <p class="text-[var(--ink-soft)] text-[14.5px] mt-1.5 max-w-[600px]">
            Saiba como baixar, configurar e utilizar o aplicativo oficial da Justiça Eleitoral no dia da votação. Caso tenha outras dúvidas, acesse tambem nosso <a href="#/guia-do-eleitor" onclick="navigate('/guia-do-eleitor'); return false;" class="text-[var(--teal-deep)] font-bold underline">Guia do Eleitor</a>.
          </p>
        </div>

        <div class="bg-[var(--paper)] rounded-2xl p-6 sm:p-8 border border-[var(--line)] shadow-sm space-y-6">
          <div class="grid sm:grid-cols-2 gap-6 items-center">
            <div>
              <h3 class="font-display text-[18px] text-[var(--ink)] mb-3">O que é o e-Título?</h3>
              <p class="text-[14px] text-[var(--ink-soft)] leading-relaxed mb-4">
                O <strong>e-Título</strong> é o aplicativo oficial da Justiça Eleitoral que fornece a versão digital do título de eleitor. Se você já cadastrou sua biometria na Justiça Eleitoral, ele exibe sua foto, dispensando a apresentação de outro documento com foto na hora de votar.
              </p>
              <div class="flex flex-wrap gap-2">
                <a href="https://play.google.com/store/apps/details?id=br.jus.tse.eleitoral.etitulo" target="_blank" rel="noopener" class="btn btn-primary text-xs py-2 px-4">Baixar para Android ↗</a>
                <a href="https://apps.apple.com/br/app/e-t%C3%ADtulo/id1320338088" target="_blank" rel="noopener" class="btn btn-outline text-xs py-2 px-4 bg-white">Baixar para iOS ↗</a>
              </div>
            </div>

            <div class="bg-white p-5 rounded-xl border border-[var(--line)] shadow-inner space-y-3">
              <h4 class="font-display text-[15px] text-[var(--teal-deep)]">Passo a passo rápido:</h4>
              <ul class="text-[13.5px] text-[var(--ink-soft)] space-y-2 list-disc pl-4">
                <li>Baixe o aplicativo gratuitamente na Google Play Store ou App Store.</li>
                <li>Abra o app e preencha seus dados cadastrais (CPF, nome completo, mãe e data de nascimento).</li>
                <li>Responda às perguntas de validação de identidade sobre sua vida eleitoral.</li>
                <li>Pronto! Seu título digital estará disponível. Atualize o app antes do dia da eleição para evitar imprevistos.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO DESTACADA: COMO USAR A COLINHA -->
    <section class="py-12 relative overflow-hidden" style="background-color: #E6F2F4; border-top: 2px dashed rgba(21,154,174,0.3); border-bottom: 2px dashed rgba(21,154,174,0.3);">
      <div class="wrap mx-auto">
        <div class="text-left mb-8">
          <span class="pill bg-[var(--teal-deep)] text-white">PRATICIDADE NO DIA DA ELEIÇÃO</span>
          <h2 class="font-display text-[26px] sm:text-[30px] mt-2 text-[var(--ink)]">Como usar a Página da Colinha</h2>
          <p class="text-[var(--ink-soft)] text-[14.5px] mt-1.5 max-w-[600px]">
            Organize seu voto de forma rápida e segura para não perder tempo na cabine de votação.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-5">
          <div class="bg-white rounded-2xl p-6 border border-[var(--line)] shadow-sm flex flex-col text-left">
            <div class="w-10 h-10 rounded-xl bg-[var(--teal-deep)] text-white font-display flex items-center justify-center text-base mb-4 font-bold shadow-sm">1</div>
            <h3 class="font-display text-[16px] text-[var(--ink)] mb-2">Clique no Coração ❤️</h3>
            <p class="text-[13.5px] text-[var(--ink-soft)] leading-relaxed">
              Ao visualizar o perfil ou histórico de um candidato, clique no ícone de coração. Ele será adicionado automaticamente à sua colinha de votação.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-[var(--line)] shadow-sm flex flex-col text-left">
            <div class="w-10 h-10 rounded-xl bg-[var(--teal-deep)] text-white font-display flex items-center justify-center text-base mb-4 font-bold shadow-sm">2</div>
            <h3 class="font-display text-[16px] text-[var(--ink)] mb-2">Acesse a Colinha</h3>
            <p class="text-[13.5px] text-[var(--ink-soft)] leading-relaxed">
              Entre na página da <a href="colinha.html" class="text-[var(--teal-deep)] font-bold underline">Colinha</a> para revisar todas as suas escolhas separadas por cargo e conferir os números de urna.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-[var(--line)] shadow-sm flex flex-col text-left">
            <div class="w-10 h-10 rounded-xl bg-[var(--teal-deep)] text-white font-display flex items-center justify-center text-base mb-4 font-bold shadow-sm">3</div>
            <h3 class="font-display text-[16px] text-[var(--ink)] mb-2">Salve ou Compartilhe</h3>
            <p class="text-[13.5px] text-[var(--ink-soft)] leading-relaxed">
              Baixe a imagem da sua colinha diretamente para o celular ou envie facilmente para amigos e familiares através do WhatsApp e Instagram.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-12">
      <div class="wrap">
        <div class="text-center mb-8">
          <span class="pill pill-blue">Links úteis</span>
          <h2 class="font-display text-[26px] mt-2">Fontes de dados e informações</h2>
          <p class="text-[var(--ink-soft)] text-[14px] mt-1.5">Locais onde consultamos e verificamos os dados exibidos no Voto Cidadão.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${[
            {t:"TSE — Tribunal Superior Eleitoral",x:"Dados oficiais sobre candidatos, eleições e resultados.",u:"https://www.tse.jus.br"},
            {t:"Câmara dos Deputados",x:"Projetos de lei, votações e informações sobre deputados federais.",u:"https://www.camara.leg.br"},
            {t:"Senado Federal",x:"Informações sobre senadores, comissões e votações no Senado.",u:"https://www.senado.leg.br"},
            {t:"Agência Lupa",x:"Agência de checagem de fatos independente.",u:"https://piaui.folha.uol.com.br/lupa"},
            {t:"Aos Fatos",x:"Plataforma de checagem de declarações de políticos.",u:"https://www.aosfatos.org"},
            {t:"Projeto Comprova",x:"Coalizão de veículos de imprensa para combater desinformação.",u:"https://projetocomprova.com.br"},
          ].map(f => `
            <a href="${f.u}" target="_blank" rel="noopener" class="bg-[var(--paper)] rounded-2xl p-5 border border-[var(--line)] hover:border-[var(--teal)] transition-colors group">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-display text-[15px] leading-tight">${f.t}</h3>
                <svg class="w-4 h-4 text-[var(--ink-soft)] group-hover:text-[var(--teal)] transition-colors shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </div>
              <p class="text-[13px] text-[var(--ink-soft)] leading-relaxed">${f.x}</p>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  renderCarousel();
}

/* ===== CARROSSEL DE CARGOS ===== */
function renderCarousel() {
  const container = document.getElementById("carousel-container");
  if (!container) return;

  container.innerHTML = `
    <div class="relative">
      <button onclick="scrollCarousel(-1)" id="carousel-prev" class="hidden md:flex absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-[var(--teal-deep)] items-center justify-center shadow-[0_8px_24px_rgba(6,56,66,0.18)] hover:bg-[var(--paper-dim)] transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button onclick="scrollCarousel(1)" id="carousel-next" class="hidden md:flex absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-[var(--teal-deep)] items-center justify-center shadow-[0_8px_24px_rgba(6,56,66,0.18)] hover:bg-[var(--paper-dim)] transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div id="cargo-scroller" class="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 px-1 scroll-px-1">
        ${CARGO_ORDER.map((key,idx) => {
          const cargo = CARGOS[key];
          const isNational = cargo.nivel === "nacional";
          const salario = cargo.salario;
          const beneficios = cargo.beneficios;
          const oQueFaz = cargo.oQueFaz;
          return `
            <article class="cargo-slide flex flex-col justify-between" data-idx="${idx}">
              <!-- Topo do Card -->
              <div>
                <div class="flex items-start justify-between mb-2">
                  <div class="w-full">
                    <span class="pill bg-white/25 text-white">${isNational?"Nacional":"Estadual"}</span>
                    <!-- Força a altura exata para o título ocupar sempre duas linhas visualmente -->
                    <h3 class="font-display text-[19px] mt-2 leading-tight h-[2.6em] flex items-center">${cargo.nome}</h3>
                  </div>
                  ${cargo.temVice ? '<span class="text-[11px] font-data bg-white/20 px-2 py-1 rounded-full whitespace-nowrap shrink-0 mt-1">+ VICE</span>' : ''}
                </div>

                <!-- Texto descritivo com margem inferior reduzida para aproximar dos salários -->
                <p class="text-[13px] leading-relaxed text-white/90 mb-3">${oQueFaz}</p>
              </div>

              <!-- Rodapé interno do Card -->
              <div class="mt-auto space-y-2.5 pt-1">
                <div class="space-y-1.5">
                  <div class="flex justify-between items-center bg-white/10 rounded-lg px-3 py-2">
                    <span class="text-[12px] text-white/70 font-semibold">Salário</span>
                    <span class="font-data text-[12.5px] font-bold text-right">${salario}</span>
                  </div>
                  <div class="flex justify-between items-center bg-white/10 rounded-lg px-3 py-2">
                    <span class="text-[12px] text-white/70 font-semibold">Mandato</span>
                    <span class="font-data text-[12px] font-bold text-right">${cargo.mandato}</span>
                  </div>
                </div>
                <div class="text-[11.5px] text-white/80 leading-relaxed"><strong class="text-white">Benefícios:</strong> ${beneficios}</div>
                <a href="#/candidatos?cargo=${key}" onclick="navigate('/candidatos?cargo=${key}');return false" class="btn btn-primary btn-block text-[14px]">Ver candidatos</a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
      <div id="carousel-dots-wrapper" class="flex items-center justify-center gap-2.5 mt-5"></div>
    </div>
  `;
}

function toggleCarouselDropdown(key) {
  const dd = document.getElementById("dd-" + key);
  if (!dd) return;
  CARGO_ORDER.forEach(k => { if (k !== key) document.getElementById("dd-"+k)?.classList.add("hidden"); });
  dd.classList.toggle("hidden");
}

function changeCarouselRegion(r) {
  currentRegion = r;
  renderHome(document.getElementById("main-content"));
}

function scrollCarousel(dir) {
  const scroller = document.getElementById("cargo-scroller");
  if (!scroller) return;
  const card = scroller.querySelector(".cargo-slide");
  const step = card ? card.offsetWidth + 16 : 356;
  scroller.scrollBy({ left: dir * step, behavior: "smooth" });
}

function scrollRegioes(dir) {
  const scroller = document.getElementById("regioes-scroller");
  if (!scroller) return;
  scroller.scrollBy({ left: dir * 200, behavior: "smooth" });
}

/* ===== DADOS DE APOIO PARA SENADORES E DEPUTADOS (FALLBACK INTELIGENTE) ===== */
function obterCandidatosReaisOuGerados(cargo, uf) {
  if (cargo === "presidente") return CANDIDATOS_PRESIDENTE;
  
  if (cargo === "governador") {
    const chave = `governador-${uf.toLowerCase()}`;
    return window.CandidatosGovernadores?.[chave] || [];
  }

  // Normaliza a UF para maiúsculo (ex: "sp" vira "SP")
  const ufUpper = (uf || "SP").toUpperCase();
  const tipoMapeado = cargo === "senador" ? "Senadores" : cargo === "deputado-federal" ? "Federais" : "Estaduais";
  const nomeGlobal = `Candidatos${tipoMapeado}${ufUpper}`;

  // Se a variável global do arquivo externo existir, retorna ela diretamente
  if (window[nomeGlobal] && Array.isArray(window[nomeGlobal]) && window[nomeGlobal].length > 0) {
    console.log("Dados reais carregados com sucesso para:", nomeGlobal, window[nomeGlobal]);
    return window[nomeGlobal];
  }

  console.warn("Aviso: Variável global não encontrada ou vazia:", nomeGlobal);
  return []; // Retorna vazio em vez de gerar dados falsos para sabermos se o script leu o arquivo
}

/* ===== PÁGINA: CANDIDATOS (COM SUPORTE A DADOS MODULARES ASSÍNCRONOS E LISTA PARA DEPUTADOS) ===== */
async function renderCandidatos(main, params) {
  if (!main) main = document.getElementById("main-content");

  const cargo = candidatosState.cargo || "presidente";
  const isNational = cargo === "presidente";

  if (isNational) {
    candidatosState.region = "brasil";
    candidatosState.uf = "BR";
  } else {
    if (!candidatosState.region || candidatosState.region === "brasil") {
      candidatosState.region = "sudeste";
    }
    const estadosValidos = (REGIOES[candidatosState.region] || REGIOES.sudeste).estados;
    if (!candidatosState.uf || !estadosValidos.includes(candidatosState.uf)) {
      candidatosState.uf = estadosValidos[0] || "SP";
    }
  }

  const { region, uf } = candidatosState;
  const effectiveUf = isNational ? "BR" : uf;
  const cargoName = CARGOS[cargo]?.nome || cargo;
  const listagemEstados = (REGIOES[region] || REGIOES.sudeste).estados || [];

  let candidates = [];

  if (cargo === "presidente") {
    candidates = CANDIDATOS_PRESIDENTE.map((item, index) => {
      const p = item.presidente;
      const v = item.vice;
      const slugNome = p.nome_urna.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
      
      return {
        id: `presidente-br-${slugNome}`,
        nome: p.nome_urna,
        nomeCompleto: p.nome_completo,
        partido: p.partido_sigla,
        numero: item.numero,
        cargo: "presidente",
        uf: "BR",
        color: AVATAR_COLORS[index % AVATAR_COLORS.length],
        pautas: [p.ocupacao, p.grau_instrucao],
        vice: v ? { nome: v.nome_urna, partido: v.partido_sigla } : null,
        coligacao: item.composicao_coligacao,
        foto: p.foto
      };
    });
  } else {
    // AGORA ESPERA CORRETAMENTE OS DADOS DO ARQUIVO MODULAR EXTERNO CARREGAR
    candidates = await obterCandidatos(cargo, effectiveUf);
  }
 
  // CANDIDATOS EM ORDEM ALFABETICA
  candidates.sort((a, b) => (a.nome || "").localeCompare(b.nome || "", 'pt-BR'));

  // Identifica se o cargo atual é um deputado para alternar o layout para lista
  const isDeputado = cargo.includes("deputado");

  main.innerHTML = `
    <div class="wrap py-8 sm:py-10">
      
      <div class="mb-8">
        <span class="pill pill-blue">Eleições 2026</span>
        <h1 class="font-display text-[28px] sm:text-[34px] mt-1.5 text-[var(--ink)]">${cargoName}</h1>
        <p class="text-[var(--ink-soft)] text-[14.5px] mt-1 leading-relaxed">
          ${
            cargo === 'presidente' ? "O Presidente da República administra o país e comanda o executivo federal. Informe-se bem sobre as propostas, conheça o histórico dos candidatos, como ele já votou e clique no ícone de coração para favoritar seus preferidos na sua colinha de votação." :
            cargo === 'governador' ? "O Governador gerencia a administração, a saúde, a segurança e a educação do estado. Analise as entregas e propostas, pesquise sobre os candidatos e adicione seus favoritos à colinha no ícone de coração." :
            cargo === 'senador' ? "O Senador representa o estado no Congresso Nacional, votando leis e fiscalizando o executivo. Conheça a trajetória de cada candidato e salve suas opções preferidas na colinha de votação. Lembre que são 8 anos de mandato e nessa eleição voce deve escolher <b>DOIS candidatos na urna.</b>" :
            cargo === 'deputado-federal' ? "O Deputado Federal cria e vota as leis do país na Câmara em Brasília. É fundamental se informar sobre a atuação dos candidatos e favoritar seus preferidos para montar sua colinha." :
            cargo === 'deputado-estadual' ? "O Deputado Estadual atua na Assembleia Legislativa criando leis estaduais. Conheça as propostas de cada candidato e adicione os que melhor representam você à sua colinha." :
            "O Deputado Distrital representa a população do Distrito Federal na Câmara Legislativa. Informe-se sobre a trajetória dos candidatos e salve seus preferidos na colinha de votação."
          }
        </p>

        <div class="grid sm:grid-cols-3 gap-3 mt-6 bg-white p-4 rounded-2xl border border-[var(--line)] shadow-sm">
          
          <div>
            <label for="filtro-cargo-select" class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-1">Cargo</label>
            <select id="filtro-cargo-select" onchange="selectCargo(this.value)" class="w-full bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3 py-2.5 text-[13.5px] font-bold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
  ${CARGO_ORDER
    .filter(k => k !== 'deputado-distrital' || uf.toUpperCase() === 'DF')
    .map(k => `<option value="${k}" ${k === cargo ? 'selected' : ''}>${CARGOS[k].nome}</option>`)
    .join("")}
</select>
          </div>

          <div>
            <label for="filtro-regiao-select" class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-1">Região</label>
            <select id="filtro-regiao-select" ${isNational ? 'disabled' : ''} onchange="selectRegion(this.value)" class="w-full bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3 py-2.5 text-[13.5px] font-bold text-[var(--ink)] ${isNational ? 'opacity-50 cursor-not-allowed' : ''} focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
              ${isNational 
                ? `<option value="brasil" selected>Nacional (Brasil)</option>`
                : Object.entries(REGIOES).filter(([k]) => k !== 'brasil').map(([k, v]) => `
                    <option value="${k}" ${k === region ? 'selected' : ''}>${v.nome}</option>
                  `).join("")
              }
            </select>
          </div>

          <div>
            <label for="filtro-uf-select" class="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-1">Estado (UF)</label>
            <select id="filtro-uf-select" ${isNational ? 'disabled' : ''} onchange="selectUF(this.value)" class="w-full bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3 py-2.5 text-[13.5px] font-bold text-[var(--ink)] ${isNational ? 'opacity-50 cursor-not-allowed' : ''} focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
              ${isNational 
                ? `<option value="BR" selected>Nacional (BR)</option>`
                : listagemEstados.map(u => `<option value="${u}" ${u === uf ? 'selected' : ''}>${UF_NOMES[u]} (${u})</option>`).join("")
              }
            </select>
          </div>

        </div>

       ${isDeputado && candidates.length > 0 ? `
          <div class="mt-6">
            <div class="relative w-full">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[var(--ink-soft)]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input type="text" id="filtro-deputado-input" oninput="filtrarDeputados()" placeholder="Busque pelo nome do candidato ou por um partido que se identifica......" class="w-full bg-white border border-[var(--line)] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal)] shadow-sm">
            </div>
            <div class="mt-3 text-xs font-semibold text-[var(--ink-soft)] px-1">
              Total de candidatos encontrados: <span id="contador-candidatos-filtro" class="text-[var(--teal-deep)] font-bold">${candidates.length}</span>
            </div>
          </div>
        ` : ''}
      </div>

      ${candidates.length === 0 ? `
        <div class="bg-white rounded-2xl p-12 text-center border border-[var(--line)]">
          <h3 class="font-display text-[18px] text-[var(--ink)] mb-1">Nenhum candidato encontrado</h3>
          <p class="text-[14px] text-[var(--ink-soft)]">Tente mudar a região ou o estado selecionado, ou adicione o arquivo correspondente.</p>
        </div>
        ` : isDeputado ? (() => {
        let htmlList = "";
        candidates.forEach(c => {
          const partidoExibicao = c.partido || c.partido_sigla || "PARTIDO";
          const idSeguro = c.id || `${c.numero}-${partidoExibicao}`;
          const corFundo = c.color || '#159AAE';
          
          let fotoOuIniciais = c.foto 
            ? `<img src="${c.foto}" alt="${c.nome}" class="hidden sm:block rounded-full object-cover shrink-0 border border-[var(--line)]" style="width:40px;height:40px;" />` 
            : `<div class="hidden sm:flex rounded-full items-center justify-center font-display text-white shrink-0 text-xs border border-[var(--line)]" style="width:40px;height:40px;background:${corFundo}">${initials(c.nome)}</div>`;

          htmlList += `
            <article data-busca="${(c.nome + ' ' + partidoExibicao + ' ' + (c.nomeCompleto || '')).toLowerCase()}" data-nome="${(c.nome || '').toLowerCase()}" data-partido="${partidoExibicao.toLowerCase()}" onclick="openDossie('${idSeguro}')" class="bg-white rounded-xl border border-[var(--line)] p-3.5 sm:p-4 hover:border-[var(--teal)] transition-all cursor-pointer flex items-center justify-between gap-3 group shadow-sm">
              <div class="flex items-center gap-3 min-w-0 flex-1">
                ${fotoOuIniciais}
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-display text-[14px] sm:text-[15px] text-[var(--ink)] font-bold truncate group-hover:text-[var(--teal-deep)] transition-colors max-w-full">${c.nome}</h3>
                    <span class="text-[11px] sm:text-xs font-bold px-2 py-0.5 bg-[var(--paper)] rounded text-[var(--teal-deep)] border border-[var(--line)] shrink-0">${partidoExibicao}</span>
                  </div>
                  <p class="text-[11.5px] sm:text-[12.5px] text-[var(--ink-soft)] truncate mt-0.5">${c.nomeCompleto || c.nome} •${c.uf}</p>
                </div>
              </div>

              <div class="flex items-center gap-2.5 shrink-0">
                <span class="badge-num text-[11px] sm:text-xs px-2.5 py-1">${c.numero}</span>
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--paper)] text-[var(--teal-deep)] flex items-center justify-center group-hover:bg-[var(--teal-deep)] group-hover:text-white transition-colors">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </article>
          `;
        });
        return `
          <div id="container-lista-candidatos" class="space-y-2">
            ${htmlList}
          </div>
        `;
      })() : `
      <!-- LAYOUT ORIGINAL EM CARDS PARA PRESIDENTES, GOVERNADORES E SENADORES -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${candidates.map(c => `
            <article onclick="openDossie('${c.id}')" class="bg-white rounded-2xl border border-[var(--line)] shadow-[0_4px_16px_rgba(6,56,66,0.06)] p-5 hover:shadow-[0_10px_28px_rgba(6,56,66,0.12)] transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="flex items-start justify-between gap-3 mb-3">
                  <div class="flex items-center gap-3">
                    ${c.foto ? `
                      <img src="${c.foto}" alt="${c.nome}" class="rounded-full object-cover shrink-0 border-2 border-white shadow-sm" style="width:48px;height:48px;" />
                    ` : `
                      <div class="rounded-full flex items-center justify-center font-display text-white shrink-0 border-2 border-white shadow-sm" style="width:48px;height:48px;background:${c.color || '#159AAE'}">${initials(c.nome)}</div>
                    `}
                    <div>
                      <h3 class="font-display text-[16px] text-[var(--ink)] leading-snug group-hover:text-[var(--teal-deep)] transition-colors">${c.nome}</h3>
                      <p class="text-[12.5px] text-[var(--ink-soft)] font-semibold mt-0.5">${c.partido} • ${isNational ? 'BR' : c.uf}</p>
                    </div>
                  </div>
                  <span class="badge-num shrink-0">${c.numero}</span>
                </div>

                ${c.vice ? `<div class="bg-[var(--paper)] rounded-xl p-2.5 text-[12px] text-[var(--ink-soft)] mb-3 border border-[var(--line)]"><strong>Vice:</strong> ${c.vice.nome} (${c.vice.partido})</div>` : ''}

                <div class="flex flex-wrap gap-1.5 mb-4">
                  ${(c.pautas || []).filter(Boolean).map(p => `<span class="pill pill-green text-[11px]">${p}</span>`).join("")}
                </div>
              </div>

              <div class="pt-3 border-t border-[var(--line)] flex items-center justify-between text-[12.5px] font-bold text-[var(--teal-deep)]">
                <span>Ver histórico parlamentar</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </div>
            </article>
          `).join("")}
        </div>
      `}
    </div>
  `;
}

function selectRegion(novaRegiao) {
  const primeiroEstado = (REGIOES[novaRegiao]?.estados || [])[0] || "SP";
  candidatosState.region = novaRegiao;
  candidatosState.uf = primeiroEstado;

  window.location.hash = `/candidatos?cargo=${candidatosState.cargo}&regiao=${novaRegiao}&uf=${primeiroEstado}`;

  const main = document.getElementById("main-content");
  if (main) renderCandidatos(main, parseHash().params);
}

function selectUF(novoEstado) {
  let reg = candidatosState.region;
  Object.entries(REGIOES).forEach(([key, value]) => {
    if (value.estados && value.estados.includes(novoEstado)) {
      reg = key;
    }
  });

  candidatosState.uf = novoEstado;
  candidatosState.region = reg;

  window.location.hash = `/candidatos?cargo=${candidatosState.cargo}&regiao=${reg}&uf=${novoEstado}`;

  const main = document.getElementById("main-content");
  if (main) renderCandidatos(main, parseHash().params);
}

/* ===== PÁGINA: GUIA DO ELEITOR ===== */
function renderGuiaDoEleitor(main) {
  if (!main) main = document.getElementById("main-content");

  const faqs = [
    {
      q: "1. O que é um partido e pra que ele serve?",
      r: "Um partido político é uma organização de cidadãos unidos por ideias e propostas em comum, cujo objetivo é disputar eleições, conquistar o poder público e influenciar a administração do Estado. Ele serve para conectar os eleitores aos governantes, organizar a representação no parlamento e selecionar candidatos. O Brasil conta atualmente com <b>30 partidos políticos oficialmente registrados no Tribunal Superior Eleitoral (TSE)</b>, além de outras legendas que se encontram em fase de formação."
    },
    {
      q: "2. O que é o Congresso Nacional?",
      r: "O Congresso Nacional é o órgão que detém o Poder Legislativo federal no Brasil, sendo responsável por representar o povo e os estados, elaborar e aprovar as leis do país, e fiscalizar os atos do Poder Executivo. Sua estrutura é bicameral, ou seja, é composto por duas casas legislativas: <br> <b>1. Câmara dos Deputados:</b> Representa o povo brasileiro e é formada por deputados federais cuja quantidade por estado varia conforme a população.<br> <b>2. Senado Federal:</b> Representa os estados e o Distrito Federal de forma igualitária, contando com 3 senadores por unidade federativa."
    },
    {
      q: "3. E onde entram os deputados estaduais(distritais)?",
      r: "Os deputados estaduais entram no <b>Poder Legislativo Estadual</b>. Eles compõem a Assembleia Legislativa de cada estado (ou a Câmara Legislativa no caso do Distrito Federal), sendo responsáveis por representar a população local, criar e aprovar as leis estaduais, votar o orçamento do estado e fiscalizar as ações dos governadores."
    },
    {
      q: "4. Qual é a ordem de votação na urna em 2026?",
      r: "Nas Eleições Gerais de 2026, você votará na seguinte sequência:<ol class='mt-2 mb-0 ps-4 list-decimal space-y-1'><li>Deputado Federal (4 dígitos)</li><li>Deputado Estadual ou Distrital (5 dígitos)</li><li>Senador + 2 suplentes — 1ª vaga (3 dígitos)</li><li>Senador + 2 suplentes — 2ª vaga (3 dígitos)</li><li>Governador + vice (2 dígitos)</li><li>Presidente da República + vice (2 dígitos)</li></ol>"
    },
    {
      q: "5. Como funciona a Câmara do Deputados e qual a sua importância?",
      r: "A Câmara dos Deputados é a câmara baixa do Congresso Nacional e representa a população brasileira de forma proporcional ao número de habitantes de cada estado e do Distrito Federal. Ela funciona em conjunto com o Senado Federal na elaboração, debate e votação das leis do país.<br> <ol class='mt-2 mb-0 ps-4 list-decimal space-y-1'><b>Principais funções e o seu funcionamento incluem:</b><li><b>Elaboração de Leis:</b> É o ponto de partida para a tramitação da maioria dos projetos de lei ordinárias, complementares e emendas constitucionais.</li><li><b>Fiscalização do Executivo:</b> Fiscaliza o uso do orçamento público e os atos da administração federal.</li><li><b>Representação Popular:</b> Garante voz aos diferentes segmentos da sociedade através de seus 513 deputados federais eleitos para mandatos de 4 anos.</li><li><b>Representação Popular:</b> Garante voz aos diferentes segmentos da sociedade através de seus 513 deputados federais eleitos para mandatos de 4 anos.</li></ol><p><br>Sua importância reside no fato de ser o reflexo direto da vontade e da pluralidade da sociedade. Como o número de deputados por estado varia conforme a população (com limites mínimos e máximos), ela assegura que estados mais populosos tenham maior peso nas decisões legislativas, equilibrando a balança política com o Senado, que prioriza a representação igualitária dos estados.</p>"
    },
    {
      q: "6. O que acontece quando voce vota branco ou nulo?",
      r: "<b>Voto Branco:</b> Historicamente, era considerado um voto de protesto ou de concordância com quem estivesse no poder, mas na prática não possui nenhum valor para o cálculo dos votos válidos. Ele é simplesmente descartado e não interfere no resultado da eleição.<p><b>Voto Nulo:</b> Ocorre quando o eleitor digita um número inexistente na urna ou anula o voto intencionalmente. Assim como o branco, o voto nulo é desconsiderado e não é contabilizado como voto válido para definir quem ganha a eleição.</p><p><b>Mito da Anulação da Eleição:</b> Existe uma crença popular de que se mais da metade dos votos forem nulos a eleição é anulada, mas a legislação brasileira determina que apenas os votos válidos (excluídos os brancos e nulos) são computados para o cálculo dos resultados.</p>"
    },
    {
      q: "7. Qual o papel de cada cargo afinal?",
      r: "<ol>Papel dos Cargos:<li><b>Presidente:</b> Chefe do Executivo federal, comanda a administração nacional, as Forças Armadas e executa o orçamento.</li><li><b>Governador</b> Chefe do Executivo estadual, gerencia a máquina pública, a segurança, a saúde e a educação do estado.</li><li><b>Senador:</b> Representa o estado no Congresso, vota leis federais, fiscaliza o Executivo e aprova ministros do STF.</li><li><b>Deputado Federal:</b> Representa o povo na Câmara, elaborando e votando projetos de lei federais e emendas constitucionais.</li><li><b>Deputado Estadual/Distrital:</b> Representa a população nas assembleias locais, criando leis estaduais/distritais e fiscalizando o governo local.</li></ol>"
    },
    {
      q: "8. Por que o deputado pode pesar tanto quanto o presidente?",
      r: "O Presidente governa, mas depende do Congresso: Mesmo com muito poder, o presidente precisa aprovar leis, verbas e reformas na Câmara dos Deputados. Sem aliados lá, o governo trava. Além disso, tem o poder das leis e do impeachment: É a Câmara dos Deputados que inicia votações cruciais para o país e que tem o poder de aceitar ou barrar um processo de impeachment. Por fim, existe o 'efeito multiplicador' do voto: No sistema proporcional dos deputados, votar em um candidato bem votado (o puxador de votos) ajuda a eleger toda a coligação ou partido dele, alterando drasticamente a força política no parlamento."
    },
    {
      q: "9. Como posso cobrar dos politicos que eu eleger?",
      r: "Você pode cobrar dos políticos eleitos acompanhando o trabalho deles por portais de transparência, monitorando as votações e o uso de verbas públicas, enviando mensagens diretas aos gabinetes pelas redes sociais ou e-mails institucionais, e participando de audiências públicas e movimentos de fiscalização cidadã."
    },
    {
      q: "10. O voto é obrigatório? E se eu estiver viajando?",
      r: "Sim, o voto é obrigatório para os brasileiros alfabetizados entre 18 e 70 anos, e facultativo para jovens de 16 e 17 anos, maiores de 70 anos e analfabetos. Se estiver viajando, fora do seu domicilio eleitoral no dia da eleição, deverá justificar a ausência por meio do aplicativo e-Título ou preenchendo o Requerimento de Justificativa Eleitoral (RJE) nos locais destinados pela Justiça Eleitoral."
    },
    {
      q: "11. O que acontece se eu não votar e não justificar?",
      r: "O eleitor fica em débito com a Justiça Eleitoral e paga uma multa. Enquanto estiver irregular, não poderá emitir passaporte, renovar matrícula em universidades públicas, tomar posse em concurso público nem obter empréstimos em bancos oficiais."
    },
    {
      q: "12. O que preciso levar pra votar?",
      r: "Você precisa apresentar apenas um documento oficial com foto, como RG, CNH, passaporte, carteira de trabalho ou certificado de reservista. O aplicativo e-Título também é aceito caso você já tenha foto cadastrada nele."
    },
    {
      q: "13. Onde posso encontrar meu local de votação?",
      r: "Você pode consultar seu local de votação e a sua seção eleitoral acessando o <a href='https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral#/' target='_blank' class='link-texto'>site oficial do Tribunal Superior Eleitoral (TSE)</a> ou utilizando o aplicativo e-Título para <a href='https://play.google.com/store/apps/details?id=br.jus.tse.eleitoral.etitulo' target='_blank' class='link-texto'>Android</a> ou <a href='https://apps.apple.com/br/app/e-t%C3%ADtulo/id1320338088' target='_blank' class='link-texto'>iOS</a>."
    }
  ];

  main.innerHTML = `
    <section class="teal-shell relative overflow-hidden">
      <span class="blob blob-a"></span>
      <span class="blob blob-b"></span>
      <div class="wrap relative pt-8 pb-10 z-20">
        <div class="text-left">
          <span class="pill bg-white/20 text-white inline-flex items-center gap-1.5">TIRE SUAS DÚVIDAS</span>
          <h1 class="font-display text-[28px] sm:text-[34px] mt-2 text-white">Guia do Eleitor</h1>
          <p class="mt-2 text-[14.5px] text-white/85 leading-relaxed max-w-[600px]">
            Respostas diretas sobre os cargos que vamos eleger, documentos, regras de votação, composições e muito mais pra essas Eleições de 2026.
          </p>
        </div>
      </div>
    </section>

    <section class="wrap py-8 sm:py-10">
      <div class="space-y-3" id="guia-accordion">
        ${faqs.map((item, idx) => `
          <div class="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden">
            <button type="button" onclick="toggleGuiaAccordion(${idx})" class="w-full flex items-center justify-between p-5 text-left font-display text-[16px] text-[var(--ink)] hover:text-[var(--teal-deep)] transition-colors focus:outline-none">
              <span>${item.q}</span>
              <svg id="acc-icon-${idx}" class="w-5 h-5 text-[var(--teal-deep)] transition-transform duration-200 shrink-0 ml-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="acc-body-${idx}" class="hidden px-5 pb-5 pt-1 text-[14px] text-[var(--ink-soft)] leading-relaxed border-t border-[var(--line)]/50">
              ${item.r}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function toggleGuiaAccordion(index) {
  const body = document.getElementById(`acc-body-${index}`);
  const icon = document.getElementById(`acc-icon-${index}`);
  if (!body || !icon) return;

  const isOpen = !body.classList.contains("hidden");

  document.querySelectorAll("#guia-accordion [id^='acc-body-']").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll("#guia-accordion [id^='acc-icon-']").forEach(el => el.classList.remove("rotate-180"));

  if (!isOpen) {
    body.classList.remove("hidden");
    icon.classList.add("rotate-180");
  }
}

/* ===== PÁGINA: FALE CONOSCO ===== */
function renderFaleConosco(main) {
  if (!main) main = document.getElementById("main-content");

  main.innerHTML = `
    <section class="teal-shell relative overflow-hidden">
      <span class="blob blob-a"></span>
      <span class="blob blob-b"></span>
      <div class="wrap relative pt-8 pb-10 z-20">
        <div class="text-left">
          <span class="pill bg-white/20 text-white inline-flex items-center gap-1.5">CONTATO</span>
          <h1 class="font-display text-[28px] sm:text-[34px] mt-2 text-white">Fale Conosco</h1>
          <p class="mt-2 text-[14.5px] text-white/85 leading-relaxed max-w-[600px]">
            Sugestões, dúvidas ou correções sobre as informações prestadas?
          </p>
        </div>
      </div>
    </section>

    <section class="wrap py-8 sm:py-10">
      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--line)] shadow-sm">
          <form id="form-fale-conosco" onsubmit="enviarMensagemContato(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase mb-1 text-[var(--ink-soft)]">Seu Nome</label>
              <input type="text" id="contato-nome" required class="w-full bg-[var(--paper)] border border-[var(--line)] p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="Digite seu nome">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase mb-1 text-[var(--ink-soft)]">E-mail</label>
              <input type="email" id="contato-email" required class="w-full bg-[var(--paper)] border border-[var(--line)] p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="seuemail@exemplo.com">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase mb-1 text-[var(--ink-soft)]">Mensagem</label>
              <textarea id="contato-mensagem" required class="w-full bg-[var(--paper)] border border-[var(--line)] p-3 rounded-xl text-sm h-32 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="Sua mensagem..."></textarea>
            </div>
            
            <div class="flex justify-end pt-2">
              <button type="submit" id="btn-enviar-contato" class="btn btn-primary px-6 py-2.5 text-sm w-auto">
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>

        <div class="space-y-4 pt-2">
          <div class="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--line)] shadow-sm">
            <div class="flex items-center gap-2 mb-3 text-[var(--teal-deep)]">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <h2 class="font-display text-[18px] text-[var(--ink)]">Compromisso com a Transparência</h2>
            </div>
            <p class="text-[14px] text-[var(--ink-soft)] leading-relaxed mb-4">
              Todos os dados exibidos no Voto Cidadão são coletados e verificados diretamente de fontes oficiais do <strong>TSE (Tribunal Superior Eleitoral)</strong> e portais públicos de prestação de contas.
            </p>
            <p class="text-[14px] text-[var(--ink-soft)] leading-relaxed">
              Nossa missão é oferecer o máximo de transparência e clareza para auxiliar o cidadão no momento do voto.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

async function enviarMensagemContato(event) {
  event.preventDefault();
  const btn = document.getElementById("btn-enviar-contato");
  if (btn) {
    btn.disabled = true;
    btn.innerText = "Enviando...";
  }
  try {
    document.getElementById("form-fale-conosco")?.reset();
    openModalSucesso();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "Enviar Mensagem";
    }
  }
}

function openModalSucesso() {
  const modal = document.getElementById("modal-sucesso");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

function closeModalSucesso() {
  const modal = document.getElementById("modal-sucesso");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }
}

function renderLinksUteis(main) {
  if (!main) main = document.getElementById("main-content");

  main.innerHTML = `
    <section class="teal-shell relative overflow-hidden">
      <span class="blob blob-a"></span>
      <span class="blob blob-b"></span>
      <div class="wrap relative pt-8 pb-10 z-20">
        <div class="text-left">
          <span class="pill bg-white/20 text-white inline-flex items-center gap-1.5">RECURSOS</span>
          <h1 class="font-display text-[28px] sm:text-[34px] mt-2 text-white">Links Úteis e Checagem</h1>
          <p class="mt-2 text-[14.5px] text-white/85 leading-relaxed max-w-[600px]">
            Locais onde consultamos e verificamos os dados exibidos no Voto Cidadão. E alguns canais que pode achar interessante para pesquisar mais sobre as eleições. Ficou na duvida? <b>Pesquise!</b> Joga na IA, se informa! Vá em fontes oficiais, não fique só nas redes sociais. <br><b>Vote consciente.</b>   
          </p>
        </div>
      </div>
    </section>

    <section class="wrap py-8 sm:py-10">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${[
          {t:"TSE — Tribunal Superior Eleitoral",x:"Dados oficiais sobre candidatos, eleições e resultados.",u:"https://www.tse.jus.br"},
          {t:"Câmara dos Deputados",x:"Projetos de lei, votações e informações sobre deputados federais.",u:"https://www.camara.leg.br"},
          {t:"Senado Federal",x:"Informações sobre senadores, comissões e votações no Senado.",u:"https://www.senado.leg.br"},
          {t:"Agência Lupa",x:"Agência de checagem de fatos independente.",u:"https://piaui.folha.uol.com.br/lupa"},
          {t:"Aos Fatos",x:"Plataforma de checagem de declarações de políticos.",u:"https://www.aosfatos.org"},
          {t:"Projeto Comprova",x:"Coalizão de veículos de imprensa para combater desinformação.",u:"https://projetocomprova.com.br"},
        ].map(f => `
          <a href="${f.u}" target="_blank" rel="noopener" class="bg-white rounded-2xl p-5 border border-[var(--line)] hover:border-[var(--teal)] transition-all shadow-sm hover:shadow group flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-display text-[15px] leading-tight text-[var(--ink)] group-hover:text-[var(--teal-deep)] transition-colors">${f.t}</h3>
                <svg class="w-4 h-4 text-[var(--ink-soft)] group-hover:text-[var(--teal)] transition-colors shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </div>
              <p class="text-[13px] text-[var(--ink-soft)] leading-relaxed">${f.x}</p>
            </div>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}


function switchDossieTab(key) { 
  dossieState.tab = key; 
  renderDossieModal(); 
}

function closeDossie(event) {
  if (event && event.target) {
    const modalContent = document.querySelector("#dossie-modal > div");
    const clicouDentroDoCartao = modalContent && modalContent.contains(event.target);
    const clicouNoBotaoFechar = event.target.closest('button[aria-label="Fechar"]');
    if (clicouDentroDoCartao && !clicouNoBotaoFechar) return;
  }

  // Limpa o estado para evitar que abra o candidato anterior da próxima vez
  dossieState.candidate = null;
  dossieState.dossie = null;

  const modal = document.getElementById("dossie-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }
}

/* ===== MODAL DOSSIÊ ATUALIZADO (SEPARAÇÃO EXECUTIVO X LEGISLATIVO) ===== */
/* ============================================================
   MODAL DOSSIÊ UNIFICADO E BUSCA EM ESCALA (Executivo + Legislativo)
   ============================================================ */
let dossieState = { tab: "trajetoria", candidate: null, dossie: null };
async function openDossie(candidateId) {
  let c = null;

  // 1. Procura se é Presidente
  if (candidateId.startsWith("presidente-")) {
    c = CANDIDATOS_PRESIDENTE.map((item, index) => {
      const p = item.presidente;
      const v = item.vice;
      const slug = p.nome_urna.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
      return {
        id: `presidente-br-${slug}`,
        nome: p.nome_urna,
        nomeCompleto: p.nome_completo,
        partido: p.partido_sigla,
        numero: item.numero,
        cargo: "presidente",
        uf: "BR",
        color: AVATAR_COLORS[index % AVATAR_COLORS.length],
        foto: p.foto
      };
    }).find(x => x.id === candidateId);
  } 
  // 2. Procura se é Governador
  else if (candidateId.startsWith("governador-") && window.CandidatosGovernadores) {
    Object.values(window.CandidatosGovernadores).forEach(listaDeEstado => {
      const encontrado = listaDeEstado.find(x => x.id === candidateId);
      if (encontrado) c = encontrado;
    });
  } 
  // 3. BUSCA SEGURA: Procura rigorosamente na listagem global ativa ou nos arquivos carregados
  else {
    for (const key of Object.keys(window)) {
      if (key.includes("CandidatosSenadores") || key.includes("CandidatosFederais") || key.includes("CandidatosEstaduais")) {
        const lista = window[key];
        if (Array.isArray(lista)) {
          const encontrado = lista.find(x => String(x.id) === String(candidateId) || `${x.numero}-${x.partido}` === candidateId);
          if (encontrado) {
            c = { ...encontrado }; // Clona o objeto para evitar qualquer referência cruzada
            if (key.includes("Senadores")) c.cargo = "senador";
            else if (key.includes("Federais")) c.cargo = "deputado-federal";
            else if (key.includes("Estaduais")) c.cargo = "deputado-estadual";
            break;
          }
        }
      }
    }
  }

  // 4. Se não achou na memória, carrega o arquivo modular do estado
  if (!c) {
    const parts = candidateId.split("-");
    const cargo = parts[0];
    const uf = parts[1]?.toUpperCase() || "SP";
    
    const listaEstado = await obterCandidatos(cargo, uf);
    const encontradoMod = listaEstado.find(x => String(x.id) === String(candidateId));
    if (encontradoMod) c = { ...encontradoMod };
  }

  if (!c) {
    c = { 
      id: candidateId, 
      nome: "Candidato", 
      nomeCompleto: "Candidato Eletivo", 
      partido: "PARTIDO", 
      numero: "00", 
      cargo: candidatosState.cargo, 
      uf: candidatosState.uf || "RJ", 
      color: "#159AAE" 
    };
  }

  // BLINDAGEM: Garante que o candidato tenha um cargo válido
  if (!c.cargo || c.cargo === "undefined") {
    c.cargo = candidatosState.cargo || "deputado-federal";
  }

  // ===== GARANTIA DE CARREGAMENTO DO DOSSIÊ MODULAR DO ESTADO =====
  let dossie = null;
  if (c.uf && c.cargo) {
    let tipoCargoStr = "";
    if (c.cargo === "senador") tipoCargoStr = "SENADORES";
    else if (c.cargo === "deputado-federal") tipoCargoStr = "FEDERAIS";
    else if (c.cargo === "deputado-estadual" || c.cargo === "deputado-distrital") tipoCargoStr = "ESTADUAIS";

    if (tipoCargoStr) {
      const nomeGlobalDossie = `DOSSIES_${tipoCargoStr}_${c.uf.toUpperCase()}`;
      
      if (!window[nomeGlobalDossie]) {
        await new Promise((resolve) => {
          const scriptD = document.createElement("script");
          const tipoArq = c.cargo === "senador" ? "senador" : c.cargo.includes("federal") ? "federal" : "estadual";
          scriptD.src = `dados-eleitorais/${c.uf.toLowerCase()}/dossies-${tipoArq}-${c.uf.toLowerCase()}.js?v=${Date.now()}`;
          scriptD.onload = resolve;
          scriptD.onerror = resolve;
          document.head.appendChild(scriptD);
        });
      }

      if (window[nomeGlobalDossie]) {
        dossie = window[nomeGlobalDossie][c.id];
      }
    }
  }

  if (!dossie) {
    dossie = candidateDossie(c);
  }
  
  const cargoLower = (c.cargo || "").toLowerCase();
  const isLegislativo = cargoLower.includes("senador") || 
                        cargoLower.includes("deputado") || 
                        cargoLower.includes("federal") || 
                        cargoLower.includes("estadual") || 
                        cargoLower.includes("distrital");

  dossieState = { tab: isLegislativo ? "historico" : "trajetoria", candidate: c, dossie };
  
  renderDossieModal();

  const modal = document.getElementById("dossie-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

function closeDossie(event) {
  if (event && event.target) {
    const modalContent = document.querySelector("#dossie-modal > div");
    const clicouDentroDoCartao = modalContent && modalContent.contains(event.target);
    const clicouNoBotaoFechar = event.target.closest('button[aria-label="Fechar"]');
    if (clicouDentroDoCartao && !clicouNoBotaoFechar) return;
  }

  const modal = document.getElementById("dossie-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }
}

/* ============================================================
   MODAL DOSSIÊ UNIFICADO (Executivo + Legislativo)
   ============================================================ */
/* ============================================================
   MODAL DOSSIÊ UNIFICADO (Executivo + Legislativo)
   ============================================================ */
function renderDossieModal() {
  const { candidate: c, dossie: d } = dossieState;
  if (!c) return;
  const cargoName = CARGOS[c.cargo]?.nome || c.cargo;

  // CORREÇÃO: Cria um ID único combinando id, número e partido para evitar conflitos de undefined
  const candidatoIdUnico = c.id || `${c.numero}-${c.partido || c.partido_sigla || 'pt'}`;

  const favoritos = JSON.parse(localStorage.getItem("voto_cidadao_colinha") || "[]");
  const isFavorito = favoritos.some(f => String(f.id) === String(candidatoIdUnico));

  document.getElementById("dossie-header").innerHTML = `
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        ${c.foto ? `
            <img src="${c.foto}" alt="${c.nome}" class="rounded-full object-cover shrink-0 border-2 border-white shadow-sm" style="width:48px;height:48px;" />
          ` : `
            <div class="rounded-full flex items-center justify-center font-display text-white shrink-0 border-2 border-white shadow-sm" style="width:48px;height:48px;background:${c.color || '#159AAE'}">${initials(c.nome)}</div>
         `}
        <div>
          <h2 class="font-display text-[18px] leading-tight text-white">${c.nome}</h2>
          <p class="text-[13px] text-white/90 mt-0.5">${c.nomeCompleto || c.nome}</p>
          <p class="text-[12px] text-white/80 mt-0.5">Partido: <strong>${c.partido}</strong> • Nº ${c.numero} • Cargo: ${cargoName}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleFavoritoDossie('${candidatoIdUnico}')" class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform hover:scale-105" title="${isFavorito ? 'Remover da Colinha' : 'Adicionar à Colinha'}">
          <svg class="w-5 h-5 ${isFavorito ? 'text-red-400 fill-current' : 'text-white'}" fill="${isFavorito ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <button onclick="closeDossie(null)" class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0" aria-label="Fechar">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  `;

  document.getElementById("dossie-stats").innerHTML = "";

  // VERIFICAÇÃO RIGOROSA DE CARGO LEGISLATIVO
  // VERIFICAÇÃO AMPLIADA PARA QUALQUER CARGO LEGISLATIVO
const cargoLower = (c.cargo || "").toLowerCase();
const isLegislativo = cargoLower.includes("senador") || 
                      cargoLower.includes("deputado") || 
                      cargoLower.includes("federal") || 
                      cargoLower.includes("estadual") || 
                      cargoLower.includes("distrital");
  const tabsEl = document.getElementById("dossie-tabs");
  let content = "";

  if (isLegislativo) {
    if (tabsEl) tabsEl.style.display = "none";

    const linkTSE = "https://divulgacandcontas.tse.jus.br/divulga/#/candidato/regiao/BR/20322002026";
    const nomeFormatado = encodeURIComponent(`${c.nome} ${c.partido}`);
    const linkGoogle = `https://www.google.com/search?q=${nomeFormatado}+historico+eleicoes`;

    let textoLegislativo = "";

    if (c.cargo === "senador") {
      textoLegislativo = `
        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 12px;">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Atribuições do Cargo</h4>
          <p style="margin: 0;">O Senador representa o estado no Congresso Nacional, com mandato de 8 anos. É responsável por propor e votar leis federais, fiscalizar o Poder Executivo e aprovar indicações de autoridades.</p>
        </div>
        
        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 12px;">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Dica de Pesquisa</h4>
          <p style="margin: 0 0 8px 0;">Antes de votar, verifique a trajetória pública, propostas e histórico de atuação do(a) candidato(a) <strong>${c.nome}</strong>.</p>
          <a href="${linkGoogle}" target="_blank" rel="noopener noreferrer" style="color: var(--teal-deep); text-decoration: underline; font-weight: bold; font-size: 13px;">Pesquisar histórico completo no Google ↗</a>
        </div>

        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line);">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Sistema de Votação</h4>
          <p style="margin: 0;">A eleição para o Senado é majoritária simples: o candidato com o maior número de votos conquista a vaga diretamente.</p>
        </div>
      `;
    } else if (c.cargo === "deputado-federal") {
      textoLegislativo = `
        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 12px;">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Atribuições do Cargo</h4>
          <p style="margin: 0;">O Deputado Federal atua na Câmara dos Deputados em Brasília, criando e votando leis federais e emendas constitucionais por um mandato de 4 anos.</p>
        </div>
        
        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 12px;">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Dica de Pesquisa</h4>
          <p style="margin: 0 0 8px 0;">Consulte projetos anteriores e a atuação legislativa do(a) candidato(a) <strong>${c.nome}</strong>.</p>
          <a href="${linkGoogle}" target="_blank" rel="noopener noreferrer" style="color: var(--teal-deep); text-decoration: underline; font-weight: bold; font-size: 13px;">Pesquisar histórico completo no Google ↗</a>
        </div>

        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line);">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Sistema Proporcional e Voto em Legenda</h4>
          <p style="margin: 0;">As eleições para deputados seguem o sistema proporcional. Caso o candidato não atinja votos suficientes para a vaga direta, seus votos somam para o total do partido, ajudando a legenda a eleger outros representantes do mesmo grupo político.</p>
        </div>
      `;
    } else {
      textoLegislativo = `
        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 12px;">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Atribuições do Cargo</h4>
          <p style="margin: 0;">O Deputado ${c.cargo === 'deputado-distrital' ? 'Distrital' : 'Estadual'} integra a assembleia legislativa, elaborando leis estaduais e fiscalizando a gestão pública local.</p>
        </div>
        
        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 12px;">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Dica de Pesquisa</h4>
          <p style="margin: 0 0 8px 0;">Conheça o histórico e o comprometimento do(a) candidato(a) <strong>${c.nome}</strong> com o estado.</p>
          <a href="${linkGoogle}" target="_blank" rel="noopener noreferrer" style="color: var(--teal-deep); text-decoration: underline; font-weight: bold; font-size: 13px;">Pesquisar histórico completo no Google ↗</a>
        </div>

        <div style="background: var(--paper); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--line);">
          <h4 style="font-family: var(--font-display); font-size: 14.5px; color: var(--teal-deep); margin-bottom: 6px;">Sistema Proporcional</h4>
          <p style="margin: 0;">O voto para deputado estadual/distrital também utiliza o cálculo proporcional. O total de votos recebidos pelo candidato fortalece a legenda partidária na conquista de cadeiras no parlamento.</p>
        </div>
      `;
    }

    content = `
      <div class="space-y-3 pb-6" style="font-size: 13.5px; color: var(--ink-soft); line-height: 1.6;">
        ${textoLegislativo}
        
        <div style="margin-top: 16px; padding: 14px 16px; background: #EAF5F5; border-radius: 12px; border: 1px solid rgba(21,154,174,0.2);">
          <h4 style="font-family: var(--font-display); font-size: 14px; color: var(--teal-deep); margin-bottom: 6px;">Plataforma Oficial do TSE</h4>
          <p style="font-size: 13px; color: var(--ink-soft); margin-bottom: 10px;">Consulte declaração de bens, certidões e dados oficiais atualizados:</p>
          <a href="${linkTSE}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 12px; padding: 8px 14px; text-decoration: none; display: inline-block;">Abrir DivulgaCandContas (TSE) ↗</a>
        </div>
      </div>
    `;

  } else {
    // FLUXO EXCLUSIVO PARA EXECUTIVO (Presidente e Governador)
    if (tabsEl) tabsEl.style.display = "flex";

    const TABS = [
      { key: "trajetoria", label: "Trajetória" },
      { key: "o-que-ja-fez", label: "O que já fez" },
      { key: "partidos-pautas", label: "Partidos e Pautas" },
      { key: "investigacoes", label: "Investigações e Processos" },
      { key: "projetos", label: "Principais Projetos" }
    ];

    document.getElementById("dossie-tabs").innerHTML = TABS.map(t => `
      <button onclick="switchDossieTab('${t.key}')" class="px-3 py-2.5 text-[12.5px] font-bold whitespace-nowrap border-b-2 transition-colors ${dossieState.tab === t.key ? 'border-[var(--teal)] text-[var(--teal-deep)]' : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'}">${t.label}</button>
    `).join("");

    if (!dossieState.tab || !TABS.some(t => t.key === dossieState.tab)) {
      dossieState.tab = TABS[0].key;
    }

    if (!d.isPresidente && c.cargo !== "governador") {
      content = `
        <div class="py-8 text-center space-y-4">
          <span class="pill pill-yellow">Em construção</span>
          <h3 class="font-display text-[18px] text-[var(--ink)]">Dados detalhados em atualização</h3>
          <p class="text-[14px] text-[var(--ink-soft)] max-w-[420px] mx-auto leading-relaxed">
            Os relatórios detalhados para o cargo de <strong>${cargoName}</strong> estarão disponíveis em breve.
          </p>
        </div>
      `;
    } else if (dossieState.tab === "trajetoria") {
      content = `<h3 class="font-display text-[15px] mb-3">Trajetória Pessoal e Profissional</h3>` + (d.trajetoria || []).map(i => `<div class="timeline-item"><span class="font-data text-[12px] text-[var(--teal-deep)] font-bold">${i.ano}</span><p class="text-[13px] text-[var(--ink-soft)] mt-0.5 leading-relaxed">${i.texto}</p></div>`).join("");
    } else if (dossieState.tab === "o-que-ja-fez") {
      content = `<h3 class="font-display text-[15px] mb-3">O que já fez (Realizações e Entregas)</h3>` + (d.projetos || []).map(i => `<div class="bg-[var(--paper)] rounded-xl p-3.5 border border-[var(--line)] mt-3"><span class="font-data text-[12px] text-[var(--teal-deep)] font-bold">${i.titulo}</span><p class="text-[13px] text-[var(--ink-soft)] mt-1 leading-relaxed">${i.texto}</p></div>`).join("");
    } else if (dossieState.tab === "partidos-pautas") {
      const historico = d.historicoPartidos || ["Histórico partidário em atualização."];
      content = `<h3 class="font-display text-[15px] mb-3">Histórico Partidário</h3>` + historico.map(p => `<div class="bg-[var(--paper)] rounded-xl p-3 border border-[var(--line)] mb-2 text-[13.5px] font-semibold">${p}</div>`).join("");
    } else if (dossieState.tab === "investigacoes") {
      content = `<h3 class="font-display text-[15px] mb-2">Investigações e Processos Judiciais</h3>` + (d.investigacoes || []).map(i => `<div class="bg-[var(--paper)] rounded-xl p-3.5 border border-[var(--line)] mt-3"><span class="font-display text-[13px] text-[var(--ink)]">${i.tema}</span><p class="text-[12.5px] font-bold text-[var(--teal-deep)] mt-1">${i.status}</p></div>`).join("");
    } else if (dossieState.tab === "projetos") {
      const proj = d.projetosPrincipais || { escreveu: [], apoiou: [], contra: [] };
      content = `<h3 class="font-display text-[15px] mb-4">Principais Projetos</h3>` + 
                `<h4 class="font-display text-[13.5px] text-[var(--teal-deep)] mb-2">✍️ Autoria</h4>` + (proj.escreveu || []).map(p => `<div class="bg-[var(--paper)] rounded-xl p-3 border border-[var(--line)] mb-2"><strong class="text-xs">${p.titulo}</strong><p class="text-[12.5px] mt-1">${p.texto}</p></div>`).join("");
    }
  }

  content += `<p class="disclaimer mt-6 mb-6">Fonte: Dados públicos oficiais e TSE.</p>`;
  document.getElementById("dossie-content").innerHTML = content;

  const urlAtual = window.location.href.split('#')[0] + `#/candidatos?id=${c.id}`;
  const shareText = `*Dossiê: ${c.nome} (${c.partido})*\nConfira as informações no Voto Cidadão:\n${urlAtual}`;
  
  const shareContainer = document.getElementById("dossie-share")?.parentElement;
  if (shareContainer) {
    shareContainer.className = "grid grid-cols-2 gap-3 mt-4 pt-4 pb-6 px-6 border-t border-[var(--line)] bg-white rounded-b-2xl sticky bottom-0 z-10 shadow-[0_-6px_16px_rgba(0,0,0,0.04)]";
    shareContainer.innerHTML = `
      <a href="https://wa.me/?text=${encodeURIComponent(shareText)}" target="_blank" rel="noopener noreferrer" class="btn bg-[#25D366] text-white hover:bg-[#20ba5a] text-[12px] font-semibold py-2.5 px-3 text-center rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm">
        <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        WhatsApp
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="btn bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 text-[12px] font-semibold py-2.5 px-3 text-center rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm">
        <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        Instagram
      </a>
    `;
  }
}

function switchDossieTab(key) { 
  dossieState.tab = key; 
  renderDossieModal(); 
}

/* ===== MENUS ===== */
function openSubmenu() { document.getElementById("submenu")?.classList.remove("hidden"); }
function closeSubmenu() { document.getElementById("submenu")?.classList.add("hidden"); }

function openMobileMenu() {
  document.getElementById("mobile-menu")?.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Trava o fundo
}
function closeMobileMenu() {
  document.getElementById("mobile-menu")?.classList.add("hidden");
  document.body.style.overflow = ""; // Destrava o fundo da página
}

function populateSubmenus() {
  const cargosUl = document.getElementById("submenu-cargos");
  if (cargosUl) {
    cargosUl.innerHTML = CARGO_ORDER.map(k => `
      <li><a href="#/candidatos?cargo=${k}" onclick="navigate('/candidatos?cargo=${k}');return false" class="block w-full text-left px-2 py-1.5 rounded-lg text-sm font-semibold hover:bg-[var(--paper-dim)] hover:text-[var(--teal-deep)]">${CARGOS[k].nome}</a></li>
    `).join("");
  }
}

function selectHomeRegion(key) {
  currentRegion = key;
  
  // Atualiza a seleção visual dos botões de região sem destruir o scroll
  document.querySelectorAll("#regioes-scroller button").forEach(btn => {
    btn.className = btn.className.replace(/border-\[var\(--teal\)\] ring-2 ring-\[var\(--teal\)\]\/20/g, "border-[var(--line)] opacity-85 hover:opacity-100");
  });
  
  // Atualiza o select de estados com base na região escolhida
  const selectEstado = document.getElementById("home-estado-select");
  if (selectEstado) {
    if (key === 'brasil') {
      selectEstado.innerHTML = `<option value="BR" selected>Nacional (Todos os Estados)</option>`;
    } else {
      const estados = REGIOES[key]?.estados || [];
      selectEstado.innerHTML = estados.map(u => `<option value="${u}">${UF_NOMES[u]} (${u})</option>`).join('');
    }
  }

  // Atualiza o estado global de região
  candidatosState.region = key;
  if (key !== 'brasil' && REGIOES[key]?.estados?.length > 0) {
    candidatosState.uf = REGIOES[key].estados[0];
    if (selectEstado) selectEstado.value = candidatosState.uf;
  }
}

function submitHomeConsult() {
  const selectEstado = document.getElementById("home-estado-select");
  const selectCargo = document.getElementById("home-cargo-select");
  const uf = selectEstado ? selectEstado.value : "SP";
  const cargo = selectCargo ? selectCargo.value : "presidente";
  
  // Atualiza o estado global antes de navegar
  candidatosState.cargo = cargo;
  candidatosState.uf = uf;

  Object.entries(REGIOES).forEach(([key, value]) => {
    if (value.estados && value.estados.includes(uf)) {
      candidatosState.region = key;
    }
  });

  if (cargo === "presidente" || uf === "BR") {
    navigate(`/candidatos?cargo=presidente`);
  } else {
    navigate(`/candidatos?cargo=${cargo}&regiao=${candidatosState.region}&uf=${uf}`);
  }
}

/* ===== INICIALIZAÇÃO ===== */
document.addEventListener("DOMContentLoaded", () => {
  populateSubmenus();
  onHashChange();
});

/* ===== EFEITO PARALLAX DA URNA ===== */
const urna = document.getElementById("urna-parallax");
if (urna) {
  urna.addEventListener("mousemove", (e) => {
    const rect = urna.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) / 15;
    const moveY = (e.clientY - centerY) / 15;
    urna.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotate(2deg)`;
  });

  urna.addEventListener("mouseleave", () => {
    urna.style.transform = `translate3d(0px, 0px, 0px) rotate(2deg)`;
  });
}

/* ===== FUNÇÕES DE SUPORTE A DADOS MODULARES ===== */
/* ===== CARREGAMENTO ASSÍNCRONO MODULAR (SENADORES E DEPUTADOS) ===== */
async function carregarDadosEstado(cargo, uf) {
  const estado = uf.toLowerCase();
  let tipoArquivo = "";
  let sufixoGlobal = "";
  let nomeDossieGlobal = "";
  let nomeArquivoDossie = "";
  
  if (cargo === "senador") {
    tipoArquivo = "senadores";
    sufixoGlobal = "Senadores";
    nomeDossieGlobal = `DOSSIES_SENADORES_${uf.toUpperCase()}`;
    nomeArquivoDossie = `dossies-senador-${estado}`; // Nome exato do seu arquivo: dossies-senador-rj.js
  } else if (cargo === "deputado-federal") {
    tipoArquivo = "federais";
    sufixoGlobal = "Federais";
    nomeDossieGlobal = `DOSSIES_FEDERAIS_${uf.toUpperCase()}`;
    nomeArquivoDossie = `dossies-federal-${estado}`;
  } else if (cargo === "deputado-estadual" || cargo === "deputado-distrital") {
    tipoArquivo = "estaduais";
    sufixoGlobal = "Estaduais";
    nomeDossieGlobal = `DOSSIES_ESTADUAIS_${uf.toUpperCase()}`;
    nomeArquivoDossie = `dossies-estadual-${estado}`;
  }

  const caminhoArquivo = `dados-eleitorais/${estado}/${tipoArquivo}-${estado}.js`;
  const globalName = `Candidatos${sufixoGlobal}${uf.toUpperCase()}`;
  const caminhoDossie = `dados-eleitorais/${estado}/${nomeArquivoDossie}.js`; 

  // Remove scripts anteriores para evitar cache obsoleto
  document.querySelector(`script[data-modular="${globalName}"]`)?.remove();
  document.querySelector(`script[data-modular-dossie="${nomeDossieGlobal}"]`)?.remove();
  delete window[globalName];
  delete window[nomeDossieGlobal];

  // Carrega em paralelo a listagem e os dossiês de forma otimizada
  return new Promise((resolve) => {
    // 1. Carrega o arquivo de listagem principal
    const scriptListagem = document.createElement("script");
    scriptListagem.src = `${caminhoArquivo}?v=${Date.now()}`;
    scriptListagem.setAttribute("data-modular", globalName);

    scriptListagem.onload = () => {
      const dados = window[globalName] || [];
      resolve(dados);
    };

    scriptListagem.onerror = () => {
      console.warn(`Arquivo não encontrado: ${caminhoArquivo}`);
      resolve([]);
    };

    document.head.appendChild(scriptListagem);

    // 2. Carrega o arquivo de dossiês correto com o nome exato (dossies-senador-rj.js)
    const scriptDossie = document.createElement("script");
    scriptDossie.src = `${caminhoDossie}?v=${Date.now()}`;
    scriptDossie.setAttribute("data-modular-dossie", nomeDossieGlobal);
    scriptDossie.onerror = () => { 
      console.warn(`Dossiê opcional não encontrado: ${caminhoDossie}`);
    };
    document.head.appendChild(scriptDossie);
  });
}

async function obterCandidatos(cargo, uf) {
  if (cargo === "presidente") return CANDIDATOS_PRESIDENTE;
  if (cargo === "governador") {
    const chave = `governador-${uf.toLowerCase()}`;
    return window.CandidatosGovernadores?.[chave] || [];
  }
  // Chama o carregador modular assíncrono para deputados e senadores
  return await carregarDadosEstado(cargo, uf);
}

/* ===== MODO ACESSIBILIDADE SÊNIOR ===== */
function toggleSenior() {
  seniorMode = !seniorMode;
  const htmlEl = document.documentElement;
  const toast = document.getElementById("senior-toast");

  if (seniorMode) {
    htmlEl.classList.add("senior");
    if (toast) {
      toast.innerText = "Modo acessibilidade sênior ativado";
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 3000);
    }
  } else {
    htmlEl.classList.remove("senior");
    if (toast) {
      toast.innerText = "Modo acessibilidade sênior desativado";
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 3000);
    }
  }
}


/* ===== AÇÕES DOS FILTROS (MANTÉM A REGIÃO E UF ATUAIS) ===== */
function selectCargo(novoCargo) {
  candidatosState.cargo = novoCargo;

  if (novoCargo === "presidente") {
    candidatosState.region = "brasil";
    candidatosState.uf = "BR";
    window.location.hash = "/candidatos?cargo=presidente";
  } else {
    // Preserva estritamente a região e o estado (UF) atuais que o usuário escolheu
    const regAtual = candidatosState.region && candidatosState.region !== "brasil" ? candidatosState.region : "sudeste";
    const ufAtual = candidatosState.uf && candidatosState.uf !== "BR" ? candidatosState.uf : "SP";

    candidatosState.region = regAtual;
    candidatosState.uf = ufAtual;
    
    window.location.hash = `/candidatos?cargo=${novoCargo}&regiao=${regAtual}&uf=${ufAtual}`;
  }
}

function selectRegion(novaRegiao) {
  const primeiroEstado = (REGIOES[novaRegiao]?.estados || [])[0] || "SP";
  candidatosState.region = novaRegiao;
  candidatosState.uf = primeiroEstado;

  window.location.hash = `/candidatos?cargo=${candidatosState.cargo}&regiao=${novaRegiao}&uf=${primeiroEstado}`;
}

function selectUF(novoEstado) {
  let reg = candidatosState.region;
  Object.entries(REGIOES).forEach(([key, value]) => {
    if (value.estados && value.estados.includes(novoEstado)) {
      reg = key;
    }
  });

  candidatosState.uf = novoEstado;
  candidatosState.region = reg;

  window.location.hash = `/candidatos?cargo=${candidatosState.cargo}&regiao=${reg}&uf=${novoEstado}`;
}

let ordemAtualDeputados = 'nome';

function filtrarDeputados() {
  const input = document.getElementById("filtro-deputado-input");
  const valorTermo = input ? input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
  const container = document.getElementById("container-lista-candidatos");
  if (!container) return;

  const artigosArray = Array.from(container.querySelectorAll("article"));
  let visiveisCount = 0;

  artigosArray.forEach(art => {
    const textoBusca = art.getAttribute("data-busca").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (textoBusca.includes(valorTermo)) {
      art.style.display = "flex";
      visiveisCount++;
    } else {
      art.style.display = "none";
    }
  });

  const contadorEl = document.getElementById("contador-candidatos-filtro");
  if (contadorEl) contadorEl.innerText = visiveisCount;
}

function toggleFavoritoDossie(candidateId) {
  let favoritos = JSON.parse(localStorage.getItem("voto_cidadao_colinha") || "[]");
  const { candidate: c } = dossieState;
  
  if (!c) return;

  const candidatoIdUnico = String(c.id || `${c.numero}-${c.partido || c.partido_sigla || 'pt'}`);
  const index = favoritos.findIndex(f => String(f.id) === candidatoIdUnico);
  
  if (index > -1) {
    favoritos.splice(index, 1);
    localStorage.setItem("voto_cidadao_colinha", JSON.stringify(favoritos));
    renderDossieModal();
    mostrarToastColinha("Candidato removido da sua colinha.");
  } else {
    // Garante rigorosamente: 2 para senador, 1 para qualquer outro cargo
    const cargoAtual = (c.cargo || "").toLowerCase();
    const limiteCargo = cargoAtual.includes("senador") ? 2 : 1;
    
    const mesmoCargo = favoritos.filter(f => (f.cargo || "").toLowerCase().includes("senador") === cargoAtual.includes("senador") && f.cargo === c.cargo);
    
    if (mesmoCargo.length >= limiteCargo) {
      alert(cargoAtual.includes("senador") 
        ? "Você já adicionou o limite máximo de 2 senadores à sua colinha. Remova um para adicionar outro." 
        : "Você já adicionou o candidato para este cargo à sua colinha. Remova o atual se desejar trocar.");
      return;
    }

    favoritos.push({
      id: candidatoIdUnico,
      nome: c.nome || c.nome_urna || "Candidato",
      partido: c.partido || c.partido_sigla || "PARTIDO",
      numero: c.numero || "00",
      cargo: c.cargo || candidatosState.cargo,
      uf: c.uf || candidatosState.uf || "BR",
      foto: c.foto || null,
      color: c.color || "#159AAE"
    });
    
    localStorage.setItem("voto_cidadao_colinha", JSON.stringify(favoritos));
    renderDossieModal();
    mostrarModalSucessoColinha(c);
  }
}

function mostrarModalSucessoColinha(c) {
  // Cria um modal flutuante rápido com o botão "Ver a colinha"
  let modalToast = document.getElementById("toast-colinha-modal");
  if (!modalToast) {
    modalToast = document.createElement("div");
    modalToast.id = "toast-colinha-modal";
    modalToast.className = "fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in";
    document.body.appendChild(modalToast);
  }

  modalToast.innerHTML = `
    <div class="bg-white rounded-2xl max-w-[380px] w-full p-6 text-center border border-[var(--line)] shadow-2xl">
      <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 class="font-display text-[18px] text-[var(--ink)] mb-1">Adicionado à Colinha!</h3>
      <p class="text-[13.5px] text-[var(--ink-soft)] mb-5"><strong>${c.nome}</strong> (${c.partido}) foi salvo com sucesso na sua cola de votação.</p>
      <div class="flex gap-2">
        <button onclick="document.getElementById('toast-colinha-modal').remove()" class="btn btn-outline flex-1 py-2.5 text-xs">Continuar Vendo</button>
        <a href="colinha.html" class="btn btn-primary flex-1 py-2.5 text-xs justify-center">Ver a Colinha</a>
      </div>
    </div>
  `;
}

function mostrarToastColinha(msg) {
  let toast = document.getElementById("senior-toast");
  if (toast) {
    toast.innerText = msg;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  }
}

/* ===== INICIALIZAÇÃO BLINDADA E SEGURA ===== */
document.addEventListener("DOMContentLoaded", () => {
  populateSubmenus();
  
  // Garante que o roteamento só acontece quando o DOM estiver 100% livre
  requestAnimationFrame(() => {
    onHashChange();
  });
});