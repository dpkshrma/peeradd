# PeerAdd

Install peer dependencies without any fuss

```
npx peeradd <dependency@version> [options]
```

## Options
| Name | Option | Alias | Default Value |
| ---- | ------ | ----- | ------------- |
| Package Manager | `--use-yarn` | `-y` | `false` |
| Dev Dependency | `--dev` | `-d` | `false` |
| Help | `--help` | | | |

## Example
This was created out of frustration of installing peer dependencies manually for [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb). Now simplified:

```
npx peeradd eslint-config-airbnb@latest
```
