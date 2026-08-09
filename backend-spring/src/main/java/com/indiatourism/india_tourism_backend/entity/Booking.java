package com.indiatourism.india_tourism_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Booking {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String destinationName;
    private String packageName;
    private BigDecimal packagePrice;
    private LocalDate travelDate;
    private Integer numberOfTravelers;
    private String specialRequests;
    private LocalDateTime bookingDate;
    private String status;

    // Default constructor
    public Booking() {}

    // Constructor for creating new booking
    public Booking(String name, String email, String phone, String destinationName, 
                   String packageName, BigDecimal packagePrice, LocalDate travelDate, 
                   Integer numberOfTravelers, String specialRequests) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.destinationName = destinationName;
        this.packageName = packageName;
        this.packagePrice = packagePrice;
        this.travelDate = travelDate;
        this.numberOfTravelers = numberOfTravelers;
        this.specialRequests = specialRequests;
        this.status = "PENDING";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDestinationName() { return destinationName; }
    public void setDestinationName(String destinationName) { this.destinationName = destinationName; }

    public String getPackageName() { return packageName; }
    public void setPackageName(String packageName) { this.packageName = packageName; }

    public BigDecimal getPackagePrice() { return packagePrice; }
    public void setPackagePrice(BigDecimal packagePrice) { this.packagePrice = packagePrice; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public Integer getNumberOfTravelers() { return numberOfTravelers; }
    public void setNumberOfTravelers(Integer numberOfTravelers) { this.numberOfTravelers = numberOfTravelers; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }

    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", destinationName='" + destinationName + '\'' +
                ", packageName='" + packageName + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}