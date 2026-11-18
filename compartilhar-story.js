/* ============================================================
   VOTO CIDADÃO — Compartilhamento para Instagram Stories
   Não altera o funcionamento do site existente.
   ============================================================ */

async function compartilharInstagramStory() {

    // --------------------------------------------------------
    // 1. Descobre qual candidato está aberto no modal
    // --------------------------------------------------------

    if (!dossieState || !dossieState.candidate) {
        alert("Não foi possível identificar o candidato.");
        return;
    }

    const c = dossieState.candidate;


    // --------------------------------------------------------
    // 2. Monta a URL direta para o dossiê
    // --------------------------------------------------------

    const url = window.location.href.split("#")[0]
        + `#/candidatos?id=${encodeURIComponent(c.id)}`;


    // --------------------------------------------------------
    // 3. Tenta copiar o link para a área de transferência
    // --------------------------------------------------------

    try {

        await navigator.clipboard.writeText(url);

    } catch (erro) {

        console.warn("Não foi possível copiar o link:", erro);

    }


    // --------------------------------------------------------
    // 4. Cria a imagem do Story
    // --------------------------------------------------------

    try {

        const blob = await criarImagemStory(c);


        // ----------------------------------------------------
        // 5. Transforma a imagem em um arquivo
        // ----------------------------------------------------

        const arquivo = new File(
            [blob],
            `voto-cidadao-${c.id}.png`,
            {
                type: "image/png"
            }
        );


        // ----------------------------------------------------
        // 6. Verifica se o celular permite compartilhar arquivo
        // ----------------------------------------------------

        if (
            navigator.canShare &&
            navigator.canShare({
                files: [arquivo]
            })
        ) {

            await navigator.share({

                files: [arquivo],

                title: `Dossiê: ${c.nome}`,

                text:
                    `Conheça o candidato ${c.nome} no Voto Cidadão.\n${url}`

            });

        } else {

            // ------------------------------------------------
            // Computador ou navegador sem Web Share
            // ------------------------------------------------

            baixarImagemStory(blob, c);

            alert(
                "A imagem foi gerada e baixada. " +
                "O link do candidato também foi copiado."
            );

        }

    } catch (erro) {

        console.error(
            "Erro ao gerar o Story:",
            erro
        );

        alert(
            "Não foi possível gerar a imagem para compartilhamento."
        );

    }

}


/* ============================================================
   CRIA A IMAGEM 1080 × 1920
   ============================================================ */

