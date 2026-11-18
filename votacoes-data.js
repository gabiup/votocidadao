const BANCO_VOTACOES = [
  {
    id: "escala-6x1",
    titulo: "PEC do Fim da Escala 6x1 (PEC 221/2019 e PEC 8/2025)",
    resumo: "Proposta de Emenda à Constituição que reduz progressivamente a carga horária máxima semanal e estabelece dois dias de repouso remunerado, visando abolir o modelo de 6 dias de trabalho por 1 de descanso, sem redução salarial.",
    fonte: "Câmara dos Deputados (Plenário - 2º Turno)",
    votos: {
      favor: [
        {
          grupo: "Autoria da Proposta",
          partidoResumo: "PSOL / PT • SP / MG",
          total: 2,
          membros: [
            { nome: "Erika Hilton", partido: "PSOL", uf: "SP", id: null },
            { nome: "Reginaldo Lopes", partido: "PT", uf: "MG", id: null }
          ]
        },
        {
          grupo: "Partido Liberal (PL)",
          partidoResumo: "PL • Maioria da Bancada",
          total: 90,
          membros: [
            { nome: "Flávio Bolsonaro", partido: "PL", uf: "RJ", id: "presidente-br-flavio-bolsonaro" },
            { nome: "Demais deputados da bancada favoráveis", partido: "PL", uf: "BR", id: null }
          ]
        },
        {
          grupo: "Partido dos Trabalhadores (PT)",
          partidoResumo: "PT • Bancada Integral",
          total: 68,
          membros: [
            { nome: "Membros da bancada do Partido dos Trabalhadores", partido: "PT", uf: "BR", id: null }
          ]
        }
      ],
      contra: [
        {
          grupo: "Partido Liberal (PL - Voto Divergente)",
          partidoResumo: "PL • Oposição Setorial",
          total: 9,
          membros: [
            { nome: "Bibo Nunes", partido: "PL", uf: "RS", id: null },
            { nome: "Caroline de Toni", partido: "PL", uf: "SC", id: null },
            { nome: "Daniel Freitas", partido: "PL", uf: "SC", id: null },
            { nome: "Daniela Reinehr", partido: "PL", uf: "SC", id: null },
            { nome: "Julia Zanatta", partido: "PL", uf: "SC", id: null },
            { nome: "Mauricio Marcon", partido: "PL", uf: "RS", id: null },
            { nome: "Nicoletti", partido: "PL", uf: "RR", id: null },
            { nome: "Ricardo Guidi", partido: "PL", uf: "SC", id: null },
            { nome: "Rosangela Moro", partido: "PL", uf: "SP", id: null }
          ]
        },
        {
          grupo: "Partido NOVO",
          partidoResumo: "NOVO • Bancada",
          total: 4,
          membros: [
            { nome: "Adriana Ventura", partido: "NOVO", uf: "SP", id: null },
            { nome: "Gilson Marques", partido: "NOVO", uf: "SC", id: null },
            { nome: "Marcel van Hattem", partido: "NOVO", uf: "RS", id: null },
            { nome: "Ricardo Salles", partido: "NOVO", uf: "SP", id: null }
          ]
        },
        {
          grupo: "Outros Partidos e Independentes",
          partidoResumo: "Diversos • Oposição",
          total: 6,
          membros: [
            { nome: "Carlos Chiodini", partido: "MDB", uf: "SC", id: null },
            { nome: "Pezenti", partido: "MDB", uf: "SC", id: null },
            { nome: "Fausto Pinato", partido: "UNIÃO", uf: "SP", id: null },
            { nome: "Lucas Redecker", partido: "PSD", uf: "RS", id: null },
            { nome: "Sérgio Turra", partido: "PP", uf: "RS", id: null },
            { nome: "Kim Kataguiri", partido: "MISSÃO", uf: "SP", id: null }
          ]
        }
      ],
      abstencao: [
        {
          grupo: "Deputados Ausentes ou em Obstrução",
          partidoResumo: "Diversos • Plenário",
          total: 33,
          membros: [
            { nome: "Adolfo Viana", partido: "PSDB", uf: "BA", id: null },
            { nome: "Alexandre Leite", partido: "UNIÃO", uf: "SP", id: null },
            { nome: "Arnaldo Jardim", partido: "CIDADANIA", uf: "SP", id: null },
            { nome: "Cobalchini", partido: "MDB", uf: "SC", id: null },
            { nome: "Dilceu Sperafico", partido: "PP", uf: "PR", id: null }
          ]
        }
      ],
      falta: []
    }
  }
];