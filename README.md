# Fiado Fácil

Interface demonstrativa de uma plataforma para controle de vendas a prazo. O projeto foi desenvolvido com Next.js, TypeScript e Tailwind CSS, preparado para publicação futura exclusivamente na Vercel.

> **Atenção:** esta é uma demonstração sem banco de dados, autenticação, APIs externas ou backups. Os dados existem somente na memória da página e desaparecem ao atualizar. Não informe dados pessoais reais.

## Funcionalidades demonstrativas

- Dashboard responsivo com indicadores, gráfico e movimentações recentes.
- Cadastro temporário e pesquisa de clientes.
- Perfil com saldo, compras, pagamentos e previsão de expiração.
- Registro de vendas com múltiplos itens e cálculo automático.
- Pagamentos parciais ou integrais, por dívida ou pelas mais antigas.
- Tema claro/escuro e navegação adaptada a dispositivos móveis.
- Manifesto PWA, ícones e página offline segura.
- Camadas separadas para interface, cálculos financeiros e serviço simulado.

## Como executar

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Verificações

```bash
npm run typecheck
npm run build
```

## Estrutura

```text
app/                  Rotas e telas da aplicação
components/           Componentes compartilhados e estado demonstrativo
lib/finance/          Regras e cálculos financeiros puros
lib/mock/             Dados e serviço em memória
public/               Manifesto, service worker, ícones e fallback offline
types/                Tipos do domínio
```

## Publicação futura na Vercel

Depois de enviar o projeto ao GitHub, importe o repositório em [vercel.com/new](https://vercel.com/new). A Vercel identificará o Next.js automaticamente; nesta etapa, nenhuma variável de ambiente é necessária.

Via CLI, somente quando o responsável decidir publicar:

```bash
npm i -g vercel
vercel
```

Nenhuma outra plataforma de hospedagem foi configurada.

## Próximas etapas para produção

- Autenticação real e isolamento entre estabelecimentos.
- Banco de dados relacional e transações financeiras atômicas.
- Validação, criptografia e controles de acesso para dados pessoais.
- Idempotência e auditoria de vendas e pagamentos.
- Rotina legalmente revisada de retenção após seis meses da quitação.
- Backups criptografados, restauração testada, monitoramento e alertas.
- Testes automatizados, observabilidade e revisão de segurança.

## Envio ao GitHub

Caso não exista autenticação disponível no ambiente:

```bash
git init
git add .
git commit -m "feat: cria prototipo inicial do Fiado Facil"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/fiado-facil.git
git push -u origin main
```
