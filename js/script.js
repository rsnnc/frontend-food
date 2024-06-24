'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //  tabs
    const tabContainer = document.querySelector('.tabcontainer'),
          tabHeaderItem = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelector('.tabcontent');

    function changeTabContent() {
        tabHeaderItem.forEach((item, i) => {
            item.addEventListener('click', () => {
                changeClassList();
                item.classList.add('tabheader__item_active');
                tabContent.innerHTML = '';
                if (item.textContent == 'Фитнес') {
                    tabContent.innerHTML += `
                            <img src="img/tabs/vegy.jpg" alt="vegy">
                            <div class="tabcontent__descr">
                                Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!
                            </div>
                    `
                } else if (item.textContent == 'Премиум') {
                    tabContent.innerHTML += `
                            <img src="img/tabs/elite.jpg" alt="elite">
                            <div class="tabcontent__descr">
                                Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!                                     
                            </div>
                    `
                } else if (item.textContent == 'Постное') {
                    tabContent.innerHTML += `
                            <img src="img/tabs/post.jpg" alt="post">
                            <div class="tabcontent__descr">
                                Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!                                     
                            </div>
                    `
                } else if (item.textContent == 'Сбалансированное') {
                    tabContent.innerHTML += `
                            <img src="img/tabs/hamburger.jpg" alt="vegy">
                            <div class="tabcontent__descr">
                                Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.
                            </div>
                    `
                }
            })
        })
    }
    function changeClassList() {
        tabHeaderItem.forEach((item, i) => {
            if (item.classList.contains('tabheader__item_active')) item.classList.remove('tabheader__item_active');
        })
    }
    changeTabContent();
    console.log(tabHeaderItem.classList); 
    // timer

    const deadline = '2024-06-25';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
              days = Math.floor(t / 1000 / 60 / 60 / 24),
              hours = Math.floor(t / 1000 / 60 / 60 % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor(t / 1000 % 60);
        }
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(endtime) {
        const timer = document.querySelector('.timer'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(deadline);
    
    //  MODAL MENU
    let flag = false;
    const openModalBtns = document.querySelectorAll('[data-modal]'),
          modalMenu = document.querySelector('.modal');

    openModalBtns.forEach(item => {
        item.addEventListener('click', openModal);
    })
    
    function openModal() {
        flag = true;
        modalMenu.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(timeForModal);
    }

    function closeModal() {
        modalMenu.style.display = 'none';
        document.body.style.overflow = '';
        flag = false;
    }

    modalMenu.addEventListener('click', (e) => {
        if (e.target === modalMenu || e.target.getAttribute('data-close') == '') closeModal(); 
    })
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && flag) closeModal();
    })

    const timeForModal = setTimeout(openModal, 50000);

    function openModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight == document.documentElement.scrollHeight) {openModal(); window.removeEventListener('scroll', openModalByScroll);};
    }

    window.addEventListener('scroll', openModalByScroll);

    // cards specifications by using classes

    class cardList {
        constructor(src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.parent = document.querySelector(parent);
            this.price = price;
            this.transfer = 40;
            this.changeToUAH();
        }
        
        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const divElement = document.createElement('div');
            if (this.classes.length === 0) {
                divElement.classList.add('menu__item');
            } else {
                this.classes.forEach(className => divElement.classList.add(className));
            }

            divElement.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `
            this.parent.append(divElement);
        }   
    }

    new cardList('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 10, '.menu .container', 'menu__item', 'big').render();
    new cardList('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 10, '.menu .container', 'menu__item').render();
    new cardList('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 10, '.menu .container', 'menu__item').render();

    // forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успех!',
        failure: 'Что то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            })

            fetch('server1.php', {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        })
    }
    function showThanksModal(message) {
        closeModal();

        const thanksModal = document.createElement('div');
        const previousModal = document.querySelector('.modal__dialog');
        previousModal.style.display = 'none';
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal);
        openModal();

        setTimeout(() => {
            closeModal();
            thanksModal.remove();
            previousModal.style.display = 'block';
        }, 5000);
    }
    fetch('db.json')
    .then(data => data.json())
    .then(result => console.log(result));
})