# Crypto Backend

## API's

#### 1. Fetch crypto list of top 100 cryptos <br />
It returns top 100 crypto list with supported currencies in descending order <br />
Route : ```GET : http://localhost:5000/app/crypto``` <br />

<br />

#### 2. Fetch crypto price based on selected crypto, currency and amount<br />
It returns the price of amount of crypto and currency selected  <br />
Route : ```POST : http://localhost:5000/app/crypto``` <br />
Body : ```{
    "sourceCrypto": "bitcoin",
    "amount": 1,
    "targetCurrency": "inr"
}``` <br />

<br />

## Setup
- Clone the repository
- Navigate to the directory in command prompt / terminal
- Install NPM packages `npm install`
- Run to start your project `npm start`

### Tech stack
API's: `Node js`<br />
Server: `Express`<br />
Crypto Service: `Coingecko`<br />


