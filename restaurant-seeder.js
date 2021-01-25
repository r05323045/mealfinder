const fs = require('fs')
const axios = require('axios')
const key = 'AIzaSyAInMt_uuH0jJp7zTIbKumQpW3bXaJSliA'
const seedersData = []
const district = {
  "中正區": 1,
  "大同區": 2,
  "中山區": 3,
  "松山區": 4,
  "大安區": 5,
  "萬華區": 6,
  "信義區": 7,
  "士林區": 8,
  "北投區": 9,
  "內湖區": 10,
  "南港區": 11,
  "文山區": 12
}

//Get 60 restaurants and their place_id near Taipei using Place Search(Google Map API)
const query = 'restaurant+in+Taipei'
const searchResults = []
const place_ids = []
let next_page_token = ''

get1to20(query)

function get1to20(query) {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`)
    .then(function (response) {
      for (i of response.data.results) {
        searchResults.push(i)
        place_ids.push(i.place_id)
      }
      next_page_token = response.data.next_page_token
      setTimeout(() => {
        get21to40()
      }, 2000)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function get21to40() {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${next_page_token}&key=${key}`)
    .then(function (response) {
      for (i of response.data.results) {
        searchResults.push(i)
        place_ids.push(i.place_id)
      }
      next_page_token = response.data.next_page_token
      setTimeout(() => {
        get41to60()
      }, 2000)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function get41to60() {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${next_page_token}&key=${key}`)
    .then(function (response) {
      for (i of response.data.results) {
        searchResults.push(i)
        place_ids.push(i.place_id)
      }
      createSeeder()
    })
    .catch(function (error) {
      console.log(error)
    })
}


//Get restaurant details through place_id using Place Details(Google Map API)
function createSeeder() {
  for (let index = 0; index < place_ids.length; index++) {
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_ids[index]}&language=zh-TW&&key=${key}`)
      .then(function (response) {
        let addressData = ''
        for (let i = response.data.result.address_components.length - 5; i >= 0; i--) {
          addressData = addressData + response.data.result.address_components[i].short_name
        }

        if (response.data.result.opening_hours) {
          const seeder = {
            "id": index,
            "place_id": response.data.result.place_id,
            "name": response.data.result.name,
            "tel": response.data.result.formatted_phone_number,
            "pictures": response.data.result.photos,
            "business_hours": [{
              "periods": response.data.result.opening_hours.periods || null,
              "weekday_text": response.data.result.opening_hours.weekday_text
            }],
            // "day_off": "",
            "google_map_url": response.data.result.url,
            "coupon": true,
            "deposit": false,
            "rating": response.data.result.rating,
            "CategoryId": 1,
            "CityId": 1,
            "DistrictId": district[response.data.result.address_components[response.data.result.address_components.length - 4].short_name],
            "address": addressData,
            "coordinates": [{
              "lat": response.data.result.geometry.location.lat,
              "lng": response.data.result.geometry.location.lng
            }]
          }
          seedersData.push(seeder)
        }
        else { }
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        let data = JSON.stringify(seedersData, null, 2);

        fs.writeFile('restaurantSeeders.json', data, (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });

        console.log('This is after the write call');
      })
  }
}