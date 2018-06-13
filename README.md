# learn-express


#pre-requisites

1. Installed with Node JS
2. Installed with Mongo DB

#Agenda

This boilerplate helps to get a running node express application with the following features 

1. Create routes

2. Authentication

3. Authorization

4. Integrated with Mongo - no need of writing separate methods for every mongo command, instead follow the 
 dbconnector.js file under utils/dbconnnection folder

5. Central control for logging - logging can be enabled and disabled for the entire application through the key 
enableAppLogging

6. Routes are implemented as separated modules, so it is easy to maintain the routes across application.

#Roles

1. For this example application, users having the role "ROLE_SETTINGS_RO" can only access the module 2
2. A utility has been added to control the access for apis based on the permissions, user is having
3. The roles and access can be added under the "roles_permissions" key in helpers/constants.json


#user sign up model obj
{
    "firstName": "Teja",
    "lastName": "kandukuri",
    "password": "123456",
    "email": "ravitejakandukuri88@gmail.com",
    "phone": "9876543210",
    "role":"SUPER_ADMIN"
}
    

