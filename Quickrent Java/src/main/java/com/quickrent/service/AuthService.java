package com.quickrent.service;

import com.quickrent.dto.LoginRequestDTO;
import com.quickrent.dto.SignupRequestDTO;
import com.quickrent.dto.VerifyEmailDTO;

public interface AuthService {

	String authenticate(LoginRequestDTO dto);

	String addUser(VerifyEmailDTO dto);
	
	String sendOtp(SignupRequestDTO dto);

	/*String verifyAdmin(LoginRequestDTO dto);

	String addAdmin(LoginRequestDTO dto);*/

}
