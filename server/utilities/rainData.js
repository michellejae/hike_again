const fetch = require(`node-fetch`);

//const rainHourlyAPI = `https://api.weather.gov/products/0edf4c11-692f-494b-bfed-5f10ed0fbee6`
//const rainHourlyAPI = `https://tgftp.nws.noaa.gov/data/raw/sr/srhw70.phfo.rr5.hfo.txt`


module.exports = {
    getRainData
 
  };

async function getRainData() {
    try {
        const value = await fetch(rainHourlyAPI)
        console.log('fired rain API')
        const json = await value.json()
        const text = json.productText
       
        scrapeData(text)
    } catch (error) {
        console.log('ERR', error)
    }
}

function scrapeData (result) {
    result = result.split("\n").splice(53).splice(0,58).map(element => {
       element = element.replace(/:*:/g, "") //remove :
       element = element.replace(/[/]/g, "") // remove /
       element = element.replace(/[" "]+/g, " ") // remove all extra spacing between trail names and rain amount
       element = element.split(" ")
       console.log(element)
    })
    //console.log(result)
}
