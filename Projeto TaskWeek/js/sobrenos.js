document.addEventListener("DOMContentLoaded", function () { //espera html carregar completamente
  const slides = document.querySelector('.slides');// div das imagens 
  const imagens = document.querySelectorAll('.slides img'); // imagens de .slides pra saber quantidade. 
  const btnEsquerda = document.querySelector('.carrossel-btn.esquerda'); //seta da esquerda.
  const btnDireita = document.querySelector('.carrossel-btn.direita');// seta da direita 
  let index = 0; // começa a mostrar pela primeira imagem. 

  function atualizarSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`; //mover carrosel na horizontal 
  }

  btnDireita.addEventListener('click', () => {  // quando clica no botão o index aumenta e vai pra próxima imagem.
    index = (index + 1) % imagens.length;// volta pra primeira imgem, tipo um loop. 
    atualizarSlide();
  });

  btnEsquerda.addEventListener('click', () => { //volta pra imagem anterior 
    index = (index - 1 + imagens.length) % imagens.length; 
    atualizarSlide();
  });
});
