const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

const receivedUpdates = new Set();

let lastUpdateTimestamp = 0;
let updateBuffer = [];

function handleUpdate(order) {
    if (receivedUpdates.has(order.AppOrderID)) {
        console.log(`Duplicate order ignored: ${JSON.stringify(order)}`);
        return;
    }

    receivedUpdates.add(order.AppOrderID);

    if (order.status === 'complete') {
        console.log(`Placing order: ${JSON.stringify(order)}`);
    } else if (order.status === 'open') {
        console.log(`Modifying order: ${JSON.stringify(order)}`);
    } else if (order.status === 'cancelled') {
        console.log(`Cancelling order: ${JSON.stringify(order)}`);
    }

    if (Date.now() - lastUpdateTimestamp < 1000) {
        updateBuffer.push(order);
    } else {
        if (updateBuffer.length > 0) {
            console.log(`Aggregated update: ${JSON.stringify(updateBuffer)}`);
            updateBuffer = [];
        }
        console.log(`Update sent: ${JSON.stringify(order)}`);
        lastUpdateTimestamp = Date.now();
    }
}

ws.on('message', (message) => {
    const order = JSON.parse(message);
    handleUpdate(order);
});
