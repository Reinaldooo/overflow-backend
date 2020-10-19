This folder structure follow some basic principles of DDD metodology ( Domain driven development ),
a domain is a like a model, a knoledge area of the app. For example in the beginning
the two main domains where `users` and `events`, each one having it's own functionalities.

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
