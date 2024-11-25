const form = document.getElementById("form-atividade");
const imgAprovado =
  '<img src="./src/images/aprovado.png" alt="Emoji festejando Aprovado">';
const imgReprovado =
  '<img src="./src/images/reprovado.png" alt="Emoji Decepcionado Reprovado">';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseInt(prompt("Digite a nota mínima: "));

let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  // valida se a matéria existe ou não no array
  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade: ${inputNomeAtividade.value} ja foi inserida!`);
    inputNomeAtividade.focus()
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(Number(inputNotaAtividade.value));

    // tag da linha da tabela
    let linha = "<tr>";
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`;
    linha += "</tr>";

    linhas += linha;

    // limpando os inputs
    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";
  }
}

function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");

  corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
  const mediaFinal = Number(calculaMediaFinal().toFixed(2));

  document.getElementById("media-final-valor").innerHTML = mediaFinal;
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let somaDasNotas = 0;

  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }

  return somaDasNotas / notas.length;
}
