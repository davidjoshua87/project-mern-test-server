const router = require('express').Router()

router.get('/', function (req, res) {
  res.send('Website already On')
})

module.exports = router;