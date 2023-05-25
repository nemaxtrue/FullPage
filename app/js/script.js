const swiper = new Swiper('.swiper', {
	direction: 'vertical',
	slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    autoHeight: true,
    speed: 600,
    loop: true,
    watchOverflow: false,
	pagination: {
    	el: '.swiper-pagination',
    	clickable: true,
  	},
	navigation: {
	    nextEl: '.swiper-button-next',
	},
  on: {
  	init: function() {
      let totalSlides = document.querySelectorAll('.swiper-slide').length;
  		document.querySelector('.nav-left__current-slide').innerHTML = formatDigit(this.realIndex + 1);
  		document.querySelector('.nav-left__total-slide').innerHTML = formatDigit(totalSlides);
  	},
  	slideChange: function() {
  		document.querySelector('.nav-left__current-slide').innerHTML = formatDigit(this.realIndex + 1);
  		let all = document.querySelectorAll('.header-nav__item');
  		all.forEach((item, index) => {
  			if(index == this.realIndex) {
  				item.classList.add('active');
  			}
  			else {
  				item.classList.remove('active');
  			}
  		})
  	},
    
  }
});


// SCROLL
let simplebarAll = document.querySelectorAll('[data-simplebar]');

simplebarAll.forEach(item=> {
	item.onmouseenter = function() {
		swiper.mousewheel.disable();
	}
	item.onmouseleave = function() {
		swiper.mousewheel.enable();
	}
})


// FORMAT DIGIT
function formatDigit(num) {
  if( num >= 0 && num <= 9) {
    return "0" + num;
  }
  else { 
    return "" + num;
  }
}


// ANCHOR LINKS
let nav = document.querySelector('.header-nav');

nav.addEventListener('click', function(e) {
	let target = e.target.closest('.header-nav__item');
	if(!target) return;

	let links = this.querySelectorAll('.header-nav__item');
	links.forEach(item=> {
		item.classList.remove('active');
	})
	target.classList.add('active');
	let anchor = target.dataset.anchor;

	let slides = Array.from(document.querySelectorAll('.swiper-slide'));

	let index = slides.findIndex(item=> item.id == anchor);
	swiper.slideTo(index);
})

