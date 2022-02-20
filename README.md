# Evote REST API v.2

This is an application server for Electronic Vote System build using Node JS and Express JS.

The main file of this application is located on `server.js`.

`.env` is a file to store environment variables.

`logs.txt` is a file to store log history of every request that enters the server.


## Install

    git clone https://github.com/or-abdillh/evote-api-v2 && cd evote-api-v2 && npm install

## Run the app

    npm run dev

## .env configuration

		DB_HOST=YOUR_HOSTNAME_DB
		DB_PORT=YOUR_PORT_DB
		DB_USER=YOUR_USERNAME
		DB_PASSWORD=YOUR_PASSWORD
		DB_NAME=evote_db
		JWT_SECRET_KEY=YOUR_SECRET_KEY
		LOGGER_PATH=logs.txt

## logs.txt structure

		[20/2/2022 12.16.40] [403 - Forbidden] /quick-count GET 3,981ms
		[20/2/2022 12.16.35] [200 - OK] /admin/login POST 167,745ms
		[20/2/2022 11.18.05] [404 - Not Found] /admin/accounts PUT 148,866ms
    
# Database Structure

### Accounts table

		| Field         | Type         | Null | Key | Default   | Extra |
		|---------------|--------------|------|-----|-----------|-------|
		| username      | varchar(15)  | NO   | PRI | NULL      |       |
		| password      | varchar(15)  | NO   |     | NULL      |       |
		| fullname      | varchar(50)  | NO   |     | NULL      |       |
		| token         | varchar(250) | YES  |     | undefined |       |
		| status_vote   | tinyint(1)   | YES  |     | 0         |       |
		| candidate_id  | int(11)      | YES  | MUL | NULL      |       |
		| job_id        | int(11)      | NO   | MUL | NULL      |       |
		| gender        | varchar(6)   | NO   |     | NULL      |       |
		| last_modified | bigint(20)   | NO   |     | NULL      |       |
		| time_stamp    | bigint(20)   | YES  |     | 0         |       |
		| role          | varchar(10)  | NO   |     | general   |       |

### Candidates table

		| Field               | Type         | Null | Key | Default | Extra          |
		|---------------------|--------------|------|-----|---------|----------------|
		| candidate_id        | int(11)      | NO   | PRI | NULL    | auto_increment |
		| chairman_name       | varchar(30)  | NO   |     | NULL    |                |
		| chairman_image      | varchar(150) | NO   |     | NULL    |                |
		| vice_chairman_name  | varchar(30)  | NO   |     | NULL    |                |
		| vice_chairman_image | varchar(150) | NO   |     | NULL    |                |
		| candidate_number    | int(11)      | NO   |     | NULL    |                |

### Event table
		
		| Field           | Type         | Null | Key | Default | Extra |
		|-----------------|--------------|------|-----|---------|-------|
		| event_start_at  | bigint(20)   | NO   |     | NULL    |       |
		| event_finish_at | bigint(20)   | NO   |     | NULL    |       |
		| event_title     | varchar(250) | NO   |     | NULL    |       |
		| passcode        | varchar(10)  | YES  |     | HIMATI  |       |

### Jobs table

		| Field    | Type        | Null | Key | Default | Extra          |
		|----------|-------------|------|-----|---------|----------------|
		| job_id   | int(11)     | NO   | PRI | NULL    | auto_increment |
		| job_name | varchar(30) | NO   |     | NULL    |                |
		
### Role guide account

`master`, using for the administrator.
`general` as ordinary or voter account.

# REST API

The REST API to the example app is described below.

In the explanation below I use the `axios library` in exemplifying requests to the server

## Get JWT token / Login

### JWT structure payload

JWT tokens will expire 30 minutes after tokens are generated

		jwt.decoded.payload = {
			username: 'YOUR USERNAME HERE',
			isAdmin: true or false
		}

### Request

`POST /login` or `POST /admin/login` for admin

		axios.post(
			'http://localhost:8080/login',
			{ username, password }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": {
				"token": "YOUR JWT TOKEN"
			},
			"createAt": "20/2022 16:45:32"
		}

## Get list of Candidates

### Request

`GET /candidates`

		axios.get(
			'http://localhost:8080/candidates',
			{ headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": {
				"candidates": [
					{
						"candidate_id": "1",
						"candidate_number": "1",
						"chairman_name": "fulan",
						"vice_chairman_name": "fulanah",
						"chairman_image": "/male.jpg",
						"vice_chairman_name": "/female.jpg"
					}
				]
			},
			"createAt": "20/2022 16:45:32"
		}

## Create new candidate

`POST /admin/candidates`

