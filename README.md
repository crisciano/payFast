# payFast
Gateway de pagamento utilizando nodejs

## Rodando o projeto e a api
```
    npm start
```

## bd
sqlite3

## Project
Recebe a logica principal.
Roda na porta 3000

## API

Recebe dados do cartão.
Roda na porta 3001

## Memcached 

Iniciando o memcached for windows,
ir até a pasta util/memcached e no CMD
utilizar o comando.

```
    memcached.exe inicio --vv
```

Utiliza o parametro --vv 
para ter a saida verbosa de segundo nivel.

## Kill process cluter teste
```
    TaskKill /PID <number-process> /F
```
