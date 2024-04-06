package com.dailycodebuffer.usersystem.controller;

import com.dailycodebuffer.usersystem.model.User;
import com.dailycodebuffer.usersystem.service.UserService;
import jakarta.persistence.Id;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserCantroller {
    private final UserService userService;

    public UserCantroller(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/users")
    public User saveUser(@RequestBody User user){
       return userService.saveUser(user);
    }
    @GetMapping("/users")
    public List<User> getAllUsers(){
    return  userService.getAllUsers();
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        User user=null;
        user =userService.getUserById(id);
        return  ResponseEntity.ok(user);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable("id") Long id){
        boolean deleted=false;
        deleted= userService.deleteUser(id);
        Map<String,Boolean> response= new HashMap<>();
        response.put("deleted",deleted);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,
                                           @RequestBody User user){
        user =userService.upddateUser(id, user);
        return ResponseEntity.ok(user);
    }


}
