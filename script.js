// Inicio menu responsivo
const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})
NavMenu.addEventListener('click', () => {
    menu.classList.remove('ativo');
    NavMenu.classList.remove('ativo');
})
// Fim menu responsivo

// Inicio wavify
if($('#wave_img').length) {
    $('#wave_img').wavify({
        height: 40,
        bones: 3,
        amplitude: 50,
        color: '#fff',
        speed: .2
    });
}
// Fim wavify

// Inicio carrossel
var carousel = $('#carousel'),
windowWidth = $('.window').width(),
threshold = 150,
slideWidth = 340,
dragStart, 
dragEnd,

// Calcula o tamanho da tela quando o site abre para centralizar a(s) foto(s)
carouselLeft = -slideWidth + (windowWidth % slideWidth / 2);
carousel.css('left', carouselLeft +'px');

$('#next').click(function(){ shiftSlide(-1) })
$('#prev').click(function(){ shiftSlide(1) })

carousel.on('mousedown', function(){
  if (carousel.hasClass('transition')) return;
  dragStart = event.pageX;
  $(this).on('mousemove', function(){
    dragEnd = event.pageX;
    $(this).css('transform','translateX('+ dragPos() +'px)')
  })
  $(document).on('mouseup', function(){
    if (dragPos() > threshold) { return shiftSlide(1) }
    if (dragPos() < -threshold) { return shiftSlide(-1) }
    shiftSlide(0);
  })
});

function dragPos() {
  return dragEnd - dragStart;
}

function shiftSlide(direction) {
  if (carousel.hasClass('transition')) return;
  dragEnd = dragStart;
  $(document).off('mouseup')
  carousel.off('mousemove')
          .addClass('transition')
          .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
  setTimeout(function(){
    if (direction === 1) {
      $('.slide:first').before($('.slide:last'));
    } else if (direction === -1) {
      $('.slide:last').after($('.slide:first'));
    }
    carousel.removeClass('transition')
		carousel.css('transform','translateX(0px)'); 
  },700)
}

function startarCarrossel() {
  var isPaused = false;

  function meuInterval() {
    if (!isPaused) {
      shiftSlide(-1);
    }
  }

  $(".wrap").mouseenter(function() {
    isPaused = true;
  });

  $(".wrap").mouseleave(function() {
    isPaused = false;
  });setInterval(meuInterval, 3500);
}
// Fim carrossel

// Inicio Scroll Animation
var jaComecou = false;

$(window).scroll(function() {

  const sections = document.querySelectorAll("section");
  const topbarLinks = document.querySelectorAll(".nav-item a");

  sections.forEach(function (section, index) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 50 && rect.bottom >= 50) {
      // Adicione uma classe 'destaqueNavItem' ao link correspondente
      topbarLinks[index].classList.add("destaqueNavItem");
    } else {
      // Remova a classe 'destaqueNavItem' dos outros links
      topbarLinks[index].classList.remove("destaqueNavItem");
    }
  });

  if ($(window).scrollTop() > 370) {
    $('.sobre-left img').addClass('scrolled');
    $('.sobre-right').addClass('scrolled');
  }

  if ($(window).scrollTop() > 1000) {
    $('.wrap').removeClass('carouselAnimation');
    if (!jaComecou) {
      jaComecou = true;
      startarCarrossel();
    }
  }

});
// Fim Scroll Animation

// Inicio animação cardápio
function changeCardapio(elemento) {
  console.log(elemento.style.background);
  const largura = elemento.offsetWidth,
        altura = elemento.offsetHeight,
        esquerda = elemento.offsetLeft,
        topo = elemento.offsetTop;
        
  $('.botoesCardapio > span').css({'background': 'grey', 'pointer-events': 'none'});
  $('.botoesCardapio > span:last-child').css({'opacity': 1,
                                              'background': `var(--red)`,
                                              'width': `${largura}px`,
                                              'height': `${altura}px`,
                                              'left': `${esquerda}px`,
                                              'top': `${topo}px`})

  setTimeout(() => {
    $('.botoesCardapio > span:last-child').css('background', 'transparent');
    elemento.style.background = 'var(--red)';
    $('.botoesCardapio > span').css({'pointer-events': 'unset'});
  }, 500);

  $('.listaCardapio ul').fadeOut();
  setTimeout(function() {
    $(elemento.dataset.target).slideDown(700);
  }, 300);
}
// Fim animação cardápio

// Inicio Check se está no período de funcionamento
function estaNoPeriodoDesejado() {
  const agora = new Date();
  const diaDaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, ..., 6 = Sábado
  const horaAtual = agora.getHours();

  // Verifique se hoje é um dia entre terça-feira (2) e domingo (0)
  const estaNoPeriodoDias = diaDaSemana >= 2 && diaDaSemana <= 6;

  // Verifique se a hora atual está entre 10h e 23h
  const estaNoPeriodoHoras = horaAtual >= 10 && horaAtual <= 22;

  if (estaNoPeriodoDias && estaNoPeriodoHoras) {
    $('.aberto').show();
    $('.fechado').hide();
    $('.home-btn').attr({'href': 'https://wa.me//5541999946316?text=Olá, estou entrando em contato pelo site e eu gostaria de fazer meu pedido.', 'target': '_blank', 'onclick': ''});
  } else {
    $('.fechado').show();
    $('.aberto').hide();
    $('.home-btn').attr({'href': '#contato', 'target': '', 'onclick': 'fechadoPulse()'});
  }

  return;
}

function fechadoPulse() {
  $('.fechado').addClass('pulse');
  setTimeout(() => {
    $('.fechado').removeClass('pulse');
  }, 3000);
}

setInterval(() => {
  estaNoPeriodoDesejado();
}, 60*1000);

estaNoPeriodoDesejado();
// Fim Check