## Plug and Play repositories

The architecture needs to be :

- independent of framework
- testable
- independent of UI
- independent of DB
- independent of external agency

default framework used are (expressjs, redis, & firestore)

controller : introducting API layer to business logic
models : the business logic
repository : access the data store
router : separate routing framework from the code

### How To Run

```
npm i && npm run dev
```

### Future Feature

- to also work with 'protocol' such as graphQl, gRPC
