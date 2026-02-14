# ✅ API Test Report & Evidence

This document serves as a record of API tests performed, the endpoints tested, expected and actual results, and any supporting evidence such as payloads, responses, and screenshots (img/if applicable).

---

## 🧪 Test Overview

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **Project**        | `aluga-api`                    |
| **Environment**    | `Development`     |
| **Tester**         | `Luiz Andrade`                            |
| **Date**           | `2025-10-03`                           |
| **Tool Used**      | Bruno / Curl / Swagger UI / etc.     |
| **Test Status**    | ✅ Passed / ❌ Failed / ⚠️ Partial       |

---

## 🔁 Test Cases

### 1. `POST /login/`

**Purpose**: Log in the system.

- **Request**
  - **Method**: `POST`
  - **URL**: `/users/`
  
- **Expected Result**: HTTP `200 OK` with a list of users.
- **Actual Result**: ✅ `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Login successful",
    "token_content": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNTEyOTlhLWJiMzAtNGUzZC05ZmMzLTNmNjQ3MjhhNmI2NCIsInJvbGUiOiJzeXNBZG1pbiIsImV4cCI6MTc1OTU5MzM5MX0.Ndy6aH8NbqXjAgFE9PhCDCqBcnXr7ouZfMkukR5KBs0",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNTEyOTlhLWJiMzAtNGUzZC05ZmMzLTNmNjQ3MjhhNmI2NCIsInJvbGUiOiJzeXNBZG1pbiIsImV4cCI6MTc1OTU5MzYzMX0.y9tZaFLKScqr4pC-Waqyr8NGX9wRbjcLMQkDQfNdHH0",
      "token_role": "bearer"
    }
  }
- Evidences:
![alt text](img/image-37.png)

### 2. `POST /login/`

**Purpose**: Fail to log in the system.

- **Request**
  - **Method**: `POST`
  - **URL**: `/users/`
  
- **Expected Result**: HTTP `401 Unauthorized`.
- **Actual Result**: ✅ `401 Unauthorized`
- **Response Body**:
  ```json
  {
    "detail": "Invalid username or password"
  }
- Evidences:
![alt text](img/image-38.png)

### 3. `POST /refresh/`

**Purpose**: Refresh the tokens.

- **Request**
  - **Method**: `POST`
  - **URL**: `/users/`
  - **Headers**: `Authorization: Bearer <token>` or `credentials: include <cookie>`
  
- **Expected Result**: HTTP `200 OK`.
- **Actual Result**: ✅ `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Token refreshed successfully",
    "token_content": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNTEyOTlhLWJiMzAtNGUzZC05ZmMzLTNmNjQ3MjhhNmI2NCIsInJvbGUiOiJzeXNBZG1pbiIsImV4cCI6MTc1OTU5MzU1MH0.sP06un4mJEW0fMYuzkRt7-gQjzd1PRb9AAyxDqgJcog",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNTEyOTlhLWJiMzAtNGUzZC05ZmMzLTNmNjQ3MjhhNmI2NCIsInJvbGUiOiJzeXNBZG1pbiIsImV4cCI6MTc1OTU5Mzc5MH0.-5pnhK3EMubIP8ax7je9CoXo4VmdsiAd-WUaRUlStdM",
      "token_role": "bearer"
    }
  }
- Evidences:
![alt text](img/image-39.png)


### 4. `POST /refresh/`

**Purpose**: Fail to refresh the tokens.

- **Request**
  - **Method**: `POST`
  - **URL**: `/users/`
  - **Headers**: `Authorization: Bearer <token>` or `credentials: include <cookie>`
  
- **Expected Result**: HTTP `200 OK`.
- **Actual Result**: ✅ `200 OK`
- **Response Body**:
  ```json
  {
    "detail": "No authentication data found, please authenticate"
  }
- Evidences:
![alt text](img/image-40.png)

