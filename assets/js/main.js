const contentBtn = document.querySelectorAll('.content .head input');

contentBtn.forEach(btn => {
  btn.onchange = event => {
    const contName = event.target.id.split('-')[0];
    const activeCont = document.querySelector(`.content.${contName}`);
    const inactiveCont = document.querySelectorAll(`.content:not(.${contName})`);
    activeCont.classList.add('active');
    inactiveCont.forEach(cont => cont.classList.remove('active'));
  }
});


window.onload = () => {
  document.querySelectorAll('link[rel=preload]').forEach(link => {
    link.rel = 'stylesheet';
  });
}
