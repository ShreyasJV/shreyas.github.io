let aboutmeScrollOffset = 0;
let aboutmeNameBoxes = [];

function aboutmePrep(){
	// Reset scroll on page load
	aboutmeScrollOffset = 0;
}

function aboutmeDraw(){

	push();

	// Measure text to fit box around it
	textSize(px * 0.85);
	let titleWidth = textWidth("Hi, I'm Shreyas.");
	
	textSize(px * 0.38);
	let bodyText = `High-energy theoretical physicist currently undertaking
a year-long research project under Dr. Congkao Wen
at Queen Mary University of London.

I am from Bangalore, India, and grew up in
Bangalore, Chennai, Delhi, and Hyderabad,
in that order.

I completed my MPhys at the University of St Andrews,
Scotland. During my dissertation, I worked with
Dr. Bernd Braunecker in the field of open quantum systems
on the project titled:

"Reducing the Lindblad equation to evolution under
a non-Hermitian Hamiltonian via a
Schrieffer-Wolff transformation."

Here is my CV

Contact
shreyas1302 {at} gmail {dot} com

s.jekkivenkateshwarulu {at} se24 {dot} qmul {dot} ac {dot} uk

Please use the above only for work-related purposes.

Research Interests
I am interested in high-energy physics (HEP). I have worked in 
open quantum systems, condensed matter physics, and machine learning,
 and would like to apply these tools within high-energy theory.

Some keywords that broadly interest me include:

emergent gravity, fuzzballs, quantum information in 
quantum gravity (QIQG), quantum field theory in curved 
spacetime, open quantum systems, holography, superstring 
theory, superstring field theory, M-theory, supersymmetry, 
swampland, dark energy, wormholes, AI .

Interests
I enjoy origami, reading, writing, walking, running, going 
to the gym, and cooking in my breaks.

Outside of work, I enjoy watching TV, film, and theatre; 
listening to music; and climbing, bouldering, hiking, 
travelling, and debating.

Finally, I like dabbling in a variety of different ideas 
from screenplays, novels, technological ideas, entrepreneurship, 
social work, ai etc and would love to discuss them. I'd like to 
take up woodworking, pottery, and dancing in the future — feel 
free to reach out if this interests you as well. I would also 
like to return to futsal/football.`;
	
	let bodyWidth = textWidth("high energy theory, mathematical physics,");
	let bodyHeight = px * 0.38 * 5.5; // ~5.5 lines with spacing
	
	// Calculate box dimensions with padding
	let padding = px * 0.8;
	let textBoxWidth = max(titleWidth, bodyWidth) + padding * 2;
	let textBoxHeight = px * 0.85 + bodyHeight + padding * 2.5;
	
	// Scale to cover middle section (responsive to screen size)
	let boxWidth = max(textBoxWidth, width * 0.65);
	let boxHeight = max(textBoxHeight, height * 0.80);
	let cornerRadius = px * 0.4;
	
	// Draw background box
	fill(palette[0].medium);
	stroke(palette[0].front);
	strokeWeight(2);
	rect(0, 0, boxWidth, boxHeight, cornerRadius);
	
	// Create clipping region for scrollable text area
	let textAreaX = -boxWidth / 2 + padding;
	let textAreaY = -boxHeight / 2 + padding * 1.5;
	let textAreaWidth = boxWidth - padding * 2;
	let textAreaHeight = boxHeight - padding * 2.5;
	
	// Apply clipping mask
	push();
	rectMode(CORNER);
	clip(() => {
		rect(textAreaX, textAreaY, textAreaWidth, textAreaHeight);
	});
	
	// Text on top of box (clipped)
	noStroke();
	fill(palette[0].front);
	textAlign(LEFT, TOP);

	// Body text with scroll offset (word-by-word so we can make "Congkao Wen" clickable)
	textSize(px * 0.38);
	let leading = px * 0.38 * 1.2;
	let paragraphs = bodyText.split('\n');
	let cursorY = textAreaY + px * 0.3 - aboutmeScrollOffset;
	let startX = textAreaX + px * 0.3;
	const spaceW = textWidth(' ');

	// reset hitboxes
	aboutmeNameBoxes = [];

	for (let p = 0; p < paragraphs.length; p++) {
		let para = paragraphs[p].trim();
		if (para.length === 0) {
			cursorY += leading;
			continue;
		}
		let words = para.split(/\s+/);
		let lineWords = [];
		let lineWidth = 0;
		for (let i = 0; i < words.length; i++) {
			let w = words[i];
			let wW = textWidth(w);
			let addW = (lineWords.length === 0 ? wW : spaceW + wW);
			if (lineWidth + addW > (textAreaWidth - px * 0.6)) {
				// flush line
				let xCursor = startX;
				for (let j = 0; j < lineWords.length; j++) {
					let word = lineWords[j];
					// detect Congkao Wen spanning two words
					if (word === 'Congkao' && j + 1 < lineWords.length && lineWords[j+1] === 'Wen') {
						let drawText = 'Congkao Wen';
						let nameW = textWidth(drawText);
						fill('#68C8FF');
						text(drawText, xCursor, cursorY);
						aboutmeNameBoxes.push({ x: xCursor, y: cursorY, w: nameW, h: leading, url: 'https://www.qmul.ac.uk/spcs/staff/academics/profiles/cwen.html' });
						xCursor += nameW + spaceW;
						j++; // skip next
						fill(palette[0].front);
						continue;
					}
					// detect 'Here is my CV' but make only 'CV' clickable
					if (word === 'Here' && j + 3 < lineWords.length && lineWords[j+1] === 'is' && lineWords[j+2] === 'my' && lineWords[j+3].replace(/:$/,'') === 'CV') {
						// draw 'Here is my' in normal color
						let normalWords = ['Here','is','my'];
						for (let k = 0; k < normalWords.length; k++) {
							let nw = normalWords[k];
							fill(palette[0].front);
							text(nw, xCursor, cursorY);
							xCursor += textWidth(nw) + spaceW;
						}
						// draw 'CV' in blue and register clickable box
						let drawText = 'CV';
						let nameW = textWidth(drawText);
						fill('#68C8FF');
						text(drawText, xCursor, cursorY);
						aboutmeNameBoxes.push({ x: xCursor, y: cursorY, w: nameW, h: leading, url: 'https://drive.google.com/file/d/1CjQyjKnN3gGfXJcq5_xdo652bJMo--1o/view' });
						xCursor += nameW + spaceW;
						j += 3; // skip next three words
						fill(palette[0].front);
						continue;
					}
					fill(palette[0].front);
					text(word, xCursor, cursorY);
					xCursor += textWidth(word) + spaceW;
				}
				// new line
				lineWords = [w];
				lineWidth = wW;
			} else {
				lineWords.push(w);
				lineWidth += addW;
			}
		}
		// flush remaining lineWords
        		if (lineWords.length > 0) {
        		let xCursor = startX;
				for (let j = 0; j < lineWords.length; j++) {
							let word = lineWords[j];
							if (word === 'Congkao' && j + 1 < lineWords.length && lineWords[j+1] === 'Wen') {
								let drawText = 'Congkao Wen';
								let nameW = textWidth(drawText);
								fill('#68C8FF');
								text(drawText, xCursor, cursorY);
								aboutmeNameBoxes.push({ x: xCursor, y: cursorY, w: nameW, h: leading, url: 'https://www.qmul.ac.uk/spcs/staff/academics/profiles/cwen.html' });
								xCursor += nameW + spaceW;
								j++; // skip next
								fill(palette[0].front);
								continue;
							}
							// detect 'Here is my CV' but make only 'CV' clickable
							if (word === 'Here' && j + 3 < lineWords.length && lineWords[j+1] === 'is' && lineWords[j+2] === 'my' && lineWords[j+3].replace(/:$/,'') === 'CV') {
								// draw 'Here is my' in normal color
								let normalWords = ['Here','is','my'];
								for (let k = 0; k < normalWords.length; k++) {
									let nw = normalWords[k];
									fill(palette[0].front);
									text(nw, xCursor, cursorY);
									xCursor += textWidth(nw) + spaceW;
								}
								// draw 'CV' in blue and register clickable box
								let drawText = 'CV';
								let nameW = textWidth(drawText);
								fill('#68C8FF');
								text(drawText, xCursor, cursorY);
								aboutmeNameBoxes.push({ x: xCursor, y: cursorY, w: nameW, h: leading, url: 'https://drive.google.com/file/d/1CjQyjKnN3gGfXJcq5_xdo652bJMo--1o/view' });
								xCursor += nameW + spaceW;
								j += 3; // skip next three words
								fill(palette[0].front);
								continue;
							}
							// also detect Dr. Bernd Braunecker (two-word name)
							if (word === 'Bernd' && j + 1 < lineWords.length && lineWords[j+1] === 'Braunecker') {
								let drawText = 'Bernd Braunecker';
								let nameW = textWidth(drawText);
								fill('#68C8FF');
								text(drawText, xCursor, cursorY);
								aboutmeNameBoxes.push({ x: xCursor, y: cursorY, w: nameW, h: leading, url: 'https://www.st-andrews.ac.uk/~bhb/' });
								xCursor += nameW + spaceW;
								j++; // skip next
								fill(palette[0].front);
								continue;
							}
							fill(palette[0].front);
							text(word, xCursor, cursorY);
							xCursor += textWidth(word) + spaceW;
						}
        	}
		cursorY += leading;
	}

	pop(); // End clipping

	// small footer
	fill(palette[0].medium);
	textSize(px * 0.28);

	pop();
}

