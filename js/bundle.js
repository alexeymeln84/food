/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  let sex, height, weight, age, activity;
  let result = document.querySelector('.calculating__result span');

  if (localStorage.getItem('activity')) {
    activity = localStorage.getItem('activity');
  } else {
    activity = 1.375;
    localStorage.setItem('activity', 1.375);
  }

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  function initLocalSettings(selector, classActive) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(classActive);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(classActive);
      }

      if (elem.getAttribute('data-value') === localStorage.getItem('activity')) {
        elem.classList.add(classActive);
      }
    });
  }

  function getStaticInformation(selector, classAcctive) {
    const divs = document.querySelectorAll(selector);
    divs.forEach(elem => {
      elem.addEventListener('click', e => {
        const targ = e.target;

        if (targ.hasAttribute('data-value')) {
          activity = +targ.dataset.value;
          localStorage.setItem('activity', +targ.dataset.value);
        } else {
          sex = targ.id;
          localStorage.setItem('sex', targ.id);
        }

        divs.forEach(elem => {
          elem.classList.remove(classAcctive);
        });
        targ.classList.add(classAcctive);
        calculating();
      });
    });
  }

  function getDynamicInformation(selector) {
    const inputs = document.querySelector(selector).querySelectorAll('input');
    inputs.forEach(elem => {
      elem.addEventListener('input', e => {
        if (e.target.value.match(/\D/g)) {
          e.target.style.border = '1px solid red';
        } else {
          e.target.style.border = 'none';
        }

        checkInput(e.target.id, e.target);
        calculating();
      });
    });
  }

  function checkInput(id, value) {
    switch (id === 'height' || id === 'weight' || id === 'age') {
      case id === 'height':
        height = +value.value;
        break;

      case id === 'weight':
        weight = +value.value;
        break;

      case id === 'age':
        age = +value.value;
        break;
    }
  }

  function calculating() {
    if (height && weight && age) {
      if (sex == 'female') {
        result.innerHTML = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
      }

      if (sex == 'male') {
        result.innerHTML = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
      }
    } else {
      result.innerHTML = '----';
    }
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInformation('.calculating__choose_medium');
  calculating();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class Card {
    constructor(img, alt, subtitle, descr, price, parent, ...classes) {
      this.img = img;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parent);
      this.classes = classes;
      this.transfToRUB();
    }

    transfToRUB() {
      this.price = this.price * 75;
    }

    render() {
      const card = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        card.classList.add(this.element);
      } else {
        this.classes.forEach(listClasses => card.classList.add(listClasses));
      }

      card.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
      this.parent.append(card);
    }

  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.cardMenu)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new Card(img, altimg, title, descr, price, '.menu__field .container').render();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  const form = document.querySelectorAll(formSelector);
  const messages = {
    load: 'img/form/spinner.svg',
    successful: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так... Попробуйте позже!'
  };

  function showThanksModal(mess) {
    const prevModalDiaolg = document.querySelector('.modal__dialog');
    prevModalDiaolg.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${mess}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(function () {
      thanksModal.remove();
      prevModalDiaolg.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
    }, 4000);
  }

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault(); // const request = new XMLHttpRequest();

      const statLoad = document.createElement('img');
      statLoad.src = messages.load;
      statLoad.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statLoad);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(response => {
        console.log(response);
        showThanksModal(messages.successful);
        statLoad.remove();
      }).catch(() => showThanksModal(messages.failure)).finally(() => form.reset()); // для работы с фоматом JSON в файле .php прописать команду
      // $_POST = json_decode(file_get_contents("php://input"), true);
    });
  }

  form.forEach(elem => {
    bindPostData(elem);
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('hide');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function hideModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const btns = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  btns.forEach(btn => {
    btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target && e.target.getAttribute('data-close') == '' || e.target === modal) {
      hideModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      hideModal(modalSelector);
    }
  });

  function scrollWindow() {
    if (window.pageYOffset >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
      showModal(modalSelector, modalTimerId);
      removeEventListener('scroll', scrollWindow);
    }
  }

  window.addEventListener('scroll', scrollWindow);
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({
  slide,
  container,
  arrows,
  totalCounter,
  currentCounter,
  wrapperSlider,
  field
}) {
  const slider = document.querySelectorAll(slide),
        blockSlider = document.querySelector(container),
        arrowsBlock = document.querySelector(arrows),
        currentSlide = document.querySelector(currentCounter),
        sumSlide = document.querySelector(totalCounter),
        wrapper = document.querySelector(wrapperSlider),
        listTrack = document.querySelector(field),
        width = getComputedStyle(document.querySelector(wrapperSlider)).width;
  slider.forEach(elem => {
    elem.style.width = width;
  });
  let index = 0;
  listTrack.style.width = 100 * slider.length + '%';
  listTrack.style.display = 'flex';
  sumSlide.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slider.length)}`;
  wrapper.style.overflow = `hidden`;
  listTrack.style.transition = '0.5s all';
  listTrack.style.transform = `translateX(${-width.replace(/\D/g, '') * index}px)`;
  currentSlide.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(index + 1)}`;

  function dotsSlider(body) {
    body.style.position = 'relative';
    const blockDots = document.createElement('ol');
    blockDots.classList.add('carousel-indicators');
    slider.forEach(elem => {
      elem = document.createElement('li');
      elem.classList.add('dot');
      blockDots.append(elem);
    });
    body.append(blockDots);
  }

  dotsSlider(blockSlider);
  const dots = document.querySelectorAll('.dot');

  function dotsActive(dotsArr) {
    dotsArr.forEach(elem => {
      elem.style.opacity = 0.5;
    });
    dotsArr[index].style.opacity = 1;
  }

  dotsActive(dots);

  function showDots(dotsArr) {
    dotsArr.forEach((elem, ind) => {
      elem.addEventListener('click', () => {
        sliderShow(index = ind);
        dotsActive(dotsArr);
      });
    });
  }

  showDots(dots);

  function sliderShow(flag) {
    if (flag > slider.length - 1) {
      index = 0;
    }

    if (flag < 0) {
      index = slider.length - 1;
    }

    listTrack.style.transform = `translateX(${-width.replace(/\D/g, '') * index}px)`;
    currentSlide.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(index + 1)}`;
  }

  arrowsBlock.addEventListener('click', e => {
    e.preventDefault();

    if (e.target && (e.target.classList.contains('offer__slider-next') || e.target.hasAttribute('data-next'))) {
      sliderShow(++index);
      dotsActive(dots);
    }

    if (e.target && (e.target.classList.contains('offer__slider-prev') || e.target.hasAttribute('data-prev'))) {
      sliderShow(--index);
      dotsActive(dots);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsParentSelector, tabsContentSelector, activeClass) {
  const tabsMenu = document.querySelector(tabsParentSelector),
        tabsItems = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector);

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabsItems[i].classList.add(activeClass);
  }

  function hideTabContent() {
    tabsContent.forEach((val, ind) => {
      val.classList.remove('show', 'fade');
      val.classList.add('hide');
      tabsItems[ind].classList.remove(activeClass);
    });
  }

  hideTabContent();
  showTabContent();
  tabsMenu.addEventListener('click', e => {
    e.preventDefault();

    if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
      tabsItems.forEach((val, ind) => {
        if (val == e.target) {
          hideTabContent();
          showTabContent(ind);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "addZero": () => (/* binding */ addZero)
/* harmony export */ });
function addZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function timer(id, deadline) {
  function dateCalculation(date) {
    const totalDate = Date.parse(date) - Date.parse(new Date()),
          days = Math.floor(totalDate / (1000 * 60 * 60 * 24)),
          hours = Math.floor(totalDate / (1000 * 60 * 60) % 24),
          minutes = Math.floor(totalDate / (1000 * 60) % 60),
          seconds = Math.floor(totalDate / 1000 % 60);
    return {
      'total': totalDate,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(selector, endDate) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerInterval = setInterval(updateTime, 1000);
    updateTime();

    function updateTime() {
      const newDate = dateCalculation(endDate);
      days.textContent = addZero(newDate.days);
      hours.textContent = addZero(newDate.hours);
      minutes.textContent = addZero(newDate.minutes);
      seconds.textContent = addZero(newDate.seconds);
      const total = newDate.total;

      if (total <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardMenu": () => (/* binding */ cardMenu),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-type': 'application/json'
    }
  });
  return await result.json();
};

const cardMenu = async url => {
  const cards = await fetch(url, {
    method: 'GET'
  });

  if (!cards.ok) {
    throw new Error(`Could not fetch ${url}, status: ${cards.status}`);
  }

  return await cards.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)('.modal', modalTimerId), 30000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)('form', modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTimerId);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('.timer', '2021-08-20/00:00:00');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
    slide: '.offer__slide',
    container: '.offer__slider',
    arrows: '.offer__slider-counter',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapperSlider: '.offer__slider-wrapper',
    field: '.offer__slider-track'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map