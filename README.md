# Sistema de controle de ponto

### https://josewaldoneto.github.io/ponto-eletronico-pw/

## Descrição
O projeto deve ser implementado utilizando apenas HTML, CSS e JavaScript, sem o
uso de frameworks ou bibliotecas externas (como Bootstrap, React, Angular, etc.). O
objetivo principal é a aplicação dos conceitos aprendidos durante a disciplina na
construção de uma aplicação web interativa e funcional.

## Requisitos mínimos:
- Usuário deve poder visualizar a data e hora atual na página principal do
sistema;
- Usuário deve poder registrar um ponto de entrada e saída do
expediente;
- Usuário deve poder registrar um ponto de entrada e saída do intervalo;
- Usuário deve poder registrar um ponto no passado (dias anteriores
ao atual)
  - Esse registro deve possuir uma marcação diferenciada no
relatório de marcações;
  - Não deve ser permitida marcação em data futura
- Usuário deve poder registrar uma justificativa para uma ausência,
inclusive com a possibilidade de fazer um upload de arquivo;
- Por padrão, a marcação de entrada e saída de expediente e intervalo irá
considerar a data, hora e localização atuais do usuário no momento do
registro;
- Usuário pode adicionar uma observação a um registro
  - Esses registros devem possuir marcação diferenciada no
relatório de marcações.

- Usuário deve poder editar os registros
  - Esses registros devem possuir marcação diferenciada no
relatório de marcações.

- Usuário deve poder visualizar um relatório com os horários de
entrada e saída, inclusive de intervalos
  - O relatório deve, preferencialmente, ser apresentado em uma
página html separada;
  - Essa página deve mostrar a lista de registros separados por
data;

  - Deve apresentar, ao lado de cada registro, um botão para
edição e um botão para exclusão
    - O botão de exclusão não deve ter ação válida. Somente
apresentar um alerta ao usuário informando que o ponto
não pode ser excluído;
    - A edição de um registro deve editar a sua
correspondência no localstorage.

  - Deve ser possível filtrar os registros por período
    - Último mês e última semana, no mínimo.