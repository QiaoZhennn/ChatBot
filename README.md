## This is a ChatBot server implemented using Node.js
### Data Flow
1. User types message on his/her phone facebook messenger app or on facebook messenger page
2. The message is sent to our facebook app called bunny ice cream order assistant.
3. Our facebook app sends the message to our back end server.
4. Our back end server forwards the message to **DialogFlow**.
5. DialogFlow does NLP stuff, then return a structured data extracted from the message to our back end server.
6. The back end server receive data and perform our own logic, like calculate ice cream's price or send email to users, etc. Then, return a response message to our facebook app which will forward the message to facebook messenger app.
### Deployment
Our backend server is hosted on Heroku
