"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //+faq accordion
  document.querySelectorAll('.faq').forEach(function (accordion) {
    accordion.querySelectorAll('.faq__head').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        let item = btn.closest('.faq__item');
        if (item.classList.contains('_active')) {
          accordionHide(item)
        } else {
          accordion.querySelectorAll('.faq__item._active').forEach(function (activeItem) {
            accordionHide(activeItem)
          })
          accordionShow(item)
        }
      })
    });
  });
  function accordionShow(item) {
    let content = item.querySelector('.faq__content');
    content.style.maxHeight = content.scrollHeight + "px";
    item.classList.add('_active');
    setTimeout(function () {
      content.style.maxHeight = "";
    }, 400);
  }
  function accordionHide(item) {
    let content = item.querySelector('.faq__content');
    content.style.maxHeight = content.offsetHeight + "px";
    setTimeout(function () {
      item.classList.remove('_active');
    }, 10);
    setTimeout(function () {
      content.style.maxHeight = "";
    }, 400);
  }
  //-faq accordion

  //+mobile menu
  const menuBtn = document.querySelector('.header-menu__btn');
  const menuBg = document.querySelector('.header-menu__outer');
  const menu = document.querySelector('.header-menu');
  menuBtn.addEventListener('click', function () {
    if (menu.classList.contains('_active')) {
      menuBtn.classList.remove('_active');
      menu.classList.remove('_active');
      document.body.classList.remove('_menu-open');
    } else {
      menuBtn.classList.add('_active');
      menu.classList.add('_active');
      document.body.classList.add('_menu-open');
    }
  })
  menuBg.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
      menuBtn.classList.remove('_active');
      menu.classList.remove('_active');
      document.body.classList.remove('_menu-open');
    }
  })
  //-mobile menu

  //+tabs
  document.querySelectorAll('.js-tab').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('_active')) return;

      let tabsBtn = this.closest('.js-tabs');
      tabsBtn.querySelectorAll('.js-tab._active').forEach(function (btn) {
        btn.classList.remove('_active');
      });
      this.classList.add('_active');

      let tabsContent = tabsBtn.nextElementSibling;
      if (tabsContent.classList.contains('js-tabs-content')) {
        let index = elIndex(this);
        let tabContentList = tabsContent.children;
        for (let i = 0; i < tabContentList.length; i++) {
          if (i == index) {
            tabContentList[i].classList.add('_active');
          } else {
            tabContentList[i].classList.remove('_active');
          }
        }
      }
    })
  })
  //-tabs

  //+range-slider
  let sliderCalc = document.querySelector('.calc__slider');
  if (sliderCalc) {
    let iconHeart = '<svg width="48" height="48"><use href="images/svg-icons.svg#heart"></use></svg>'
    let costFieldCalc = document.querySelector('.calc__cost');
    noUiSlider.create(sliderCalc, {
      start: 50,
      connect: [true, false],
      /* range: {
        'min': 0,
        'max': 5000
      }, */
      range: {
        'min': [0, 10],
        '10%': [1000, 100],
        'max': [10000]
      },
      tooltips: {
        to: function (value) {
          return (parseInt(value) + iconHeart);
        }
      },
    });
    sliderCalc.noUiSlider.on('set', function (values) {
      costFieldCalc.innerHTML = '€' + (Math.ceil(values * 0.053 * 100) / 100);
    });
    costFieldCalc.innerHTML = '€' + (Math.ceil(sliderCalc.noUiSlider.options.start * 0.053 * 100) / 100);
  }
  //-range-slider

  //+anchor-scroll
  document.querySelectorAll('[data-anchor]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      let targetId = this.getAttribute('href') || '#' + this.getAttribute('data-anchor');
      if (!targetId) return;
      e.preventDefault();
      let elementY = document.querySelector(targetId).getBoundingClientRect().top - 20 + window.scrollY
      if (window.CSS.supports('scroll-behavior', 'smooth')) {
        window.scrollTo({
          top: elementY,
          behavior: 'smooth'
        })
      } else {
        doScrolling(elementY, 0.5);
      }
    })
  })
  function doScrolling(elementY, speed) {
    let startingY = window.scrollY;
    let diff = elementY - startingY;
    if (diff == 0)
      return
    let start;
    let duration = Math.abs(speed * diff);
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      let time = timestamp - start;
      let percent = Math.min(time / duration, 1);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    })
  };
  //-anchor-scroll

  //+select
  document.querySelectorAll(".select").forEach(function (item) {
    NiceSelect.bind(item);
  })
  //-select

  //+slider
  document.querySelectorAll('.slider-promo').forEach(function (container, index) {
    container.classList.add('slider-promo-' + index);
    container.parentNode.querySelector('.swiper-button-next').classList.add('swiper-button-promo-next-' + index);
    container.parentNode.querySelector('.swiper-button-prev').classList.add('swiper-button-promo-prev-' + index);
    let swiperPromo = new Swiper(".slider-promo-" + index, {
      slidesPerView: 'auto',
      spaceBetween: 2,
      touchEventsTarget: 'container',
      autoHeight: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".swiper-button-promo-next-" + index,
        prevEl: ".swiper-button-promo-prev-" + index,
      }
    });
  })
  document.querySelectorAll('.slider-review').forEach(function (container, index) {
    container.classList.add('slider-review-' + index);
    container.parentNode.querySelector('.swiper-button-next').classList.add('swiper-button-review-next-' + index);
    container.parentNode.querySelector('.swiper-button-prev').classList.add('swiper-button-review-prev-' + index);
    let swiperReview = new Swiper(".slider-review-" + index, {
      slidesPerView: 'auto',
      spaceBetween: 2,
      touchEventsTarget: 'container',
      autoHeight: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".swiper-button-review-next-" + index,
        prevEl: ".swiper-button-review-prev-" + index,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        }
      }
    });
  })
  var swiperGrid = new Swiper(".slider-grid", {
    slidesPerView: 'auto',
    spaceBetween: 2,
    touchEventsTarget: 'container',
    autoHeight: true,
    observer: true,
    observeParents: true,
    enabled: true,
    breakpoints: {
      1024: {
        spaceBetween: 0,
        autoHeight: false,
      }
    },
    on: {
      breakpoint: function (swiper, param) {
        if (!param.autoHeight) {
          swiper.slideTo(0, 0, false);
          swiper.disable();
          swiper.wrapperEl.style.height = '';
          swiper.wrapperEl.style.transform = '';
        } else {
          swiper.enable();
        }
      },
    }
  });
  //-slider
  
  //+masonry
  let gridAllServices = document.querySelector('.all-services-grid');
  var msnryAll;
  let gridBestServices = document.querySelector('.best-services-grid');
  var msnryBest;

  let wWidth = window.innerWidth;
  window.addEventListener('resize', throttle(function () {
    wWidth = window.innerWidth;
    if (wWidth > 767) {
      if (gridBestServices && !msnryBest) {
        msnryBest = new Masonry(gridBestServices, {
          itemSelector: '.best-services-grid__item',
          percentPosition: true,
        });
      }
      if (gridAllServices && !msnryAll) {
        msnryAll = new Masonry(gridAllServices, {
          itemSelector: '.all-services-grid__item',
          percentPosition: true,
        });
      }
    } else {
      if (gridBestServices && msnryBest) {
        msnryBest.destroy();
        msnryBest = null;
      }
      if (gridBestServices && msnryAll) {
        msnryAll.destroy();
        msnryAll = null;
      }
    }
  }, 300));
  window.dispatchEvent(new Event('resize'));
  //-masonry
});

function elIndex(el) {
  if (!el) return -1;
  var i = 0;
  while (el = el.previousElementSibling) {
    i++;
  }
  return i;
}

function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}