function showModal (modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function hideModal (modalSelector) {
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
        if (e.target && e.target.getAttribute('data-close')  == '' || e.target === modal) {
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key ==='Escape' && modal.classList.contains('show')) {
            hideModal(modalSelector);
        }
    });

    

    function scrollWindow () {
        if (window.pageYOffset >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
            showModal(modalSelector, modalTimerId);
            removeEventListener('scroll', scrollWindow);
        }
    }

    window.addEventListener('scroll', scrollWindow);
}

export {showModal};
export {hideModal};
export default modal;