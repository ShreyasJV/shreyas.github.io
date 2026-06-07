let researchCarouselOffset = 0;
let researchCarouselTarget = 0;
let researchNameBoxes = [];
let researchCardBoxes = [];

const research_CARDS = [
{
    id: 'wen',
    title: 'Queen Mary University of London',
    subtitle: 'Centre for Theoretical Physics',
    location: 'London, UK',
    body: [
        'May 2025 - May 2026',
        '',
        'Supervisor: Dr. Congkao Wen',
        '',
        'Year-long research project in String Theory.',
        '',
        'Studying correlation functions in',
        'SuperConformal Field Theories',
        '',
        'Tools:',
        'Mathematica, LaTeX'
    ]
},

{
    id: 'braunecker_thesis',
    title: 'University of St Andrews',
    subtitle: 'Theoretical Condensed Matter Group',
    location: 'St Andrews, UK',
    body: [
        'Dec 2023 - Apr 2024',
        '',
        'Supervisor: Dr. Bernd Braunecker',
        '',
        'Master’s thesis in Open Quantum Systems.',
        '',
        'Reduced the Lindblad equation using',
        'the Schrieffer-Wolff transformation',
        'while retaining quantum jump terms.',
        '',
        'Developed operator-integral formalism',
        'and implemented models to study',
        'non-Hermitian quantum mechanics.',
        '',
        'Tools:',
        'Python, VS Code, LaTeX'
    ]
},

{
    id: 'chen',
    title: 'Queen Mary University of London',
    subtitle: 'Space Plasma Research Group',
    location: 'London, UK',
    body: [
        'Jun 2023 - Aug 2023',
        '',
        'Supervisor: Dr. Christopher Chen',
        '',
        'Space Plasma\'s department funded research intern.',
        '',
        'Analysed Parker Solar Probe and',
        'Solar Orbiter datasets.',
        '',
        'Identified solar-alignment periods',
        'and investigated solar-wind behaviour',
        'during those intervals.',
        '',
        'Tools:',
        'MATLAB, Python'
    ]
},

{
    id: 'braunecker_staris',
    title: 'University of St Andrews',
    subtitle: 'Theoretical Condensed Matter Group',
    location: 'St Andrews, UK',
    body: [
        'May 2023 - Jun 2023',
        '',
        'Supervisor: Dr. Bernd Braunecker',
        '',
        'STARIS & Student Staff Council',
        'funded research intern.',
        '',
        'Studied spin-orbit coupling using',
        'the Foldy-Wouthuysen transformation.',
        '',
        'Worked with Rashba Hamiltonians,',
        'Wannier functions, Bloch theory,',
        'and Liouvillian superoperators.',
        '',
        'Tools:',
        'Mathematica'
    ]
},

{
    id: 'neukirch',
    title: 'University of St Andrews',
    subtitle: 'Solar Theory Research Group',
    location: 'St Andrews, UK',
    body: [
        'Jun 2022 - Jul 2022',
        '',
        'Supervisor: Dr. Thomas Neukirch',
        '',
        'Solar theory department funded research intern.',
        '',
        'Investigated the Giacalone model',
        'and explored improvements using',
        'generalised Parker Spiral wind models.',
        '',
        'Tools:',
        'Python'
    ]
},

{
    id: 'jagadamma',
    title: 'University of St Andrews',
    subtitle: 'Energy Harvesting Research Group',
    location: 'St Andrews, UK',
    body: [
        'May 2022 - Jun 2022',
        '',
        'Supervisor: Dr. Lethy Krishnan Jagadamma',
        '',
        'Physics Trust funded research intern.',
        '',
        'Designed Arduino hardware and',
        'software to characterise solar-cell',
        'performance with temperature sensing.',
        '',
        'Tools:',
        'Python, Arduino'
    ]
}
];

