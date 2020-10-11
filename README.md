# Certify

Certify helps you generate certificates from a set of templates just by creating excel sheet of participants

<p align="center">
<a href="https://certify.jugaldb.com">
<img src="https://certify-hax.s3.ap-south-1.amazonaws.com/certify.png" width="400px" height="200px" alt="Lyricist Logo"/>
</a>
</p>



## Inspiration
There are multiple events going on both online and offline in recent times, the hassle of generating certificates for all participants has always been there, so in order to solve the problem, we thought to create a mobile application as well as a website to overcome the problem

## What it does
Certify basically takes in your data in a .csv format and converts it and adds it to the certificate template which you chose.

## How we built it
We created Certify basically using ReactJs and NodeJs as they work fantastic in harmony with each other and for the mobile application we used Flutter because of its cross platform compatibility which makes the work a tiny bit easier.

## Challenges we ran into
To generate a QR Code in order to verify the authenticity of the certificate and actually put it on the certificate was a bit of a hassle as the loading time was going pretty high, we are currently trying to minimise the loading times, for some reason the hosted app kept crashing but was working fine onn local, so in order to test the app, you will need to run Flutter locally

## Accomplishments that we're proud of.
We created this application in basically 1.5 days and hosted it using AWS and custom domains and to see it work in harmony is such a great sight altogether

## What we learned
Design, We never thought designing a certificate would be this hard xD

## Steps to run the Server
```bash
$ git clone https://github.com/jugaldb/Certify-VIT-Hack
$ cd Certify-VIT-Hack
$ npm i
$ add the .env file in root of the project
$ npm run dev/npm start
$ .env config
- dbURI
- jwtSecret
- SendgridAPIKey
- sendgridEmail
- AdminSignupCode
- AWS_KEY_ID
- AWS_SECRET_ACCESS
- AWS_DEFAULT_REGION
- AWS_S3_BUCKET
```
## Steps to run the Frontend

``` bash
Frontend:
- cd into Frontend folder
- run "npm install"
- Make a .env file in the Frontend folder, add a field "REACT_APP_BACKEND_URL" with the backend url
- run "npm start"
```

## Useful Links
- [Certify Website](https://certify.jugaldb.com)
- [Demo Video](https://youtu.be/9ux7ETQvliQ)

## Requirements
-  [x] NodeJs (or https://nodejs.org/en/)
-  [x] Npm
-  [x] AWS Account
-  [x] Internet :P 

```

## License

[Jugal Bhatt, Shivam Mehta, Sarthak Bharadwaj, Siddharth Singh and Vinayak Gupta](https://github.com/jugaldb/Certify-VIT-Hack/blob/master/LICENSE)**



---------

```javascript

if (youEnjoyed) {
    starOurRepository();
}

```

-----------
