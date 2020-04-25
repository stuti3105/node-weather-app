const path = require('path')
const express = require('express')
const hbs = require('hbs')

const foreCast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')

const app = express()

//Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//SetUp handlebar engine nd views location
app.set('view engine', 'hbs')
app.set("views", viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("", (req, res) =>
  res.render("index", {
    title: "Weather App",
    name: "Stuti Agrawal"
  })
);

app.get('/about', (req, res) => res.render('about', {
  title: 'About me',
  name: 'Stuti Agrawal'
}))

app.get('/help', (req, res) => res.render('help', { title: 'Help', helpText: 'This is some helpful text', name: 'Stuti Agrawal' }))

app.get('/weather', (req, res) => {

  const address = req.query.address

  if(!address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geoCode(address, (error, { latitude, longitude, location }={}) => {
    if (error) return res.send({error})

    foreCast(latitude, longitude, (error, data) => {
      if (error) return res.send({error})

      return res.send({location,
        data,
        address
      })
    });
  });
})

app.get('/help/*', (req, res) => res.render('404page', { title: '404 Help', name: 'Stuti Agrawal', errorMessage: 'Help article not found' }))

app.get('*', (req, res) => res.render('404page', { title: '404 Page', name: 'Stuti Agrawal', errorMessage: 'Page not found' }))


app.listen(3000, () => console.log('Server is up'))