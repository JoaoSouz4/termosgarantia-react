import { images } from "./images";

export const warrantyCategories = [
  {
    type: "Tela",
    path: "/screen",
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
    ],
  },
];
