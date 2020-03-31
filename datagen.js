//reads the .json data and generates the index.html, by Salatiel.

const fs = require('fs');

let rawdata = fs.readFileSync('allnodes2.json');
post = JSON.parse(rawdata).reverse();

function writeHtml(content) {curhtml += content + "\n";}
function saveHtml(){fs.writeFileSync('index.html', curhtml);}

imageformats = ["bmp", "jpg", "png", "JPEG", "JPG", "PNG", "gif", "GIF", "BMP"];
//function getday(){return (new Date()).toLocaleDateString()};
function readNode() {
curhtml = ""
writeHtml('<!-- HTML generated with content extracted from quadropolis.us -->');
writeHtml('<head>\n<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">\n<title>Quadropolis Nodes Mirror</title>\n\t<link rel="stylesheet" type="text/css" href="style.css"/>\n</head>\n<body>\n\t<h1>The <a href="http://quadropolis.us/" target="_blank">Quadropolis</a> Nodes mirror <span style="font-size: 10px">by Salatiel</span></h1>\n');
writeHtml('<strong>2005-01-19 - 2020-01-15</strong>: ' + (post.length - 1) + ' nodes <span style="font-size: 9px">(counting deleted pages)</span>');
writeHtml('<br><a href="#1">Jump to first nodes</a>');
writeHtml('<span style="color: white">/</span> <a href="allnodes2.json" download>.json data</a>')
	try {
		for (p = 0; p < post.length; p++) {
			if (post[p]) {
				writeHtml('<div class="content">');
				if (post[p].title) {
					writeHtml("<h2><span class='counter'>(" + post[p].id + ")</span><a id='" + post[p].id + "' target='_blank' href='http://quadropolis.us/node/" + post[p].id + "'>" + post[p].title + "</a></h2>");
				} else {
					writeHtml("<h2><span class='counter'>(" + post[p].id + ")</span> Untitled Post</h2>")
				};

				if (post[p].author) {
					writeHtml('<p class="author">' + post[p].author + "</p>")
				} else {
					writeHtml('<p class="author">Unknown author</p>')
				};

				if (post[p].image) {
					if (post[p].image.includes("quadropolis.us/files/")) {
						imagename = post[p].image.substr(22).replace(/%20/g, "-");
					} else {
						imagename = post[p].image
					};
					writeHtml ('<img src="' + imagename + '" loading="lazy"/>');
				};
				writeHtml('<p class="post">' + post[p].content.replace(/\n/g, "<br>") + "</p>")
				writeHtml('<span style="color: #ff9800">Files:</span>')
				if (post[p].hrefs.length > 0) {
					for (u = 0; u < post[p].hrefs.length; u++) {
						if (post[p].hrefs[u].includes("quadropolis.us/files/")) {
							filename = post[p].hrefs[u].substr(22).replace(/%20/g, "-");
							writeHtml('<a href="' + filename + '" download>' + filename.substr(6) + '</a>');
						} else {
							writeHtml('<a href="' + post[p].hrefs[u] + '">' + post[p].hrefs[u] + "</a>");
						}
						writeHtml('<span style="color: white">/</span>')
					}
				} else {
					writeHtml('<span style="color: white">none</span>')
				}
				writeHtml('</div>');	
			}
		}
	} finally {
		saveHtml();
	}
}

readNode()