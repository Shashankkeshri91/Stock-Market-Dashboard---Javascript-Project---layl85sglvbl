function fetchAPIExample() {
    let promiseObject = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=MPC52ZYBPWS0HSTW");
    promiseObject
      .then((response) => response.json())
      .then((response) => console.log("response -> ", response));
  }
  fetchAPIExample();
