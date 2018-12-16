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
const NefitEasyCommands = require('nefit-easy-commands');
const client            = NefitEasyCommands({
  serialNumber   : NEFIT_SERIAL_NUMBER,
  accessKey      : NEFIT_ACCESS_KEY,
  password       : NEFIT_PASSWORD,
[ requestTimeout : Number ]
});
```

#### Current status

```
client.status([skipOutdoorTemperature]) : Promise
```

If `skipOutdoorTemperature` is `true`, the client won't make an extra request to retrieve the current outdoor temperature.

#### Current pressure

```
client.pressure() : Promise
```

#### Hot water supply state

```
client.hotWaterSupply() : Promise
```

#### Known location for device

```
client.location() : Promise
```

#### Program data

```
client.program() : Promise
```

#### User mode

```
client.userMode() : Promise
```

#### Set hot water supply state

```
client.setHotWaterSupply(value : String) : Promise
```

`value` should be one of `on`/`off`.

#### Set user mode

```
client.setUserMode(value : String) : Promise
```

`value` should be one of `manual`/`clock`.

#### Set temperature

```
client.setTemperature(value : [Number|String]) : Promise
```

`value` can be prefixed with a specifier to add a bit of logic to changing the setpoint.

The specifier can contain a base for relative changes:
* `setpoint` : this is the current target temperature;
* `in house temp` : this is the current measured temperature;

Valid specifiers:
* `> VALUE` : only change setpoint to "VALUE" if it's larger than the current setpoint;
* `< VALUE` : only change setpoint to "VALUE" if it's smaller than the current setpoint;
* `setpoint + VALUE` : increase the setpoint by "VALUE"
* `setpoint - VALUE` : decrease the setpoint by "VALUE"
* `in house temp + VALUE` : change the setpoint to in house temperature + "VALUE" 
* `in house temp - VALUE` : change the setpoint to in house temperature - "VALUE" 

Examples:
* _"Set the thermostat to 21°C, but only if it's not already set higher than that."_

```
client.setTemperature('> 21').then(...)
```

* _"Increase the setpoint by 2.5°C"_

```
client.setTemperature('setpoint + 2.5').then(...)
```

* _"Set the setpoint to the current in house temperature and add 2.5°C"_

```
client.setTemperature('in house temp + 2.5').then(...)
```
