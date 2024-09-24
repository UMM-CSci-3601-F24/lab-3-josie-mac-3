#1
  app-routing-module uses router modules to manage routes, while Server.java uses controllers to manage routes
  A path is created in Server.java called "/users/' and it gathers all the information
  and then in app-routing-modules, there is a route then created off of that called "users/:id" where 
  :id is a variable id to call upon a specific user id
  Java maps it's path more to the information, while angular maps it's paths to pages
#2
  user.service.ts lets us filter users
  We do it in the user.service.ts file because it needs to access information from multiple sources
  and so that all of our http information is in one place, at least for the users.
  Service can be used by multiple sources rather than just one component
#3
  a.
    In line 121
  b.
    In line 1154-157
  c.
    In line 152
  d.
    In line 159
#4
  a.
    The page object is a new UserListPage defined at line 3
  b.
    We use .type('27') in line 63 by using cy.get('data-test=userAgeInput'), thus typing 27 into 
    a field with that data-test value
  c.
    It returns all elements that are app-user-cards that are contained in user-card-containers 
  d.
    It uses .find('.user-card-name'), which just finds the name attached to the card.
#5
  We filtered the owner on the server because it was something that wouldn't be used in quick succession as well as sorted todos because there was an already implemented mehod for it
  We filtered by category because I feel as if that is some that would be changing much more frequently
#6
  We made sure that we were testing simply that the components existed mostly, we had a hard time with getting much else to work.
  We also tested the data within the profiles to make sure that they were accurate.
  We were testing the profile cards
#7
  We tested the functionallities for typing and filtering todos, we also tested clicking into the profiles and ensuring that the information was correct
  We tested these because they are the main functionallity of the app



