Notes Application:-

This application is a simple note-taking API created with Node.js that includes authentication, encryption, rate limitation, and other features.


Features:
1.Api creation -Built with Express.js
2.Encryption/Decryption  -Built using the crypto-js library.
3.Authentication -Token-based authentication with JSON Web Tokens (JWT)
4.Logging - Using Winston library
5.Local Database- In-memory database implemented with LokiJS
6.Rate Limiting- using express-rate-limit
7.Testing -Automated testing with Jest and Supertest




API Endpoints:

Login Request-
	Method: POST
	URL: http://localhost:4000/api/login
	Description: The user gives a username, and the API provides a token to access other APIs.

Add Notes-
	Method: POST
	URL: http://localhost:4000/api/notes
	Description: The user sends a body containing their name, info, and an image. The note is entered into the local database with encrypted content.


Get All Notes- 
	Method: GET
	URL: http://localhost:4000/api/notes?page=<pageNumber>&limit=<limitNumber>
	Description: Fetch all notes with pagination support.

Get Note by ID-
	Method: GET
	URL: http://localhost:4000/api/notes/:id
	Description: Get a particular note using its ID.

 Update Note-
	Method: PUT
	URL: http://localhost:4000/api/notes/:id	
	Description: Update an existing note by its ID

Delete Note-
	Method: DELETE
	URL: http://localhost:4000/api/notes/:id	
	Description: Delete a note by its ID




How to Run:
1. Install dependencies- npm install
2. Run the application- npm start
3. Run tests- npm test



Built With:
	Node.js
	Express.js
	crypto-js
	LokiJS
	express-rate-limit
	Winston
	Jest
	Supertest


