# PeerAdd

Install peer dependencies without any fuss

```
npx peeradd <dependency@version> [options]
```

## Options
- **Package Manager**: By default `peeradd` uses npm to install the dependencies. You can use `--use-yarn` or `-y` flag to use [yarn](https://github.com/yarnpkg/yarn/) instead

## Example
This was created out of frustration of installing peer dependencies manually for [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb). Now simplified:

```
npx peeradd eslint-config-airbnb@latest
```
