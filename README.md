
# Evote Rest API V.3.0
Electronic Vote System by HIMA TI Politeknik Hasnur

This is an officially API documentation for using this appliaction


## Features

- CRUD Candidate
- CRUD User
- CRUD Event
- Quick Count


## Tech Stack

**Server:** Node, Express, Sequelize

**DBMS:** PostgreSQL


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Key | Description                |
| :-------- |:------------------------- |
| `DATABASE_URL` | **Required**. connection to your DB |
| `JWT_SECRET_KEY` | **Required**. random string |

## Run Locally

Clone the project

```bash
  git clone https://github.com/or-abdillh/evote-rest-api
```

Go to the project directory

```bash
  cd evote-rest-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference

### 1. Authentication

#### 1.1 Login 
```http
  POST /login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your account username |
| `password` | `string` | **Required**. Your account password |

```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIwMDEiLCJwYXNzd29yZCI6InVzZXIwMDEiLCJyb2xlIjoiZ2VuZXJhbCIsImlhdCI6MTY2OTEyMzc5MywiZXhwIjoxNjY5MTI3MzkzfQ.9m6R508ApGIYTnJn3hch5D66OThAxvLeDa4yt5USe2s",
        "role": "general"
    }
}
```

#### 1.2 Logout

```http
  PUT /logout
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id from user account |

### 2. Superadmin

#### 2.1 Validate JWT

```http
  GET /admin/auth
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Your JWT |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": "user has authenticated"
}
```

#### 2.2 Get Dashboard

```http
  GET /admin/dashboard
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Your JWT |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "candidates": 2,
        "participants": 10,
        "userHasVoted": 0,
        "participations": "0.0%"
    }
}

```
#### 2.3 Get Quick Count

```http
  GET /admin/quick-count
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Your JWT |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": [
        {
            "candidate": "Novi Marliana - Oka R. Abdillah",
            "number": 1,
            "decimal": 0,
            "percent": "0%",
            "vote": 0
        },
        {
            "candidate": "Mina Fitria - Ahmad Naufal",
            "number": 2,
            "decimal": 0,
            "percent": "0%",
            "vote": 0
        }
    ]
}
```

#### 2.4 Get all users

```http
    GET /admin/users
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Your JWT |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": [
        {
            "id": 174,
            "username": "user002",
            "password": "8b63b2922634ffaeab2019e50f13dd20",
            "fullname": "Pemilih 02",
            "token": null,
            "status": null,
            "candidate_id": null,
            "job": "mahasiswa",
            "gender": "female",
            "role": "general",
            "timestamp": null,
            "createdAt": "2022-11-04T16:58:01.241Z",
            "updatedAt": "2022-11-04T16:58:01.241Z"
        }
    ]
}
```

#### 2.5 Create new user

```http
    POST /admin/user
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |
| `fullname`      | `string` | **Required** |
| `job`      | `string` | **Required** |
| `gender`      | `string` | **Required** |

#### 2.6 Delete user

```http
    DELETE /admin/user/:id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

### 2.7 Get detail user

```http
    GET /admin/user/:id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "id": 176,
        "username": "user004",
        "password": "b0253a17d6974cf8d66886aa97d839aa",
        "fullname": "Pemilih 04",
        "token": null,
        "status": null,
        "candidate_id": null,
        "job": "dosen",
        "gender": "male",
        "role": "general",
        "timestamp": null,
        "createdAt": "2022-11-04T16:58:01.241Z",
        "updatedAt": "2022-11-04T16:58:01.241Z"
    }
}
```

#### 2.8 Update user

```http
    PUT /admin/user/:id
```
| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |
| `fullname`      | `string` | **Required** |
| `job`      | `string` | **Required** |
| `gender`      | `string` | **Required** |

#### 2.9 Delete all user

```http
    DELETE /admin/user
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

#### 2.10 Import user from Excel

```http
    POST /admin/user/excel
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Files | Mimetype     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `excel`      | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | **Required** |

[Example excel format](https://github.com)

#### 2.11 Export all user to Excel

```http
    GET /admin/user/excel
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

#### 2.12 Get all candidate

```http
    GET /admin/candidate
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": [
        {
            "id": 5,
            "chairman_name": "Novi Marliana",
            "chairman_image": "storage/chairman_image_1667488483702.jpg",
            "vice_chairman_name": "Oka R. Abdillah",
            "vice_chairman_image": "storage/vice_chairman_image_1667488483702.jpg",
            "candidate_number": 1,
            "vision": "Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
            "mission": "Sed porttitor lectus nibh. Curabitur aliquet quam id dui posuere blandit. Curabitur arcuerat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat.",
            "createdAt": "2022-11-03T15:14:13.505Z",
            "updatedAt": "2022-11-03T15:14:43.704Z"
        }
    ]
}
```

#### 2.13 Create new candidate

