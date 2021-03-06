This folder structure follow some basic principles of DDD metodology ( Domain driven development ),
a domain is a like a model, a knoledge area of the app. For example in the beginning
the two main domains where `users` and `classes`, each one having it's own functionalities.

Commit before DDD structure: 4102c3bcc1d7605646282fe4a76f94abbd3ae9c5

The domains are represented by the `modules` folder. There is also the `shared` folder, where
all of the global items or settings must be. The `infra` folders represent the tecnology,
or the "how" it is implemented. For intance, the ORM can be typeorm or sequelize, it shouldn't
matter to the rest of the app.

`Repositories` are a special type of class to communicate with the data storage
service. In this case, a class that contains methods to connect the model with
the postgres db.

While using Typeorm, they are only used when i need to add a new method, because
typeorm already has an repo with the main methods

`Services` are like controllers, they hold the application business rules

`DTOs`, or Data Transfer Objects are a special type of interface representing
objects used to create, update and delete data in the app

Later on two kinds of repositories where used, one in the module folder, and
another in the infra/typeorm folder. The idea here is that the one in the module
folder is the reference to the ones inside infra folder, thats why they `implements`
the repo in the module folder. If in the future i start using another orm, it too
should `implements` the parent repo.

`Fakes` are repos used for unit tests. As in the tests i can't use the real db,
fakes are used to simulate it's functionality. Real db will be tested on other
kinds of tests.
