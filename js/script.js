'use strict';

document.addEventListener('DOMContentLoaded', () => {

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
})