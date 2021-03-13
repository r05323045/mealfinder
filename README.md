# MealFinder

<div align="center">
  <img width="80%" align="center" src="https://i.imgur.com/YORe6wH.png">
</div>

<br>
<br>
<p align="center">
  <a href="https://mealfinder2021.herokuapp.com">Start the journey of foodie</a>
</p>

<br>

## Table of contents
- [User Interface](#User-Interface)
- [About MealFinder](#About-MealFinder)
- [Features](#Features)
- [RESTful APIs](#RESTful-APIs)
- [Run the server locally](#Run-the-server-locally)
- [Run the app locally](#Run-the-app-locally)
- [Upcoming features](#Upcoming-features)
- [Team members](#Team-Members)
## User Interface

### Search by district, category, and price

<p align="center">
  <img width="80%" align="center" src="./demo/Search by district, category, and price.gif">
</p>

### Make a reservation

<p align="center">
  <img width="80%" align="center" src="./demo/Make a reservation.gif">
</p>

### Pay for restaurant coupon

<p align="center">
  <img width="80%" align="center" src="./demo/Pay for restaurant coupon.gif">
</p>


## About MealFinder
MealFinder is an online restaurant reservation platform that can help you explore restaurants and make a quick reservation. Our vision is to make people find suitable meals easier, sooner, and smarter. Since 2021, MealFinder has expanded to over 2,000 restaurants in Taipei, and the number of members is fast growing. With MealFinder, find the meal you want is easier. No idea what's for dinner? You got the right place!

### Third-party libraries that are used in this project

**Front End**
- Using [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) for displaying the map with markers and embed the map into the restaurant page
- Using [vue-google-maps](https://github.com/xkjyeah/vue-google-maps)  to build a customizable and data-driven map
- Using [vue2-gmap-custom-marker](https://github.com/eregnier/vue2-gmap-custom-marker) to customize the markers of the map
- Using [Chart.js](https://www.chartjs.org/) to visualize the price distribution of restaurants
- Using [vue-slider-component](https://github.com/NightCatSama/vue-slider-component) to create the feature of the dynamic slider
- Using [VeeValidate](https://vee-validate.logaretm.com/v3) for form validation to improve the experience of filling the form
- Using [Swiper](https://swiperjs.com/) to build flexible carousel and slider with responsive and mobile touchable
- Using [vue2-datepicker](https://github.com/mengxiong10/vue2-datepicker) to customize the interface and feature of the date picker
- Using [sweetalert2](https://github.com/sweetalert2/sweetalert2) to build responsive and customizable and popup boxes
- Using [Vuex](https://github.com/vuejs/vuex) for state management in Vue.js
- Using [moment.js](https://github.com/moment/moment/) for parsing time and customize the format of datetime
- Using [vue-clipboard2](https://github.com/Inndy/vue-clipboard2) to create feature of clipboard
- Using [vue-loading-overlay](https://github.com/ankurk91/vue-loading-overlay) to customize loading animation

**Back End**
- Using [bcrypt](https://www.npmjs.com/package/bcrypt) to hash password with a salt
- Using [body-parser](https://www.npmjs.com/package/body-parser) to extract the information from incoming requests such as sign-up form at frontend
- Using [cors](https://www.npmjs.com/package/cors) to serve third-party origins
- Using [express](https://expressjs.com) as web applications framework for Node.js
- Using [imgur-node-api](https://www.npmjs.com/package/imgur-node-api) to upload images to imgur, mostly for user's profile piture and photo of restaurants
- Using [method-override](https://www.npmjs.com/package/method-override) to support DELETE and PUT requests
- Using [moment.js](https://www.npmjs.com/package/moment) to customize date and time format in confirmation email
- Using [NewebPay](https://www.newebpay.com/) as a third-party payment API for user to pay with credit card online
- Using [nodemailer](https://www.npmjs.com/package/nodemailer) to send an confirmation email after user's make an reservation or transcation is completed
- Using [PostGIS](https://postgis.net/) to calculate the distances of the restaurant and center of the map
- Using [passport-facebook](http://www.passportjs.org/packages/passport-facebook/) with Facebook Strategy to authenticate users with their Facebook account, and give access to user's profile info for signing up
- Using [passport-google-oauth2](http://www.passportjs.org/packages/passport-google-oauth2/) with Google Strategy to create and authenticate user account with google account
- Using [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) to add a token-based authentication to RESTful API

**Data Engineering (Python)**
- Using [request](https://requests.readthedocs.io/en/master/index.html) for sending HTTP requests to [ifoodie](https://ifoodie.tw/), which is the target of data scraping
- Using [beautiful soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) to creates a parse tree for parsed pages that can be used to extract data from HTML
- Using [selenium](https://www.selenium.dev/) to simulate the user behavior  such as click and scroll at webdriver for extracting more data
- Using [pandas](https://pandas.pydata.org/) and [numpy](https://numpy.org/)  for handling and cleaning up data

## Features
### Visitor
As a visitor, you can...
1. Browse and search restaurants by the price range, cuisine type, and location
2. Check out the detail of restaurants and their available time
3. Browse plenty of choices of restaurant coupons
4. Learn more about the platform
5. Sign up for a MealFinder account to start the journey of foodie


### MealFinder Member
As a MealFinder member, you can...
1. Add the restaurants to favorites, help you to browse them easier and faster
2. Book a table through MealFinder ensures that our member enjoy the experience of the restaurant of choice
3. Comment and rate after completion of the meal
4. Add the coupons to the cart, help you to create a temporary list of desired items
5. Buy the restaurant coupon with a credit card, these coupons can help you to save your money, here is a dummy credit card you can use for testing

<div style="margin-left: 40px; text-align: center;">

|  Credit card number | expiration date  | security code |
|  ----  | ----  | ---- |
| 4000-2211-1111-1111  | Any date | Any three number |

</div>

6.  Below is a user account you can use

<div style="margin-left: 40px; text-align: center;">

|  email   | password  |
|  ----  | ----  |
| user1@example.com  | 12345678 |

</div>

<div style="margin-left: 40px;">

Since you will receive an email including reservation information after reserving successfully, we recommend you sign up with your real email. Certainly, sign up with Google or Facebook account is also available

</div>


## RESTful APIs
If you are interested in the Backend of MealFinder, the following is our RESTful APIs:

```text
api/
└── auth/
│   ├── google
│   ├── facebook
│   ├── google/callback
│   ├── facebook/callback
└── user/
│   ├── signup
│   ├── signin
│   ├── getProfile
│   ├── putProfile
│   ├── putPreferedCategory
│   ├── getFavorites
│   ├── addFavorite
│   ├── deleteFavorite
│   ├── likeComment
│   ├── disLikeComment
│   ├── likeComment
│   ├── getCurrentUser
└── cart/
│   ├── getCart
│   ├── postCart
│   ├── addCartItem
│   ├── reduceCartItem
│   ├── deleteCartItem
│   ├── getOrders
│   ├── putProfile
│   ├── getOrder
│   ├── getOrders
│   ├── postTradeInfo
│   ├── getPaymentInfo
│   ├── spgatewayCallback
└── coupon/
│   ├── getCoupon
│   ├── getCoupons
└── restaurant/
│   ├── getRestaurant
│   ├── getUserRestaurant
│   ├── getRestaurants
│   ├── getUserRestaurants
│   ├── getNearByRestaurants
│   ├── getUserNearByRestaurants
│   ├── getAllPrices
│   ├── getCategories
│   ├── getDistricts
└── comment/
│   ├── getComments
│   ├── addComment
│   ├── updateComment
│   ├── deleteComment
└── reservation/
    ├── addReservation
    ├── deleteReservation
    ├── getReservation
    └── getReservations
```


## Run the server locally
The following instruction will walk you through the installation and settings needed to run for backend-server on your local device.
### Prerequisites
- [npm](https://www.npmjs.com/get-npm)
- [Node.js v10.16.0](https://nodejs.org/en/download/)
- [MySQL v8.0.16](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench v8.0.16](https://dev.mysql.com/downloads/workbench/)
### Setup Application
**1. Clone this repository to your local machine**
```
$ git clone https://github.com/r05323045/mealfinder.git
```

**2. Setup Database**
> Create database via MySQL Workbench
```
drop database if exists restaurant_reservation;
create database restaurant_reservation;
```

**3. Install backend packages via npm**
```
$ cd mealfinder
$ npm install
```

**4. Create .env file at root**
```
$ touch .env
```
**5. Sign up for the following services**
- [Google Cloud Platform](https://console.developers.google.com/?hl=zh-tw)：create  two sets of OAuth 2.0 credentials for web applications in order to authorize requests from nodemailer and log-in-with-google feature. 
- [Facebook for Developers](https://developers.facebook.com/)：create a new App with Facebook Login feature, an App ID and Secret Key will be generated automatically.
- [Gmail Account](https://www.google.com/gmail/)：confirmation emaill will be sent through this account.
- [Imgur API](https://apidocs.imgur.com/): create an new project in order to get the client id.

**6. Store API Key in .env file and save**
```
JWT_SECRET=SKIP
IMGUR_CLIENT_ID=SKIP
Google_Map_API_KEY=SKIP

//login with Facebook feature
FACEBOOK_APP_ID=SKIP
FACEBOOK_APP_SECRET=SKIP

//login with Google feature
GOOGLE_CLIENT_ID=SKIP  
GOOGLE_CLIENT_SECRET=SKIP 

//nodemailer feature
GMAIL_ACCOUNT=SKIP 
GMAILAPI_CLIENT_ID=SKIP 
GMAILAPI_CLIENT_SECRET=SKIP 
OAUTH_REFRESH_TOKEN=SKIP 
OAUTH_ACCESS_TOKEN=SKIP 

// default URL will be http:localhost:3000
BASE_URL=SKIP
```
**7. Edit password in config.json file**
> /server/config/config.json
```

"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "mealfinder",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```
**8. Run migration, Add Seeder**
> /server
```
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```
**9. Activate server**
> /server
```
$ npm run start
```
**10. Find the message for successful activation**
```
> Express is listening on localhost:3000!
```
You may start using the api by accessing: http://localhost:3000/api

## Run the app locally

**1. Install frontend packages via npm**
```
$ cd mealfinder/client
$ npm install
```

**2. Enable [Google Map API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?q=google%20map&id=fd73ab50-9916-4cde-a0f6-dc8be0a0d425&project=restaurant-seeder) and get an API key**

**3. Create .env.local file**
> /client
```
$ touch .env
```

**4. Store API Key in .env file**
```
VUE_APP_GOOGLE_MAP_API_KEY=<Your_Google_Map_API_KEY>
```

**5. Compiles and hot-reloads for development**
```
npm run serve
```

**6. Compiles and minifies for production**
```
npm run build
```
> In this step, you have to check your vue.config.js file and finish [production deployment](https://vuejs.org/v2/guide/deployment.html) setting first
* * *

## Upcoming features
- The platform for restaurant owners using, help them to manage the booking status
- Crypt and transform the reservation result into QRcode, so that restaurant owners can scan it for verifying reservation, and also, MealFinder can handle the no-show situation
- The electric coupons that can be saved in the member's account

## Team Members
(*In alphabetical order)
### [Ahno Chen](https://github.com/ahnochen1029)
- Back-end development
    - Build up RESTful CRUD API - users, carts, and orders
    - Collaborate with the team members to connect to third party APIs
- Collaborate with the team members to build better user stories, wireframe, ERD model, and RESTful API design
- Code review for the team members
### [Jim Lin](https://github.com/r05323045)
- Front-end development
    - All features development (e.g. Google Map display and search, different kinds of filters for restaurants, ...)
    - All pages design
- Back-end development
    - Build up RESTful CRUD API - restaurants, carts, orders, users, and coupons
    - Refine all RESTful CRUD API for front-end usage
    - Collaborate with the team members to create seeders and deploy the app
    - Collaborate with the team members to connect to third party APIs
- Data Engineering
    - Scrape data from [ifoodie](https://ifoodie.tw/) with python libraries
    - Clean up and process data for database seeders usage
- UX and UI design
- Collaborate with the team members to build better user stories, wireframe, ERD model, and RESTful API design
- Code review for the team members
### [Yating Yang](https://github.com/iamy8000)
- Back-end development
    - Build up RESTful CRUD API - restaurants, comments, coupons, reservations, and admins
    - Collaborate with the team members to set up database, create seeders and deploy the app
    - Collaborate with the team members to connect to third party APIs
- Project creation and management
- Collaborate with the team members to build better user stories, wireframe, ERD model, and RESTful API design
- Code review for the team members

