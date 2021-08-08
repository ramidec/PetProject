# Pet App

React native app to create your pets and show them on a list!

## Install

Download the project and on the root folder, run:
- `yarn`

### For iOS
- `cd ios && pod install`

## Tests

- Run lint and test suit: `yarn test:all`

## Internal Comments
Thanks for the fun excercise, I really enjoyed it. 
It still amazes me that even though the task looked quite simple and straightforward on the surface, I always found something that I could tweak or refactor to make it better. And I'm not even talking about features, just the code itself. 
As to the assignment, I've followed the instructions for the desired behaviour, but also added something that felt quite natural: the possibility to delete a pet from the list. To do this, I created a rudimentary system to asign unique id's to each created pet, nothing fancy, but it worked for the task given.
I based the tests on the main functionality of the app: the storage (get, post, delete). I also added screenshot tests for UI changes. 
The app was created using TypeScript, and I used external libraries only for specific reasons: storage, gallery access and navigation.
