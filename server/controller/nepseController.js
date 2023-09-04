const axios = require("axios")
const cheerio = require("cheerio")
const fetchAndScrapeData = require("./scrapper")

const symbols = []

const liveMarket = async (req, res, next) => {
  const url = "https://www.sharesansar.com/live-trading"
  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const columnMapping = {}

    // Extract column names from the <thead> section
    $("thead th").each((index, element) => {
      const columnName = $(element).text().trim()
      columnMapping[index] = columnName
    })

    const rowData = []

    $("tbody tr").each((index, element) => {
      const row = $(element)
      const columns = row.find("td")

      const rowDataItem = {}

      columns.each((columnIndex, column) => {
        const columnName = columnMapping[columnIndex]
        rowDataItem[columnName] = $(column).text().trim()
      })

      rowData.push(rowDataItem)
    })

    $("tbody tr").each((index, element) => {
      const row = $(element)
      const symbol = row.find("td:nth-child(2)").text().trim() // Assuming symbol is in the second column
      symbols.push(symbol)
    })

    res.json({ data: rowData })
    // Wrap the array in a "data" property
  } catch (error) {
    console.error("Error fetching the webpage:", error)
    res.status(500).json({ error: "An error occurred while fetching data." })
  }
}

const companyDetails = async (req, res) => {
  const symbol = req.params.symbol

  // if (!symbol) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please enter a valid company symbol." })
  // }
  // if (!symbols.includes(symbol)) {
  //   return res
  //     .status(404)
  //     .json({ error: "Please enter a valid symbol present in the list." })
  // }

  try {
    const scrapedData = await fetchAndScrapeData(symbol)
    res.json(scrapedData)
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` })
  }
}

// const combinedData = async (req, res) => {
//   const combinedData = {}

//   const url = "https://www.sharesansar.com/live-trading"
//   try {
//     const response = await axios.get(url)
//     const html = response.data
//     const $ = cheerio.load(html)

//     const columnMapping = {}

//     // Extract column names from the <thead> section
//     $("thead th").each((index, element) => {
//       const columnName = $(element).text().trim()
//       columnMapping[index] = columnName
//     })

//     // Extract live market data and symbols
//     const symbols = []
//     $("tbody tr").each((index, element) => {
//       const row = $(element)
//       const columns = row.find("td")

//       const rowDataItem = {}

//       columns.each((columnIndex, column) => {
//         const columnName = columnMapping[columnIndex]
//         rowDataItem[columnName] = $(column).text().trim()
//       })

//       const symbol = rowDataItem["Symbol"] // Assuming "Symbol" is the key for the symbol
//       symbols.push(symbol)
//       combinedData[symbol] = {
//         liveMarketData: rowDataItem,
//         companyDetailsData: [],
//       }
//     })

//     // Fetch company details data for each symbol
//     const companyDetailsPromises = symbols.map(async (symbol) => {
//       const data = await fetchAndScrapeData(symbol)
//       combinedData[symbol].companyDetailsData = data
//     })

//     await Promise.all(companyDetailsPromises)

//     res.json(combinedData)
//   } catch (error) {
//     console.error("Error fetching the webpage:", error)
//     res.status(500).json({ error: "An error occurred while fetching data." })
//   }
// }

module.exports = {
  liveMarket,
  symbols,
  companyDetails,
}
