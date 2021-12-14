function checkPassword(password) {
    const response = {
      correct: false
    }
    const validPassword = process.env.SETTINGS_PASSWORD;
    
    if (validPassword === password) {
      response.correct = true;
    }
  
    return response;
}

module.exports = checkPassword;