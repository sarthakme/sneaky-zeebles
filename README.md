Image Processing API

Available scripts -
test - compile and run tests
format - run prettier and ESLint
start - start the server

build - compile
jasmine - run tests



Endpoint to access - GET /resize



URL query keys -
fileName: for the name of the file excluding the extension
width: desired width, in pixels, of the resized image
height: desired height, in pixels, of the resized image

If left blank, height and width will default to 200. So '/resize?fileName=fjord'
and '/resize?fileName=fjord&height=200&width=200' return the same image.



To easily identify when images are being resized using a function, and when they are only being fetched
console logs have been added.
When the function is called to resize the image file, it logs the string 'Function called' to the console.
When the response is sent to the webpage, specifying the image to be displayed, it logs the string 'Image displayed'
to the console.

When an image is resized, both the strings will be logged, however, if an existing image is fetched,
only the 'Image displayed' string will be logged.



After compiling, TypeScript introduced some artifacts that were problematic to ESLint and it flags them.
These errors have arisen due to TypeScript's beahviour or a lack of complete understanding on my part.