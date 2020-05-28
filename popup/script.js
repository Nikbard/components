class PopUp {
	constructor(markup, goal) {
		this.markup = markup || '<div class="kam-markup"><h2>Countdown Template</h2></div>';
		this.overlay = null;
		this.place = 'body';
		this.goal = goal || '';
	}

	init() {
		var popup = 
			`<div class="kam-overlay">
				<div class="kam-popup">
					<div class="kam-popup__close-popup"></div>
					${this.markup}
				</div>
			</div>`;
		const element = document.querySelector(this.place);
		element.insertAdjacentHTML('beforeend', popup);
		element.classList.add('kam-overflow');
		this.clickForClose();
	}

	clickForClose() {
		this.overlay = document.querySelector('.kam-overlay');

		var closeButton = this.overlay.querySelector('.kam-popup__close-popup');

		this.overlay.addEventListener('click', (event) => {
			if (event.target.classList.contains('kam-overlay')
				&& !this.overlay.classList.contains('kam-popup_hidden')
				|| event.target === closeButton) {
				this.popinHiding();
				if (this.goal !== '') console.log('click! and goal')
			}		
		})
	}

	popinHiding() {
		this.overlay.classList.add('kam-popup_hidden');
		document.body.classList.remove('kam-overflow');
	}

	closeWhenClickOn(element) {
		element.addEventListener('click', _ => {
			this.popinHiding();
		});
	}

	set closeableByEsc(closeable) {
		if (closeable === true) {
			document.addEventListener('keydown', keyPress);
		}

		const self = this;
		function keyPress (e) {
			if (e.key === "Escape") self.popinHiding;
		}
	}
}

module.exports = PopUp;