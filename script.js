// Inicio menu responsivo
const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
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
});

var interval = setInterval(meuInterval, 3500);
// Fim carrossel

// Inicio Scroll Animation
$(window).scroll(function() {

  if ($(window).scrollTop() > 370) {
    $('.sobre-left img').addClass('scrolled');
    $('.sobre-right').addClass('scrolled');
  }

});
// Fim Scroll Animation