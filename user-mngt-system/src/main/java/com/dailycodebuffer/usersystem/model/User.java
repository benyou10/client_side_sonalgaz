package com.dailycodebuffer.usersystem.model;

public class User {
    public long getId() {
        return id;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Long getNf() {
        return Nf;
    }

    public void setNf(Long nf) {
        Nf = nf;
    }

    public User(long id, String firstName, String lastName, String emailId, Long Nf, String role, String department) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.Nf= Nf;
        this.role=role;
        this.department=department;


    }

    public User() {

    }

    private Long id;
    private String department;
    private String firstName;
    private String lastName;
    private String emailId;
    private  Long Nf;
    private String role;

}
