const webSocket = require('ws');

const socketServer = new webSocket.Server({ port: 8080 });

let orders = 
    [ 
        { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"}, 
        { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"},
        { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"}, 
        { "AppOrderID": 1111075076, "price": 3, "triggerPrice": 5, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANC E"}, 
        { "AppOrderID": 1111075076, "price": 3, "triggerPrice": 5, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANC E"},  
        { "AppOrderID": 1111075077, "price": 4, "triggerPrice": 6, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGen eratedDateTimeAPI": "23-07-2024 10:16:19", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "TATA"},  
        { "AppOrderID": 1111075078, "price": 5, "triggerPrice": 7, "priceType": "LMT", "productType": "I", "status": "cancelled", "CumulativeQuantity": 0, "LeavesQuantity": 1, "Order GeneratedDateTimeAPI": "23-07-2024 10:16:20", "transactio n": "sell", "AlgoID": "", "exchange": "NSE", "symbol": "BAJ AJ"}, 
        { "AppOrderID": 1111075079, "price": 6, "triggerPrice": 8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO"},  
        { "AppOrderID": 1111075079, "price": 6, "triggerPrice": 8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO"}, 
        { "AppOrderID": 1111075080, "price": 7, "triggerPrice": 9, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC"}       
];

const uniqueSymbols = new Set();

function sendUpdates(ws, updates) {
    updates.forEach((order, index) => {
        setTimeout(() => {
            if (ws.readyState === webSocket.OPEN) {
                ws.send(JSON.stringify(order));
                console.log(`Order sent: ${JSON.stringify(order)} at ${new Date().toISOString()}`);
            }
        }, index * 100); // Send each update with a delay of 100ms within the specified time frame
    });
}

socketServer.on('connection', (ws) => {
    console.log('Client connected');
    
    const filteredOrders = [];
    const uniqueOrders = new Set();

    orders.forEach(order => {
        if (!uniqueOrders.has(order.AppOrderID)) {
            uniqueOrders.add(order.AppOrderID);
            filteredOrders.push(order);
            uniqueSymbols.add(order.symbol);
        }
    });

    // console.log(`Unique symbols: ${Array.from(uniqueSymbols).join(', ')}`);

    setTimeout(() => sendUpdates(ws, filteredOrders.slice(0, 10)), 0);
    setTimeout(() => sendUpdates(ws, filteredOrders.slice(10, 30)), 2000);
    setTimeout(() => sendUpdates(ws, filteredOrders.slice(30, 70)), 5000);
    setTimeout(() => sendUpdates(ws, filteredOrders.slice(70, 100)), 8000);
});