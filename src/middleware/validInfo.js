module.exports = function (req, res, next) {
  const { email, name, password } = req.body

  function validEmail (userEmail) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
  }

  if (req.path === '/register') {
    console.log(!email.length)
    if (![email, name, password].every(Boolean)) {
      return res.json('Missing Credentials')
    } else if (!validEmail(email)) {
      return res.json('Invalid')
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials')
    } else if (!validEmail(email)) {
      return res.json('Invalid Email')
    }
  }

  next()
}
