window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Tres', 'Quatro'];
var inputName = null;

function start(event) {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  render();
  activateInput();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

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
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = document.createElement('span');
    span.textContent = currentName;
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
    clearInput();
  }
  divNames.appendChild(ul);

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
function clearInput() {
  inputName.value = '';
  inputName.focus();
}
