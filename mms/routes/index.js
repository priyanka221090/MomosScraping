var express = require('express');
var router = express.Router();
var fs = require('fs').promises;
const createWriteStream = require('fs').createWriteStream;
const request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
let dataFile = __dirname + '/data/dataFile';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

 fs.writeFile('PostData.json',JSON.stringify(req.body))
  return res.json(req.body);
 });


router.get('/scrape', function(req, res){

  (async ()=>{

	let writeStream = createWriteStream(dataFile,"UTF8");

	let data = await fs.readFile('PostData.json');
	data = JSON.parse(data);

	for(let i=0; i<data.urls.length; i++){
		await reqUrl(data.urls[i], writeStream);
	}

	async function reqUrl(urll, writeStream){


	request(urll,(err,resp,html)=>{
		const $ = cheerio.load(html);

		$("img").each((index,image)=>{
			let img = $(image).attr('src');
			let baseUrl = urll+"/";
			let links=[];

			if(img){
			if(img.startsWith('/'))
				links = baseUrl+img
			else
			    links = img
				writeStream.write(links);
				writeStream.write("\n");
			}
		});	
	})}
	
	res.end('scraped');

  })();
});

router.get('/readScraped', function(req, res){
	(async()=>{
		let data = await fs.readFile(dataFile,'UTF8');
		data = data.trim();
			let newData = data.split('\n');
			data = JSON.stringify({data:newData});
			res.end(data);
	})();
});

module.exports = router;
