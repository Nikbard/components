import html from './html';
import slider from './slider';
const goals = {
    'Click button Know more' : 111111,
    'Scroll products' : 111111
};
let device = '';

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    device = 'Phone';
}

export default function (placeVariation) {
    const devices = 'LINK';
    const accessories = 'LINK';
    const place = placeVariation;
    const productsForHtml = [];
    const widthForOneSlide = window.innerWidth;

    const getProductHtml = (image, name, price, oldPrice) => {
        const product = {};
        product.image = image && image.src;
        product.name = name && name.textContent;
        product.link = name && name.href;
        product.price = price && price.textContent;
        product.oldPrice = oldPrice && oldPrice.textContent;
        productsForHtml.push(product);
    };

    const query = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const parsedHTML = new DOMParser().parseFromString(xhr.responseText, 'text/html');
                const products = parsedHTML.querySelectorAll('.catalog__card.card-product.ddl_prouduct');

                const needProducts = [].slice.call(products)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2);

                needProducts.forEach(item => {
                    getProductHtml(
                        item.querySelector('.card-product__img'),
                        item.querySelector('.card-product__title a'),
                        item.querySelector('.card-product__price'),
                        item.querySelector('.card-product__price-old')
                    );
                });

                if (callback) callback();
            }
        };
    };

    const mainCode = (products, element) => {
        element.insertAdjacentHTML(place, html(products, device, widthForOneSlide));
        if (device) slider(widthForOneSlide, goals);
        const productsElem = document.querySelectorAll('.kam-reco__product');

        [].slice.call(productsElem).forEach(item => {
            item.addEventListener('click', () => {
                console.log(goals['Click button Know more'])
            });
        });
    };

    //RUN
    const needElem = document.querySelector('.benefits');
    query(
        devices,
        query.bind(null, accessories,
            mainCode.bind(null, productsForHtml, needElem)));
}