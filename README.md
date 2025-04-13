# Email Marketing Sequence Designer (MERN Stack)

This project implements an email marketing sequence designer using the MERN stack (MongoDB, Express.js, React, Node.js) along with ReactFlow, Agenda, and Nodemailer. It allows users to visually design email sequences using a flowchart-like interface and automatically schedule and send emails based on the defined flow.

## Features

* **Visual Flowchart Design:** Users can create email sequences using a drag-and-drop interface with nodes representing "Cold Email," "Wait/Delay," and "Lead Source" actions.
* **Email Scheduling:** The system automatically schedules emails based on the defined sequence and delay times using Agenda.
* **Email Sending:** Emails are sent using Nodemailer.
* **MongoDB Database:** Email sequences and related data are stored in MongoDB.
* **API Endpoint for Testing:** A dedicated API endpoint for testing email sending functionality.

## Technologies Used

* **Frontend:**
    * React
    * ReactFlow
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB
    * Agenda
    * Nodemailer

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Configure environment variables:**

    * Create a `.env` file in the `backend` directory.
    * Add the following environment variables:

        ```
        MONGODB_URI=<your_mongodb_connection_string>
        EMAIL_HOST=<your_email_host>
        EMAIL_PORT=<your_email_port>
        EMAIL_USER=<your_email_user>
        EMAIL_PASS=<your_email_password>
        ```

    * Replace the placeholder values with your actual MongoDB connection string and email credentials.

5.  **Start the backend server:**

    ```bash
    cd ../backend
    npm run dev
    ```

6.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start
    ```

7.  **Access the application:**

    * Open your web browser and navigate to `http://localhost:3000`.

## API Endpoints

* **`POST /api/schedule-test-email`:**
    * Schedules a test email to be sent after one hour.
    * Request body:

        ```json
        {
            "time": "<timestamp>",
            "emailBody": "<email_body>",
            "subject": "<email_subject>",
            "emailAddress": "<recipient_email>"
        }
        ```

* **`POST /api/save-sequence`:**
    * Saves the email sequence data.
    * Request body: the JSON representation of the reactflow diagram.

## Project Structure