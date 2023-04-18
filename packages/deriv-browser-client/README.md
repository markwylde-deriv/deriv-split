# Deriv Browser API

The Deriv Browser API is a JavaScript library that facilitates interaction with the Deriv platform through WebSockets. This API allows you to send requests, cache data, and subscribe to real-time updates from the platform, making it easier to integrate the Deriv platform into your web applications. It also provides a convenient React hook for developers who prefer using React in their projects.

## Installation

To install the Deriv Browser API, use the following command:

```
npm install --save @deriv/browser-api
```

## Usage

### Subscribing
You can call a command, cache and subscribe to future calls using the `subscribe` function directly.

When calling api commands you need to pass the following arguments:

- message: this is an object that is requested to the websocket server
- filter: this is called when the websocket responds and will trigger your callback when satisfied
- callback: this is the function to call when a filter picks up a message

```javascript
import Deriv from '@deriv/browser-api';

const appId = 1089;
const deriv = Deriv('wss://ws.binaryws.com/websockets/v3?app_id=${appId}');

const unsubscribe = deriv.subscribe(
  { authorize: 'your-token-goes-here' },
  response => response.authorize === '<not shown>',
  authorize => {

  }
);
```

### Hooks
Alternatively, you can use a React hook using the `useDerivAPI` function.

When creating the hook you need to pass the following arguments:

- message: this is an object that is requested to the websocket server
- filter: this is called when the websocket responds and will trigger your callback when satisfied
- callback: this is the function to call when a filter picks up a message
- dependencies: an array of variables that when changed (when all are truthy) will trigger the message to be sent

```javascript
import useDerivAPI from '@deriv/browser-api/hooks/useDerivAPI';

const apiToken = 'your-token-goes-here';
const authorize = useDerivAPI(
  { authorize: apiToken },
  {
    filter: response => response.authorize === '<not shown>'
  },
  [apiToken]
);

const settings = useDerivAPI(
  { get_settings: 1 },
  []
);

const accountId = authorize?.loginid;
const balance = useDerivAPI(
  {
    account: accountId,
    balance: 1,
    subscribe: 1
  },
  [accountId]
);
```
