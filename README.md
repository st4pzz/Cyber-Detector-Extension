

# Browser Privacy Extension

## Descrição
Esta extensão para o navegador Firefox foi desenvolvida como parte de um trabalho de cybersegurança para detecção de ataques e violações de privacidade em clientes web. Ela detecta conexões a domínios de terceira parte, cookies e supercookies, armazenamento de dados HTML5, sincronismo de cookies, hijacking, e canvas fingerprinting. Além disso, a extensão gera uma pontuação de privacidade, indicando se a página visitada respeita a privacidade do usuário.

## Funcionalidades
- Detecta **conexões a domínios de terceira parte** em uma navegação web.
- Conta e categoriza os **cookies e supercookies** injetados no carregamento da página.
  - Diferencia entre cookies de **primeira** e **terceira parte**, além de **cookies de sessão** e **cookies de navegação**.
- Detecta o uso de **armazenamento local** e **session storage** via HTML5 no cliente.
- Monitora o **sincronismo de cookies**.
- Identifica tentativas de **sequestro de navegador** (hijacking e hook).
- Detecta o uso de **canvas fingerprinting** para coletar informações do usuário.
- Gera uma **pontuação de privacidade** que indica o nível de respeito à privacidade da página visitada.

## Instalação

### Pré-requisitos
- **Firefox**: A extensão foi desenvolvida para funcionar no navegador Firefox.
- **Git** (para clonar o repositório).

### Passo a Passo
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/browser-privacy-extension.git
    cd browser-privacy-extension/extension
    ```

2. Abra o Firefox e acesse `about:debugging`.

3. Clique em **"Carregar extensão temporária"**.

4. Selecione o arquivo `manifest.json` dentro da pasta `extension`.

5. A extensão será carregada e ficará disponível para uso.

## Uso
1. Após carregar a extensão, acesse qualquer página web.
2. Clique no ícone da extensão na barra de ferramentas para abrir o popup.
3. O popup exibirá:
   - O número de cookies armazenados.
   - Se há dados no local storage e session storage.
   - Um relatório de conexões a terceiros.
   - A pontuação de privacidade da página.

## Pontuação de Privacidade
A pontuação de privacidade é calculada com base em:
- **Cookies**: Menos de 5 cookies é considerado bom, entre 5 e 10 é moderado, mais de 10 é ruim.
- **Armazenamento local**: Qualquer dado armazenado reduz a pontuação.
- **Canvas Fingerprint**: Se detectado, reduz significativamente a pontuação.

## Estrutura do Projeto
- `manifest.json`: Arquivo de manifesto da extensão, define permissões e arquivos principais.
- `background.js`: Script que monitora requisições de rede e detecta conexões a domínios de terceira parte.
- `content.js`: Script que executa na página, responsável por detectar cookies, armazenamento local e canvas fingerprint.
- `popup.html`: Interface da extensão onde as informações são exibidas.
- `popup.js`: Script que lida com a lógica do popup e exibe as informações ao usuário.

## Tecnologias Utilizadas
- **JavaScript**
- **HTML5**
- **CSS**
- APIs da WebExtensions do Firefox:
  - `webRequest`: Para monitorar requisições de rede.
  - `cookies`: Para acessar cookies.
  - `storage`: Para monitorar o armazenamento local.
  - `tabs`: Para interação com as abas do navegador.

## Contribuição
Se você deseja contribuir para o projeto, sinta-se à vontade para fazer um fork do repositório e enviar um pull request.

1. Faça um fork do projeto.
2. Crie uma nova branch:
    ```bash
    git checkout -b minha-feature
    ```
3. Faça commit das suas alterações:
    ```bash
    git commit -m "Adicionei uma nova feature"
    ```
4. Faça o push para a branch:
    ```bash
    git push origin minha-feature
    ```
5. Envie um pull request.

## Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

Trabalho desenvolvido por Sergio como parte da disciplina de Cybersegurança no INSPER.
