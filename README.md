# Serviço de Pagamento

Trabalho de criação de pipeline de integração contínua utilizando GitHub Actions.

---

## Pipeline de Integração Contínua

A pipeline está definida em `.github/workflows/pipeline-integracao-contínua.yaml` e possui **três formas de disparo** e **um job** de testes unitários.

---

## Formas de Disparo

### Disparo Manual (`workflow_dispatch`)

Permite executar a pipeline manualmente pelo GitHub, através da aba **Actions** do repositório.

**Quando usar:** para validar a pipeline sem precisar fazer um push ou aguardar um agendamento.

```yaml
workflow_dispatch:
```

---

### Disparo Agendado (`schedule`)

Executa a pipeline automaticamente em um horário definido, usando sintaxe **cron**.

**Configuração atual:** toda sexta-feira à meia-noite (`0 0 * * 5`)

```yaml
schedule:
  - cron: '0 0 * * 5'
```

**Sintaxe cron:**

| Campo       | Valor | Significado       |
|-------------|-------|-------------------|
| Minuto      | 0     | minuto 0          |
| Hora        | 0     | meia-noite        |
| Dia do mês  | *     | qualquer dia      |
| Mês         | *     | qualquer mês      |
| Dia da semana | 5   | sexta-feira       |

> **Atenção:** o GitHub Actions pode atrasar a execução agendada em horários de pico. O schedule sempre usa como base a **branch padrão** do repositório.

---

### Disparo Automático por Push (`push`)

Executa a pipeline automaticamente sempre que um push é feito na branch `main`.

```yaml
push:
  branches:
    - main
```

---

## Job: `unidade`

Responsável por instalar as dependências, executar os testes unitários e salvar o relatório gerado.

**Máquina:** `ubuntu-latest`

### Passos

1. **Checkout do código** — clona o repositório na máquina virtual
```yaml
- uses: actions/checkout@v4
```

2. **Instalar Node.js** — configura a versão mais recente do Node.js
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: latest
```

3. **Instalar dependências** — executa `npm install` para instalar o Mocha e demais pacotes
```yaml
- name: Instalando dependências
  run: npm install
```

4. **Executar testes** — executa `npm test`, que roda os testes com Mocha e gera o relatório via Mochawesome
```yaml
- name: Executando testes de unidade
  run: npm test
```

5. **Salvar relatório** — faz upload da pasta `mochawesome-report/` como artefato no GitHub Actions (sempre executa, mesmo se os testes falharem)
```yaml
- name: Salvando relatório de testes unitários
  uses: actions/upload-artifact@v4
  if: ${{ always() }}
  with:
    path: ./mochawesome-report
    name: Relatório de Testes Unitários
```

---

## Relatório de Testes

O relatório é gerado pelo [Mochawesome](https://github.com/adamgruber/mochawesome) e salvo como artefato na aba **Actions** do GitHub após cada execução.

A configuração está no arquivo `.mocharc.json`:

```json
{
  "reporter": "mochawesome",
  "reporter-option": [
    "reportDir=mochawesome-report",
    "reportFilename=resultado-testes"
  ]
}
```

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Mocha](https://mochajs.org/) — framework de testes
- [Mochawesome](https://github.com/adamgruber/mochawesome) — gerador de relatórios
- [GitHub Actions](https://docs.github.com/en/actions) — plataforma de CI/CD
