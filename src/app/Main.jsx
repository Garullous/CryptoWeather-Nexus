"use client"
// import LiveCryptoPrices from "./context/LivePriceProvider.jsx";
import React from "react";
import WeatherApp from "./context/WeatherApp.jsx";
import News from "./context/News.jsx";
import LiveCryptoPrices from "./context/LivePriceProvider.jsx";
//main file

function Main() {
  return (
    <>
        <div className="main">
          <div className="row">
            {/* Section 1 */}
            <div className="fr-col grid grid-cols-2">
              <div className="1col col-span-1">
                  <LiveCryptoPrices/>
              </div>
              <div className="2col col-span-1">
                <WeatherApp/>

              </div>
            </div>
            {/* Section 2 */}
            <News/>
          </div>
        </div>
    </>
  )
}

export default Main