"use strict";
document.addEventListener("DOMContentLoaded", function () {
  //+ copy quote to clipboard
  document.querySelectorAll('[data-copy-quote]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let currentButton = this;
      let value = this.getAttribute('data-copy-quote');
      if (!value) {
        value = this.parentNode.querySelector('.highlight-item__content').innerText;
        value += ' <span><a href="' + document.location.origin + '" target="_blank">- Source: 100Seguidores</a></span>'
      }
      navigator.clipboard.writeText(value);
      currentButton.classList.add('_show-tooltip');
      setTimeout(function () {
        currentButton.classList.remove('_show-tooltip');
      }, 1500);
    });
  });
  //- copy quoteto clipboard
  //+ copy to clipboard
  document.querySelectorAll('[data-copy]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let currentButton = this;
      let value = this.getAttribute('data-copy');
      if (!value) {
        value = window.location.href;
      }
      navigator.clipboard.writeText(value);
      currentButton.classList.add('_show-tooltip');
      setTimeout(function () {
        currentButton.classList.remove('_show-tooltip');
      }, 1500);
    });
  });
  //- copy to clipboard

  //+ guarantee stats animation
  let guaranteeList = document.querySelector('.guarantee-item__text-list');
  if (guaranteeList) {
    let guaranteeCounters = document.querySelectorAll('.guarantee-item__counter');
    function counter(obj, duration) {
      let end = obj.getAttribute('data-counter') || 776;
      let current = 0;
      let increment = end * 0.005;
      let step = Math.abs(Math.floor(duration / end)) || 3;
      let animIterval = setInterval(() => {
        current += increment;
        obj.textContent = Math.floor(current);
        if (current >= end) {
          clearInterval(animIterval);
          guaranteeList.classList.add('_animation');
          obj.textContent = Math.floor(end);
        }
      }, step);
    }
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          counter(entry.target, 4000);
          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.5
    });
    guaranteeCounters.forEach(function (counter) {
      observer.observe(counter);
    });
  }
  //- guarantee stats animation

  //+ delivered product animation
  let deliveredAnimated = document.querySelector('.head-stats-item__likes-outer');
  if (deliveredAnimated) {
    let delay = deliveredAnimated.getAttribute('data-anim-delay') || 3500;
    let duration = deliveredAnimated.getAttribute('data-anim-duration') || 500;
    let deliveredType = ['likes', 'followers', 'visits']
    let oldItem = deliveredAnimated.querySelector('.head-stats-item__likes-item:first-child');
    let quantity = 1000;
    setInterval(function () {
      deliveredAnimated.style.transition = duration + 'ms';
      deliveredAnimated.style.transform = 'translateY(-36px)'
      setTimeout(function () {
        oldItem = deliveredAnimated.querySelector('.head-stats-item__likes-item:first-child');
        deliveredAnimated.append(oldItem);
        deliveredAnimated.style.transition = '';
        deliveredAnimated.style.transform = 'translateY(0)';
        quantity = (Math.floor(Math.random() * 10 + 1) * 100) + ' ' + deliveredType[Math.floor(Math.random() * 3)];
        oldItem.querySelector('.head-stats-item__likes-text').textContent = quantity;
        oldItem.querySelector('.head-stats-item__time').textContent = Math.floor(Math.random() * 9 + 1) + ' mins ago';
      }, duration);
    }, delay);
  }
  //- delivered product animation

  //+promo code 
  let promoCodeBtn = document.querySelector('.js-apply-promo-code');
  let payBtn = document.querySelector('.js-pay-btn');
  let promoField = document.querySelector('.promo-code-result');
  if (promoCodeBtn) {
    let promoCodeValue = 0.52;
    let promoCodeValid = true;
    promoCodeBtn.addEventListener('click', function (e) {
      if (promoCodeValid) {
        promoField.classList.remove('_error');
        promoField.classList.add('_activated');
        document.querySelector('.promo-code-result__value').textContent = euro.format(promoCodeValue);
        let btnValue = payBtn.getAttribute('data-total-origin');
        btnValue = btnValue - +promoCodeValue;
        document.querySelector('.js-set-btn-price').textContent = euro.format(btnValue);
      } else {
        promoField.classList.remove('_activated');
        promoField.classList.add('_error');
      }
    })
  }
  //-promo code 

  //+select card product + set price
  let totalPrice = document.querySelector('.js-set-price');
  let totalOldPrice = document.querySelector('.js-set-old-price');
  let btnPrice = document.querySelector('.js-set-btn-price');
  let orderName = document.querySelector('.js-set-order-name');
  document.querySelectorAll('.js-select-card').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let currentCard = btn.closest('.card-promo');
      if (!currentCard.classList.contains('_selected')) {
        document.querySelectorAll('.card-promo._selected').forEach(function (card) {
          card.classList.remove('_selected');
        });
        currentCard.classList.add('_selected');
        let name = currentCard.getAttribute('data-product');
        let price = currentCard.getAttribute('data-price');
        let oldPrice = currentCard.getAttribute('data-oldPrice');
        totalPrice.textContent = euro.format(price);
        totalOldPrice.textContent = oldPrice;
        payBtn.setAttribute('data-total-origin', price)
        btnPrice.textContent = euro.format(price);
        orderName.textContent = name;
        if (promoField) {
          promoField.classList.remove('_activated');
          promoField.classList.remove('_error');
        }
      }
    })
  });
  //-select card product

  //+show sample link + promo code
  document.querySelectorAll('.js-hidden-box-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let item = btn.closest('.js-hidden-box');
      let drop = item.querySelector('.js-hidden-box-content');
      if (item.classList.contains('_active')) {
        dropHide(item, drop)
      } else {
        dropShow(item, drop)
      }
    })
  });
  function dropShow(item, drop) {
    drop.style.maxHeight = drop.scrollHeight + "px";
    item.classList.add('_active');
    setTimeout(function () {
      drop.style.maxHeight = "";
    }, 400);
  }
  function dropHide(item, drop) {
    drop.style.maxHeight = drop.offsetHeight + "px";
    setTimeout(function () {
      item.classList.remove('_active');
    }, 10);
    setTimeout(function () {
      drop.style.maxHeight = "";
    }, 400);
  }
  //-show sample link + promo code

  //+set review rating
  let reviewRating = document.querySelector('.js-set-rating');
  if (reviewRating) {
    let reviewRatingText = document.querySelector('.js-set-rating-text');
    let ratingInner = reviewRating.querySelector('.rating__inner');
    let ratingWidth = reviewRating.scrollWidth;
    let currentValue = '100%';
    let newValue = '100%';
    let currentTextValue = '5/5';
    let newTextValue = '5/5';
    function updateRating(x) {
      let width = Math.round(x / ratingWidth * 10) * 10;
      if (Number(width) < 25) {
        newValue = 20 + "%";
        newTextValue = 1 + '/5';
      } else if (Number(width) < 45) {
        newValue = 40 + "%";
        newTextValue = 2 + '/5';
      } else if (Number(width) < 65) {
        newValue = 60 + "%";
        newTextValue = 3 + '/5';
      } else if (Number(width) < 85) {
        newValue = 80 + "%";
        newTextValue = 4 + '/5';
      } else {
        newValue = 100 + "%";
        newTextValue = 5 + '/5';
      }
      ratingInner.style.width = newValue;
      reviewRatingText.textContent = newTextValue;
    }
    reviewRating.addEventListener('mouseenter', function (e) {
      currentValue = ratingInner.style.width;
      currentTextValue = reviewRatingText.textContent;
    })
    reviewRating.addEventListener('mousemove', function (e) {
      updateRating(e.clientX - reviewRating.getBoundingClientRect().left);
    })
    reviewRating.addEventListener('mouseleave', function () {
      ratingInner.style.width = currentValue;
      reviewRatingText.textContent = currentTextValue;
    })
    reviewRating.addEventListener('click', function (e) {
      currentValue = newValue;
      ratingInner.style.width = newValue;
      currentTextValue = newTextValue;
      reviewRatingText.textContent = newTextValue;
    })
    reviewRating.addEventListener('touchstart', function (e) {
      updateRating(e.touches[0].clientX - reviewRating.getBoundingClientRect().left);
      currentValue = newValue;
      ratingInner.style.width = newValue;
      currentTextValue = newTextValue;
      reviewRatingText.textContent = newTextValue;
    })
  }
  //-set review rating

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
  document.querySelectorAll('.slider-review2').forEach(function (container, index) {
    container.classList.add('slider-review2-' + index);
    container.parentNode.querySelector('.swiper-button-next').classList.add('swiper-button-review-next-' + index);
    container.parentNode.querySelector('.swiper-button-prev').classList.add('swiper-button-review-prev-' + index);
    let swiperReview2 = new Swiper(".slider-review2-" + index, {
      slidesPerView: 'auto',
      spaceBetween: 2,
      touchEventsTarget: 'container',
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".swiper-button-review-next-" + index,
        prevEl: ".swiper-button-review-prev-" + index,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
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

var euro = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

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