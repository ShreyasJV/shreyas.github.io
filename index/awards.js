let awardsCarouselOffset = 0;
let awardsCarouselTarget = 0;
let awardsNameBoxes = [];
let awardsCardBoxes = [];

const awards_CARDS = [
{
    id: '2024',
    title: '2024',
    body: [
        'Dean\'s List 2023/24, University of St Andrews'
    ]
},
{
    id: '2023',
    title: '2023',
    body: [
        'PLANCKS-UK',
        'Led team "4ier Trans4ms"',
        'Top 10 nationally (50+ teams)',
        '2nd place among Scottish universities',
        '',
        'St Andrews Research Internship Scheme (StARIS), University of St Andrews',
        '',
        'Student Staff-Council Vacation Award, University of St Andrews',
    ]
},
{
    id: '2022',
    title: '2022',
    body: [
        'Physics Trust Award, Institute of Physics (IOP), UK'
    ]
},
{
    id: '2021',
    title: '2021',
    body: [
        'Dean\'s List 2020/21, University of St Andrews'
    ]
},
{
    id: '2020',
    title: '2020',
    body: [
        'Global Education Merit Scholarship, University of St Andrews'
    ]
},
{
    id: '2018/19',
    title: '2018-2019',
    body: [
        'Only student to achieve',
        '100/100 in Mathematics, Hyderabad Public School, Begumpet',
        '',
        'Several medals in coding, science olympiads, quizzes, and football',
        '',
        'All India Rank 6, Techkriti Open School Championship, IIT Kanpur',
        '',
        'Fundraising initiative for village prosthetics',
        'Raised $430 USD',
        '(160% funded)',
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

    awardsNameBoxes.push({
        x: x - w / 2 - hitpadX,
        y: y - hitpadY,
        w: w + hitpadX * 2,
        h: size + hitpadY * 2,
        url
    });
}

function awardsPrep() {
	awardsCarouselOffset = 0;
	awardsCarouselTarget = 0;
	awardsNameBoxes = [];
	awardsCardBoxes = [];
}

function awardsDraw() {
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
	const awardsSubtitle = (typeof pages !== 'undefined' && pages[2] && pages[2].subtitle) ? pages[2].subtitle : '(click for more information)';

	awardsCarouselOffset += (awardsCarouselTarget - awardsCarouselOffset) * 0.18;
	if (abs(awardsCarouselTarget - awardsCarouselOffset) < 0.0005) {
		awardsCarouselOffset = awardsCarouselTarget;
	}

	awardsNameBoxes = [];
	awardsCardBoxes = [];

	const cardLayouts = awards_CARDS.map(card => measureawardsCard(card, padding, titleSize, bodySize, bodyLeading));

	const drawOrder = awards_CARDS.map((card, index) => ({
		card,
		index,
		distance: abs(index - awardsCarouselOffset)
	})).sort((a, b) => b.distance - a.distance);

	for (let item of drawOrder) {
		const layout = cardLayouts[item.index];
		const cardX = (item.index - awardsCarouselOffset) * (layout.width * 0.82);
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

		awardsCardBoxes.push({
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
			text(awardsSubtitle, innerX, innerY + titleSize * 1.05);
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

function measureawardsCard(card, padding, titleSize, bodySize, bodyLeading) {
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
	awardsNameBoxes.push({ x: phraseX, y: y, w: phraseW, h: hitHeight, url: url });

	fill(red(palette[0].front), green(palette[0].front), blue(palette[0].front), opacity);
	text(after, phraseX + phraseW, y);
}

function mouseReleased() {
	try {
		if (typeof pages === 'undefined' || typeof pg === 'undefined') return;
		if (!(pages[pg] && pages[pg].title === 'awards')) return;
		if ((!awardsNameBoxes || awardsNameBoxes.length === 0) && (!awardsCardBoxes || awardsCardBoxes.length === 0)) return;

		const mx = mouseX - origin.x;
		const my = mouseY - origin.y;

		for (let box of awardsNameBoxes) {
			if (mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) {
				window.open(box.url, '_blank');
				return;
			}
		}

		for (let box of awardsCardBoxes) {
			if (box.id === 'bio' && box.url && mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) {
				window.open(box.url, '_blank');
				return;
			}
		}
	} catch (e) {
		// ignore
	}
}

function handleawardsScroll(deltaY) {
	awardsCarouselTarget = constrain(awardsCarouselTarget + deltaY / 900, 0, awards_CARDS.length - 1);
}