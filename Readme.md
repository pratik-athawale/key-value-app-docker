1. docker run -d --name=mongodb mongodb/mongodb-community-server:7.0-ubuntu2204

2. docker ps

3. docker logs mongodb 

4. docker exec -it mongodb mongosh

run following commands in mongodb shell

5. show dbs;

6. use admin

7. show collections

8. exit

here one problem is anyone can exec into our container and view data, so we need to make it secure

9. touch start-db.sh

10. chmod +x start-db.sh

11. touch cleanup-db.sh

12. chmod +x cleanup-db.sh

13. docker-cc

14. write docker run command to start-db.sh with variables

15. ./start-db.sh 

16. docker ps
u should see mongodb container running

17. docker exec -it mongodb mongosh

18. show dbs
this time this wont work and will give authentication error

19. use admin

20. show collections
this will also not work and will give authentication error,

21. use anything
this works, but anything db does't exists, so it can't be concluded that anything exists or not, so one must have authentiacted to view dbs. so data is secure.

22. exit

23. docker stop mongodb

24. create mongo-init.js file 

# use volume, network -----------------------------

25. docker-cc

25. docker volume create key-value-data

26. docker network create key-value-net

27. make changes to start-db.sh to use this docker volume and network

28. ./start-db.sh

29. docker ps

# testing if we can connect to our mongodb container in same network

30. docker run \
-it --rm --name=debug_sh \
--network=key-value-net \
mongodb/mongodb-community-server:7.0-ubuntu2204 \
mongosh mongodb://mongodb/key-value-db

this should work and open mongodb shell, run next in shell

31. show dbs
wont work

32. show collections
wont work as well as it will ask for authentication, but at least we were able to connect 

33. docker ps -a
debug_sh should not be there as we had passed --rm flag 

now lets connect and also pass credentials to get access to a specific db in container

34. docker run \
-it --rm --name=debug_sh \
--network=key-value-net \
mongodb/mongodb-community-server:7.0-ubuntu2204 \
mongosh mongodb://key-value-user:key-value-password@mongodb/key-value-db

this opens mongodb shell

35. show collections
this works as we have access to key-value-db, no errors, although it will be empty as there is no data

36. show dbs
shows no data

37. use admin

38. show collections
this gives unauthorized error as we have access to to key-value-db only not others

39. exit

40. docker-cc

40. docker volume ls

41. docker volume rm key-value-data

42. docker network ls

43. docker network rm key-value-net

# improving utility scripts

44. cd into key-value-app and run ./start-db.sh
this gives error that network/volume is not there, so we need to make sure setup exists for this script to work, so create setup script file

45. chmod +x setup.sh

46. ./setup.sh 
check if logic works

47. docker volume ls

48. docker volume create key-value-data
run this 2-3 times

49. docker volume ls
as we can see despite running docker volume create there is only one volume, it doesn't create duplicates, but for dev friendly purpose we added that check in setup script

50. ./start-db.sh 

51. ./start-db.sh

52. docker kill mongodb

53. ./start-db.sh

# testing utility scripts
54. ls -l

55. ./cleanup.sh 

56. ./start-db.sh

57. ./cleanup.sh

58. ./start-db.sh

59. docker ps

60. docker kill mongodb

61. ./cleanup.sh



