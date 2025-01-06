# AshaTai Backend
![ashaTai-backend](https://socialify.git.ci/vaibhav25-mnnit/ashaTai-backend/image?font=Raleway&language=1&name=1&owner=1&theme=Dark)

This is the backend code for an e-commerce website [AshaTai](https://asha-tai.vercel.app/). \
This backend provides all the apis required by the fronted for the smooth running of the web app.

## Tech Stack

This project uses the following technologies:

- Node.js
- Express.js
- Nodemailer
- Mongoose
- Bcrypt for password hashing
- Cashfree APIs for payment integration

## Features

- Full CRUD APIs for products, orders, and product categories
- Signing in and signing up users with password hashing
- Cashfree payment integration
- Sorting and pagination logic for both products and order APIs
- Sending emails on order confirmation
- Resetting passwords
- And more!

## Usage

To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Rename the `.env-local` file to `.env` and add the appropriate environment variables.
3. Install the dependencies by running `npm install`.
4. Start the server by running `node server.js`.

## Environment Variables

To run the project, you'll need to add the following environment variables to your `.env` file:

- `MONGODB_DATABASE_URL`: your_mongodb_url.
- `CASHFREE_APP_ID`: your_cashfree_app_id.
- `CASHFREE_SECRET_KEY`: your_cashfree_secret_key.
- `NODEMAILER_MAIL`: your_email_to_send_mails.
- `NODEMAILER_MAIL_PASSWARD`: your_mail_passward.

## License

This project is licensed under the MIT License.
