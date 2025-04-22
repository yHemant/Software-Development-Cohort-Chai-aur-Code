// const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res)=> res.end('VV HomePage'))
app.get('/contact-us', (req, res)=> res.end('VV Contact Us Page'));
app.get('/about-us', (req, res)=> res.end('VV about us'))

// function handlerFunction(req, res){
//     console.log('Incoming Request');
//     // res.end('ye raha response');
//     switch (req.method) {
//         case 'GET':
//             {
//                 if (req.url === '/') return res.end('HomePage');
//                 if (req.url === '/contact-us') return res.end('Contact us Page');
//                 if (req.url === '/about-us') return res.end('About Us page');
//         }
//         break;
//         case 'POST':
//             {

//         }
//         break;
//     }
// }


// const server = http.createServer(handlerFunction);

app.listen(8000, function() {
    console.log(`Server Started`);
});