# SystemWallet

This project is a full-stack implementation of a **Wallet System**. It includes a backend service for managing wallets and transactions, along with a frontend interface to interact with the system.

## 📌 Features

### Backend APIs

- **Setup Wallet** (`POST /wallet/setup`)
- **Get Wallet Details** (`GET /wallet/wallet/:id`)
- **Credit/Debit Transactions** (`POST /transaction/transact/:walletId`)
- **Fetch Wallet Transactions** (`GET /transaction/transactions?walletId=&skip=&limit=&skip=`)
- **Download Wallet Transactions** (`GET /transaction/downloadCSV/:walletId`)

### Frontend

- Initialize a wallet (with name and initial balance)
- Perform credit/debit transactions
- View wallet balance
- Paginated transaction history with sorting
- Export transaction history to CSV

---

## 🔧 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**

### Frontend
- **Angular**

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 22.x
- MongoDB (local or cloud)
- npm

---

## 📦 Installation

1. **Clone the repo**
    ```bash
    git clone https://github.com/YOUR_USERNAME/SystemWallet.git
    cd SystemWallet
    ```

2. **Backend Setup**
    ```bash
    npm install
    node index.js
    ```

3. **Frontend Setup**
    ```bash
    cd wallet-app
    npm install
    nd serve
    ```

4. Make sure to update environment variables as needed in `.env` files.
-SERVER_PORT
-MONGO_DB_CONNECTION_STRING
-MONGO_DB_NAME
---

## 📬 API Documentation

### 1. Setup Wallet

**POST** `/wallet/setup`

**Request Body:**
```json
{
    "name": "hello", // mandatory
    "balance": 13 // non-mandatory
}
```


**Response Body:**
```json
{
    "status": "success",
    "data": {
        "balance": 13,
        "name": "hello",
        "date": "2025-03-22T13:53:28.706Z",
        "_id": "67dec0d8c4ed076f458cad7d"
    }
}
```


### 2. Get Wallet Details

**GET** `/wallet/wallet/:WalletId`


**Response Body:**
```json
{
    "status": "success",
    "data": {
        "_id": "67dec0d8c4ed076f458cad7d",
        "balance": 13,
        "name": "hello",
        "date": "2025-03-22T13:53:28.706Z"
    }
}
```

### 3. Credit/Debit Transactions

**POST** `/transaction/transact/:walletId`

**Request Body:**
```json
{
    "isCredit": true, // mandatory
    "amount": 80, // mandatory
    "description": "Travel" // non-mandatory
}
```

**Response Body:**
```json
{
    "status": "success",
    "data": {
        "balance": 93,
        "transaction_id": "67dec2dec4ed076f458cad7e"
    }
}
```

### 4. Fetch Wallet Transactions

**GET** `/transaction/transactions?walletId=&skip=&limit=&skip=`

**Request Body:**
```query params
walletId=67dec0d8c4ed076f458cad7d&skip=0&limit=10&sort={%22date%22:-1}
```

**Response Body:**
```json
{
    "status": "success",
    "data": {
        "transactionList": [
            {
                "_id": "67dec42ac4ed076f458cad7f",
                "wallet_id": "67dec0d8c4ed076f458cad7d",
                "amount": 10.324,
                "balance": 82.676,
                "description": "food",
                "date": "2025-03-22T14:07:38.285Z",
                "type": "DEBIT"
            },
            {
                "_id": "67dec2dec4ed076f458cad7e",
                "wallet_id": "67dec0d8c4ed076f458cad7d",
                "amount": 80,
                "balance": 93,
                "description": "Travel",
                "date": "2025-03-22T14:02:06.381Z",
                "type": "CREDIT"
            }
        ],
        "count": 2
    }
}
```

### 5. Download Wallet Transactions

**GET** `/transaction/downloadCSV/:walletId`

**Response Body:**
downloads the csv




🖥️ UI Overview

Page 1: Setup wallet
![Wallet Initization Page](assets/Wallet%20Page.png)



Page 2: Show balance, make transactions, transaction history (sortable, paginated), export to CSV
![Wallet Transaction list Page](assets/Transaction%20Record%20Page.png)


🌐 Deployment
API Hosted at: https://systemwallet.onrender.com

Frontend Hosted at: https://rococo-dodol-e64971.netlify.app


🔒 GitHub Access
Repository is private. Collaborator added: dev-highlevel


⚠️ Notes
All amounts support up to 4 decimal points.

Wallet and transaction IDs are system-generated.

Floating point operations are precision-handled.