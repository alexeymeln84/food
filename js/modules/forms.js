import {showModal, hideModal} from './modal';
import {postData} from '../services/services';

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
        showModal('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${mess}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(function(){
            thanksModal.remove();
            prevModalDiaolg.classList.remove('hide');
            hideModal('.modal');
        }, 4000);
    }

    function bindPostData(form) {
        form.addEventListener('submit', e=> {
            e.preventDefault();
            // const request = new XMLHttpRequest();

            const statLoad = document.createElement('img');
            statLoad.src = messages.load;
            statLoad.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statLoad);
            
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(response => {
                console.log(response);
                showThanksModal(messages.successful);
                statLoad.remove();
            })
            .catch(() => showThanksModal(messages.failure))
            .finally(() => form.reset());

            // для работы с фоматом JSON в файле .php прописать команду
            // $_POST = json_decode(file_get_contents("php://input"), true);

        });
    }
    form.forEach(elem => {
        bindPostData(elem);
    });
}

export default forms;