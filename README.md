# SmartBrain

SmartBrain is a face recognition web application built with React. It allows users to input image URLs and detect faces within those images using the Clarifai API.

## Project Structure

The project is divided into two repositories:

1. `smartbrain` (this repository): Contains the front-end React application
2. `smartbrain-api`: Contains the back-end API (separate repository)

## Features

- User registration and sign-in
- Image URL input
- Face detection using Clarifai API
- Rank tracking for number of images processed

## Technologies Used

- React 18.3.1
- react-parallax-tilt 1.7.234
- react-tsparticles 2.12.2
- Sass 1.77.8
- Tachyons 4.12.0
- Vite 5.3.5 (as build tool)

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/smartbrain.git
   cd smartbrain
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. Register a new account or sign in
2. Paste an image URL into the input field
3. Click the "Detect" button to process the image
4. View the detected faces highlighted on the image

## Backend Setup

For the full functionality of this application, you'll need to set up the backend API as well. Please refer to the `smartbrain-api` repository for instructions on setting up the backend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Clarifai](https://www.clarifai.com/) for their face detection API
- [React](https://reactjs.org/) for the front-end framework
- [Tachyons](https://tachyons.io/) for CSS utilities
