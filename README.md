# Live Crypto, Weather, and News Dashboard

This project fetches **live cryptocurrency prices, weather updates, and news articles** from APIs and displays them in the frontend. It is built using modern web technologies.




## Tech Stack Used
- **Frontend:** React.js, Tailwind CSS, Bootstrap  
- **State Management:** useState, useEffect (React Hooks)  
- **API Handling:** Fetch API, WebSockets (for live crypto updates)  
- **Notifications:** react-toastify  

---

## Features
✅ Live cryptocurrency prices with WebSocket updates.  
✅ Weather information of three cities.  
✅ Latest news articles from a news API.  
✅ Users can "favorite" a cryptocurrency to highlight it.  
✅ Toast notifications for significant price changes.  

---

## Challenges Faced & Errors Encountered

### 1. Handling API Requests & Responses
- **Problem:** Some APIs required API keys, and requests would fail without authentication.  
- **Solution:** Read the API documentation carefully and add API keys where needed.  

- **Problem:** Some API responses had different data formats, making parsing difficult.  
- **Solution:** Printed responses (`console.log(response)`) to understand the structure before using them.  

### 2. WebSocket Connection for Live Crypto Prices
- **Problem:** The WebSocket would sometimes disconnect unexpectedly.  
- **Solution:** Implemented a **reconnect mechanism** to handle disconnections.  

- **Problem:** Price updates were too frequent, leading to performance issues.  
- **Solution:** Used **state updates carefully** to minimize unnecessary renders.  

### 3. Managing State Efficiently
- **Problem:** Updating state incorrectly caused unnecessary re-renders.  
- **Solution:** Used functional updates (`setState((prev) => {...})`) to update state correctly.  

- **Problem:** Storing favorites in state didn’t persist after page refresh.  
- **Solution:** Used **localStorage** to store and retrieve favorite cryptocurrencies.  

### 4. UI & Styling Issues
- **Problem:** The "Fetch News" button wasn’t centered properly.  
- **Solution:** Used Tailwind's `flex justify-center` to center it correctly.  

- **Problem:** The toast messages didn’t show correctly in some cases.  
- **Solution:** Ensured `<ToastContainer />` was included only once in the app.  

### 5. Running the Project on Different Machines
- **Problem:** Some users faced **CORS errors** while fetching APIs.  
- **Solution:** Added a **CORS proxy** or used **server-side fetching** when needed.  

---

## How to Run the Project

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Development Server
```sh
npm run dev
```
or if using `create-react-app`:  
```sh
npm start
```

### 4. Set Up API Keys (If Required)
Some APIs require API keys. If needed, create a `.env` file and add:  
```
REACT_APP_NEWS_API_KEY=your-api-key
REACT_APP_WEATHER_API_KEY=your-api-key
```
Then restart the app.

### 5. Open in Browser
Once the server is running, open:  
```
http://localhost:3000
```

---

## Future Improvements
🔹 Add a search feature for cryptocurrencies.  
🔹 Improve UI with better animations.  
🔹 Implement a dark mode option.  

---


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
