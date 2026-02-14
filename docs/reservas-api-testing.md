# ✅  Relatório de Testes de API & Evidências

Este documento serve como um registro dos testes de API realizados, os endpoints testados, resultados esperados e reais, e quaisquer evidências de suporte, como payloads, respostas e capturas de tela (img/se aplicável).

---

## 🧪 Visão Geral dos Testes

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **Project**        | `aluga-api`                    |
| **Environment**    | `Development`     |
| **Tester**         | Victor Pereira                        |
| **Date**           | `2025-10-03`                           |
| **Tool Used**      | Insomnia / Curl / Swagger UI / etc.     |

---

## 🔁 Casos de Teste

### 1. `POST /reservas/`

**Objetivo**: Criar uma reserva.

- Método: POST
- URL: /reservas
- Parâmetros:
  - param1: {
  "room_id": 222,
  "date_checkin": "2025-12-20T14:00:00",
  "date_checkout": "2025-12-30T12:00:00"
}
- Resposta:
  - Sucesso (200 OK)
    ```
    {
	"message": "Success",
	"data": {
	"id": "64998ae5-aa56-4aed-aa60-2310c671f29d",
	"user_id": "123",
	"room_id": 222,
	"date_checkin": "2025-12-20T14:00:00",
	"date_checkout": "2025-12-30T12:00:00"
			}
    }
	```
- Evidências:
![reserva-post-1](https://github.com/user-attachments/assets/cd0db73f-d7f8-4f9e-be47-d1c879dd7fec)
***

### 2. `GET /reservas/`

**Objetivo**: Mostrar as reservas do usuário logado.

- Método: GET
- URL: /reservas
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": {
		"id": "64998ae5-aa56-4aed-aa60-2310c671f29d",
		"user_id": "123",
		"room_id": 222,
		"date_checkin": "2025-12-20T14:00:00",
		"date_checkout": "2025-12-30T12:00:00"
			  }
    }
    ```
   - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": []
    }
    ```
- Evidências:
![reserva-get-1](https://github.com/user-attachments/assets/efa17946-5278-4440-9f3f-e52bae70a658)
![reserva-get-4](https://github.com/user-attachments/assets/7737c314-a2bb-49d7-a124-1f91a1dc6e0f)
***

### 3. `GET /reservas/{id_reserva}`

**Objetivo**: Checar a existência de uma reserva específica de um usuário.

- Método: GET
- URL: /reservas/{id_reserva}
- Resposta:
	- Sucesso (200 OK)
	    ```
	    {
	      "message": "Success",
	      "data": {
		"id": "64998ae5-aa56-4aed-aa60-2310c671f29d",
		"user_id": "123",
		"room_id": 222,
		"date_checkin": "2025-12-20T14:00:00",
		"date_checkout": "2025-12-30T12:00:00"
				  }
	     }
	    ```
	- Erro (404 Not Found)
    ```
    {
      "message": "Erro",
      "data": {
	"detail": "Reservation not found"
			  }
    }
    ```
- Evidências:
![reserva-get-2](https://github.com/user-attachments/assets/c9f419d0-c43e-4593-95eb-821584fb1fd6)
![reserva-get-3](https://github.com/user-attachments/assets/deda157c-3218-4e8c-bdfe-17f0268bd17c)

***

### 4. `PATCH /reservas/{id_reserva}`

**Objetivo**: Atualizar dados de uma reserva específica.

- Método: PATCH
- URL: /reservas/{id_reserva}
- Resposta:
  - Sucesso (200 OK)
    ```
    {
	"message": "Success",
	"data": {
	"id": "64998ae5-aa56-4aed-aa60-2310c671f29d",
	"user_id": "123",
	"room_id": 999,
	"date_checkin": "2025-12-22T14:00:00",
	"date_checkout": "2025-12-28T12:00:00"
			}
    }
	```
	
  - Erro (404 Not Found)
    ```
     {
    "message": "Erro",
    "data":  {
	"detail": "Reservation not found"
			 }
    }
	```	
- Evidências:
![reserva-patch-1](https://github.com/user-attachments/assets/d3c9f33b-1aff-496a-80fc-feafd7e63d3a)
![reserva-patch-2](https://github.com/user-attachments/assets/aa0f6201-27cb-4fb9-a2d7-cef864b0af40)

***

### 5. `DELETE /reservas/{id_reserva}`

**Objetivo**: Deletar uma reserva específica.

- Método: DELETE
- URL: /reservas/{id_reserva}
- Resposta:
  - Sucesso (200 OK)
    ```
    {
    "message": "Success",
    "data": {
	"message": "Reservation 64998ae5-aa56-4aed-aa60-2310c671f29d deleted successfully"
			}
    }
	```
  - Erro (404 Not Found)
	 ```
    {
    "message": "Erro",
    "data": {
	"detail": "Reservation not found"
			}
    }
	```
- Evidências:
![reserva-delete-1](https://github.com/user-attachments/assets/2746a29a-2c72-47df-8da0-6033a19e3e71)
![reserva-delete-2](https://github.com/user-attachments/assets/bc417bfd-a1d6-48dc-b122-7d15865ba01e)
