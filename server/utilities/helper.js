module.exports = {
    randomGoodTrail
}


function randomGoodTrail (arr) {
    // math.random gives us a random number between 0 and 1. multiplying it by our 
    // length of the array gives us a random number between 0 and length
    // use math.floor to give us a whole number
    let randomNumber = Math.floor(Math.random() * arr.length)
    return randomNumber
  }
  
  