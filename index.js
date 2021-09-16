const axios = require('axios')
const fs = require('fs')


const getQuote = async () => {
  try {
    const { data } = await axios.get('https://type.fit/api/quotes')
    if (!data.length) return {}

    const index = Math.floor(Math.random() * (data.length - 1))
    const quote = data[index].text
    const author = data[index].author

    return {
      quote,
      author
    }
  } catch (err) {
    console.error(err.message)
    return {}
  }
}

const getEmojiOfTheDay = async () => {
  const data = fs.readFileSync("data.json");
  const { emojis, _ } = JSON.parse(data.toString());

  return emojis[Math.round(Math.random() * emojis.length)];
}

const generate = async () => {
  const { quote, author } = await getQuote()
  const emoji = await getEmojiOfTheDay()

  if (!quote && !author) return

  fs.writeFileSync('README.md', `_**${quote}**_\n\n>${author}\n\n\n\n\n\n p/s. <sub>Please think of me as smart working instead of hark working</sub> <img wisth="24" height="24" align="center" src="emoji/${emoji}.png" alt="emoji of the day">`)
}

generate()
