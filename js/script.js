window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Tres', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndice = null;

//Função Main

function start(event) {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  render();
  activateInput();
}

//Função Form

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

//Função Input

function activateInput() {
  //Função Inserir Nome

  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  //Função Atualizar nome
  function updateName(newName) {
    console.log(newName);
    console.log(currentIndice);
    globalNames[currentIndice] = newName;
    render();
  }

  //Função Enter Acionado

  function handleTyping(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(inputName.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

//Função RENDERIZAR

function render() {
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');

  //Função SPAN

  function createSpan(currentName, indice) {
    //Função de Edição do Item

    function editItem() {
      isEditing = true;
      currentIndice = indice;
      inputName.value = currentName;
      inputName.focus();
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = currentName;
    span.addEventListener('click', editItem);
    return span;
  }

  //Loop Criação da Lista

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();

  //Função Delete
  function createDeleteButton(indice) {
    function deleteNames() {
      globalNames.splice(indice, 1);
      render();
    }
    var indice = indice;
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteNames);
    return button;
  }
}
//Função Limpa área Input
function clearInput() {
  inputName.value = '';
  inputName.focus();
}
