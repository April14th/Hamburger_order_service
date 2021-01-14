class Hamburger {
    constructor() {
        this.size = null;
        this.stuffing = null;
        this.toppingsList = [];
        this.url = 'https://raw.githubusercontent.com/April14th/JavaScript_2/lesson_2/lesson_2/home-work-3.1/JSON/hamburger.json';
        this.jsonObj = null;
        this.initDefault();
        this.getSize();
        this.getStuffing();
        this.getToppings();
        this.calculateСharacteristicOfHamburger();
    }

    initDefault() {
        this.get(this.url).then(obj => { this.jsonObj = obj, this.size = obj.size[0].name, this.stuffing = obj.stuffing[0].name });
    }

    get(url) {
        return fetch(url).then(d => d.json());
    }

    getSize() {
        const sizeButtons = document.querySelectorAll('.size');
        sizeButtons.forEach(function (sizeButton) {
            sizeButton.addEventListener('click', function (event) {
                for (let item of hamburger.jsonObj.size) {
                    if (event.target.value == item.name) {
                        hamburger.size = item.name
                    }
                }
            });
        });
    }

    getStuffing() {
        const stuffingButtons = document.querySelectorAll('.stuffing');
        stuffingButtons.forEach(function (stuffingButton) {
            stuffingButton.addEventListener('click', function (event) {
                for (let item of hamburger.jsonObj.stuffing) {
                    if (event.target.value == item.name) {
                        hamburger.stuffing = item.name
                    }
                }
            });
        });
    }

    calculateСharacteristicOfHamburger() {
        const calcBtn = document.querySelector('.calc-btn');
        this.calculatePrice(calcBtn);
        this.calculateCalories(calcBtn);
        this.initOrder(calcBtn);
    }

    calculatePrice(button) {
        button.addEventListener('click', function () {
            let priceFromSize = hamburger.calculatePriceOfSize();
            let priceFromStuffing = hamburger.calculatePriceOfStuffing();
            let sumPricesFromToppings = hamburger.calculatePriceOfToppings();
            hamburger.priceOfHamburger = priceFromSize + priceFromStuffing + sumPricesFromToppings;
        })
    };

    calculatePriceOfSize() {
        for (let item of hamburger.jsonObj.size) {
            if (hamburger.size == item.name) {
                let priceFromSize = item.price;
                return priceFromSize;
            }
        }
    }

    calculatePriceOfStuffing() {
        for (let item of hamburger.jsonObj.stuffing) {
            if (hamburger.stuffing == item.name) {
                let priceFromStuffing = item.price;
                return priceFromStuffing;
            }
        }
    }

    calculatePriceOfToppings() {
        let sumPricesFromToppings = 0;
        hamburger.toppingsList.forEach(function (topping) {
            for (let item of hamburger.jsonObj.topping) {
                if (topping == item.name) {
                    sumPricesFromToppings += item.price;
                }
            }
        });
        return sumPricesFromToppings;
    }

    calculateCalories(button) {
        button.addEventListener('click', function () {
            let caloriesFromSize = hamburger.calculateCaloriesOfSize();
            let caloriesFromStuffing = hamburger.calculateCaloriesOfStuffing();
            let sumCaloriesFromToppings = hamburger.calculateCaloriesOfToppings();
            hamburger.calorificOfHamburger = caloriesFromSize + caloriesFromStuffing + sumCaloriesFromToppings;
        });
    };

    calculateCaloriesOfSize() {
        for (let item of hamburger.jsonObj.size) {
            if (hamburger.size == item.name) {
                let caloriesFromSize = item.calorific;
                return caloriesFromSize;
            }
        }
    }

    calculateCaloriesOfStuffing() {
        for (let item of hamburger.jsonObj.stuffing) {
            if (hamburger.stuffing == item.name) {
                let caloriesFromStuffing = item.calorific;
                return caloriesFromStuffing;
            }
        }
    }

    calculateCaloriesOfToppings() {
        let sumCaloriesFromToppings = 0;
        hamburger.toppingsList.forEach(function (topping) {
            for (let item of hamburger.jsonObj.topping) {
                if (topping == item.name) {
                    sumCaloriesFromToppings += item.calorific;
                }
            }
        });
        return sumCaloriesFromToppings;
    }

    addTopping(event) {
        for (let item of hamburger.jsonObj.topping) {
            if (event.target.value == item.name) {
                hamburger.toppingsList.push(item.name)
            }
        }
    }

    removeTopping(event) {
        for (let item of hamburger.jsonObj.topping) {
            if (event.target.value == item.name) {
                let indexTopping = hamburger.toppingsList.indexOf(item.name);
                hamburger.toppingsList.splice(indexTopping, 1);
            }
        }
    }

    getToppings() {
        const toppingButtons = document.querySelectorAll('.topping')
        toppingButtons.forEach(function (toppingButton) {
            toppingButton.addEventListener('click', function (event) {
                if (toppingButton.checked) {
                    hamburger.addTopping(event);
                } else if (toppingButton) {
                    hamburger.removeTopping(event);
                };
            });
        });
    }

    renderOrder() {
        return `<div class="order">
                    <h4 class="order-title">Вы заказали:</h4>
                    <span class="order-item">Гамбургер: ${hamburger.size}, ${hamburger.stuffing}</span>
                    <span class="order-item">Дополнительные добавки: ${hamburger.toppingsList.length ? hamburger.toppingsList.join(', ') : 'отсутствуют' }</span>
                    <span class="order-item">Цена: ${hamburger.priceOfHamburger} RUB</span>
                    <span class="order-item">Количесво каллорий: ${hamburger.calorificOfHamburger} кКал</span>
            </div>`
    }

    initOrder(button) {
        button.addEventListener('click', function() {
            document.getElementById('order-container').innerHTML = hamburger.renderOrder();
        });
    }
}

const hamburger = new Hamburger();