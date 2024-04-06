package com.dailycodebuffer.usersystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {
   @Id
    private long id;
    private String department;
    private String firstName;
    private String lastName;
    private String emailId;
    private Long Nf;
    private String role;

    public UserEntity() {


        this.id = id;
        this.department = department;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.Nf= Nf;
        this.role= role;
    }



    public long getId() {
        return id;
    }

    public Long getNf() {
        return Nf;
    }

    public void setNf(Long nf) {
        Nf = nf;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getRole() {
        return role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
