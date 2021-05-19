import {cardMenu} from '../services/services';

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
        
        transfToRUB () {
            this.price = this.price * 75;
        }
        render() {
            const card = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                card.classList.add(this.element);
            } else {this.classes.forEach(listClasses => card.classList.add(listClasses));}

            card.innerHTML =`
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

    cardMenu('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu__field .container').render();
        });
    });
}

export default cards;