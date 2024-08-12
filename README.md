# QR Code Generator with URL Shortening

### LINK TO THE WEBSITE:- 

https://qr-generator-free.onrender.com/?

## Project Overview

This project is a web application built using Node.js and Express.js that allows users to convert URLs into QR codes. The application also provides an option to download the generated QR code image. To make the QR codes more concise, the application incorporates a URL shortening feature using the `node-url-shortener` module. The user interface is rendered using EJS templates, and the project structure follows a clean MVC pattern. No database is used in this project; instead, the server automatically manages the deletion of previously generated QR codes to optimize storage usage.

## Features

- **QR Code Generation**: Convert any URL into a QR code using the `qr-image` module.
- **URL Shortening**: Shorten the input URL before converting it to a QR code for a cleaner and more manageable QR code.
- **Download QR Code**: Option to download the generated QR code image.
- **Storage Optimization**: Automatically deletes previously generated QR code images when a new one is created, ensuring efficient storage management.
- **Dynamic User Interface**: User interface dynamically updates to reflect the newly generated QR code.
- **EJS Templating**: The application uses EJS templating for rendering views, making it easy to maintain and extend the front-end.
- **Session Management**: Uses `express-session` to store the URL data temporarily for generating the QR code.

## Project Structure

```
├── public
│   ├── css-style.css
│   ├── js-index.js
│   ├── images
├── views
│   ├── index.ejs
│   ├── qrimage.ejs
├── app.js
├── package.json
├── README.md
```

- **public**: Contains static files like CSS, JavaScript, and images.
- **views**: Contains EJS templates for rendering the UI.
- **app.js**: The main application file where all routes, middleware, and logic are defined.
- **package.json**: Defines the dependencies and scripts for the project.
- **README.md**: Provides an overview and instructions for the project.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the server**:
   ```
   npm start
   ```
   The server will start on `http://localhost:3000`.

## Dependencies

- **Node.js**: The JavaScript runtime environment.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **qr-image**: A module for generating QR code images.
- **node-url-shortener**: A module for shortening URLs.
- **body-parser**: Middleware for parsing request bodies.
- **express-session**: Middleware for handling sessions.
- **EJS**: A templating engine for rendering dynamic HTML pages.

## How It Works

1. **Home Page**: When you visit the home page (`/`), you'll see a simple form where you can enter a URL that you want to convert into a QR code.
2. **Submit URL**: After entering the URL, submit the form, which triggers a POST request to the `/converter` route.
3. **URL Shortening**: The server shortens the URL using the `node-url-shortener` module.
4. **QR Code Generation**: The shortened URL is then converted into a QR code using the `qr-image` module.
5. **Image Storage**: The generated QR code is stored in the `public/images` directory with a unique filename.
6. **Display QR Code**: The server then renders a new page (`/qrimage`) that displays the generated QR code.
7. **Download Option**: The user can download the generated QR code image by clicking on the download link.
8. **Storage Management**: When a new QR code is generated, the previous QR code image is automatically deleted to save storage space.

## Code Explanation

### Middleware

- **bodyParser.urlencoded**: Parses incoming requests with URL-encoded payloads (e.g., form submissions).
- **bodyParser.json**: Parses incoming requests with JSON payloads.
- **express-session**: Handles session management, storing the URL temporarily for the QR code generation process.
- **express.static**: Serves static files from the `public` directory.

### Routes

- **GET `/`**: Renders the home page with the form for entering a URL.
- **POST `/converter`**: Handles the form submission, stores the URL in the session, and redirects to the `/qrimage` route.
- **GET `/qrimage`**: Generates the QR code, saves it to the `public/images` directory, and renders the QR code page.
- **GET `/download`**: Allows users to download the most recently generated QR code image.

### QR Code Deletion Logic

- When the user navigates to the home page, the server checks if there are any previously generated QR code images.
- If such images exist, the server deletes them to ensure that only the latest QR code image is stored. This logic helps in managing storage efficiently, especially in a scenario where multiple QR codes are generated frequently.

### Error Handling

- **File Deletion Errors**: If there's an issue deleting a file, the error is logged to the console, and the operation gracefully exits.
- **Download Errors**: If there's an issue during the download of the QR code image, an error message is sent back to the client, indicating that the file was not found.

## Future Improvements

- **Database Integration**: Add a database to store generated QR codes and allow users to access them later.
- **User Authentication**: Implement user authentication to provide personalized experiences and track QR code generation history.
- **Enhanced URL Shortening**: Integrate more robust URL shortening services to handle larger volumes of data.
- **Mobile Responsiveness**: Improve the mobile responsiveness of the application to provide a better user experience on smaller screens.
- **Customization Options**: Allow users to customize the appearance of the QR code (e.g., colors, logos).
- **Analytics**: Provide analytics to users on how often their QR codes have been scanned.

## Contributions

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please open an issue in this repository or contact the project maintainer.

