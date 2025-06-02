package com.quickrent.dto;

import com.quickrent.pojo.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SignupRequestDTO {
    public String firstname;
    public String lastname;
    public String email;
    public String password;
    public String phoneNo;
    public UserRole userRole;
    public Boolean isVerified = true;
}
