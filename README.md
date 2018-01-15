CryptoCompare API Nodes for Node-RED
====================================

![npm](https://img.shields.io/badge/node--red--contrib-npm-blue.svg)

<a target="blank" href="https://www.paypal.me/remkohdev"><img src="https://img.shields.io/badge/Donate-PayPal-blue.svg"/></a>

# Nodes

- CoinList
- TopPairs 
- HistoHour
- SocialStats

## CHANGELOG

### New in version 0.2.0

- SocialStats API
- HistoHour API
- Completed input validation of required and optional URL parameters

### New in version 0.1.1

- Update package.json with required and recommended properties: version, repository, etc

### New in version 0.1.0

- CoinList API
- TopPairs API

### CryptoCompare API Nodes for Node-RED

A collections of nodes to interact with the CryptoCompare API services in [CryptoCompare API](https://www.cryptocompare.com/api/).


### Requirements

To run the nodes on your localhost you must have Node-RED installed on your localhost. 

### Usage

```bash
$ git clone https://github.com/remkohdev/node-red-contrib-cryptocompare.git
$ cd node-red-contrib-cryptocompare
$ npm install
```

To install the node modules on your localhost, install it into your Node-RED runtime.

```bash
$ sudo npm link
$ cd ~/.node-red
$ npm link node-red-contrib-cryptocompare
```

Run node-red.

```bash
$ node-red
```

Open a browser and go to the address http://127.0.0.1:1880.


### Contributing

To contribute fork the [node-red-contrib-cryptocompare repository](https://github.com/remkohdev/node-red-contrib-cryptocompare.git) and submit pull requests. Issues are tracked in the [Projects](https://github.com/remkohdev/node-red-contrib-cryptocompare/projects/1) tab.


### Report Issues

Issues are tracked in the [Projects](https://github.com/remkohdev/node-red-contrib-cryptocompare/projects/1) tab.

### Copyright and License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
