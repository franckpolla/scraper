const cheerio = require("cheerio");
const axios = require("axios");
const URL =
  "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=557A9679A89D48D3A3AE4B85F789966A";

const Product_data = [];
async function getProduct(url) {
  try {
    const response = await axios.get(url);
    // this  will return HTML content of the page, so we can use it with Cheerio
    const $ = cheerio.load(response.data);
    const Product = $("tr");
    Product.each(function () {
      (id = $(this).find("p").text()),
        (name = $(this).find("h4").text()),
        (price = $(this).find("strong").text()),
        (description = ""),
        (imgUrl = $(this).find("img").attr("src")),
        (category = "Ring lights");
      Product_data.push({ id, name, price, description, imgUrl, category });
    });
    console.log(Product_data);
  } catch (error) {
    console.error(error.message);
  }
}

getProduct(URL);
