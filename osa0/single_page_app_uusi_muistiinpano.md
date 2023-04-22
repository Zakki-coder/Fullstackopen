sequenceDiagram
	participant browser
	participant server

	browser->>server: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
	activate server
	server->>browser: 201 created
	deactivate server

	Note right of browser: browser executes the JavaScript which creates and adds the new note to the page, then it sends the note to the server.