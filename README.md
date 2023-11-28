# React Python Web

Exemplo: https://exercicios-teti.vercel.app

## Descrição
* Projeto web onde é possível se registrar, recuperar senha, logar, visitar seu perfil e deslogar.
* Dentro do perfil é possível criar um exércicio onde contém músculo, nome do exércicio, carga, repetições e uma data de criação que é gerada automaticamente.
* Uma tabela com cada exercício separado por músculo pode ser acessada para visualizar.
* Também é possível editar ou deletar exercícios criados.

## Ferramentas
* Back-end
   - Python - FastAPI
* Front-end
   - Vite - React - HTML - CSS

## Database
* O projeto é feito usando uma database local MySQL porém no deploy (Vercel) do exemplo acima, o projeto utiliza de uma database PostgreSQL.

## Atualizações
* 28 de Novembro
  - Adicionado mínimo e máximo de caracteres para senha.
* 26 de Novembro
  - Criado rotas para recuperação de senha.
* 25 de Novembro
  - Arrumado redirects (Não acessar páginas como verificação pelo URL, apenas por redirect)
* 24 de Novembro
  - Trocado sessionStorage por localStorage.
  - Ícone para visualizar a senha.
