const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const fortunes = [
  "A short stranger will soon enter your life with blessings to share.",
  "Adversity is the parent of virtue.",
  "Fortune favors the brave.",
  "Now is the time to try something new.",
  "Your ability for accomplishment will follow with success.",
]

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))