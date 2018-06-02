# Graphql Subscription server

Scalable GraphQL server with MongoDB as a database. Server has queries, mutations, subscription and a simple auth flow with examples to follow. 

It uses FB's [dataloader](https://github.com/facebook/dataloader) to optimize data requests to the database by batching and caching. It also leverages [graphql-yoga](https://github.com/prismagraphql/graphql-yoga) for an easy to use graphql with subscriptions server.

## Stack
- graphql js
- graphql-yoga
- MongoDB
- Node js
- Dataloader


## Before you start
First rename `.env-sample` file to `.env`. It contains all default values for proper work on your local machine. In case you going to run GraphQL server in production you need to provide relevant MongoDB URL and database name.
```
PORT=8080

MONGO_URI="mongodb://localhost:27017/"
MONGO_DATABASE_NAME="cars"
```

## Start your server
```
yarn install
yarn start
```
That's it. Your server is up and run.


## To test it.
Use [graphql-playground](https://github.com/prismagraphql/graphql-playground) to test it. It allows you to add a header and make the queries below.


## Queries

Sign up
```
mutation SignUp($email: String!, $password: String!, passwordConfirmation: String!, name: String!) {
  signup(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, name: $name ) {
    token
    error
    user {
      name
    }
  }
}
```


Login in
```
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    error
    user {
      name
    }
  }
}
```

**Authenticated queries**
*Requires `authorization` in `Bearer JWT_TOKEN` format. Get this token by signing up and logging in.*

Get list of all cars
```
query allCars {
  allCars {
    edges {
      node {
        id
        plate
        brand
        createdAt
        createdBy
        updatedAt
      }
    }
  }
}
```

Get information about exact cat:
```
query Car($id: String!) {
  car(id: $id) {
    id
    plate
    brand
    createdAt
    createdBy
    updatedAt
  }
}
```

## Mutations
Add a car:
```
mutation addCar($plate: String!, $brand: String!) {
  addCar(plate: $plate, brand: $brand) {
    id
    plate
    brand
    createdAt
    createdBy
    updatedAt
  }
}
```
Remove a car:
```
mutation removeCar($id: String!) {
  removeCar(id: $id) {
    id
  }
}
```

## Subscriptions

Listens if new car was added:
```
subscription newCar {
  newCar {
    id
    plate
    brand
    createdAt
    createdBy
  }
}
```

Listens if car was removed:
```
subscription removedCar {
  removedCar {
    id
  }
}
```
