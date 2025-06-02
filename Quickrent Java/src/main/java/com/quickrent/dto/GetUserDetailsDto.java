package com.quickrent.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetUserDetailsDto {
    private String firstname;
    private String lastname; 
    private String gender;
    private String phoneNo;
    private String email;
    private String password;
}
