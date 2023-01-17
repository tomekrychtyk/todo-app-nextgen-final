# ToDo List App NextGEN

The app created for a recruitment process purpose.

## Minimal Backend Requirements

- [x] Set up the environment
- [x] Create an Express server
- [x] Add a GET endpoint /todo for fetching todos
- [x] Add a POST endpoint /todo for creating a todo
- [x] Add a PATCH endpoint /todo for editing a todo
- [x] Data must be persisted in a MongoDB database

## Minimal Frontend Requirements
- [x] Fetch the list of todos on page load/reload
- [x] Display the list of todos
- [x] Add a form to allow for adding todos with a 'Save' button
- [x] When a user clicks 'Save' button a POST request should be made to the backend server
- [x] Add a form for todo editing
- [x] Form should be opened with an 'Edit' button
- [x] If user doesn't wish to make any changes to a todo they should be able to close it with a 'Cancel' button
- [x] If a user is ready to save the changes there should be a 'Save' button
- [x] When a user saves the data the PATCH request is made to the backend server

## Extra requirements
- [x] Support for todo statuses
- [x] Suppport for status filtering
- [x] Support for status editing
- [x] Support for todo categorization
- [x] User should be able to manually add their own categories
- [ ] User should be able to edit categories
- [ ] User should be able to delete a category
- [ ] When a user deletes a category all todos assigned to it become 'Uncategorized'
- [x] Support for category filtering
- [ ] Support for changing category already assigned to a todo

## Running the app

The application is consisted of two services `client` and `server`.
To run it locally you'll need to create a `.env` file for both packages.

The client `.env` expects one env variable:

`VITE_API_URL=[URL_TO_THE_API_SERVER]`

The server `.env` file expects the following variables:

`
MONGO_URI=[URI_TO_MONGODB_INSTANCE]
MONGO_USER=[MONGODB_USERNAME]
MONGO_PASSWORD=[MONGODB_PASSWORD]
`

Once you're set up with the `.env`'s you can run the app by running the following *from the root* directory:

`yarn start:client`
`yarn start:server`
