import {addZero} from './timer';

function slider({slide, container, arrows, totalCounter, currentCounter, wrapperSlider, field}) {
    
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
    sumSlide.innerHTML = `${addZero(slider.length)}`;
    wrapper.style.overflow = `hidden`;
    listTrack.style.transition = '0.5s all';
    listTrack.style.transform = `translateX(${-width.replace(/\D/g, '') * index}px)`;
    currentSlide.innerHTML = `${addZero(index + 1)}`;

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
        dotsArr.forEach((elem) => {
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

    function sliderShow (flag) {
    
        if (flag > slider.length - 1) {
            index = 0;
        }
        if (flag < 0) {
            index = slider.length - 1;
        }
        listTrack.style.transform = `translateX(${-width.replace(/\D/g, '') * index}px)`;
        currentSlide.innerHTML = `${addZero(index + 1)}`;
    }

    arrowsBlock.addEventListener('click', e => {
        e.preventDefault();
        if(e.target && (e.target.classList.contains('offer__slider-next') || e.target.hasAttribute('data-next'))) {
            sliderShow(++index);
            dotsActive(dots);
        }
        if(e.target && (e.target.classList.contains('offer__slider-prev') || e.target.hasAttribute('data-prev'))) {
            sliderShow(--index);
            dotsActive(dots);
        }
    });
}

export default slider;