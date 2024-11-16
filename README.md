# FinTrack 

FinTrack is a streamlined personal expense tracker built to help users manage and monitor their finances with ease. FinTrack empowers users with intuitive tools to categorize expenses, track spending habits, and visualize financial trends, making it an ideal solution for anyone seeking financial clarity and control.

This project is developed using Java 11.0.17, Spring Boot 2.7.10 for the Backend and NextJS 13.4.0, TypeScript 5.6.3 for the Frontend.

## Features

- User registration
- User login
- Dashboard
  - Adding Transactions
  - Deleting Transactions
- Analysis
- Logging out

## Installation and Setup

### I. Backend and Database

1. In terminal, navigate to the `backend` directory
```
cd backend
```

2. Run the following command to start the Spring Boot application:

```
gradle bootRun
```

The backend server should now be running on `http://localhost:8080`.

### II. Frontend

1. Navigate to the `frontend` directory
```
cd frontend
```
2. Install the dependencies using the following command:
```
pnpm install
```

3. Start the development server using the following command:
```
pnpm dev
```

The frontend application should now be running on `http://localhost:3000`.

## III. Usage

1. Open a web browser and navigate to `http://localhost:3000`.
2. Create an account on the Signup Page if you don't have an account already.
3. Log in using the registered account credentials by clicking the "Login" link and filling out the login form.
4. On the dashboard, add/delete transactions to track your daily expenses.
5. To view trends and statistics, navigate to the Analytics page.
6. Log out by clicking the "Logout" button on the top right.

### * Accessing Database

This project uses the PostgreSQL Database as the default database for development purposes. To access the Database, follow these steps:

1. Make sure the backend server is running.

2. Visit `http://localhost:8080`. In your first login, you may need to enter the default authorization credentials. Default username: myuser, and default password: mypassword.

3. In the "JDBC URL" field, enter the URL specified in the `application.properties` file of the backend. The default URL is `jdbc:h2:mem:testdb`.

4. Enter your username and password (as specified in the `application.properties` file) in the "User Name" and "Password" fields, respectively. The default username is `sa` and the default password is an empty string.

5. Click "Connect" to access the Database console.

-------------------------------

### Reference Documentation

For further reference, please consider the following sections:

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.7.10/gradle-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.7.10/gradle-plugin/reference/html/#build-image)
* [Spring Security](https://docs.spring.io/spring-boot/docs/2.7.10/reference/htmlsingle/#web.security)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.7.10/reference/htmlsingle/#web)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.7.10/reference/htmlsingle/#data.sql.jpa-and-spring-data)

### Guides

The following guides illustrate how to use some features concretely:

* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)

### Additional Links

These additional references should also help you:

* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)

