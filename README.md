# Nefit Easy™ commands

High-level command implementation for Nefit Easy™.

## Installation

```
$ npm i nefit-easy-commands
```

## API

#### Constructor

Documented [here](https://github.com/robertklep/nefit-easy-core#constructor).

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
