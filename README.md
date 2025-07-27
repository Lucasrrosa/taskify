## Teste de seleção - Lucas Rodrigues Rosa

## Instruções para rodar o projeto

### Para executar a aplicação:
- Executar o arquivo docker-compose.yml presente na raiz do projeto
```
  docker compose -f docker-compose.yml up -d --build
```


### Para executar os testes E2E:

- executar a aplicação usando o arquivo docker-compose-test.yml presente na raiz do projeto:

```
  docker compose -f docker-compose-test.yml up -d --build
```

- abrir a pasta tests-e2e e rodar os testes

```
  cd tests-e2e
  yarn
  yarn test
```

- parar o docker-compose-test.yml utilizando a flag -v para limpar o banco
```
  docker compose -f docker-compose-test.yml down -v
```
