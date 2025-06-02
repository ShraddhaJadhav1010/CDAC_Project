using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Quickrent.DTO.UserDTO;
using Quickrent.Model;
using Quickrent.Repository.Interface;
using Quickrent.Service.Interface;

namespace Quickrent.Service.Implementation
{
    public class AuthService : IAuthService
    {
        IAuthRepository _repository;
        IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(IAuthRepository repository, IMapper mapper, IConfiguration configuration)
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public string AddUser(ReqRegisterUserDto dto)
        {
            User user = _mapper.Map<User>(dto);
            //user.Password = _encryptionService.EncryptData(user.Password);
            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, user.Password);

            if(_repository.AddUser(user))
            {
                return "User Registered Successfully !!";
            }
            else
            {
                return "User Registeration Failed !!";
            }
        }

        public string AuthUserDetails(ReqUserLoginDto dto)
        {
            if (dto.Email != null && dto.Password != null)
            {
                //dto.Password = _encryptionService.EncryptData(dto.Password);
                User user = _repository.AuthUserDetails(dto.Email,  dto.Password);
                if (user != null)
                {
                    var claims = new List<Claim> {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim("Id", user.UserId.ToString()),
                        new Claim("Email", user.Email),
                        new Claim("role", user.UserRole.ToString()),
                        new Claim(ClaimTypes.Role, user.UserRole.ToString())
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                    return jwtToken;
                }
                else
                {
                    throw new Exception("user is not valid");
                }
            }
            else
            {
                throw new Exception("credentials are not valid");
            }

        }

        /*
        public bool AuthAdminDetails(ReqUserLoginDto dto)
        {
            
        }*/

        public string AuthAdminDetails(ReqUserLoginDto dto)
        {
            bool status = _repository.AuthAdminDetails(dto);
            if (status == true)
            {
                var claims = new List<Claim> {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim("role", "Admin"),
                        new Claim(ClaimTypes.Role, "Admin")
                    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                return jwtToken;
            }
            else 
            {
                //return dto.Email + " " + dto.Password;
                throw new Exception("user is not valid");
            }
        }
    }
}