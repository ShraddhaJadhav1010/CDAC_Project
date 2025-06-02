using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Quickrent.DTO.UserDTO;
using Quickrent.Model;
using Quickrent.Service.Interface;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Utilities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Quickrent.Controllers
{
    //[Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _service;
        private readonly IEmailService emailService;
        private readonly IDistributedCache _cache;

        public AuthController(ILogger<AuthController> logger, IAuthService service, IEmailService emailService, IDistributedCache cache)
        {
            _logger = logger;
            _service = service;
            this.emailService = emailService;
            _cache = cache;
        }

        [Route("auth/admin")]
        [HttpPost]
        public IActionResult AdminLogin([FromBody] ReqUserLoginDto dto)
        {
            string token = _service.AuthAdminDetails(dto);
            return Ok(token);
        }

        /*
        [HttpPost]
        public IActionResult RegisterAdmin(){

        }
        */

        private string GenerateOTP(string userEmail)
        {
            Random random = new Random();
            string randomno = random.Next(0, 1000000).ToString("D6");
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            };
            _cache.SetStringAsync(userEmail, randomno, options);
            return randomno;
        }

        private void SendOtpMail(string useremail, string OtpText, string Name)
        {
            var mailrequest = new Mailrequest();
            mailrequest.Email = useremail;
            mailrequest.Subject = "Thanks for registering: OTP";
            mailrequest.EmailBody = GenerateEmailBody(Name, OtpText);
            this.emailService.SendEmail(mailrequest);
        }

        private string GenerateEmailBody(string name, string otptext)
        {
            string emailbody = "<div style='width: 100%; background-color:grey'>";
            emailbody += "<h1>Hi " + name + ", Thanks for registering</h1>";
            emailbody += "<h2>Please enter OTP text and complete the registeration</h2>";
            emailbody += "<h2>OTP Text is: " + otptext + "</h2>";
            emailbody += "</div>";
            return emailbody;
        }

        [Route("auth/signup")]
        [HttpPost]
        public IActionResult RegisterUser([FromBody] ReqRegisterUserDto dto){
            string otp = GenerateOTP(dto.Email);
            string emailBody = GenerateEmailBody(dto.FirstName, otp);
            SendOtpMail(dto.Email, emailBody, dto.FirstName);

            string userData = JsonConvert.SerializeObject(dto);

            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            };
            _cache.SetString("data_"+dto.Email, userData, options);
            //string response = _service.AddUser(dto);
            return Ok("OTP Generated");
        }

        [Route("auth/verify")]
        [HttpPost]
        public IActionResult ValidateEmail([FromBody] ReqValidateEmailDto dto) {
            int userOtp = int.Parse(dto.Otp);
            int genOtp = int.Parse(_cache.GetString(dto.Email));
            if (userOtp == genOtp) {
                ReqRegisterUserDto userData = JsonConvert.DeserializeObject<ReqRegisterUserDto>(_cache.GetString("data_" +dto.Email));
                string response = _service.AddUser(userData);
                _cache.Remove(dto.Email);
                _cache.Remove("data_"+dto.Email);
                return Ok(response);
            }
            return Ok("Invalid OTP");
        }


        [Route("auth/login")]
        [HttpPost]
        public IActionResult AuthUser([FromBody] ReqUserLoginDto dto ){
            try
            {
                string token = _service.AuthUserDetails(dto);
                return Ok(token);
            }
            catch (InvalidCredentialException e)
            {
                return Unauthorized(e.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }
        }

    }
}