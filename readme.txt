To run the project

Step1 : open project in a code editor

step 2: install dependencies with following command
npm install

step3: we are using mysql in this project so in .env file be sure to include your own username and password for mysql as mine is only accessible on my local host

step 4: now do npm run dev

(if it show app crashed 
wait for file to build)
http://localhost:3001/api/(every show reuest ahead goes in front of it)
Routes
#'POST /register'
.register a new user
.Request Body:
{
    "name": "Wasid",
    "password": "Ali",
    "phone": "12345",
    "contacts": [
        {
            "name": "danish",
            "phone": "234637",
            "spam": false
        },
        {
            "name": "adil",
            "phone": "23456",
            "spam": false
        }
    ]
}
.Response:
{
    "name": "Wasid",
    "email": null,
    "phone": "12345",
    "contacts": [
        {
            "name": "danish",
            "phone": "234637",
            "spam": false,
            "id": 16
        },
        {
            "name": "adil",
            "phone": "23456",
            "spam": false,
            "id": 17
        }
    ],
    "id": 4,
    "spam": false
}

#POST /login
.login a user
.Request Body
   provide either email or phone along with the password
   {
    "phone": "12345",
    "password": "Ali"
   }

.Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNDk1NzY5MCwiZXhwIjoxNzA0OTYxMjkwfQ._UKvvLJDkwgwYiaQuj_5aGXWT05ajERT--Pz2fvH4N8",
    "user": {
        "id": 4,
        "name": "Wasid",
        "email": null,
        "phone": "12345",
        "spam": false
    }
}

#Contact Routes 
POST /mark-spam
.Request Body
{
    "phone": "12345"
}
for authentication you have to send the token that was given as response when you logged while testing in post man pass it in auth in token (only logged in user can mark spam)
.Response
{
  "message": "Contacts marked as spam successfully"
}
#POST /search
.searches for contact by name or phone number
.Request body
{
    "phone": "12345"
}
now add token in auth which you get while you logged in (only logged in user can search)

.RESPONSE
{
    "id": 4,
    "name": "Wasid",
    "email": null,
    "phone": "12345",
    "spam": true
}

#GET /generate-random
.Generates random contacts(from utils/contact-generator.ts)
add auth token .
.Request Query
{
  "total": 5
}

Response
[
    {
        "name": "Deepika Tripathi",
        "phone": "2438960084",
        "id": 19,
        "spam": false
    },
    {
        "name": "Hansa Chandra",
        "phone": "3352024614",
        "id": 20,
        "spam": false
    },
    {
        "name": "Om Kapoor",
        "phone": "9063578579",
        "id": 21,
        "spam": false
    },
    {
        "name": "Tanisha Ojha",
        "phone": "4668796610",
        "id": 22,
        "spam": false
    },
    {
        "name": "Tanvi Pandey",
        "phone": "3451680237",
        "id": 23,
        "spam": false
    }
]
#importnat note
.Ensure ypu have necessary enviroment variables set including 'jwt_KEY' for token signing