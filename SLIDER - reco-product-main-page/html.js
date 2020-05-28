const arrow = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">
<g>
	<path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " style="&#10;    /* fill: red; */&#10;"/>
</g>
</svg>`;

export default function (products, device, widthForOneSlide) {
    return `
    <div class="kam-reco${device ? ' kam-reco_mobile' : ''}">
        <h2 class="kam-reco__title">ЛУЧШИЕ ПРЕДЛОЖЕНИЯ</h2>
        <div class="kam-reco__products" ${device ? `style='min-width:${widthForOneSlide * 4}px'` : ''}>
            ${products.map(({image, name, link, price, oldPrice}) => {
                return `
                    <a class="kam-reco__product" href=${link} ${device ? `style='width:${widthForOneSlide - 30}px'` : ''}>
                        <div class="kam-reco__image" alt="product" style="background-image: url(${image})"></div>
                        <div class="kam-reco__name">${name}</div>
                        <div class="kam-reco__prices">
                            <div class="kam-reco__price">${price}</div>
                            <s class="kam-reco__old-price">${oldPrice}</s>
                        </div>
                        <div class="kam-reco__button">ПОДРОБНЕЕ</div>
                    </a>
                `;
            }).join('')}
        </div>
        <div class="kam-reco__controls">
            <div class="kam-reco__arrow kam-reco__left kam-hide">${arrow}</div>
            <div class="kam-reco__arrow kam-reco__right">${arrow}</div>
            <div class="kam-reco__dots">
                <div class="kam-reco__dot kam-active"></div>
                <div class="kam-reco__dot"></div>
                <div class="kam-reco__dot"></div>
                <div class="kam-reco__dot"></div>
            </div>
        </div>
    </div>`;
}
