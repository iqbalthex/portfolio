const menuDropdown = document.querySelector('nav .menu-dropdown');


window.onload = function() {

document.querySelectorAll('link[media=print]').forEach(link => link.media = 'all');
document.querySelectorAll('.head input[type=radio]').forEach(input => makeContent(input));

document.addEventListener('click', changeDropdownState);

setTimeout(() => document.querySelectorAll('.content')
  .forEach(cont => cont.style.display = 'block'), 950);

setTimeout(() => {
  document.querySelector('.content.about').classList.add('active');
  decorActive();
}, 1000);

}


function changeDropdownState(event) {

const toggler = document.querySelector('.menu-toggler input[type=checkbox]');
const span = document.querySelector('.menu-toggler span');

if ((event.target === toggler) && toggler.checked) {
  span.innerText = 'X';
  return menuDropdown.classList.add('dropdown-expanded');
}

span.innerText = '=';
toggler.checked = false;
menuDropdown.classList.remove('dropdown-expanded');

}


function makeContent(input) {

const contName = input.id.split('-')[0];
const cont = document.querySelector(`.content.${contName}`);

input.onchange = function() {
  this.checked && this.activate();
  decorActive();
}

input.activate = function() {
  document.querySelectorAll(`.content:not(.${contName})`)
    .forEach(cont => cont.classList.remove('active'));

  cont.classList.add('active');
}

return cont;

}


function decorActive() {

const label = document.querySelector('.active label > span');
let html = '';
for (let i = 0; i < label.innerText.length; i++) {
  const delay = .1 * i;
  html += `<span style="--delay: ${delay}s">${label.innerText[i]}</span>`;
}
label.innerHTML = html;

}
