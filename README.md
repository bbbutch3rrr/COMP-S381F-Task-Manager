-- PROJECT INFO --

Project name: Task Manager

Group number: 3

Members: 
Yuen Lun Hin 13141381
Lam Ching 13141111
Wong Wai Shuen 13280670
Leung Kim Hung 12895666
⁠Au Kin Ming 12779692

-- PROJECT FILE INTRO --

Server.js: In the server.js, we provide login, register and logout functions, using the cookie session for authentication. Besides, we provide task search (By title or status), create task, update task and delete task functions which fulfill the CRUD requirement. In the end, we provide RESTful API service so we can use CURL methods (GET, POST, PUT and DELETE).

Package.json: The dependencies we have used include cookie-session, ejs, express and mongoose.

Views: We provide login page, register page, create task page, edit task page and dashboard page in EJS format.

Models: We provide two models, tasks and users to define the data structure. For the tasks.js, it should have title, status and create time, and description is optional. For the user.js, it should have an unique username and a password.

-- The cloud-based server URL --

https://taskmanager-deploy-app-13141111-a2ehbrfsafb4h4ek.southafricanorth-01.azurewebsites.net/login

-- Operation Guides --

Registration: On the login page, we can press the register button to enter the register page. After enter the unique username and password, we can press register button to complete the registration.

Login: After enter the username and password, we can press the login button to login. If the username does not exist or the password is wrong, the error "Invalid Credential" shows.

Logout: After successful login, we will enter the dashboard page. Pressing the logout button on the top-right can logout from the dashboard page.

Task filteration: On the dashboard page, entering the required title or selecting the required status, then pressing the filter button will show the result according to your demand.

Task creation: On the dashboard page, pressing the Create New Task button to enter the task create page. On the task create page, we can enter task title, task description and select task status. After all, pressing the Save Task button to complete task creation.

Task Edition: On the dashboard page, choosing the required task and pressing the Edit button in the table to enter task edit page. On the task edit page, we can edit the task title, task description and task status. After all, pressing the Update Task button to save the update.

Task Deletion: On the dashboard page, choosing the required task and pressing the Delete button in the table to delete the designated task.

API: ('api/tasks'), ('api/tasks/:id')

HTTP request type: Data in JSON formate

Path URL: https://taskmanager-deploy-app-13141111-a2ehbrfsafb4h4ek.southafricanorth-01.azurewebsites.net/api/tasks

How to test: Using the testing commands below in the terminal to test the RESTful API service. The end of the PUT and DELETE methods should be replaced by required object id.

CURL testing commands:

curl -X GET https://taskmanager-deploy-app-13141111-a2ehbrfsafb4h4ek.southafricanorth-01.azurewebsites.net/api/tasks

curl -X POST -d 'title=demo1&description=demo1&status=Pending' "https://taskmanager-deploy-app-13141111-a2ehbrfsafb4h4ek.southafricanorth-01.azurewebsites.net/api/tasks"

curl -X PUT -d 'status=Completed' "https://taskmanager-deploy-app-13141111-a2ehbrfsafb4h4ek.southafricanorth-01.azurewebsites.net/api/tasks/<replaced by required object id>"

curl -X DELETE https://taskmanager-deploy-app-13141111-a2ehbrfsafb4h4ek.southafricanorth-01.azurewebsites.net/api/tasks/<replaced by required object id>
