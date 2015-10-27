# Questions And Answers Application

Playground project to learn different technologies.

Consists of web server providing API and front-end client application.

## Application Features

- Users can view all questions, all answered questions and all unanswered questions sorted by date/time asked.

- There's no user registration and password protection. User should enter his login each time when it is required.

- Users can view separate questions with answers.

- Users can ask new questions.

- Users can answer questions.

## Things To Do
- Ask user confirmation when leaving non-empty ask or answer page without sending the data
- Add required title for questions
- Handle how to show long strings on client
- Show number of answers for question in question lists
- Add paging
- Add 'Remember Me' checkbox for users
- Show message if there's no data or server returned an error
- Show type and date/time of last activity for question (answered etc.) and sort questions using this information
- Add ability to sort questions by date/time asked, date/time of 
last activity, number of answers etc.
- Add user registration and login
- Show user activity and stats (number of questions asked/answered etc.)
- Show how many times question has been viewed by users
- Add search
- Add tags for questions
- **Techical Improvements**
    - Add curl test scripts to repo
    - Use 'maxlength' and 'required' HTML-input attributes
    - Render initial data in 'index.html' including configuration object with API URL's