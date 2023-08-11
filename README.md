# Flight-booking(Aegis Covent)

The Work Flow of this Flight Booking will look like this :

![Mind-Map](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/MindMap.png)

## Demonstration (POSTMAN)

## User Roles:

### 1.User first Sign-up

![Sign-up](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/Signup%20route.png)

After the **user signup** their info is saved in DataBase and token is generated which get stored using browser Cookies

![cookie-value](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/storing%20token%20in%20cookie.png)

### 2. Login by user

![login-bys-user](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/login%20by%20user.png)

Same as signup the token will get stored in the form of cookie.

### 3. Flight Booking/Pricing Info

As soon as user hit the Booking route provided with **Source, Destination and Date** all the Information related to Airport and Flight fare will be shown like this:

> The route is procted with isLoggedIn middleware

![booking-details](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/Booking%20details.png)
The Complete Info will Look like this

```
{
    "bookingBy": "Admin",
    "email": "admin@gmail.com",
    "dateOfBooking": "2023/08/15",
    "airportDetails": {
        "source": {
            "iata": "JAI",
            "name": "Jaipur International Airport",
            "city": "Jaipur"
        },
        "destination": {
            "iata": "MAA",
            "name": "Chennai International Airport",
            "city": "Chennai"
        }
    },
    "fareDetails": [
        {
            "name": "Indigo Airline",
            "ICAO": "IGO",
            "cost": 26866
        },
        {
            "name": "AirAsia",
            "ICAO": "IAD",
            "cost": 30080
        },
        {
            "name": "Akasa",
            "ICAO": "AKJ",
            "cost": 33135
        }
    ]
}
```

> The Price will get determined on the bases of Date of Booking
> If the user book within **48 hours** from current time then the Price will be **Extermely High**
> If the user book within **1 Week** form current time then the Price will be **Moderate**
> For rest of the condition the Price will be **LOW**

## ADMIN ROLE

The Admin account creation is same as user but the **role** will be marked as **admin**

> Routes of admin is procted with customeRole("admin") middleware

### 1.Admin adding Airline

![admin-adding-airline](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/Adding%20airline.png)

Here the admin setting up the Name, 3-word-letter-code of Airline and **cost** of airline based on
per-kilometer

### 2. Admin updating Airline cost

![admin-update-cost](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/Updating%20details.png)  
Admin can **update cost** based on the change required.

### 3. Admin removing Airline

![admin-remove-airline](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/deleting%20airline.png)

### 4. Admin displaying all Airline info

![admin-all-airline-info](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/all%20airline%20info.png)

### 5. Admin displaying all the users

![all-users-info](https://github.com/Dharansh-Neema/Flight-booking/blob/main/images/Al%20users.png);