```http
    POST /admin/candidate
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chairman_name`      | `string` | **Required** |
| `vice_chairman_name`      | `string` | **Required** |
| `candidate_number`      | `string` | **Required** |
| `vision`      | `string` | **Required** |
| `mission`      | `string` | **Required** |

| Files | Mimetype     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chairman_image`      | `JPG PNG JPEG` | **Required** |
| `vice_chairman_image`      | `JPG PNG JPEG` | **Required** |

#### 2.14 Get detail candidate

```http
    GET /admin/candidate/:id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "id": 5,
        "chairman_name": "Novi Marliana",
        "chairman_image": "storage/chairman_image_1667488483702.jpg",
        "vice_chairman_name": "Oka R. Abdillah",
        "vice_chairman_image": "storage/vice_chairman_image_1667488483702.jpg",
        "candidate_number": 1,
        "vision": "Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
        "mission": "Sed porttitor lectus nibh. Curabitur aliquet quam id dui posuere blandit. Curabitur arcuerat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat.",
        "createdAt": "2022-11-03T15:14:13.505Z",
        "updatedAt": "2022-11-03T15:14:43.704Z"
    }
}
```

#### 2.15 Update candidate

```http
    PUT /admin/candidate/:id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chairman_name`      | `string` | **Required** |
| `vice_chairman_name`      | `string` | **Required** |
| `candidate_number`      | `string` | **Required** |
| `vision`      | `string` | **Required** |
| `mission`      | `string` | **Required** |

| Files | Mimetype     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chairman_image`      | `JPG PNG JPEG` | **Required** |
| `vice_chairman_image`      | `JPG PNG JPEG` | **Required** |

#### 2.16 Delete candidate

```http
    DELETE /admin/candidate/:id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

#### 2.17 Delete all candidate

```http
    DELETE /admin/candidate
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

#### 2.18 Get event detail

```http
    GET /admin/event
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "id": 1,
        "title": "Pellentesque in ipsum id orci porta dapibus",
        "start": "2022-11-03T14:49:29.000Z",
        "end": "2022-11-05T14:49:29.000Z",
        "passcode": "HIMATI2021",
        "createdAt": "2022-11-03T14:50:22.074Z",
        "updatedAt": "2022-11-04T14:09:13.651Z",
        "hasVoted": 0
    }
}
```

#### 2.19 Update event detail

```http
    PUT /admin/event
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** |
| `start`      | `date` | **Required** |
| `end`      | `date` | **Required** |
| `passcode`      | `string` | **Required** |

### 3. User

#### 3.1 Authentication

```http
    GET /user/auth
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": "user has authenticated"
}
```

#### 3.2 Get profile

```http
    GET /user/profile/:id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "id": 176,
        "username": "user004",
        "password": "e9335e177b288c7af4af8f1225c3f938",
        "fullname": "Pemilih 04",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIwMDQiLCJwYXNzd29yZCI6ImRlZmF1bHQxMjMiLCJyb2xlIjoiZ2VuZXJhbCIsImlhdCI6MTY2OTEyODM1OCwiZXhwIjoxNjY5MTMxOTU4fQ.kOI7oTK1g7wjJNmzqdhEeYdEGKltIP1Y1C-q4MQnKPg",
        "status": null,
        "candidate_id": null,
        "job": "dosen",
        "gender": "male",
        "role": "general",
        "timestamp": null,
        "createdAt": "2022-11-04T16:58:01.241Z",
        "updatedAt": "2022-11-22T14:45:58.070Z"
    }
}
```

#### 3.3 Get all candidate

```http
    GET /user/candidate
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": [
        {
            "id": 5,
            "chairman_name": "Novi Marliana",
            "chairman_image": "storage/chairman_image_1667488483702.jpg",
            "vice_chairman_name": "Oka R. Abdillah",
            "vice_chairman_image": "storage/vice_chairman_image_1667488483702.jpg",
            "candidate_number": 1,
            "vision": "Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
            "mission": "Sed porttitor lectus nibh. Curabitur aliquet quam id dui posuere blandit. Curabitur arcuerat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat.",
            "createdAt": "2022-11-03T15:14:13.505Z",
            "updatedAt": "2022-11-03T15:14:43.704Z"
        }
    ]
}
```

#### 3.4 Get event detail

```http
    GET /user/event
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

Response :
```json
{
    "status": true,
    "code": 200,
    "message": "Success",
    "results": {
        "id": 1,
        "title": "Pellentesque in ipsum id orci porta dapibus",
        "start": "2022-11-03T14:49:29.000Z",
        "end": "2022-11-05T14:49:29.000Z",
        "passcode": "HIMATI2021",
        "createdAt": "2022-11-03T14:50:22.074Z",
        "updatedAt": "2022-11-04T14:09:13.651Z",
        "hasVoted": 0
    }
}
```

#### 3.5 Submit vote

```http
    PUT /user/vote/:user_id/:candidate_id
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required** |

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:user_id`      | `string` | **Required** |
| `:candidate_id`      | `string` | **Required** |


## Authors

- [Oka R Abdillah](https://github.com/or-abdillh)

