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

    const deadline = '2022-06-25';

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
})