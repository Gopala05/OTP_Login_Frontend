# OTP Login Frontend

A user-friendly OTP (One-Time Password) authentication frontend built using Next.js, TypeScript, and Tailwind CSS. This project allows users to log in securely with an OTP sent to their mobile numbers.

## Features

- User-friendly interface for OTP login
- Responsive design with Tailwind CSS
- Integration with the backend OTP authentication service
- Error handling and user feedback for OTP verification

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications
- **TypeScript**: A typed superset of JavaScript for improved developer experience
- **Tailwind CSS**: A utility-first CSS framework for styling
- **Axios**: For making HTTP requests to the backend

## Getting Started

### Prerequisites

- Node.js and npm installed
- Access to the backend OTP authentication service

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Gopala05/OTP_Login_Frontend.git
    cd OTP_Login_Frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000  # Adjust according to your backend API URL
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Users can enter their phone number to request an OTP.
- Upon receiving the OTP, users can input it to log in.
- The app provides feedback for successful logins and error messages for failed attempts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## Acknowledgments

- Next.js for the React framework
- Tailwind CSS for the styling framework
- Axios for simplifying HTTP requests

Feel free to customize this application further based on your specific requirements!
