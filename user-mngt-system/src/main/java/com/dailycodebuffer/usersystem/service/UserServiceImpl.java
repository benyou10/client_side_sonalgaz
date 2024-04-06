package com.dailycodebuffer.usersystem.service;

import com.dailycodebuffer.usersystem.entity.UserEntity;
import com.dailycodebuffer.usersystem.model.User;
import com.dailycodebuffer.usersystem.repository.UserRepsitory;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
    public class UserServiceImpl implements  UserService{
        private UserRepsitory userRepsitory;

        public UserServiceImpl(UserRepsitory userRepsitory) {
            this.userRepsitory = userRepsitory;
        }

        @Override
        public User saveUser(User user) {
            UserEntity userEntity = new UserEntity();
            BeanUtils.copyProperties(user, userEntity);
            userRepsitory.save(userEntity);
            return user;
        }

    @Override
    public List<User> getAllUsers() {
            List<UserEntity> userEntities= userRepsitory.findAll();


            List<User> users= userEntities.stream().map(userEntity -> new User(
                    userEntity.getId(),
                    userEntity.getFirstName(),
                    userEntity.getLastName(),
                    userEntity.getEmailId(),
                    userEntity.getNf(),
                    userEntity.getRole(),
                    userEntity.getDepartment()

            ))
                    .collect(Collectors.toList());

        return users;
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity= userRepsitory.findById(id).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity,user);
            return user;
    }

    @Override
    public boolean deleteUser(Long id) {
            UserEntity user = userRepsitory.findById(id).get();
            userRepsitory.delete(user);
        return true;
    }

    @Override
    public User upddateUser(Long id, User user) {
            UserEntity userEntity= userRepsitory.findById(id).get();
            userEntity.setEmailId(user.getEmailId());
            userEntity.setRole(user.getRole());
            userEntity.setNf(user.getNf());
            userEntity.setDepartment(user.getDepartment());

            //userEntity.setFirstName(user.getFirstName());
            //userEntity.setLastName(user.getLastName());
        userRepsitory.save(userEntity);


        return user;
    }

}
