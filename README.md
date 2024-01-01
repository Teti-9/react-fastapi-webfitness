# React Python Web

Exemplo: https://exercicios-teti.vercel.app

## Descrição
* Projeto web onde é possível se registrar, recuperar senha, logar, visitar seu perfil e deslogar.
* Dentro do perfil é possível criar um exércicio ou dieta onde pode conter músculo, nome do exércicio, carga, repetições e uma data de criação que é gerada automaticamente ou adicionar carboidratos, proteínas e gorduras (calorias e data automáticas) respectivamente.
* Uma tabela com cada exercício separado por músculo pode ser acessada para visualizar. (Tabela dieta ainda em desenvolvimento, Back-end apenas)
* Também é possível editar ou deletar exercícios criados e macronutrientes.

## Ferramentas
* Back-end
   - Python - FastAPI
* Front-end
   - Vite - React - HTML - CSS

## Database
* O projeto é feito usando uma database local MySQL porém no deploy (Vercel) do exemplo acima, o projeto utiliza de uma database PostgreSQL. Recentemente uma nova parte do Back-End utiliza MongoDB.

## Atualizações
* 1 de Janeiro
  - Dieta - Adicionar macronutrientes como carboidrato, proteína e gorduras para manter um controle da dieta (cálculo de calorias acontece automaticamente baseado na quantidade de macros adicionados).
  - Utiliza MongoDB como database.
  - Back-end apenas, Front-end ainda em desenvolvimento.
* 4 de Dezembro
  - Novo modo de editar e deletar exercícios, sem precisar passar o id, apenas selecionar o mesmo.
* 28 de Novembro
  - Adicionado mínimo e máximo de caracteres para senha.
* 26 de Novembro
  - Criado rotas para recuperação de senha.
* 25 de Novembro
  - Arrumado redirects (Não acessar páginas como verificação pelo URL, apenas por redirect)
* 24 de Novembro
  - Trocado sessionStorage por localStorage.
  - Ícone para visualizar a senha.
