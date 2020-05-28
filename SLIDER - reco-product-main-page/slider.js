export default function (widthForOneSlide, goals) {
    const dots = document.querySelectorAll('.kam-reco__dot');
    const leftArrow = document.querySelector('.kam-reco__left');
    const rightArrow = document.querySelector('.kam-reco__right');
    const productContainer = document.querySelector('.kam-reco__products');
    
    let slideWidth = 0;
    let count = true;
    const dotsPosition = [0, -((widthForOneSlide) + 10), -((widthForOneSlide * 2) + 20), -((widthForOneSlide * 3) + 30)];

    const deleteArrow = () => {
        leftArrow.classList.remove('kam-hide');
        rightArrow.classList.remove('kam-hide');
        if (slideWidth === -((widthForOneSlide * 3) + 30)) rightArrow.classList.add('kam-hide');
        if (slideWidth === 0) leftArrow.classList.add('kam-hide');
    };
    const changeDot = (position) => {
        if (document.querySelector('.kam-active')) document.querySelector('.kam-active').className = 'kam-reco__dot';
        const needIndex = dotsPosition.indexOf(position);
        if (dots[needIndex]) dots[needIndex].classList.add('kam-active');
        if (count) {
            console.log(goals['Click button Know more'])
            count = false;
        }
    };

    [].slice.call(dots).forEach( (dot, i) => {
        dot.addEventListener('click', () => {
            productContainer.style.transform = `translate(${dotsPosition[i]}px)`;
            changeDot(dotsPosition[i]);
            slideWidth = dotsPosition[i];
            deleteArrow();
        });
    });

    const changeSlide = (direction) => {
        direction === 'right' ? slideWidth -= widthForOneSlide + 10 : slideWidth += widthForOneSlide + 10;
        deleteArrow();
        productContainer.style.transform = `translate(${slideWidth}px)`;
        changeDot(slideWidth);
    };

    rightArrow.addEventListener('click', changeSlide.bind(null, 'right'));
    leftArrow.addEventListener('click', changeSlide.bind(null, 'left'));

    let startTouch;
    document.querySelector('.kam-reco').addEventListener('touchstart', evt => {
        startTouch = evt.touches[0].clientX;
    });
    document.querySelector('.kam-reco').addEventListener('touchend', evt => {
        const entTouch = evt.changedTouches[0].clientX;
        const safeZone = 50;

        if (startTouch === entTouch) return;
        if ((startTouch < entTouch && startTouch - entTouch >= -safeZone) ||
            (startTouch > entTouch && startTouch - entTouch <= safeZone)) return;
        if (slideWidth === 0 && startTouch < entTouch) return;
        if (slideWidth === -((widthForOneSlide * 3) + 30) && startTouch > entTouch) return;

        startTouch > entTouch ? changeSlide('right') : changeSlide('left');
    });

}