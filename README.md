# 🍸 CHEFEDEBAR

Aplicativo web para bartenders e entusiastas de coquetelaria — receitas clássicas, calculadora de sucos e uma base de conhecimento sobre destilados, licores e bitters.

## 🎯 Sobre o projeto

Projeto pessoal desenvolvido para colocar em prática modelagem de banco de dados, integração frontend-backend e boas práticas de desenvolvimento web, unindo minha experiência anterior em coquetelaria/gastronomia com minha formação em tecnologia.

Desenvolvido com apoio de ferramentas de IA para acelerar a escrita de código, com modelagem de dados, decisões de arquitetura e debugging conduzidos por mim.

## 🛠️ Tecnologias

- **Frontend:** React + Tailwind CSS
- **Backend / Banco de dados:** Xano
- **Design:** Figma

## ✨ Funcionalidades

- 🏠 **Home** com sugestões aleatórias de cocktails e acesso rápido à calculadora
- 🍹 **Catálogo de Cocktails** filtrado por categoria (Unforgettables / Contemporary Classics), com busca por nome
- 📖 **Página de receita** com ingredientes, modo de preparo, garnish e notas
- 🧮 **Super Juice Calculator**: calcula ácido cítrico, málico e água a partir do peso das cascas de cítricos (conceito baseado na calculadora criada por Kevin Kos)
- 📚 Base de dados própria com destilados, licores, bitters e xaropes/infusões

## 🗄️ Modelagem de dados

O banco foi estruturado no Xano com tabelas normalizadas para bebidas, xaropes e cocktails, priorizando reuso e consistência (por exemplo, cada variação de xarope é um registro independente e buscável, em vez de ficar "escondida" dentro das notas de uma receita base).

## 🎨 Design (Figma)

![Visão geral do protótipo](./assets/figma-overview.png)

🔗 [Ver protótipo no Figma](https://www.figma.com/proto/sRwegUgmyFrj97rBEhXkbX/Sem-título?node-id=12-49&t=pItZ9mqxSE8sKaMI-1)

## 📌 Status

Em desenvolvimento — próximas etapas incluem as telas de Bases & Xaropes, História & Contexto e Favoritos.