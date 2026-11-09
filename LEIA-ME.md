# 🐞 Começo — guia de instalação (passo a passo)

Arquivos desta pasta:
| Arquivo | O que é |
|---|---|
| `index.html` | **O app inteiro** (tudo num arquivo só) |
| `sw.js` | Faz o app abrir mesmo sem internet |
| `manifest.webmanifest`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Ícone de joaninha na tela inicial |
| `Code.gs` | Script do Google (calendário + lembretes). **Não sobe pro GitHub**, vai no Google Apps Script |
| `privado/comeco-moodboard.json` | Suas fotos do mood board, pra importar no iPhone. **Não sobe pro GitHub** |

---

## 1) Colocar o app online de graça (GitHub Pages)

1. Cria uma conta grátis em **github.com** (se ainda não tiver).
2. Clica no **+** (canto superior direito) → **New repository**.
   - Nome: `comeco` · marca **Public** · **Create repository**.
3. Na página do repositório, clica em **uploading an existing file**.
4. Arrasta estes arquivos: `index.html`, `sw.js`, `manifest.webmanifest`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` → **Commit changes**.
   *(Não sobe o `Code.gs`. Ele tem a sua senha.)*
5. Vai em **Settings** → **Pages** (menu da esquerda).
   - Em *Branch*, escolhe **main** e **/(root)** → **Save**.
6. Espera 1–2 minutos. O endereço aparece no topo: `https://SEU-USUARIO.github.io/comeco/`

> O site é público, mas **os seus dados não estão nele**. Tudo (horas, tarefas, fotos) fica só no seu iPhone.

## 2) Instalar no iPhone

1. Abre o link acima no **Safari** (tem que ser o Safari).
2. Toca no botão **Compartilhar** (quadrado com seta ↑).
3. **Adicionar à Tela de Início** → **Adicionar**.
4. Abre pelo ícone da joaninha 🐞. A partir daí ele funciona como um app, até offline.

> ⚠️ O app da tela inicial tem um armazenamento **separado** do Safari. Use sempre pelo ícone.

## 3) Conectar o Google Calendar (só leitura, grátis)

1. No computador, abre **script.google.com** (logada na sua conta Google) → **Novo projeto**.
2. Apaga o que estiver lá, e **cola todo o conteúdo do `Code.gs`**.
3. Na linha `const SECRET = 'troque-esta-senha';`, troca por uma palavra sua (só letras e números), ex: `joaninha2026`.
4. Clica em 💾 **Salvar**. Dá um nome ao projeto: `Começo`.
5. Engrenagem ⚙️ **Configurações do projeto** → confere o **Fuso horário** (ex: *America/New_York*).
6. Lá em cima: **Implantar** → **Nova implantação**.
   - Engrenagem ao lado de "Selecionar tipo" → **App da Web**.
   - **Executar como:** *Eu (seu e-mail)*
   - **Quem pode acessar:** *Qualquer pessoa*
   - **Implantar**.
7. O Google pede permissão: **Autorizar acesso** → escolhe sua conta →
   aparece "O Google não verificou este app" → **Avançado** → **Acessar Começo (não seguro)** → **Permitir**.
   *(É normal: o "app" é o seu próprio script, só você o criou.)*
8. Copia a **URL do app da Web** (termina em `/exec`).
9. No fim dela, adiciona `?key=` + sua senha. Exemplo:
   `https://script.google.com/macros/s/AKfy.../exec?key=joaninha2026`
10. Manda esse link pra você mesma (e-mail/WhatsApp), abre o Começo no iPhone → ⚙️ **Ajustes** → cola em **Link do Apps Script** → **Conectar / atualizar**. ✓

Pronto: o app lê **todos** os seus calendários dos próximos 14 dias, toda vez que abre (e no botão ↻). Eventos novos aparecem sozinhos. Sem internet, ele usa a última cópia salva.

> 🔒 Quem tiver o link completo (com a senha) consegue ver os títulos dos seus eventos. Não compartilha. Se vazar, troca o `SECRET`, faz **Implantar → Gerenciar implantações → ✏️ → Versão: Nova versão → Implantar**, e atualiza o link no app.
> Sempre que editar o script, precisa fazer essa "Nova versão" pra valer.

### Para o app saber o que priorizar
Coloca **EXAM** ou **DUE** no título:
- `BCH EXAM 3`, `PHY Midterm EXAM` → prova (o app foca nessa matéria nos 7 dias antes)
- `PHY HW DUE`, `WST essay DUE` → entrega (vira prioridade 2 dias antes)

A matéria é reconhecida pelas palavras‑chave (BCH → Biochem, PHY → Physics, WST → Other classes…). Dá pra editar em ⚙️ → Matérias.

## 4) Lembretes de manhã e de noite 🔔

**A verdade:** no iPhone, um app web sem servidor **não consegue** agendar notificações sozinho (a Apple só permite notificações "push", que precisam de um servidor enviando). Então os lembretes vêm do seu Google Calendar:

1. No script.google.com, no projeto Começo, escolhe a função **`setupReminders`** no menu de cima → **▶ Executar**.
2. Ele cria 2 eventos diários com notificação:
   - **8:00** ☀️ Começo: abre o app
   - **21:00** 🌙 Começo: evening review (2 min)
3. Garante que as notificações do **app Google Agenda** (ou do Calendário do iPhone sincronizado com o Google) estão ligadas em Ajustes → Notificações.

Quer outro horário? Muda `MORNING = [8, 0]` / `EVENING = [21, 0]` no script e roda `setupReminders` de novo (ele substitui). Para parar: roda `removeReminders`.
*(Esses eventos não aparecem dentro do Começo, ele ignora tudo que tem "Começo:" no título.)*

## 5) Mood board 🖼️ (suas 22 fotos)
O arquivo **`comeco-moodboard.json`** (fica na pasta `privado/`) tem as fotos da sua pasta do Drive, já reduzidas.
**NÃO suba esse arquivo pro GitHub.** O site é público e as fotos são arte de outras pessoas e fotos de pessoas. Ele já fica fora do zip e está no `.gitignore`.

1. Primeiro suba o `index.html` e o `sw.js` novos pro GitHub e abra o app 2 vezes (pra versão nova carregar).
2. Mande o `comeco-moodboard.json` pro iPhone (AirDrop, iCloud Drive ou e-mail → "Salvar em Arquivos").
3. No Começo: ⚙️ Ajustes → **⬆️ Importar** → escolha o arquivo.
4. Pronto: aparece "22 fotos no mood board — suas horas e tarefas continuam iguais".
   Esse arquivo **só adiciona fotos**. Não apaga nem muda horas, tarefas ou ajustes. Importar de novo não duplica.

Para adicionar mais fotos depois: ⚙️ → Mood board → **Escolher fotos**. Uma foto aparece por dia na tela inicial e, desfocada, atrás do timer.

## 6) Backup 💾 (faz 1x por semana)
⚙️ → **Exportar JSON** → **Salvar em Arquivos** (iCloud Drive). Inclui as fotos.
Pra restaurar (ou passar pra outro celular): ⚙️ → **Importar** → escolhe o arquivo.

## 7) Atualizar o app no futuro
Sobe o novo `index.html` no GitHub (Add file → Upload files → Commit). Abre o app 2 vezes e a versão nova aparece. Seus dados continuam.

---
Começo · sem contas, sem servidor, sem culpa. 🐞
