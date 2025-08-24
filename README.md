# React.js and Firebase CRU

Full-stack integration using React.js front-end framework and Google Firebase database. CRU application by mocking on a todo list. The app is tied to Firebase NoSQL database and no registration or authentication is needed. "D" in CRUD is not applicable.

The primary objective of this app is to simulate and connect a many-to-many relationsup database, including registered users (**User**) and visitors (**Peer**). To eliminate the need for `useAuth()` on Firebase, anyone with the link is a **User** and a **Peer** simultaneously. Anyone can perform CRU operations by adding a feedback and rating to a **User**'s dashboard demo display. Meanwhile, anyone can also act as a **User** to toggle ON/OFF on selected feedback.

## How This Works?
1. When a visitor or **Peer** enters: first name, last name, feedback, and rating, then hit submit. The **User** will receive a feedback. The app adds these data to the **User** object in Firebase. 
2. The app reads the **Peer** object from Firebase and list all feedback on Firebase.
3. If the **User** doesn't like a specific comment, s/he can toggle ON/OFF to show which feedback to display. 
4. Any entry is saved to the Firebase, unless the author intentionally deletes it on Firebase. This would be "D" in CRUD.

## Useful Links
- [React Todo App](https://www.javascripttutorial.net/react-tutorial/react-todo-app/)
- [Build a Todo App in React Using Hooks](https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks)
- [React Todo App With Firebase v9 / CRUD Functionality](https://www.youtube.com/watch?v=drF8HbnW87w)
- [How to Build a TodoApp using ReactJS and Firebase](https://www.freecodecamp.org/news/how-to-build-a-todo-application-using-reactjs-and-firebase/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/fb3de259-7d32-4903-a2d7-cfdeb850b6ef/deploy-status)](https://app.netlify.com/projects/feedback-firebase/deploys)
