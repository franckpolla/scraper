// const cheerio = require("cheerio");
// const axios = require("axios");
// const URL =
//   "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=557A9679A89D48D3A3AE4B85F789966A";

// const Product_data = [];
// async function getProduct(url) {
//   try {
//     const response = await axios.get(url);
//     // this  will return HTML content of the page, so we can use it with Cheerio
//     const $ = cheerio.load(response.data);
//     const Product = $("tr");
//     Product.each(function () {
//       (id = $(this).find("p").text()),
//         (name = $(this).find("h4").text()),
//         (price = $(this).find("strong").text()),
//         (description = ""),
//         (imgUrl = $(this).find("img").attr("src")),
//         (category = "Ring lights");
//       Product_data.push({ id, name, price, description, imgUrl, category });
//     });
//     console.log(Product_data);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getProduct(URL);

// ---------------------------this is another implementation the one up there is another one  ---------------

const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const productDef = [];
const productLinks = [
  {
    name: "product1",
    address: "https://bzmhsp.page.link/S2XBe",
    category: " Camera",
  },
  {
    name: "product2",
    address: "https://bzmhsp.page.link/z9BSW",
    category: "SMART WATCHES",
  },
  {
    name: "poduct3",
    address: "https://bzmhsp.page.link/F5vZU",
    category: "IN-VEHICLE ACCESSORY",
  },
  {
    name: "poduct4",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=A324933E6AF44D91B1BFB9896831E646",
    category: "COMPUTER ACCESSORIES",
  },
  {
    name: "poduct5",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=25DB719E787A46F781F8B077788DBEE3",
    category: "BLUETOOTH SPEAKERS",
  },
  {
    name: "poduct6",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=8C68090249C54918B665D06FFB110C5E",
    category: "CAR CHARGER AND MODULATOR",
  },
  {
    name: "poduct7",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=0AB0A41399254B0AAE5A86226A596BC8",
    category: "REPRODUCER",
  },
  {
    name: "poduct8",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=1B434312A2974274A405FCC3E875BA92",
    category: "Cables",
  },
  {
    name: "poduct9",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=BBE4012DD5E948AFB7C1C42E8EBCB35C",
    category: "HEADPHONES",
  },
  {
    name: "poduct10",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=E1FD3F20C47441759B227C3BEE3DDF9D",
    category: "PLAYER SETS",
  },
  {
    name: "poduct11",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=23264E1A600147F6A6A355ECAC5827FF",
    category: "POWERBANK",
  },
  {
    name: "poduct12",
    address:
      "https://bizimhesap.com/web/ngn/ext/catalogdisplay?rc=1&guid=557A9679A89D48D3A3AE4B85F789966A",
    category: "RING LIGHTS",
  },
];

const extractProductsDetails = (tr, category) => {
  const name = tr.find("h4").text();
  const imgUrl = tr.find("img").attr("src");
  const price = tr.find("strong").text();
  const id = tr.find("p:first").text();
  const description = tr.find("p:eq(1)").text();

  productDef.push({
    id,
    name,
    price,
    description,
    imgUrl,
    category: category,
  });
};

const fetchProducts = async (productLink) => {
  try {
    const response = await axios.get(productLink.address);
    const html = response.data;
    const $ = cheerio.load(html);

    $("tbody", html).each(function () {
      const tbodyElement = $(this);
      extractProductsDetails(tbodyElement, productLink.category);
    });
  } catch (error) {
    console.error(
      `Error fetching articles for ${productLink.name}: ${error.message}`
    );
  }
};

const fetchAllProducts = async () => {
  for (const productLink of productLinks) {
    await fetchProducts(productLink);
  }
};

app.get("/", (req, res) => {
  res.json(
    "Welcome to my Crypto News API\n\nGo to \n /news to see news articles \n"
  );
});

app.get("/products", async (req, res) => {
  await fetchAllProducts();
  res.json(productDef);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
