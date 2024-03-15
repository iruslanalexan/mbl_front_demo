const initialize = () => {
	const videoPlayButtons = [...document.querySelectorAll('button[js-play-next-video]')];

	videoPlayButtons.forEach(button => {
		const video = button.nextElementSibling;

		button.addEventListener("click", (e) => {
			video.play();
		});
		$(button).hover(
			() => {
				video.play();
			},
			() => {}
		)

		video.addEventListener("click", (e) => {
			e.preventDefault();
			video.pause();
		});

		video.addEventListener("pause", (e) => {
			button.style.display = "block";
		});

		video.addEventListener("play", (e) => {
			button.style.display = "none";
		});
	});
};

export default {
	initialize
}