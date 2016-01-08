# Nefit Easy™ commands

High-level command implementation for Nefit Easy™.

## Please be considerate!

Use this library in moderation: don't flood the backend with new connections made every X seconds. Instead, if you want to poll the backend for data, create a connection once and reuse it for each command. In the end, it's your own responsibility to not get blocked because of excessive (ab)use.

## Installation

```
$ npm i nefit-easy-commands
```

## API

#### Constructor

```
const NefitEasyClient = require('nefit-easy-commands');
const client          = NefitEasyClient({
  serialNumber   : NEFIT_SERIAL_NUMBER,
  accessKey      : NEFIT_ACCESS_KEY,
  password       : NEFIT_PASSWORD,
[ requestTimeout : Number ]
});
```

#### Current status

```
client.status() : Promise
```

#### Current pressure

```
client.pressure() : Promise
```

#### Known location for device

```
client.location() : Promise
```

#### Program data

```
client.program() : Promise
```

#### Set temperature

```
client.setTemperature(value : Number) : Promise
```
