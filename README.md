
START-UP PROCEDURE
==================
- Install and configure mongoDB 
- sudo service mongod start|stop|restart  or simply mongod
- clone the repo
- npm install && npm start


ROUTINES
=================
1. pull a particular branch

> git pull origin <branch>

2. Create a new branch named "feature_x" and switch to it using

> git checkout -b feature_x

3. push the branch to your remote repository

> git push origin <branch>

4. switch back to master

> git checkout master

5. and delete the branch again

> git branch -d feature_x

Remove the old origin and readd the correct one:

> git remote remove origin
> git remote add origin <correct address>

Update the existing remote links:

> git remote set-url origin <correct url>


TODO TASKLIST
=================

- [x] Vehicle
- [ ] Customer
- [ ] Schedule


API ROUTES
================

1. api/food
------------
- **List Writers**
    - get /api/foods


- **Add Editors**
    - post /api/exercises


- **Delete Article**
    - delete /api/logs/{recordId}


- **Update Article**
    - put /api/notifications/{recordId}
