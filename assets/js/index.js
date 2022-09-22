//menu

const btnMenu = document.querySelector('#btn-menu').addEventListener('click', toggleMenu)

const header = document.querySelector('header');
const fecharMenu = ()=>  header.classList.remove('active');

function toggleMenu(e) {
	e.preventDefault();
	header.classList.toggle('active');
}

const main = document.querySelector('main').addEventListener('click', fecharMenu);
const footer = document.querySelector('footer').addEventListener('click', fecharMenu);

function responsividade() {
	let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width >= 992) {
      fecharMenu();
    }
}

window.onresize = responsividade;

const btnAoTopo = document.querySelector('#btn-aoTopo');

function posicaoScroll() {
	let posicaoY = window.pageYOffset;

	if(posicaoY >= 300) {
		btnAoTopo.classList.add('visivel');
		header.classList.add('fixed');
	}

	if(posicaoY < 300) {
		btnAoTopo.classList.remove('visivel');
	}

	if(posicaoY === 0) {
	  header.classList.remove('fixed');
	}
}

document.addEventListener('scroll', posicaoScroll);

//carousel 

const glide = new Glide('.glide', {
	type: 'carousel',
	perView: 3,
	breakpoints: {
		768: {
	  		perView: 1
		},
		992: {
	  		perView: 2
		}
	}
});

glide.mount();

//Menu scroll suave

const menuItems = document.querySelectorAll('.menu a[href^="#"]');

function getScrollTopByHref(element) {
	const id = element.getAttribute('href');
	return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event, distanceY = 70) {
	event.preventDefault();
	const to = getScrollTopByHref(event.currentTarget) - distanceY;
	scrollToPosition(to);
	fecharMenu();
}

menuItems.forEach(item => item.addEventListener('click', scrollToIdOnClick));

btnAoTopo.addEventListener('click', event =>  scrollToIdOnClick(event, 0));

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

//Entrada elementos suave

const dataSecao = document.querySelectorAll('[data-secao]')

let observerSecao = new IntersectionObserver(verificarSecaoAtual, {rootMargin: '-200px 0px'});

function verificarSecaoAtual(entries) {
  entries.forEach((entry) => {
  	const id = entry.target.id;
  	const btn = document.querySelector(`.menu a[href^="#${id}"]`);

    if(entry.isIntersecting) {

    	menuItems.forEach(btn => btn.classList.remove('active'));
    	btn.classList.add('active');
    	entry.target.classList.add('atual');

    } else {
    	
    	entry.target.classList.remove('atual');

    	dataSecao.forEach((item, i) => {
    		if(item.classList.contains('atual')) {

    			menuItems.forEach(btn => btn.classList.remove('active'));
    			menuItems[i].classList.add('active');

    		}
    	});
    }
  });
};

dataSecao.forEach(item => observerSecao.observe(item));

const dataAnimacao = document.querySelectorAll('[data-animacao');
let observerElemento = new IntersectionObserver(entradaAnimadaElementos);

dataAnimacao.forEach(item => observerElemento.observe(item));

function entradaAnimadaElementos (entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
    	entry.target.classList.add('visible');
    }
  });
}

const dataAnimacaoSequencia = document.querySelectorAll('[data-animacao-sequencia');
let observerElementoSeq = new IntersectionObserver((item)=> entradaAnimadaElementosSequencia(item));

dataAnimacaoSequencia.forEach(item => observerElementoSeq.observe(item));

function entradaAnimadaElementosSequencia(entries, timer = 100) {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting && !entry.target.classList.contains('visible')) {
    	setTimeout(()=> {
    		entry.target.classList.add('visible');
    	}, timer * i);
    }
  });
}

const dataAnimacaoRedes = document.querySelectorAll('[data-animacao-redes');
let observerRedesSociais = new IntersectionObserver((item)=> entradaAnimadaElementosSequencia(item, 150));

dataAnimacaoRedes.forEach(item => observerRedesSociais.observe(item));