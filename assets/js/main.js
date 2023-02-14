const alertEl = document.querySelector('.alert');
let supportedViewport = true;

window.onload = function() {
  document.querySelectorAll('link[media=print]').forEach(link => link.media = 'all');
  document.querySelectorAll('.head input[type=radio]').forEach(input => makeContent(input));

  setTimeout(() => {
    document.querySelectorAll('.content').forEach(cont => cont.style.display = 'block');
  }, 950);
  setTimeout(() => {
    document.querySelector('.content.about').classList.add('active');
    decorActive();
  }, 1000);
}

window.onresize = function() {
  supportedViewport = window.innerWidth > 360 && window.innerWidth < 600;
  if (!supportedViewport) {
    aleret();
  }
}


function aleret() {
  alertEl.style.animation = 'alert 1.5s';
  setTimeout(() => {
    alertEl.style.animation = 'unset';
  }, 2500);
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
