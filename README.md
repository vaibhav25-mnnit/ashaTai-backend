# AshaTai Backend
![ashaTai-backend](https://socialify.git.ci/vaibhav25-mnnit/ashaTai-backend/image?font=Raleway&language=1&name=1&owner=1&theme=Dark)

This is the backend code for an e-commerce website [AshaTai](https://asha-tai.vercel.app/). \
This backend provides all the apis required by the fronted for the smooth running of the web app.

# Available Api's
[View API Documentation](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/vaibhav25-mnnit/ashaTai-backend/master/openapi.yaml)

### /product/add

#### POST
##### Summary:

add new product

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /product/update/{id}

#### PATCH
##### Summary:

update product

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /product/delete/{id}

#### DELETE
##### Summary:

delete product

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /product/all

#### GET
##### Summary:

get products with filters applied

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /product/getProduct/{id}

#### GET
##### Summary:

get specific product

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /order/update/{id}

#### PATCH
##### Summary:

update order

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /order/createOrder

#### POST
##### Summary:

createOrder

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /order/all/{id}

#### GET
##### Summary:

getorders of the user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cart/add

#### POST
##### Summary:

add to cart

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cart/get/{id}

#### GET
##### Summary:

get cart items for user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cart/update/{id}

#### PATCH
##### Summary:

update cart

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cart/reset/{id}

#### DELETE
##### Summary:

reset cart

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cart/delete/{id}

#### DELETE
##### Summary:

delete item from cart

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /user/get/{id}

#### GET
##### Summary:

get user by id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /user/update/{id}

#### PATCH
##### Summary:

update User api's

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /auth/signup

#### POST
##### Summary:

signup with password  hasing

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /auth/login

#### POST
##### Summary:

login 

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /pay/create-order

#### POST
##### Summary:

create order and get session id

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |


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
