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
  } catch(err) {
    console.error(err.message)
    return {}
  }
}

const generate = async () => {
  const { quote, author } = await getQuote()

  if (!quote && !author) return
  
  fs.writeFileSync('README.md', `_**${quote}**_\n\n${author}`)
}

generate()

