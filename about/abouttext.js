
var textValues = [	
	"Shreyas Jekki Venkateshwarulu.",
	"High-Energy Theoretical Physicist.",
	"From Bangalore, India — raised across\nBangalore, Chennai, Delhi & Hyderabad.",
	"This is my personal universe.\nFor academic work, visit my academic site.",
	"",
	"",
	"",
	""
];

var infoText = [
	[
"In my breaks I enjoy origami,",
"reading, writing, walking, running,",
"gym, and experimenting in",
"the kitchen."
],
[
"Outside work: film, theatre, music,",
"climbing, bouldering, hiking,",
"travelling, & debating —",
],
[
"This is my personal page.",
"For research, publications,",
"and academic details,",
"visit my academic website."
]
];

var info_rand = [];
var info_text_len = 45;

function clean_info(){
	for (var message = 0; message < infoText.length; message++){
		for (var line = 0; line < infoText[message].length; line++){
			while (infoText[message][line].length < 40){
				infoText[message][line] = infoText[message][line] + " ";
				if (infoText[message][line].length < 40){
					infoText[message][line] = " " + infoText[message][line];
				}
			}
		}
	}
	
	for (var t = 0; t < infoText[0].length; t++){
		textValues[4+t] = infoText[2][t];
		info_rand.push([]);
		for (var char = 0; char < 40; char++){
			info_rand[t].push(random()*PI);
		}
	}
	
}

function update_info(random_limit){
	
	for (var t = 0; t < infoText[0].length; t++){
		for (var char = 0; char < 40; char++){
			if (info_rand[t][char] < random_limit){
				info_rand[t][char] = 20;
				textValues[4+t] =  textValues[4+t].substring(0,char) + infoText[new_color-1][t].substring(char,char+1) + textValues[4+t].substring(char+1,textValues[4+t].length);
			}
		}
	}
	
}
