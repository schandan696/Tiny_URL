const express = require("express");
const app = express();
const request = require("request");
app.set("view engine","ejs");
const mongoose = require('mongoose');
const uniqueId = require('./unique_id');
const TinyUrls = require('./model/tinyurl');



// Database Connection
mongoose.connect('mongodb://localhost:27017/tinyUrl_v0', {useNewUrlParser: true})
        .then(() => {
            console.log('Database Connected Sucessfully');
        })
        .catch((err) => {
            console.log('There is some error while connecting to db', err)
        })

app.get("/", (req, res, next) => {
	res.render("search");
});

app.get("/results", (req, res, next) => {
	var Url = req.query.searchResult;
	TinyUrls.findOne({ original_Link: Url })
		.exec()
		.then( result => {
			if (result === null) {
				let resultForloop = null;
				// Handling error when genrated unique id is in db
				do {
					let unique_Id = uniqueId();
					TinyUrls.findOne({ unique_id: unique_Id })
					.exec()
					.then( result1 => { 
						if ( result1 === null ) {
							const newTinyUrl = new TinyUrls ({
								_id: new mongoose.Types.ObjectId(),
								unique_id: unique_Id,
								original_Link: Url
							});
							newTinyUrl
							.save()
							.then( result => {
								res.send(`<h1>Your TinyUrl is: </h1><a href="http://localhost:3000/${result.unique_id}">http://localhost:3000/${result.unique_id}`);
							}).catch( err => console.log(err))
						} else {
							resultForloop = result1;
						}
					});
				} while(resultForloop);
			}
			else {
				res.send(`<h1>Your TinyUrl is: <a href="http://localhost:3000/${result.unique_id}">http://localhost:3000/${result.unique_id}</h1>`);
			}
		})
		.catch( err => {
			console.log(err)
			res.send('<h1>Something Went wrong...</h1>')
		})
});

app.get("/:id", (req, res, next) => {
	TinyUrls.findOne({ unique_id: req.params.id })
		.exec()
		.then( result => {
			if (result === null) {
				res.send('<h1>something wrong with your id...</h1>')
			} else {
				OriginalUrl = result.original_Link;
				if (! (OriginalUrl.substring(0,8) === 'https://' || OriginalUrl.substring(0,7) === 'http://')){
					OriginalUrl = 'http://' + OriginalUrl;
				}
				console.log(OriginalUrl)
				res.redirect(OriginalUrl)
			}
		}).catch( err => {
			console.log(err);
		})
})	

app.listen(app.get('port')||3000, function(){
	console.log("Listening on port 3000", );
});
