package com.quickrent.dto;

import com.quickrent.pojo.UserRole;

import lombok.Data;

@Data
public class UserResponseDto {

	private Integer usersid;

	private UserRole userRole;

	private String firstname;

	private String lastname;

	private String email;

	private String phoneNo;

	private Boolean isVerified;

	private String aadharCardNo;

	private String aadharCardFile;

	private String panCardNo;

	private String panCardFile;

}
