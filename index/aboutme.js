function aboutmePrep(){

	// optional future setup
	// currently empty on purpose

}

function aboutmeDraw(){

	push();

	fill(palette[0].front);

	textAlign(CENTER, CENTER);

	// Main title
	textSize(px * 0.85);

	text(
		"Hi, I'm Shreyas.",
		0,
		-px * 2.2
	);

	// Body text
	textSize(px * 0.38);

	text(
`I'm an MSc Physics student interested in
high energy theory, mathematical physics,
visualisation, and creative coding.

I enjoy building interactive mathematical tools,
experimental interfaces, and generative graphics
using JavaScript and p5.js.`,
		0,
		0
	);

	// small footer
	fill(palette[0].medium);

	textSize(px * 0.28);

	text(
		"thanks for visiting ✨",
		0,
		px * 3.2
	);

	pop();
}
