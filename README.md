# Voto Cidadão — Versão Estática (HTML/CSS/JS)

Versão em HTML, CSS e JavaScript puros (sem React, sem build), pronta para hospedagem em servidores PHP/Apache tradicionais (Locaweb, etc).

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página (todas as seções) |
| `style.css` | Estilos personalizados (cores, fontes, animações) |
| `script.js` | Toda a lógica: roteamento, dados, carrossel, dossiê, IA |
| `fact-check.php` | Proxy seguro para a API do Google Gemini (chave oculta) |
| `config.php` | Arquivo de configuração com a chave da API |
| `.htaccess` | Configurações do Apache (segurança, cache, rotas) |

## Como usar

1. Suba todos os arquivos para o servidor (via FTP ou painel da Locaweb)
2. Edite o arquivo `config.php` e insira sua chave do Google Gemini:
   - Obtenha gratuitamente em: https://aistudio.google.com/apikey
   - Substitua `COLE_SUA_CHAVE_AQUI` pela sua chave
3. O arquivo `.htaccess` já protege `config.php` de acesso externo

## Segurança da chave da API

A chave do Google Gemini **nunca** aparece no código JavaScript do navegador. Toda a comunicação com a IA passa pelo `fact-check.php`, que:

- Lê a chave do `config.php` (protegido pelo `.htaccess`)
- Faz a requisição ao Google Gemini no servidor
- Retorna apenas o resultado para o navegador

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis CSS (custom properties)
- Tailwind CSS via CDN para utilitários de layout
- JavaScript vanilla (ES6+) — sem frameworks, sem build
- PHP 7+ para o proxy da IA
- Google Gemini 2.0 Flash (gratuito) para verificação de fatos

## Funcionalidades

- Página inicial com carrossel de cargos (presidente, governador, senador, deputado federal, estadual e distrital)
- Mapa do Brasil com todas as regiões e estados
- Página de candidatos com filtros e busca
- Dossiê de cada candidato (sem exibir bens)
- Verdade ou Mentira (verificação por IA)
- Fale Conosco
- Links Úteis
- Modo acessibilidade sênior (Aa+)
- Totalmente responsivo
