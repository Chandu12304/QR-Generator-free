//third-party module qr-image generator from npm
const qr = require('qr-image');

//core module fs
const fs = require('fs');

//third-party module express from npm
const express = require('express');
const app = express();

//third-party module bodypasser from npm
const bodyParser = require('body-parser');

//third-party module express-sessions from npm
const session = require('express-session');

//core module path from npm
const path = require('path');

//third-party module url shortner from npm
var shortUrl = require("node-url-shortener");

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Setting the directory where EJS templates are located
app.set('views', path.join(__dirname, 'views'));

//middleware-1 for parsing url-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//middleware-2 for parsing json data
app.use(bodyParser.json());

//middleware-3 for storing data posted
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: true }));

//middleware-4 to tell Express to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//setting up a server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})

//route handlers
let num = 1;
app.get("/", (req, res) => {
    //loop deletes all the files created while refreshing the qrimage generated route
    while ((num - 1) != 0) {
        // Constructing the full path to the file that might need deletion
        const filePath = path.join(__dirname, 'public', 'images', `image${num - 1}.png`);

        // Check if the file exists before attempting to delete it
        if (fs.existsSync(filePath)) {
            console.log('File exists');

            // Attempt to delete the file
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return; // Exit the function if there's an error
                }
                console.log('File deleted successfully!');
            });
        } else {
            console.log('File does not exist');
        }
        num = num - 1;
    }
    // Render the index page
    res.render('index.ejs');

})

app.get("/download", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'images', `image${num - 1}.png`);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error while downloading file:', err);
            res.status(500).send('File not found!');
        }
    });
})

app.post("/converter", (req, res) => {
    req.session.url = req.body.url; // url is the value of 'name' attribute of input tag
    console.log(req.session.url);
    res.redirect("/qrimage")
})

app.get("/qrimage", (req, res) => {
    const url = req.session.url;
    console.log(url);
    // Define the directory where you want to save the images
    const outputDir = path.join(__dirname, 'public', 'images');

    // To Ensure the directory exists or create it
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    shortUrl.short(`${url}`, function (err, url1) {
        console.log(url1);
        const filePath = path.join(outputDir, `image${num}.png`);
        const qr_png = qr.image(`${url1}`, { type: 'png' });
        qr_png.pipe(fs.createWriteStream(filePath));
        num++;
        res.render('qrimage.ejs', { num }); // Pass num to the template
    });
})

