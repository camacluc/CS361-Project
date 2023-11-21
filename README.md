# Email Confirmation Microservice

# About The Project

### Overview
An email confirmation microservice for an appointment scheduling software that takes form data (first name, last name, email address, date, and time) from the user and sends the user an email to the provided email address with appointment confirmation details.

### Built With
   - Node.js
   - Express.js
   - Nodemailer
   - Google OAuth2

## Getting Started

### Prerequisites
- `npm install googleapis`
- `npm install googleapis nodemailer`
- `npm install express`

### Installation
1. Install NPM packages
- `npm install`

## Communication Contract

The communication is done through HTTP requests.

### How to Request Data
To request a booking and trigger an email notification, send a POST request to the `/send-email` endpoint with the following parameters in the request body:

- `firstName`: First name of the person making the booking.
- `lastName`: Last name of the person making the booking.
- `email`: Email address of the person making the booking.
- `date`: Date of the appointment in the format 'YYYY-MM-DD'.
- `time`: Time of the appointment in the format 'HH:mm'.

- Example Request:

```bash
curl -X POST \
  http://localhost:3000/send-email \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'firstName=Janeohn&lastName=Doe&email=janedoe@example.com&date=2023-12-01&time=14:30'
```

### How to Receive Data
Upon successful processing of the booking request, the microservice will respond with a success message. In case of an error, an appropriate error status and message will be returned.

Example Response:

`json
{
  "message": "Congrats John Doe! Your appointment on 2023-12-01 at 14:30 has been booked!",
  "status": "success"
}`

In case of an error:

`json
{
  "message": "Error sending email",
  "status": "error"
}`

## UML Sequence Diagram

![Email Confirmation Microservice](https://github.com/camacluc/CS361-Project/assets/114314487/0944e148-f214-42d6-86eb-97ffdf1865c4)


