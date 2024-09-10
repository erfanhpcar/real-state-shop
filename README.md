Real Estate Ads Application

Welcome to the Real Estate Ads Application! This web application allows users to manage real estate advertisements with functionalities such as creating, editing, and deleting ads. The application is built using React, Material UI, and Leaflet.
Features

    User Authentication: Users can sign up, sign in, and manage their accounts.
    Ad Management: Users can create new real estate ads, view them, and manage their details.
    Edit & Delete Ads: Users can only edit or delete their own ads.
    Responsive Design: Fully responsive for both mobile and desktop views.
    Interactive Map: Use Leaflet for selecting and displaying property locations.

Key Note

    Owner Restriction: Only the owner of an ad has the rights to delete or edit it. If you try to modify or remove an ad that you do not own, you will encounter an error message.

Technologies Used

    React: Front-end library for building user interfaces.
    Material UI: For design components and styling.
    Leaflet: For interactive map functionalities.
    Formik & Yup: For form management and validation.
    Axios: For API requests.
    React Router: For navigation and routing.

Prerequisites

    Node.js (v12 or later) installed on your machine.
    A running backend server that supports the necessary endpoints for authentication, ad creation, and management.

Installation
1. Clone the Repository

bash

git clone https://github.com/your-username/real-estate-ads-app.git
cd real-estate-ads-app

2. Install Dependencies

bash

npm install

3. Start the Development Server

bash

npm start

The application will be available at http://localhost:3000.
API Configuration

Make sure your backend server is running and configured at http://localhost:5000. The server should support the following endpoints:

    POST /login: User login.
    POST /ads: Create a new ad.
    PUT /ads/:id: Update an existing ad.
    GET /ads/:id: Retrieve details of a specific ad.
    DELETE /ads/:id: Delete a specific ad.

Responsive Design

The application features a responsive design:

    On desktop, the navbar includes the home icon centered, with user actions (like logout) and ad management options.
    On mobile, the navbar adjusts to a full-width layout with a hamburger menu. The menu includes logout and add real estate ad options, while the full name of the user is hidden for a cleaner look.