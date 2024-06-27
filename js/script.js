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
    function deleteZero(num) {
        if (num >= 0 && num < 10) {
            return num % 10;
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
    const getResources = (url) => {
        const res = axios.get(url)
        return res;
    } 

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
    getResources('http://localhost:3000/menu').then(data => {
        data.data.forEach(({img, altimg, title, descr, price, parent}) => {
            new cardList(img, altimg, title, descr, price, parent).render();
        })
    })


    // forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успех!',
        failure: 'Что то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        })
        return await res.json();
    }

    function bindPostData(form) {
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
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
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


    // SLIDER
    const arrows = document.querySelector('.offer__slider-counter'),
          currentSliderIndex = document.querySelector('#current'),
          offerImg = document.querySelector('[data-offer__img]'),
          sliderImages = ['img/slider/pepper.jpg', 'img/slider/olive-oil.jpg', 'img/slider/paprika.jpg', 'img/slider/paprika.jpg'],
          totalSliderIndex = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slides[0]).width,
          offerSlide = document.querySelector('.offer__slider'),
          listOfDots = document.createElement('ul');

    let offset = 0
    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all'
    
    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    offerSlide.style.position = 'relative';
    listOfDots.classList.add('carousel-indicators');
    for (let i = 0; i < slides.length; i++) {
        listOfDots.innerHTML += `
            <li class="dot"></li>
        `
    }
    

    offerSlide.append(listOfDots);
    const listDots = document.querySelectorAll('.dot');
    listDots[0].classList.add('dot-active'); 


    function showSlide(index, offset) {
        arrows.addEventListener('click', (e) => {
            if (e.target.className === 'offer__slider-prev') {   
                listDots[index-1].classList.remove('dot-active');
                if (index == 1) {
                    offset = parseInt(window.getComputedStyle(sliderInner).width) - parseInt(width);
                    index = deleteZero(totalSliderIndex.textContent);
                    return applyChangesToSlider(index, offset);
                }
                offset -= parseInt(width);
                --index;
                return applyChangesToSlider(index, offset); 
            } else if (e.target.className === 'offer__slider-next') {
                listDots[index-1].classList.remove('dot-active');
                if (index == deleteZero(totalSliderIndex.textContent)) {
                    offset = 0
                    index = 1;
                    return applyChangesToSlider(index, offset)
                }
                offset += parseInt(width);
                ++index;
                return applyChangesToSlider(index, offset); 
            }
        })
        
        function createDotList() {

            listDots.forEach((item, i) => {
                item.addEventListener('click', () => {
                    listDots[i].classList.remove('dot-active');
                    applyChangesToSlider(++i, parseInt(width) * --i);
                    index = ++i;
                    offset = parseInt(width) * --i;
                })

            })
        }
        createDotList();
    }
    showSlide(+currentSliderIndex.textContent, 0);

    function applyChangesToSlider(index, off = 0) {
        sliderInner.style.transform = `translateX(-${off}px)`
        currentSliderIndex.textContent = getZero(index) + '';
        listDots[index-1].classList.add('dot-active');
        return index;
    }

    //  calculator

    const result = document.querySelector('.calculating__result span');

    let weight, age, height, sex, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    calcTotal();
    function calcTotal() {
        if (!localStorage.getItem('sex') || !localStorage.getItem('ratio') || !localStorage.getItem('weight') || !localStorage.getItem('age') || !localStorage.getItem('height')) {
            localStorage.setItem('result', '____')
            return;
        }
        
        if (localStorage.getItem('sex') == 'male') {
            localStorage.setItem('result', Math.round(88.36 + (13.4 * localStorage.getItem('weight')) + (4.8 * localStorage.getItem('height')) - (5.7 * localStorage.getItem('age')) * ratio));
            result.textContent = localStorage.getItem('result');
        } else {
            localStorage.setItem('result', Math.round(447.6 + (9.2 * localStorage.getItem('weight')) + (3.1 * localStorage.getItem('height')) - (4.3 * localStorage.getItem('age')) * ratio));
            result.textContent = localStorage.getItem('result');
        }
    }
    
    function getStaticInfo(parentSelector) {
        const elements = document.querySelectorAll(`${parentSelector} .calculating__choose-item`);

        elements.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else if (e.target.getAttribute('id') == 'female' || e.target.getAttribute('id') == 'male') {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                    
                } else {
                    return;
                }

                // elements.forEach(elem => elem.classList.remove('calculating__choose-item_active'))
                // e.target.classList.add('calculating__choose-item_active')
                initLocalSettings(parentSelector);
                
                calcTotal();
            })
        })
    }

    function getDynamicInfo(selectorId) {
        const input = document.querySelector(selectorId);
        input.style.transition = 'all 1s ease-in'
        input.addEventListener('input', (e) => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid rgb(227, 120, 142)'
                return;
            } else {
                input.style.border = 'none'
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +(input.value.match(/\d/g).join(''));
                    localStorage.setItem('height', height)
                    break;
                case 'weight':
                    weight = +(input.value.match(/\d/g).join(''));
                    localStorage.setItem('weight', weight)
                    break;
                case 'age':
                    age = +(input.value.match(/\d/g).join(''));
                    localStorage.setItem('age', age)
                    break;
            
            }
            calcTotal();
        })
    }

    function initLocalSettings(parentSelector) {
        const elements = document.querySelectorAll(`${parentSelector} .calculating__choose-item`);
        console.log(elements);
        if (elements.length == 2) {
            elements.forEach(item => {
                if (item.getAttribute('id') == localStorage.getItem('sex')) {
                    item.classList.add('calculating__choose-item_active')
                } else {
                    item.classList.remove('calculating__choose-item_active')
                }})
        } else {
            elements.forEach(item => {
                if (item.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                    item.classList.add('calculating__choose-item_active')
                } else {
                    item.classList.remove('calculating__choose-item_active')
                }
            })
        }
        result.textContent = localStorage.getItem('result');
    }


    getStaticInfo('#gender');
    getStaticInfo('.calculating__choose_big');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
    getDynamicInfo('#height');
    initLocalSettings('#gender');
    initLocalSettings('.calculating__choose_big');
})