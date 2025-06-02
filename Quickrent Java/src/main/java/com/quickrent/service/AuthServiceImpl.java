package com.quickrent.service;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

//import com.quickrent.dao.AdminDao;
import com.quickrent.dao.UserDao;
import com.quickrent.dto.LoginRequestDTO;
import com.quickrent.dto.SignupRequestDTO;
import com.quickrent.dto.VerifyEmailDTO;
//import com.quickrent.pojo.Admin;
import com.quickrent.pojo.User;
import java.util.Random;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
	@Autowired
	UserDao userDao;
	//@Autowired
	//AdminDao adminDao;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AuthenticationManager authManager; 
	@Autowired
	JwtService jwtService;
	@Autowired
	ModelMapper mapper;
	@Autowired
	EmailService emailService;
	@Autowired
	RedisService redisService;
	
	@Override
	public String authenticate(LoginRequestDTO dto) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        User user = userDao.findByEmail(dto.getEmail())
        		.orElseThrow();
        Map<String, Object> claims = new HashMap<>();
        claims.put("Id", user.getUsersid());
        claims.put("Email", user.getEmail());
        claims.put("role", user.getUserRole());
        return jwtService.generateToken(claims, user);
	}

	@Override
	public String addUser(VerifyEmailDTO dto) {
		// TODO Auto-generated method stub
		//System.out.println("inside addUser");
		if(dto.getOtp().equals(redisService.get(dto.getEmail(), String.class))) {
			SignupRequestDTO userDto = redisService.get("data_"+dto.getEmail(), SignupRequestDTO.class);
			User user = mapper.map(userDto, User.class);
			String encryPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encryPassword);
			userDao.save(user);
			return "Data Added Successfully";
		}else {
			throw new RuntimeException("Invalid OTP !!!");
		}
	}
	
    private String generateOTP(){
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email,String emailBody){
        String subject = "Email verification";
        String body = emailBody;
        emailService.sendEmail(email,subject,body);
    }
    
    private String generateEmailBody(String name, String otptext) {
        String emailbody = "<div style='width: 100%; background-color:grey'>";
        emailbody += "<h1>Hi " + name + ", Thanks for registering</h1>";
        emailbody += "<h2>Please enter OTP text and complete the registeration</h2>";
        emailbody += "<h2>OTP Text is: " + otptext + "</h2>";
        emailbody += "</div>";
        return emailbody;
    }

	@Override
	public String sendOtp(SignupRequestDTO dto) {
		// TODO Auto-generated method stub
		String otp = generateOTP();
		String emailBody = generateEmailBody(dto.firstname, otp);
		
		redisService.set(dto.getEmail(), otp, 300l);
		redisService.set("data_" + dto.getEmail(), dto, 300l);
		
		sendVerificationEmail(dto.getEmail(), emailBody);
		
		return "OTP Sent Successfully";
	}

	/*@Override
	public String verifyAdmin(LoginRequestDTO dto) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        Admin admin = adminDao.findByEmail(dto.getEmail()).orElseThrow();
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "Admin");
        return jwtService.generateToken(claims, admin);
	}

	@Override
	public String addAdmin(LoginRequestDTO dto) {
		Admin admin = mapper.map(dto, Admin.class);
		String encryPassword = passwordEncoder.encode(admin.getPassword());
		admin.setPassword(encryPassword);
		adminDao.save(admin);
		return "Admin Registered Successfully";
	}*/
	
}