function drawLink(label, x, y, url, options = {}) {
    const {
        size = px * 0.25,
        color = '#68C8FF',
        align = CENTER,
        hitpadX = 0,
        hitpadY = px * 0.15
    } = options;

    textAlign(align, CENTER);
    textSize(size);

    // draw text
    fill(color);
    text(label, x, y);

    // measure hitbox
    const w = textWidth(label);

    researchNameBoxes.push({
        x: x - w / 2 - hitpadX,
        y: y - hitpadY,
        w: w + hitpadX * 2,
        h: size + hitpadY * 2,
        url
    });
}

function researchPrep() {
	researchCarouselOffset = 0;
	researchCarouselTarget = 0;
	researchNameBoxes = [];
	researchCardBoxes = [];
}

function researchDraw() {
	push();

    textAlign(CENTER, CENTER);

    const headerY = -height * 0.32;

    /*fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front));
    textSize(px * 0.55);
    text('About Me', 0, headerY);*/

    /*textSize(px * 0.22);
    fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), 180);
    text('(click for more information)', 0, headerY + px * 0.55);*/

	const padding = px * 0.4;
	const titleSize = px * 0.52;
	const subtitleSize = px * 0.24;
	const bodySize = px * 0.30;
	const bodyLeading = bodySize * 1.42;
	const radius = px * 0.4;
	const researchSubtitle = (typeof pages !== 'undefined' && pages[2] && pages[2].subtitle) ? pages[2].subtitle : '(click for more information)';

	researchCarouselOffset += (researchCarouselTarget - researchCarouselOffset) * 0.18;
	if (abs(researchCarouselTarget - researchCarouselOffset) < 0.0005) {
		researchCarouselOffset = researchCarouselTarget;
	}

	researchNameBoxes = [];
	researchCardBoxes = [];

	const cardLayouts = research_CARDS.map(card => measureresearchCard(card, padding, titleSize, bodySize, bodyLeading));

	const drawOrder = research_CARDS.map((card, index) => ({
		card,
		index,
		distance: abs(index - researchCarouselOffset)
	})).sort((a, b) => b.distance - a.distance);

	for (let item of drawOrder) {
		const layout = cardLayouts[item.index];
		const cardX = (item.index - researchCarouselOffset) * (layout.width * 0.82);
		const scaleAmount = 1 - min(item.distance * 0.08, 0.12);
		const opacity = 255 - min(item.distance * 85, 85);

		push();
		translate(cardX, sin(ticker * 0.02 + item.index) * 2);
		rotate((item.index === 0 ? -1 : 1) * min(item.distance, 1) * 0.02);
		scale(scaleAmount);

		fill(red(palette[0].medium), green(palette[0].medium), blue(palette[0].medium), opacity);
		stroke(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
		strokeWeight(2);
		rectMode(CENTER);
		rect(0, 0, layout.width, layout.height, radius);

		const innerX = -layout.width / 2 + padding;
		const innerY = -layout.height / 2 + padding * 0.95;
		const innerW = layout.width - padding * 2;
		const innerH = layout.height - padding * 1.7;

		researchCardBoxes.push({
			id: item.card.id,
			x: cardX - layout.width / 2,
			y: -layout.height / 2,
			w: layout.width,
			h: layout.height,
			url: item.card.url || ''
		});

		push();
		rectMode(CORNER);
		clip(() => {
			rect(innerX, innerY, innerW, innerH);
		});

		noStroke();
		fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
		textAlign(LEFT, TOP);

		textSize(titleSize);
		text(item.card.title, innerX, innerY);

		/*if (item.card.id === 'bio') {
			textSize(subtitleSize);
			fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity * 0.78);
			text(researchSubtitle, innerX, innerY + titleSize * 1.05);
			fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
		}*/

		textSize(bodySize);
		let yCursor = innerY + titleSize * 1.18 + (item.card.id === 'bio' ? subtitleSize * 1.2 : 0) + bodySize * 0.12;
		for (let line of item.card.body) {
			if (line.length === 0) {
				yCursor += bodyLeading * 0.72;
				continue;
			}

			if (item.card.id === 'bio' && line.includes('Congkao Wen')) {
				drawHighlightedLine(line, innerX, yCursor, 'Congkao Wen', 'https://www.qmul.ac.uk/spcs/staff/academics/profiles/cwen.html', bodySize, opacity);
			} else if (item.card.id === 'bio' && line.includes('Bernd Braunecker')) {
				drawHighlightedLine(line, innerX, yCursor, 'Bernd Braunecker', 'https://www.st-andrews.ac.uk/~bhb/', bodySize, opacity);
			} else if (item.card.id === 'bio' && line.includes('CV')) {
				drawHighlightedLine(line, innerX, yCursor, 'CV', 'https://drive.google.com/file/d/1CjQyjKnN3gGfXJcq5_xdo652bJMo--1o/view', bodySize, opacity);
			} else {
				fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
				text(line, innerX, yCursor);
			}

			yCursor += bodyLeading;
		}

		textSize(px * 0.22);
		fill(red(palette[0].medium), green(palette[0].medium), blue(palette[0].medium), 200);
		text(item.index === 0 ? '01 / 02' : '02 / 02', layout.width / 2 - padding * 1.5, layout.height / 2 - padding * 0.9);

		pop();
		pop();
	}

	fill(red(palette[0].medium), green(palette[0].medium), blue(palette[0].medium), 200);
	textAlign(CENTER, CENTER);
	textSize(px * 0.25);
	text('Scroll horizontally to switch cards', 0, height * 0.36);
    //text('(click here for more information)', 0, height * 0.375);
    drawLink(
    '(click here for more information)',
    0,
    height * 0.375,
    'https://shreyasjv.github.io',
    {
        size: px * 0.25,
        color: '#68C8FF'
    }
    );
	pop();
}

function measureresearchCard(card, padding, titleSize, bodySize, bodyLeading) {
	textSize(titleSize);
	let widestLine = textWidth(card.title);
	let lineCount = 0;
	for (let line of card.body) {
		if (line.length === 0) {
			lineCount += 0.72;
			continue;
		}
		widestLine = max(widestLine, textWidth(line));
		lineCount += 1;
	}

	const contentWidth = widestLine + padding * 2;
	const contentHeight = titleSize * 1.18 + bodySize * 0.18 + lineCount * bodyLeading + padding * 2.5;

	if (card.id === 'contact') {
		return {
			width: constrain(contentWidth * 0.82, 320, 560),
			height: constrain(contentHeight * 0.86, 240, 400)
		};
	}

	return {
		width: contentWidth,
		//height: constrain(contentHeight, 400, 580)
        height: contentHeight
	};
}

function drawHighlightedLine(line, x, y, phrase, url, bodySize, opacity) {
	const phraseIndex = line.indexOf(phrase);
	if (phraseIndex < 0) {
		fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
		text(line, x, y);
		return;
	}

	const before = line.slice(0, phraseIndex);
	const after = line.slice(phraseIndex + phrase.length);
	const phraseX = x + textWidth(before);
	const phraseW = textWidth(phrase);
	const hitHeight = bodySize * 1.45;

	fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
	text(before, x, y);

	fill('#68C8FF');
	text(phrase, phraseX, y);
	researchNameBoxes.push({ x: phraseX, y: y, w: phraseW, h: hitHeight, url: url });

	fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
	text(after, phraseX + phraseW, y);
}

function mouseReleased() {
	try {
		if (typeof pages === 'undefined' || typeof pg === 'undefined') return;
		if (!(pages[pg] && pages[pg].title === 'research')) return;
		if ((!researchNameBoxes || researchNameBoxes.length === 0) && (!researchCardBoxes || researchCardBoxes.length === 0)) return;

		const mx = mouseX - origin.x;
		const my = mouseY - origin.y;

		for (let box of researchNameBoxes) {
			if (mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) {
				window.open(box.url, '_blank');
				return;
			}
		}

		for (let box of researchCardBoxes) {
			if (box.id === 'bio' && box.url && mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) {
				window.open(box.url, '_blank');
				return;
			}
		}
	} catch (e) {
		// ignore
	}
}

function handleresearchScroll(deltaY) {
	researchCarouselTarget = constrain(researchCarouselTarget + deltaY / 900, 0, research_CARDS.length - 1);
}