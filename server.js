const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFileSync('server.log', log + '\n');
	next();
});


// Mainenance Page Activator
// (INFO: Comment out to deactivate Maintenance Page - Uncomment to activate it)

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });



app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		pageMsg: 'This is the Home Page for my NodeJS and ExpressJS website.'
	});
});


app.get('/videogallery', (req, res) => {
	res.render('videos.hbs', {
		pageTitle: 'Video Gallery'
	});
});

app.get('/makami-event-1', (req, res) => {
	res.render('vid-pages/makami-event/vid1.hbs', {
		pageTitle: 'Oguchi Makami Event Dungeon Playthrough',
		subTitle: 'Grotto of Eternity - Normal x10'
	});
});

app.get('/makami-event-2', (req, res) => {
	res.render('vid-pages/makami-event/vid2.hbs', {
		pageTitle: 'Oguchi Makami Event Dungeon Playthrough',
		subTitle: 'Dragon Spiral Den - Normal x10'
	});
});

app.get('/money-farming-1', (req, res) => {
	res.render('vid-pages/money-farming/money-vid-7-29-2018.hbs', {
		pageTitle: 'Ryou Farming (July 29th 2018)',
		subTitle: 'Yakumo Shrine in Kyoto - Hell Mode'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		pageMsg: 'This is the About Page for my NodeJS and ExpressJS website.'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: {
			message: 'API Request Failed',
			code: 'API_REQUEST_ERROR'
		}
	});
});

app.listen(port, () => {
	console.log(`Server is now running at port: ${port}`);
});
