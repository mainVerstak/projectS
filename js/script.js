"use strict";

document.addEventListener("DOMContentLoaded", function () {

  //+tooltip
  document.querySelectorAll('.js-tooltip').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let tooltip = btn.closest('.tooltip');
      let drop = tooltip.querySelector('.tooltip__drop');
      if (tooltip.classList.contains('_active')) {
        tooltip.classList.remove('_active');
        drop.style.transform = ''
      } else {
        let distanceLeft = btn.getBoundingClientRect().x + (btn.getBoundingClientRect().width / 2);
        let distanceRight = window.innerWidth - distanceLeft;
        let dropHalfWidht = drop.scrollWidth / 2;
        if ((distanceLeft - 24) < dropHalfWidht) {
          drop.style.transform = 'translateX(calc(-50% + ' + (dropHalfWidht - (distanceLeft - 24)) + 'px)) scale(1)';
        } else if (distanceRight - 24 < dropHalfWidht) {
          drop.style.transform = 'translateX(calc(-50% - ' + (dropHalfWidht - (distanceRight - 24)) + 'px)) scale(1)';
        } else {
          drop.style.transform = '';
        }
        tooltip.classList.add('_active');
      }
    })
  });
  document.addEventListener('click', function (e) {
    let current = e.target.closest(".tooltip");
    document.querySelectorAll('.tooltip._active').forEach(function (tooltip) {
      if (tooltip != current) {
        let drop = tooltip.querySelector('.tooltip__drop');
        tooltip.classList.remove('_active');
        drop.style.transform = '';
      }
    })
  });
  //-tooltip

  //+cookie
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "; SameSite=None; Secure; path=/";
  }
  (function checkCookie() {
    let cookieA = getCookie("cookie_accepted");
    if (cookieA == "") {
      document.querySelectorAll('.popup-cookie').forEach(function (popup) {
        popup.classList.add('_active')
      });
    } else {
      setCookie("cookie_accepted", "true", 365);
    }
  })();
  document.querySelectorAll('.js-cookie-accept').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let popup = btn.closest('.popup-cookie');
      popup.classList.remove('_active');
      setCookie("cookie_accepted", "true", 365);
    })
  });
  document.querySelectorAll('.js-cookie-close').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let popup = btn.closest('.popup-cookie');
      popup.classList.remove('_active');
    })
  });
  //-cookie

  //+float header 
  let header = document.querySelector('.header');
  let wScroll = window.scrollY;
  window.addEventListener('scroll', function () {
    wScroll = window.scrollY;
    if (wScroll > 10) {
      header.classList.add('_fixed');
    } else {
      header.classList.remove('_fixed');
    }
  });
  //-float header 
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

  //+menu
  const menuBtn = document.querySelector('.header-menu__btn');
  const menuBg = document.querySelector('.header-menu__inner');
  const menuMainBg = document.querySelector('.full-menu__inner');
  const menu = document.querySelector('.header-menu');
  const menuItems = document.querySelectorAll('.full-menu__item');
  menuBtn.addEventListener('click', function () {
    if (menu.classList.contains('_active')) {
      hideMenu();
    } else {
      showMenu();
    }
  })
  menuBg.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
      hideMenu();
    }
  })
  menuMainBg.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
      hideMenu();
    }
  })
  function showMenu() {
    menuBtn.classList.add('_active');
    menu.classList.add('_active');
    document.body.classList.add('_menu-open');
  }
  function hideMenu() {
    menuBtn.classList.remove('_active');
    menu.classList.remove('_active');
    document.body.classList.remove('_menu-open');
    menuItems.forEach(function (activeItem) {
      if (activeItem.classList.contains('_hovered'))
        activeItem.classList.remove('_hovered');
      if (activeItem.classList.contains('_active'))
        mobileMenuHide(activeItem)
    })
  }
  //desktop
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('mouseenter', function () {
      let drop = menuItem.querySelector('.full-menu__drop')
      let dropOffset = wHeight - menuItem.getBoundingClientRect().top - drop.offsetHeight;
      dropOffset = dropOffset < 0 ? dropOffset : -1;
      drop.style.top = dropOffset + 'px';
      menuItem.classList.add('_hovered');
    })
    menuItem.addEventListener('mouseleave', function () {
      menuItem.classList.remove('_hovered');
    })
  })
  //mobile accordion
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function (e) {
      if (e.target.closest('.full-menu__drop'))
        return
      if (menuItem.classList.contains('_active')) {
        mobileMenuHide(menuItem)
      } else {
        menuItems.forEach(function (activeItem) {
          if (activeItem.classList.contains('_active'))
            mobileMenuHide(activeItem)
        })
        mobileMenuShow(menuItem)
      }
    })
  });
  function mobileMenuShow(item) {
    let content = item.querySelector('.full-menu__drop');
    content.style.maxHeight = content.scrollHeight + "px";
    item.classList.add('_active');
    setTimeout(function () {
      content.style.maxHeight = "";
    }, 400);
  }
  function mobileMenuHide(item) {
    let content = item.querySelector('.full-menu__drop');
    content.style.maxHeight = content.offsetHeight + "px";
    setTimeout(function () {
      item.classList.remove('_active');
    }, 10);
    setTimeout(function () {
      content.style.maxHeight = "";
    }, 400);
  }
  //-menu

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
      let elementY = document.querySelector(targetId).getBoundingClientRect().top - 75 + window.scrollY
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
  let gridCrew = document.querySelector('.crew-grid');
  var msnryCrew;

  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  window.addEventListener('resize', throttle(function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
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
      if (gridCrew && !msnryCrew) {
        msnryCrew = new Masonry(gridCrew, {
          itemSelector: '.crew-grid__item',
          percentPosition: true,
          horizontalOrder: true
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
      if (gridCrew && msnryCrew) {
        msnryCrew.destroy();
        msnryCrew = null;
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