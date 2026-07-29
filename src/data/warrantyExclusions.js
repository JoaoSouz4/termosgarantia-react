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
];
