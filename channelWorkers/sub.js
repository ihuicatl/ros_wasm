let queuePort;
let onMessageFromQueue = function(event) {
    console.log("[SUB] Received from queue: " + event.data + ":END");

    //To send something back to worker 1
    // queuePort.postMessage("[W2] I got your message\n");
};

self.onmessage = function(event) {
    switch( event.data.command )
    {
        // Setup connection to worker 1
        case "connect":
            queuePort = event.ports[0];
            queuePort.onmessage = onMessageFromQueue;
            break;

        // Forward messages to worker 1
        case "subscribe":
            // Forward messages to worker 1
            queuePort.postMessage( event.data.message );
            break;

        //handle other messages from main
        default:
            console.log( event.data );
    }
};
