# PeerAdd

Install peer dependencies without any fuss

```
npx peeradd <dependency@version> [options]
```

## Options
| Name | Option | Alias | Default Value | Description |
| ---- | ------ | ----- | ------------- | ----------- |
| Package Manager | `--use-yarn` | `-y` | `false` | By default `peeradd` will use `npm` as packge manager to install dependencies |
| Dev Dependency | `--dev` | `-d` | `false` | Install dependencies as dev dependencies |
| Help | `--help` | | | Usage Guide |

## Example
This was created out of frustration of installing peer dependencies manually for [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb). Now simplified:

```
npx peeradd eslint-config-airbnb@latest
```
