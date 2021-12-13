# Nuom's Backend interview 

If you are reading this, it's probably because you are thinking of joining our engineering team at [nuom](https://nuom.co.uk). With this test, we will assess:

* Your capacity to write backend code
* Your capacity to create an API using best practices
* Your capacity to write clean code
* Your capacity to communicate your decisions

For this test you are free to use the language and framework which is the most comfortable to you. If you have no 
preference, we recommend using [NodeJS](https://nodejs.org) language with [NestJS](https://nestjs.com/) framework.

You are free to use the database of your choice, we recommend [SQLite](https://www.sqlite.org/index.html).


## Context

You will be building a training booking system for a training company.

- Each booking will need a **course**, a **location**, a **trainer**, and a *list* of **students**.
- Each booking will have a **start date** and an **end date**.
- Each booking will have a *flag* specifying if it is **mandatory** for obtaining of a certificate.
- Each booking can have **comments** added. This is a free text field for adding requirements.
- Each course has a **level** (from 1 to 5) and a **topic** (*Frontend*, *Backend*, *Fullstack*, *Cloud*, or 
  *Security*).
- Each Trainer has also a **level** and **competencies** which represents the list of topic in which they are 
  competent. To keep things simple, we assume the Trainer level is the same for every topic they know.
- In order for a trainer to teach a class, they need to know that topic and to be at least at the same level. For 
  instance to teach a level 2 Frontend course, a Trainer needs to have *Frontend* in their **competencies** list and 
  be at least level 2.
- Some **Trainers** might need wheelchair, so they can only teach in a **Location** that is wheelchair accessible


## Data structure

The data for the **courses**, **locations**, and **trainers** is in their respective JSON files in the initial data 
folder

### Course
* name: String
* topic: "Frontend" | "Backend" | "Fullstack" | "Cloud" | "Security"
* level: Int (from 1 to 5)
* duration: Int (in days from 1 to 3)

### Location
* name: String
* city: String
* latitude: String (latitude GPS coordinates)
* longitude: String (longitude GPS coordinates)
* wheelchairAccessible: Boolean
* country: String (country name only United Kingdom for this exercise)

### Trainer
* firstName: String
* lastName: String
* level: Int (from 1 to 5)
* competencies: Array<String> (List of topics)
* needWheelchair: Boolean
* city: String
* country: String (country name only United Kingdom for this exercise)

### Student
* email: string

## Exercise:
To complete this test, you will need to complete the following tasks:

1. Load data from *courses.json*, *location.json*, and *trainers.json* into the database. This is a one off 
   operation. Can be done by a script or a REST endpoint
2. Create an Endpoint that based on a **Course**, returns all the **Trainers** available to teach this course.
3. Create an Endpoint that returns all the **Locations** in a **City**
4. Create an Endpoint that creates a **Booking**. That endpoint needs to make sure all the conditions are met for 
   the booking.
5. Create an Endpoint that add an extra **Student** to a **Booking**
6. Create an Endpoint that removes a **Student** from a **Booking**
7. Create an Endpoint to delete a **Booking**

### Bonus tasks
1. Protect some endpoints with Basic Auth
2. Protect some endpoints with API key
3. Protect some endpoints with JWT
4. Returns all the available **Locations** within a specific Radius based on GPS coordinates
5. Add logic to the Booking creation endpoint (from task 4) to check if the Trainer is available on the specified dates
6. Add a UI to create a Booking (can be done with the frontend framework of your choice, we recommend [VueJS](https://vuejs.org/))
7. Create [OpenAPI](https://swagger.io/specification/) documentation. You can use something like [Swagger]
   (https://swagger.io/)

## How to submit:

* Clone this repository to you local machine
* Create a new branch for your submission
* Do you work on that branch
* Once you are done, submit a PR with your work