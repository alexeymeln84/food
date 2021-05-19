function calc() {
    
    let sex, height, weight, age, activity;
    let result = document.querySelector('.calculating__result span');

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else { activity = 1.375; localStorage.setItem('activity', 1.375); }

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else { sex = 'female'; localStorage.setItem('sex', 'female'); }

    function initLocalSettings (selector, classActive) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(classActive);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
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

    function getDynamicInformation (selector) {
        const inputs = document.querySelector(selector).querySelectorAll('input');
        
        inputs.forEach(elem => {
            elem.addEventListener('input', e => {
                if(e.target.value.match(/\D/g)) {
                    e.target.style.border = '1px solid red';
                } else {e.target.style.border = 'none';}
                checkInput(e.target.id, e.target);
                calculating();
            });
        });
    }
    function checkInput(id, value) {
        switch(id === 'height' || id === 'weight' || id === 'age') {
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
                result.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
            }
            if (sex == 'male') {
                result.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
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

export default calc;