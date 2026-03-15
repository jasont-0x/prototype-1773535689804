const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/business-age', function (req, res) {
  res.render('business-age')
})

router.post('/business-age', function (req, res) {
  const answer = req.session.data['business-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'business-age': 'Select how long your business has been trading.' }
    return res.render('business-age')
  }
  if (answer === 'not-started') {
    return res.redirect('/bankruptcy-history')
  } else if (answer === 'under-two-years') {
    return res.redirect('/bankruptcy-history')
  } else if (answer === 'two-years-plus') {
    return res.redirect('/ineligible-business-age')
  }
  res.redirect('/bankruptcy-history')
})

router.get('/ineligible-business-age', function (req, res) {
  res.render('ineligible-business-age')
})

router.get('/bankruptcy-history', function (req, res) {
  res.render('bankruptcy-history')
})

router.post('/bankruptcy-history', function (req, res) {
  const answer = req.session.data['bankruptcy-history']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'bankruptcy-history': 'Select yes if you have been declared bankrupt in the last 3 years.' }
    return res.render('bankruptcy-history')
  }
  if (answer === 'yes') {
    return res.redirect('/ineligible-bankruptcy-history')
  } else if (answer === 'no') {
    return res.redirect('/loan-amount')
  }
  res.redirect('/loan-amount')
})

router.get('/ineligible-bankruptcy-history', function (req, res) {
  res.render('ineligible-bankruptcy-history')
})

router.get('/loan-amount', function (req, res) {
  res.render('loan-amount')
})

router.post('/loan-amount', function (req, res) {
  const answer = req.session.data['loan-amount']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'loan-amount': 'Select how much you want to borrow.' }
    return res.render('loan-amount')
  }
  if (answer === '500-5000') {
    return res.redirect('/business-name')
  } else if (answer === '5001-15000') {
    return res.redirect('/business-name')
  } else if (answer === '15001-25000') {
    return res.redirect('/business-name')
  }
  res.redirect('/business-name')
})

router.get('/business-name', function (req, res) {
  res.render('business-name')
})

router.post('/business-name', function (req, res) {
  const answer = req.session.data['business-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'business-name': 'Enter your business name.' }
    return res.render('business-name')
  }
  res.redirect('/contact-email')
})

router.get('/contact-email', function (req, res) {
  res.render('contact-email')
})

router.post('/contact-email', function (req, res) {
  const answer = req.session.data['contact-email']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-email': 'Enter your email address.' }
    return res.render('contact-email')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('SL')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
