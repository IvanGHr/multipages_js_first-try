export default class VideoPlayer {
	constructor(triggers, overlay) {
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.close');
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	}

	bindTriggers() {
		this.btns.forEach((btn, i) => {
			try {
				const blockElem = btn.closest('.module__video-item').nextElementSibling

				if (i % 2 == 0) {
					blockElem.setAttribute('data-disabled', 'true')
				}
			} catch (e) {}

			btn.addEventListener('click', () => {
				if (
					!btn.closest('.module__video-item') ||
					!btn.closest('.module__video-item').getAttribute('data-disabled') !==
						'true'
				) {
					this.activeBtn = btn //active btn used

					if (document.querySelector('iframe#frame')) {
						this.overlay.style.display = 'flex'
						if (this.path !== btn.getAttribute('data-url')) {
							this.path = btn.getAttribute('data-url')
							this.player.loadVideoById({ videoId: this.path })
						}
					} else {
						this.path = btn.getAttribute('data-url') //saving url`s video of button trigger

						this.createPlayer(this.path) //create video with url from this.path
					}
				}
			})
		})
	}

	bindClose() {
		this.close.addEventListener('click', () => {
			this.overlay.style.display = 'none'
			this.player.stopVideo()
		})
	}

	createPlayer(url) {
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: `${url}`,
			events: {
				onStateChange: this.onPlayerStateChange,
			},
		})

		this.overlay.style.display = 'flex'
	}

	onPlayerStateChange(state) {
		try {
			const blockElem = this.activeBtn.closest(
				'.module__video-item'
			).nextElementSibling //'.module__video-item'//get 2st node
			const playBtn = this.activeBtn.querySelector('svg').cloneNode(true) //copy svg icon (playBtn) completely

			if (state.data === 0) {
				//if status video === finished
				if (
					blockElem.querySelector('.play__circle').classList.contains('closed')
				) {
					//if second video block icon div have class 'closed'
					blockElem.querySelector('.play__circle').classList.remove('closed') //delete class 'closed'
					blockElem.querySelector('svg').remove()
					blockElem.querySelector('.play__circle').appendChild(playBtn)
					blockElem.querySelector('.play__text').classList.remove('attention')
					blockElem.querySelector('.play__text').textContent = 'play video'
					blockElem.style.opacity = 1
					blockElem.style.filter = 'none'

					blockElem.setAttribute('data-disabled', 'false')
				}
			}
		} catch (e) {}
	}

	init() {
		if (this.btns.length > 0) {
			const tag = document.createElement('script')

			tag.src = 'https://www.youtube.com/iframe_api'
			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

			this.bindTriggers()
			this.bindClose()
		}
	}
}