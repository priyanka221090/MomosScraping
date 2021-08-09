/*const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
	res.send('Hello World');
})

app.listen(port, ()=>{
  console.log('Started at port 3000');
});
*/




const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
	res.write('Hello');
});

app.listen(port, ()=>{
  console.log("Server started at 3000");
});
