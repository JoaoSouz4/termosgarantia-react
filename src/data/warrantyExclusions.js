import { images } from "./images";

export const warrantyCategories = [
  {
    type: "Tela",
    path: "/screen",
    coverage: [
      {
        id: 1,
        title: "Tela clicando sozinha",
        keyword: "quebrado",
        tags: ["toques fantasma", "abrindo aplicativos", "digitando"],
        description: `
        Toques fantasmas são caracterizados por comandos executados na tela sem qualquer interação do usuário. Quando não há sinais de impacto, pressão, contato com líquidos ou outros danos físicos, esse comportamento pode indicar uma falha no display ou na instalação da peça. Nesses casos, o defeito é coberto pela garantia, pois se trata de uma possível falha de fabricação ou do serviço realizado.
        `,
        images: images.toqueFantasma,
      },
      {
        id: 2,
        title: "Touch falhando",
        keyword: "quebrado",
        tags: ["regiões inativas", "tela travada", "sem touch", "não clica"],
        description: `
        Quando a tela deixa de responder ao toque sem apresentar sinais de impacto, pressão, contato com líquidos ou outros danos físicos, o problema pode indicar uma falha no display ou na instalação da peça. Nesses casos, o defeito é coberto pela garantia, pois caracteriza uma possível falha de fabricação ou do serviço realizado.
        `,
        images: images.semTouch,
      },
      {
        id: 3,
        title: "Tela piscando",
        keyword: "quebrado",
        tags: ["tela apagando", "imagem tremula"],
        description: `
        Quando a tela apresenta oscilações de brilho ou piscadas sem qualquer sinal de queda, pressão, contato com líquido ou outros danos físicos, o problema pode estar relacionado a um defeito de fabricação no painel ou em seus componentes internos, sendo passível de garantia..
        `,
        images: images.telapiscando,
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Vidro da tela quebrado",
        keyword: "quebrado",
        tags: [
          "trinco interno",
          "trinco externo",
          "arranhado",
          "aro quebrado",
          "riscos",
          "marcas de pressão",
        ],
        description: `
        Caracteriza mau uso quando a tela apresenta trinco interno, trinco externo, arranhados, aro quebrado, marcas de pressão ou qualquer dano físico que comprometa sua estrutura. Mesmo que o aparelho continue ligando e funcionando normalmente, esses sinais indicam que a peça sofreu impacto ou pressão indevida, comprometendo sua integridade. Nesses casos, o fabricante/fornecedor não autoriza a substituição da peça em garantia, pois o dano é classificado como decorrente de mau uso.
        `,
        images: images.screen,
      },
      {
        id: 2,
        title: "Listras na tela",
        keyword: "Listras",
        tags: [
          "linha horizontal",
          "linha vertical",
          "linha colorida",
          "quadriculado",
        ],
        description: `
        A tela apresenta linhas horizontais, verticais, coloridas ou um efeito quadriculado. Esse defeito geralmente é causado por impacto, pressão ou falha no display, comprometendo a visualização da imagem. Na maioria dos casos, a solução é a substituição da tela.
        `,
        images: images.stripingScreen,
      },
      {
        id: 3,
        title: "Manchas na tela",
        keyword: "Manchas",
        tags: [
          "Manchas escuras",
          "pontos escuros",
          "manchas coloridas",
          "manchas clara",
        ],
        description: `
        Manchas escuras, pontos escuros, manchas coloridas ou manchas claras na tela são características de um display danificado. Esses sinais normalmente surgem após quedas, impactos, pressão excessiva sobre a tela ou contato com líquidos, causando danos internos ao painel (LCD ou OLED). Com o tempo, essas manchas podem aumentar de tamanho, surgir em novos pontos da tela ou comprometer totalmente a imagem e o funcionamento do display.

        Esse tipo de defeito não é coberto pela garantia, pois é consequência de dano físico ou externo ocorrido após o reparo, e não de um defeito na peça instalada ou no serviço realizado. A garantia cobre apenas falhas de fabricação ou de instalação, não danos provocados por acidentes, pressão, infiltração de líquidos ou mau uso do aparelho.
        `,
        images: images.spottedScreen,
      },
      {
        id: 4,
        title: "Sem imagem",
        keyword: "Manchas",
        tags: ["liga e não da imagem", "só vibra", "Tela apagada"],
        description: `
        A tela apagada, mesmo com o aparelho ligado, normalmente indica dano interno ao display. Esse tipo de defeito é causado, na maioria dos casos, por impactos, pressão ou contato com líquidos, caracterizando uma avaria física na peça. Por esse motivo, não está coberto pela garantia, que se aplica apenas a defeitos de fabricação ou de instalação.
        `,
        images: images.telaapagada,
      },
      {
        id: 5,
        title: "Touch travado após atualização",
        keyword: "Manchas",
        tags: [
          "Touch travado após atualização",
          "touch parou após atualizar",
          "touch travado",
          "atualização de sistema",
          "atualização do Android",
          "incompatibilidade de sistema",
        ],
        description: `
        A garantia não cobre falhas de touch causadas por atualizações de sistema operacional. Em alguns casos, uma atualização pode gerar incompatibilidades de software, conflitos entre o sistema e o hardware ou até mesmo falhas temporárias no funcionamento da tela. Como esse tipo de problema não está relacionado à peça instalada nem ao serviço realizado, ele não é considerado um defeito de fabricação e, por isso, não é coberto pela garantia.
        `,
        images: images.telaapagada,
      },
    ],
  },
  {
    type: "Bateria",
    path: "/battery",
    coverage: [
      {
        id: 1,
        title: "Descarregando rápido",
        keyword: "quebrado",
        tags: ["saúde baixa", "baixo desempenho"],
        description: `
        Uma bateria que descarrega rapidamente, sem sinais de mau uso, superaquecimento, contato com líquidos ou desgaste natural, pode indicar um defeito de fabricação na própria peça. Quando, após a análise técnica, for constatado que a perda excessiva de autonomia é causada por uma falha da bateria instalada e não por fatores externos ou pelo aparelho, o problema é coberto pela garantia.
        `,
        images: images.descarregandorapido,
      },
      {
        id: 2,
        title: "Não carrega",
        keyword: "sem carregamento, carregamento lento",
        tags: ["sem carregamento, carregamento lento"],
        description: `
        Quando a bateria apresenta autonomia muito abaixo do esperado sem sinais de mau uso, impacto, contato com líquidos ou alterações no aparelho, o problema pode indicar um defeito de fabricação da bateria, sendo passível de garantia.
        `,
        images: images.naocarrega,
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Bateria danificada",
        keyword: "quebrado",
        tags: ["marcas de queda", "rasgada"],
        description: `
        Impactos podem danificar internamente as células e os componentes da bateria, comprometendo seu funcionamento. Por isso, baterias com sinais de queda ou impacto não são cobertas pela garantia, pois o defeito pode ter sido causado por dano acidental..
        `,
        images: images.bateriadanificada,
      },
      {
        id: 2,
        title: "Bateria molhada",
        keyword: "quebrado",
        tags: ["oxidações", "água", "ferrugem"],
        description: `
        Bateria com sinais de líquido (ferrugem ou oxidação): A presença de ferrugem ou oxidação indica contato com líquidos ou umidade, o que pode causar danos aos componentes internos da bateria. Por esse motivo, esse tipo de dano não é considerado defeito de fabricação e não é coberto pela garantia.
        `,
        images: images.bateriamolhada,
      },
    ],
  },
  {
    type: "Conector",
    path: "/conector",
    coverage: [
      {
        id: 1,
        title: "Parou de carregar (sem avarias)",
        keyword: "quebrado",
        tags: ["parou do nada", "sem sinal de carregamento"],
        description: `
        Quando o aparelho deixa de carregar e a placa de carga não apresenta sinais de impacto, oxidação, ferrugem, conector quebrado ou qualquer outro dano físico, o defeito pode estar relacionado a uma falha de fabricação do componente ou da instalação realizada. Nesses casos, após análise técnica, o problema é coberto pela garantia, pois caracteriza uma possível falha da peça ou do serviço prestado.
        `,
        images: images.naocarrega2,
      },
      {
        id: 2,
        title: "Problemas com wifi (placa de carga)",
        keyword: "sem wifi",
        tags: ["wifi lento", "sem rede movel", "sem wifi", "sem gps"],
        description: `
        Wi-Fi sem funcionamento: Em muitos aparelhos Android, a placa de carga também possui contatos e conexões responsáveis pela comunicação com as antenas de sinal (Wi-Fi, Bluetooth, rede móvel e GPS). Se, após a substituição da peça, o Wi-Fi deixar de funcionar sem que haja sinais de impacto, oxidação, instalação incorreta ou danos ao aparelho, o problema pode indicar um defeito de fabricação na placa de carga ou em seus componentes, sendo passível de garantia.
        `,
        images: images.naopegawifi,
      },
      {
        id: 3,
        title: "Problemas com chip(placa de carga)",
        keyword: "sem sinal de chip",
        tags: ["sem sinal de chip"],
        description: `
        Chip (SIM) sem funcionamento: Em alguns modelos de celulares, a placa de carga também abriga o leitor do chip (SIM). Se, após a substituição da peça, o aparelho deixar de reconhecer o chip e não houver sinais de impacto, oxidação, danos ao conector ou instalação inadequada, o problema pode estar relacionado a um defeito de fabricação no leitor SIM ou em seus componentes, sendo passível de garantia.
        `,
        images: images.naopegachip,
      },
      {
        id: 4,
        title: "Problemas no aúdio",
        keyword: "audio geral",
        tags: ["auto falante", "audio geral"],
        description: `
        Em diversos smartphones Android, a placa de carga também faz parte do circuito responsável pela comunicação de componentes de áudio. Por isso, caso o aparelho apresente falha no áudio após a troca da placa de carga e não existam sinais de danos físicos ou contato com líquidos, o defeito pode estar relacionado à peça instalada, sendo coberto pela garantia após confirmação da análise técnica.
        `,
        images: images.naosaiaudio,
      },
      {
        id: 5,
        title: "Carregamento lento",
        keyword: "audio geral",
        tags: [
          "Carregamento lento",
          "demora para carregar",
          "carrega devagar",
          "carga lenta",
          "baixa velocidade de carregamento",
        ],
        description: `
        Quando o aparelho passa a carregar lentamente, sem apresentar sinais de oxidação, ferrugem, conector quebrado, impactos ou outros danos físicos, o problema pode estar relacionado a um defeito de fabricação da placa de carga. Uma falha em seus componentes eletrônicos pode impedir o fornecimento correto de energia para a bateria, reduzindo a velocidade de carregamento. Nesses casos, após análise técnica, o defeito é coberto pela garantia, por se tratar de uma possível falha da peça instalada.
        `,
        images: images.naocarrega2,
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Conector quebrado",
        keyword: "quebrado",
        tags: ["faltando peça", "danificado"],
        description: `
        O conector é uma parte sensível da bateria e pode ser danificado durante manuseio, instalação ou por esforço mecânico. Como esse tipo de dano não ocorre por defeito de fabricação, baterias com conector quebrado não são cobertas pela garantia.
        `,
        images: images.conectorquebrado,
      },
      {
        id: 2,
        title: "Placa de carga oxidada",
        keyword: "quebrado",
        tags: ["oxidações", "água", "ferrugem"],
        description: `
        Placa de carga com oxidação ou ferrugem: A presença de oxidação ou ferrugem indica contato com líquidos ou umidade, o que pode comprometer o funcionamento dos componentes da placa. Como esse tipo de dano é causado por fatores externos, não é considerado defeito de fabricação e não é coberto pela garantia.
        `,
        images: images.placadecargaoxidada,
      },
    ],
  },
  {
    type: "Placa",
    path: "/placa",
    coverage: [
      {
        id: 1,
        title: "Quando o problema ainda persiste",
        keyword: "quebrado",
        tags: [
          "Mesmo defeito",
          "defeito persistente",
          "problema continua",
          "garantia cobre",
          "sem marcas de queda",
          "sem oxidação",
          "sem ferrugem",
          "sem contato com líquidos",
          "sem danos físicos",
          "falha da peça",
          "falha no reparo",
        ],
        description: `
        Se o defeito apresentado após o reparo for o mesmo que motivou o serviço e, durante a análise técnica, não forem encontrados sinais de queda, impactos, contato com líquidos, ferrugem, oxidação ou qualquer outro dano externo, o reparo será realizado em garantia. Nesses casos, o problema pode estar relacionado a uma falha do serviço executado ou da peça utilizada, estando coberto pela garantia.
        `,
        images: images.descarregandorapido,
      },
    ],
    exclusions: [
      {
        id: 1,
        title: "Danos da placa",
        keyword: "quebrado",
        tags: [
          "Marcas de queda",
          "placa amassada",
          "placa empenada",
          "placa trincada",
          "dano por impacto",
          "amassado na placa",
        ],
        description: `
        A garantia do reparo em placa cobre apenas o defeito originalmente corrigido e possíveis falhas relacionadas ao serviço realizado. Caso a placa apresente sinais de queda, impactos, amassados, trincas ou outras avarias físicas, a garantia é automaticamente invalidada, pois esses danos podem causar novos defeitos ou comprometer circuitos que não possuem relação com o reparo anterior.
        `,
        images: images.descarregandorapido,
      },
    ],
  },
];
