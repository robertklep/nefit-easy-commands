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

`value` can be prefixed with a specifier to conditionally set the temperature if it doesn't match the specifier.

Valid specifiers:
* `> VALUE` : only set new temperature (to VALUE) if it's larger then the currently set temperature;
* `< VALUE` : only set new temperature (to VALUE) if it's smaller than the currently set temperature;
* `+ VALUE` : increase the currently set temperature by "VALUE" (based on current setpoint)
* `- VALUE` : decrease the currently set temperature by "VALUE" (based on current setpoint)
* `t+ VALUE` : increase the currently set temperature by "VALUE" (based on current measured temperature)
* `t- VALUE` : decrease the currently set temperature by "VALUE" (based on current measured temperature)


Examples:
* _"Set the thermostat to 21°C, but only if it's not already set higher than that."_

```
client.setTemperature('> 21').then(...)
```

* _"Increase the currently set temperature by 2.5°C"_

```
client.setTemperature('+ 2.5').then(...)
```