async function criarImagemStory(c) {

    const canvas = document.createElement("canvas");

    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");


    // --------------------------------------------------------
    // FUNDO
    // --------------------------------------------------------

    const gradiente = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gradiente.addColorStop(0, "#159AAE");
    gradiente.addColorStop(1, "#075765");

    ctx.fillStyle = gradiente;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // --------------------------------------------------------
    // DETALHE DECORATIVO
    // --------------------------------------------------------

    ctx.globalAlpha = 0.12;

    ctx.beginPath();

    ctx.arc(
        950,
        150,
        300,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#FFFFFF";

    ctx.fill();

    ctx.globalAlpha = 1;


    // --------------------------------------------------------
    // TÍTULO DO SITE
    // --------------------------------------------------------

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 42px Arial";

    ctx.fillText(
        "VOTO CIDADÃO",
        70,
        100
    );


    ctx.font = "28px Arial";

    ctx.fillStyle = "rgba(255,255,255,0.85)";

    ctx.fillText(
        "ELEIÇÕES 2026",
        70,
        145
    );


    // --------------------------------------------------------
    // CARGO
    // --------------------------------------------------------

    const cargoNome =
        CARGOS[c.cargo]?.nome ||
        c.cargo ||
        "Candidato";

    ctx.fillStyle = "#C7F1F3";

    ctx.font = "bold 30px Arial";

    ctx.fillText(
        cargoNome.toUpperCase(),
        70,
        230
    );


    // --------------------------------------------------------
    // FOTO DO CANDIDATO
    // --------------------------------------------------------

    if (c.foto) {

        try {

            const imagem = await carregarImagem(c.foto);

            desenharImagemCircular(
                ctx,
                imagem,
                540,
                500,
                280
            );

        } catch (erro) {

            console.warn(
                "Não foi possível carregar a foto:",
                erro
            );

        }

    }


    // --------------------------------------------------------
    // NÚMERO
    // --------------------------------------------------------

    ctx.fillStyle = "#FFFFFF";

    ctx.beginPath();

    ctx.arc(
        900,
        650,
        75,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#075765";

    ctx.font = "bold 48px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        String(c.numero),
        900,
        667
    );

    ctx.textAlign = "left";


    // --------------------------------------------------------
    // NOME
    // --------------------------------------------------------

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 64px Arial";

    const nomeLinhas = quebrarTexto(
        c.nome,
        900,
        ctx
    );

    let yNome = 930;

    nomeLinhas.forEach(linha => {

        ctx.fillText(
            linha,
            70,
            yNome
        );

        yNome += 75;

    });


    // --------------------------------------------------------
    // PARTIDO
    // --------------------------------------------------------

    ctx.fillStyle = "#C7F1F3";

    ctx.font = "bold 36px Arial";

    ctx.fillText(
        `${c.partido} • Nº ${c.numero}`,
        70,
        yNome + 15
    );


    // --------------------------------------------------------
    // TEXTO PRINCIPAL
    // --------------------------------------------------------

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 42px Arial";

    ctx.fillText(
        "Conheça este candidato",
        70,
        1160
    );


    ctx.font = "30px Arial";

    ctx.fillStyle = "rgba(255,255,255,0.9)";

    const texto = [
        "Consulte a trajetória,",
        "atuação, pautas,",
        "investigações e projetos."
    ];

    let yTexto = 1220;

    texto.forEach(linha => {

        ctx.fillText(
            linha,
            70,
            yTexto
        );

        yTexto += 48;

    });


    // --------------------------------------------------------
    // LINHA DECORATIVA
    // --------------------------------------------------------

    ctx.fillStyle = "rgba(255,255,255,0.35)";

    ctx.fillRect(
        70,
        1410,
        940,
        2
    );


    // --------------------------------------------------------
    // CHAMADA PARA O LINK
    // --------------------------------------------------------

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 30px Arial";

    ctx.fillText(
        "ACESSE O DOSSIÊ COMPLETO:",
        70,
        1490
    );


    // --------------------------------------------------------
    // URL
    // --------------------------------------------------------

    const urlExibicao =
        urlParaExibicao(c);

    ctx.fillStyle = "#C7F1F3";

    ctx.font = "bold 28px Arial";

    const linhasUrl = quebrarTexto(
        urlExibicao,
        900,
        ctx
    );

    let yUrl = 1550;

    linhasUrl.forEach(linha => {

        ctx.fillText(
            linha,
            70,
            yUrl
        );

        yUrl += 42;

    });


    // --------------------------------------------------------
    // RODAPÉ
    // --------------------------------------------------------

    ctx.fillStyle = "rgba(255,255,255,0.75)";

    ctx.font = "24px Arial";

    ctx.fillText(
        "Informação para ajudar você a votar com clareza.",
        70,
        1810
    );


    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "Voto Cidadão • Eleições 2026",
        70,
        1860
    );


    // --------------------------------------------------------
    // TRANSFORMA CANVAS EM PNG
    // --------------------------------------------------------

    return new Promise((resolve, reject) => {

        canvas.toBlob(
            blob => {

                if (blob) {

                    resolve(blob);

                } else {

                    reject(
                        new Error(
                            "Não foi possível criar o PNG."
                        )
                    );

                }

            },
            "image/png",
            1
        );

    });

}


/* ============================================================
   CARREGAR FOTO
   ============================================================ */

function carregarImagem(src) {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = () => resolve(img);

        img.onerror = () => reject(
            new Error(
                `Erro ao carregar imagem: ${src}`
            )
        );

        img.src = src;

    });

}


/* ============================================================
   DESENHA FOTO CIRCULAR
   ============================================================ */

function desenharImagemCircular(
    ctx,
    imagem,
    x,
    y,
    tamanho
) {

    ctx.save();

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        tamanho / 2,
        0,
        Math.PI * 2
    );

    ctx.clip();


    const proporcao =
        Math.max(
            tamanho / imagem.width,
            tamanho / imagem.height
        );

    const largura =
        imagem.width * proporcao;

    const altura =
        imagem.height * proporcao;


    ctx.drawImage(
        imagem,

        x - largura / 2,
        y - altura / 2,

        largura,
        altura
    );

    ctx.restore();


    // Borda

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        tamanho / 2,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#FFFFFF";

    ctx.lineWidth = 8;

    ctx.stroke();

}


/* ============================================================
   QUEBRA TEXTO
   ============================================================ */

function quebrarTexto(
    texto,
    larguraMaxima,
    ctx
) {

    const palavras =
        String(texto || "").split(" ");

    const linhas = [];

    let linhaAtual = "";

    palavras.forEach(palavra => {

        const teste =
            linhaAtual
                ? `${linhaAtual} ${palavra}`
                : palavra;

        const largura =
            ctx.measureText(teste).width;

        if (largura > larguraMaxima) {

            if (linhaAtual) {
                linhas.push(linhaAtual);
            }

            linhaAtual = palavra;

        } else {

            linhaAtual = teste;

        }

    });

    if (linhaAtual) {
        linhas.push(linhaAtual);
    }

    return linhas;

}


/* ============================================================
   URL BONITA PARA APARECER NA IMAGEM
   ============================================================ */

function urlParaExibicao(c) {

    const base =
        window.location.href.split("#")[0]
        .replace(/\/$/, "");

    return `${base}/#/candidatos?id=${c.id}`;

}


/* ============================================================
   DOWNLOAD NO COMPUTADOR
   ============================================================ */

function baixarImagemStory(
    blob,
    c
) {

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        `voto-cidadao-${c.id}-story.png`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

}