var palette, icons, pages, logo_shapes, logo_words, asteroids, icon_a;
var logo_os, home_os, preview_os;
var px, px2, corner_ang, mobile;
var logoImg; // <-- ADD THIS
var pg = -1;
var media_prefix = 'media/';

var color_list = ['Current','Sunset','Electric','Forest','Dark'];
//var main_list = [];
var ticker = 0;
var prod = false;

function preload() {
	mainFont = loadFont(media_prefix+"AshkinsonBold_003.ttf");
	icon_shreyas = loadImage(media_prefix + "icon_shreyas.png");
	//logoImg = loadImage(media_prefix + "icon_shreyas.png");
}


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);//, WEBGL);
	
	px = min(width/11,height/16);
	px2 = px**2;
	unit = px*5;
	scalar = px*5;
	origin = createVector(width/2,height/2);
	// origin = createVector(0,0);
	corner_ang = atan2(height,width);
	icon_ang = random()*TWO_PI;
	mobile = width*1.4 < height;
	//plaque = min(width,px*9);
	
	frameRate(30);
	imageMode(CENTER);
	rectMode(CENTER);
	textFont(mainFont);
	
	
	logo_os = new Offset(createVector(-px,-px));
	home_os = new Offset(createVector(0,0));
	preview_os = new Offset(createVector(0,0));
	
	logo_shapes = [];
	logo_shapes.push(new LogoItem('icon_shreyas',[0,0],px*4,0,1));
	//logo_shapes.push(new LogoItem('pentb',[0,0],px,0.5,1.1));
	//logo_shapes.push(new LogoItem('pent',[0,0],px,0.5,1.1));
	//logo_shapes.push(new LogoItem('tri1',[0,0],px,0,0.6));
	//logo_shapes.push(new LogoItem('tri2',[0,0],px,1.1,1.6));
	
	logo_words = [];
	let wordX = px * 0.2;   // shifted left
	let baseY = 0;          // common baseline
	let wordSize = px * 0.75;
	logo_words.push(new LogoItem('Shreya', [wordX, baseY - 2*px*0.8], wordSize, 0, 0.6));
	logo_words.push(new LogoItem('Jekki', [wordX, baseY - px*0.8], wordSize, 0, 0.6));
	logo_words.push(new LogoItem('Venkateshwarulu', [wordX, baseY], wordSize, 0, 0.6));
	

	
	pages = [];
	pages.push(new Page('Research Experience','Electric','https://shreyasjv.github.io/'));//research icon
	pages.push(new Page('Projects','Sunset','https://thegraycuber.github.io/quadratic.html'));//projects icon
	pages.push(new Page('About Me','Forest','https://shreyasjv.github.io/'));//about me icon
	// pages.push(new Page("Rubik's Cube Calculator",'Forest','https://thegraycuber.github.io/cubecalculator.html'));
	// pages.push(new Page('Complex Grapher','Electric','https://thegraycuber.github.io/grapher.html'));
	pages.push(new Page('Hypercomplex Grapher','Electric','https://thegraycuber.github.io/hypercomplex_grapher.html'));//awards icon
	pages.push(new Page('Education','Dark','https://thegraycuber.github.io/fast_numbers.html'));//education icon
	pages.push(new Page('Hexponents!','Sunset','https://thegraycuber.github.io/hexponents.html'));//hexponents icon
	
	
	icon_rad = px*6.5;
	icons = [];
	icon_maker = [];
	let icon_paths = ['research','projects','about','awards','education','cursed'];
	for (let ic = 0; ic < pages.length; ic++){
		icon_maker.push([[0,0],px*1.2,loadImage(media_prefix+"icon_"+icon_paths[ic]+".png"),pages[ic].title]);
	}

	let startX = -1.8 * px;
	let y = px * 1.0;
	let spacing = 1.2 * px;
	let iconSize = px * 0.9;
	
	icon_maker.push([[startX + 0 * spacing, y], iconSize, loadImage(media_prefix + 'personal_email_icon.png'), 'mailto:shreyas1302@gmail.com', '_blank']);
	icon_maker.push([[startX + 1 * spacing, y], iconSize, loadImage(media_prefix + 'icon_github.png'), 'https://github.com/ShreyasJV', '_blank']);
	icon_maker.push([[startX + 2 * spacing, y], iconSize, loadImage(media_prefix + 'icon_linkedin.png'), 'https://www.linkedin.com/in/shreyas-jv', '_blank']);
	icon_maker.push([[startX + 3 * spacing, y], iconSize, loadImage(media_prefix + 'icon_mail.png'), 'mailto:s.jekkivenkateshwarulu@se24.qmul.ac.uk', '_blank']);
	
	for (let im of icon_maker){
		icons.push(new Icon(im[0], im[1], im[2], im[3], im[4]));
	}
	icon_a = 0;
	
	
	palette = [];		
	let rand_color = int(1+random()*3);
	color_trans = [rand_color,rand_color,1];
	color_list[0] = color_list[rand_color];
	for (var scheme of color_list){
		palette.push(new Palette(scheme));
	}
	
	color_refresh();
	asteroids = [];
	last_frame = Date.now();
	
}