### Request

		//Create body request

		const body = {
			chairman_name: 'fulan',
			vice_chairman_name: 'fulanah',
			chairman_image: '/male.jpg',
			vice_chairman_image: '/female.jpg',
			candidate_number: '2'
		}
		
		axios.post(
			'http://localhost:8080/admin/candidates',
			body,
			{ headers: { authorization: 'YOUR TOKEN JWT' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "success to create new candidate for fulan - fulanah",
			"createAt": "20/2022 16:45:32"
		}

## Update candidate

`PUT /admin/candidates`

### Request

		//Create body request

		const body = {
			chairman_name: 'fulan',
			vice_chairman_name: 'fulanah',
			chairman_image: '/male.jpg',
			vice_chairman_image: '/female.jpg',
			candidate_number: '2',
			candidate_id: '1' //PRIMARY KEY
		}
		
		axios.put(
			'http://localhost:8080/admin/candidates',
			body,
			{ headers: { authorization: 'YOUR TOKEN JWT' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "success to update candidate for fulan - fulanah",
			"createAt": "20/2022 16:45:32"
		}


## Remove a candidate

### Request

`DELETE /admin/candidates`

		//Create body
		const body = { candidate_id: '1' }

		axios.delete(
			'http://loaclhost:8080/admin/candidates',
			{ body, headers: { authorization: 'YOUR TOKEN JWT' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "success to remove candidate from list by ID 1",
			"createAt": "20/2022 16:45:32"
		}

## Get list of accounts

### Request

`GET /admin/accounts`

		axios.get(
			'http://localhost:8080/admin/accounts',
			{ headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": {
				"accounts": [
					{
						"fullname": "fulan bin fulan",
						"username": "fulan123",
						"password": "fulan123",
						"status_vote": 0,
						"jobs_name": "Dosen",
						"gender": "male",
						"timestamp": 0
					}
				]
			},
			"createAt": "20/2022 16:45:32"
		}

## Craete new account

### Request 

`POST /admin/accounts`

		//Create body request
		const body = {
			fullname: 'fulanah binti fulan',
			username: 'fulanah123',
			password: 'fulanah123',
			gender: 'female',
			job_id: '1'
		}

		axios.post(
			'http://localhost:8080/admin/accounts',
			body,
			{ headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "success to create new account for fulanah binti fulan",
			"createAt": "20/2022 16:45:32"
		}
		
## Update an account

### Request 

`PUT /admin/accounts`

		//Create body request
		const body = {
			fullname: 'fulanah binti fulan',
			username: 'fulanah123',
			password: 'fulanah123',
			gender: 'female',
			job_id: '1',
			key: '1' //PRIMARY KEY username
		}

		axios.put(
			'http://localhost:8080/admin/accounts',
			body,
			{ headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "success to update account for fulanah binti fulan",
			"createAt": "20/2022 16:45:32"
		}

## Remove account

### Request

`DELETE /admin/accounts`

		//Create body request
		const body = {
			username: 'fulanah123'
		}

		axios.delete(
			'http://localhost:8080/admin/accounts',
			{ body, headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response 

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "success to remove fulanah123 from list accounts",
			"createAt": "20/2022 16:45:32"
		}

## Get profile for spesific account

### Request

`GET /accounts/profile`

		axios.get(
			'http://localhost/8080/accounts/profile',
			{ headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": {
				profile: {
					"fullname": "fulan bin fulan",
					"username": "fulan123",
					"password": "fulan123",
					"status_vote": 0,
					"jobs_name": "Dosen",
					"gender": "male",
					"timestamp": 0
				}
			},
			"createAt": "20/2022 16:45:32"
		}

## Submit vote

### Request

`POST /accounts/vote/:candidate`

		//Get candidate_id
		const candiateID = 1
		
		axios.post(
			'http://localhost:8080/accounts/vote' + candidateID,
			{ headers: { authorization: 'YOUR JWT TOKEN'} }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "Your vote success to submit",
			"createAt": "20/2022 16:45:32"
		}

## Check if the account is logged in

### Request

`GET /auth`

		axios.get(
			'http://localhost:8080/auth',
			{ headers: { authorization: 'YOUR JWT TOKEN' } }
		)

### Response

		{
			"status": true,
			"code": 200,
			"message": 'success',
			"response": "Your account verified",
			"createAt": "20/2022 16:45:32"
		}

## Error handling

### This is example response error from server

		{
			"status": true,
			"code": 403,
			"message": 'Ilegal access',
			"response": "Just admin can access this resource",
			"createAt": "20/2022 16:45:32"
		}

### You can get the errror message using axios error handling

		axios.get(
			'http://localhost:8080/admin/accounts',
			{ headers: { athorization: 'TOKEN NOT FROM ADMIN' } },
		)
		.then( res => console.log(res.data) )
		.catch( err => {
			if ( err.response ) console.error(err.response.data) //response error from server 	
		})

## Thanks 
- Support me with a cup of coffee and other snacks [here ..](https://saweria.co/orabdillh)
- Don't forget to give me star in this repository 🙏🏻🙏🏻
- See my other projects on instagram [@or.abdillh](http://www.instagram.com/or.abdillh)

[Oka R Abdillah ](http://github.com/or-abdillh)
<br>
Last edited on : 20/02/2022
