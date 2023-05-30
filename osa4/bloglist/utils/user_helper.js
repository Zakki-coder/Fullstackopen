function validateUser(request, response) {
  const { name, username, password } = request.body
  console.log(name, username, password)
  if (!password || password.length < 3)
    response.status(400).json('password has to be minimum of 3 characaters long')
}

module.exports = {
  validateUser,
}