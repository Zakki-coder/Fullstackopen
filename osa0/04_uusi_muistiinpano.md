sequenceDiagram
	participant browser
	participant server

	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	server->>browser: Status Code 302
	deactivate server

	Note right of browser: browser sends new note to server and server answers with a redirect 

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	activate server
	server->>browser: HTML document
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server->>browser: the css file
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
	activate server
	server->>browser: the JavaScript file
	deactivate server

	Note right of browser: browser executes the JavaScript which fetch the JSON from the server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server->>browser: the JSON file
	deactivate server

	Note right of browser: browser executes the callback function which renders the notes to display