function mouseReleased() {
	try {
		if (typeof pages === 'undefined' || typeof pg === 'undefined') return;
		if (!(pages[pg] && pages[pg].title === 'About Me')) return;
		if (!aboutmeNameBoxes || aboutmeNameBoxes.length === 0) return;
		// Convert global mouse coords to the drawing origin used in draw()
		let mx = mouseX - origin.x;
		let my = mouseY - origin.y;
		for (let b = 0; b < aboutmeNameBoxes.length; b++) {
			let box = aboutmeNameBoxes[b];
			if (mx >= box.x && mx <= box.x + box.w &&
				my >= box.y && my <= box.y + box.h) {
				window.open(box.url, '_blank');
				break;
			}
		}
	} catch (e) {
		// ignore
	}
}

function handleAboutmeScroll(deltaY) {
	// Simple smooth scrolling with direct adjustment
	let scrollAmount = deltaY * 0.4; // Smooth multiplier
	aboutmeScrollOffset += scrollAmount;
	
	// Allow scrolling a bit above and below (margins)
	let minScroll = -px * 1; // Can scroll a bit up from top
	let maxScroll = px * 8; // Can scroll down (adjust based on content)
	
	aboutmeScrollOffset = constrain(aboutmeScrollOffset, minScroll, maxScroll);
}
