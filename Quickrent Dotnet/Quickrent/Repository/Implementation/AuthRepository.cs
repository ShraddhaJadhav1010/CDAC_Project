using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OnlineTicketBookingAPI.Mapper;
using Quickrent.Data;
using Quickrent.DTO.UserDTO;
using Quickrent.Exceptions;
using Quickrent.Model;
using Quickrent.Repository.Interface;

namespace Quickrent.Repository.Implementation
{
    public class AuthRepository : IAuthRepository
    {
        QuickrentContext _context;

        public AuthRepository(QuickrentContext context)
        {
            _context = context;
        }

        public bool AddUser(User user)
        {
            try
            {
                using(_context = new QuickrentContext())
                {
                    user.IsVerified = false;
                    _context.User.Add(user);
                    _context.SaveChanges();
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException);
                return false;
            }
        }

        public bool AuthAdminDetails(ReqUserLoginDto dto)
        {
            Admin admin = _context.Admin.Where(a => a.Email == dto.Email && a.Password == dto.Password).FirstOrDefault();
            if (admin == null) {
                return false;
            }
            return true;
        }

        public User AuthUserDetails(string email, string password)
        {
            User user = _context.User.SingleOrDefault(s => s.Email == email);
            
            if(user != null){
                var passwordHasher = new PasswordHasher<User>();
                var result = passwordHasher.VerifyHashedPassword(user, user.Password, password);

                if(result == PasswordVerificationResult.Success){
                    return user;
                }
                else{
                    throw new InvalidCredentials("Invalid Password !!!");
                }
            }
            else
            {
                throw new InvalidCredentials("Invalid Email !!!");
            }
        }
    }
}