window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Tres', 'Quatro'];
var inputName = null; //como eu não tenho certeza que a página ja foi carregada, ou seja que a function start rodou, eu não posso
//usar o document. Então eu inicio a variável com null e dentro do start eu busco no document o input

//Especie de Método Main
function start(event) {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  render();
  activateInput();
}

//Evita o comportamento Default do form
function preventFormSubmit() {
  function handleFormSubmit(event) {
    //só conseguirei usar essa função dentro desta function. É o escopo dela
    event.preventDefault(); //Inibir o funcionamento padrão do evento
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

//Manipulações com o input
function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }
  function handleTyping(event) {
    if (event.key === 'Enter') {
      insertName(event.target.value);
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}
function render() {
  function createDeleteButton() {
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    return button;
  }
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');
    var button = createDeleteButton();
    var span = document.createElement('span');
    span.textContent = currentName;
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
    clearInput();
  }

  divNames.appendChild(ul);
}
function clearInput() {
  inputName.value = '';
  inputName.focus();
}
