/*
 * Cada categoria representa um serviço da assistência.
 * - coverage:   situações que PASSAM na garantia
 * - exclusions: situações que NÃO PASSAM na garantia
 * Parágrafos da descrição são separados por uma linha em branco.
 */
export const warrantyCategories = [
  {
    type: "Tela",
    path: "/screen",
    navLabel: "Tela",
    code: "TL",
    accent: "#4a7dff",
    title: "Troca de tela",
    cover: "cover-screen",
    summary:
      "Saiba quando a garantia da troca de tela é válida e quais sinais indicam dano externo, como quedas, pressão ou contato com líquidos.",
    intro:
      "A garantia da troca de tela cobre defeitos de fabricação do display e falhas na instalação. Danos causados depois do reparo — quedas, pressão, líquidos — não entram na cobertura. Veja abaixo os casos mais comuns.",
    coverage: [
      {
        id: 1,
        title: "Tela clicando sozinha",
        tags: ["toque fantasma", "abre aplicativos sozinho", "digita sozinho"],
        description: `A tela executa comandos por conta própria: abre aplicativos, digita ou rola a página sem que você encoste nela. Esse comportamento é conhecido como "toque fantasma".

Se na análise técnica não forem encontrados sinais de queda, pressão ou contato com líquidos, o problema indica uma falha da peça ou da instalação. Nesse caso, a garantia cobre o reparo.`,
        art: "ghost-touch",
      },
      {
        id: 2,
        title: "Touch falhando",
        tags: ["regiões sem toque", "tela não responde", "touch travado"],
        description: `Algumas áreas da tela, ou a tela inteira, deixam de responder ao toque, mesmo com a imagem funcionando normalmente.

Sem sinais de impacto, pressão ou líquidos, o defeito é tratado como falha de fabricação do display ou da instalação, e está coberto pela garantia.`,
        art: "no-touch",
      },
      {
        id: 3,
        title: "Tela piscando",
        tags: ["brilho oscilando", "imagem tremendo", "tela apagando e voltando"],
        description: `O brilho oscila ou a imagem pisca sem motivo aparente.

Quando não há marcas de queda, pressão ou contato com líquidos, a causa provável é um defeito de fabricação no painel ou em seus componentes internos — situação coberta pela garantia.`,
        art: "flicker",
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Vidro da tela quebrado",
        tags: [
          "trinco interno",
          "trinco externo",
          "arranhões",
          "aro quebrado",
          "marcas de pressão",
        ],
        description: `Trincos (internos ou externos), arranhões profundos, aro quebrado e marcas de pressão mostram que a tela sofreu impacto ou força excessiva depois do reparo.

Mesmo que o aparelho continue ligando e funcionando, a estrutura da peça foi comprometida. Por se tratar de dano físico, o fornecedor não autoriza a troca em garantia.`,
        art: "glass-cracked",
      },
      {
        id: 2,
        title: "Listras na tela",
        tags: [
          "linha horizontal",
          "linha vertical",
          "linha colorida",
          "quadriculado",
        ],
        description: `Linhas horizontais, verticais ou coloridas e efeitos quadriculados costumam surgir depois de impacto ou pressão sobre o display, que danificam as conexões internas do painel.

Como a causa é um dano externo, a garantia não cobre. Na maioria dos casos, a solução é uma nova troca de tela.`,
        art: "stripes",
      },
      {
        id: 3,
        title: "Manchas na tela",
        tags: [
          "manchas escuras",
          "pontos escuros",
          "manchas coloridas",
          "manchas claras",
        ],
        description: `Manchas e pontos escuros, claros ou coloridos são sinais de que o painel (LCD ou OLED) foi danificado por dentro. Eles costumam aparecer depois de quedas, impactos, pressão sobre a tela ou contato com líquidos e, com o tempo, podem aumentar ou se espalhar até comprometer toda a imagem.

Esse tipo de defeito não é coberto pela garantia, porque é consequência de dano físico ocorrido depois do reparo, e não de falha da peça instalada ou do serviço realizado.`,
        art: "spots",
      },
      {
        id: 4,
        title: "Sem imagem",
        tags: ["liga e não dá imagem", "só vibra", "tela apagada"],
        description: `O aparelho liga — vibra, toca, recebe notificações — mas a tela continua preta.

Na grande maioria dos casos, isso indica dano interno ao display causado por impacto, pressão ou contato com líquidos. Por ser uma avaria física, não é coberto pela garantia, que vale apenas para defeitos de fabricação e de instalação.`,
        art: "black-screen",
      },
      {
        id: 5,
        title: "Touch travado após atualização",
        tags: [
          "touch parou após atualizar",
          "atualização do sistema",
          "incompatibilidade de software",
        ],
        description: `Atualizações do sistema operacional podem gerar incompatibilidades entre o software e a tela, fazendo o touch travar ou falhar.

Como a causa está no sistema — e não na peça instalada nem no serviço — esse problema não é coberto pela garantia. Mesmo assim, traga o aparelho para avaliarmos a melhor solução.`,
        art: "touch-after-update",
      },
    ],
  },
  {
    type: "Bateria",
    path: "/battery",
    navLabel: "Bateria",
    code: "BT",
    accent: "#f6b73c",
    title: "Troca de bateria",
    cover: "cover-battery",
    summary:
      "Confira quais falhas de bateria são defeito da peça e quais são causadas por uso, quedas ou contato com líquidos.",
    intro:
      "A garantia da troca de bateria cobre defeitos de fabricação da peça instalada. Baterias com sinais de impacto, deformação ou contato com líquidos ficam fora da cobertura.",
    coverage: [
      {
        id: 1,
        title: "Descarregando rápido",
        tags: ["saúde baixa", "autonomia curta", "baixo desempenho"],
        description: `A bateria perde carga muito mais rápido do que deveria, sem sinais de queda, superaquecimento, contato com líquidos ou desgaste natural.

Se a análise técnica confirmar que a falha está na bateria instalada — e não em outro componente do aparelho ou em fator externo — o defeito é coberto pela garantia.`,
        art: "drain-fast",
      },
      {
        id: 2,
        title: "Não carrega",
        tags: ["sem carregamento", "carregamento lento", "não sobe a porcentagem"],
        description: `O aparelho não carrega, ou a porcentagem quase não sobe, mesmo conectado ao carregador.

Quando não há sinais de mau uso, impacto ou contato com líquidos, e a análise confirma que o problema está na bateria instalada, o defeito é tratado como falha de fabricação e coberto pela garantia.`,
        art: "not-charging",
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Bateria danificada",
        tags: ["marcas de queda", "amassada", "rasgada", "estufada por impacto"],
        description: `Quedas e impactos podem amassar, rasgar ou deformar a bateria, danificando suas células internas.

Baterias com esses sinais não são cobertas pela garantia, já que o defeito é consequência de dano acidental. Atenção: bateria amassada ou deformada pode ser perigosa — evite usar o aparelho e procure a assistência.`,
        art: "battery-damaged",
      },
      {
        id: 2,
        title: "Bateria molhada",
        tags: ["oxidação", "contato com água", "ferrugem"],
        description: `Ferrugem, oxidação ou marcas de umidade indicam que a bateria teve contato com líquido.

Isso danifica os componentes internos da peça e não caracteriza defeito de fabricação. Por isso, não é coberto pela garantia.`,
        art: "battery-wet",
      },
    ],
  },
  {
    type: "Conector",
    path: "/conector",
    navLabel: "Conector",
    code: "CN",
    accent: "#22c3d6",
    title: "Troca do conector de carga",
    cover: "cover-connector",
    summary:
      "Descubra quais falhas na placa de carga são cobertas pela garantia e em quais situações o dano vem de fatores externos.",
    intro:
      "Em muitos aparelhos, a placa de carga não cuida só do carregamento: ela também participa do áudio, das antenas e do leitor de chip. Por isso, a garantia cobre algumas falhas que vão além do carregamento.",
    coverage: [
      {
        id: 1,
        title: "Parou de carregar (sem avarias)",
        tags: ["parou do nada", "não aparece carregando"],
        description: `O aparelho deixou de carregar e a placa de carga não tem sinais de impacto, oxidação, ferrugem ou conector quebrado.

Nesse cenário, o defeito pode estar na peça ou na instalação. Confirmado na análise técnica, o reparo é coberto pela garantia.`,
        art: "port-stopped",
      },
      {
        id: 2,
        title: "Problemas com Wi-Fi ou sinal",
        tags: ["Wi-Fi lento", "sem Wi-Fi", "sem rede móvel", "sem GPS"],
        description: `Em muitos aparelhos Android, a placa de carga tem contatos que ligam as antenas de Wi-Fi, Bluetooth, rede móvel e GPS.

Se, depois da troca, algum desses sinais parar de funcionar sem que haja impacto, oxidação ou danos no aparelho, o problema pode ser defeito da placa instalada e é coberto pela garantia.`,
        art: "no-wifi",
      },
      {
        id: 3,
        title: "Chip não é reconhecido",
        tags: ["sem sinal de chip", "chip não lê"],
        description: `Em alguns modelos, o leitor do chip (SIM) fica na própria placa de carga.

Se, depois da troca, o aparelho deixar de reconhecer o chip e não houver sinais de impacto, oxidação ou instalação inadequada, o defeito pode estar no leitor ou em seus componentes, e é coberto pela garantia.`,
        art: "no-sim",
      },
      {
        id: 4,
        title: "Problemas no áudio",
        tags: ["alto-falante", "microfone", "sem som"],
        description: `Em diversos aparelhos Android, a placa de carga faz parte do circuito de áudio.

Se o som falhar depois da troca e não houver sinais de danos físicos ou de contato com líquidos, o defeito pode estar na peça instalada. Confirmado na análise técnica, é coberto pela garantia.`,
        art: "no-audio",
      },
      {
        id: 5,
        title: "Carregamento lento",
        tags: ["demora para carregar", "carga lenta", "carregamento rápido não funciona"],
        description: `O aparelho passou a carregar muito devagar, sem sinais de oxidação, ferrugem, conector quebrado ou outros danos físicos.

Uma falha nos componentes da placa de carga pode impedir que a energia chegue corretamente à bateria. Confirmado na análise técnica, o defeito é coberto pela garantia.`,
        art: "slow-charge",
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Conector quebrado",
        tags: ["pinos tortos", "faltando peça", "conector solto", "entrada danificada"],
        description: `Pinos tortos, partes faltando ou um conector solto da placa indicam esforço mecânico: cabo puxado de lado, encaixe forçado ou queda com o carregador conectado.

Como é um dano físico, e não um defeito de fabricação, não é coberto pela garantia.`,
        art: "connector-broken",
      },
      {
        id: 2,
        title: "Placa de carga oxidada",
        tags: ["oxidação", "contato com água", "ferrugem"],
        description: `Oxidação ou ferrugem na placa de carga indicam contato com líquido ou umidade, o que compromete o funcionamento dos componentes.

Por ser um dano causado por fator externo, não é considerado defeito de fabricação e não é coberto pela garantia.`,
        art: "port-oxidized",
      },
    ],
  },
  {
    type: "Placa",
    path: "/placa",
    navLabel: "Placa",
    code: "PL",
    accent: "#3ddc97",
    title: "Reparos na placa",
    cover: "cover-board",
    summary:
      "Entenda o que a garantia de um reparo em placa cobre e quais defeitos são novos danos, sem relação com o serviço feito.",
    intro:
      "A garantia de reparo em placa cobre o mesmo defeito que foi corrigido. Novos problemas, ou sinais de queda e de líquido, ficam fora da cobertura.",
    coverage: [
      {
        id: 1,
        title: "O mesmo defeito voltou",
        tags: [
          "defeito persistente",
          "mesmo problema",
          "sem marcas de queda",
          "sem oxidação",
        ],
        description: `O defeito que apareceu depois do reparo é o mesmo que motivou o serviço.

Se, na análise técnica, não forem encontrados sinais de queda, impacto, contato com líquidos, ferrugem ou oxidação, o problema é tratado como falha do serviço ou da peça utilizada, e o reparo é refeito em garantia.`,
        art: "same-defect",
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Placa danificada",
        tags: [
          "marcas de queda",
          "placa amassada",
          "placa empenada",
          "placa trincada",
        ],
        description: `A garantia do reparo em placa cobre apenas o defeito que foi corrigido e possíveis falhas ligadas a esse serviço.

Se a placa tiver sinais de queda, impacto, amassados, trincas ou outras avarias físicas, a garantia é invalidada: esses danos podem causar novos defeitos e afetar circuitos que não têm relação com o reparo anterior.`,
        art: "board-damaged",
      },
    ],
  },
];
