const axios = require("axios")
const cheerio = require("cheerio")

const fetchAndScrapeData = async (symbol) => {
  const url = `https://merolagani.com/CompanyDetail.aspx?symbol=${symbol}`

  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const data = {}

    $("table.table-zeromargin tr").each((index, element) => {
      const key = $(element).find("th").text().trim()
      const value = $(element).find("td").text().trim()
      data[key] = value
    })

    return data
  } catch (error) {
    return { error: `An error occurred for symbol ${symbol}: ${error.message}` }
  }
}

module.exports = fetchAndScrapeData
