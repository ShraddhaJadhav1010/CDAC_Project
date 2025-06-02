//namespace Quickrent.Controllers;
using global::QuickRent.DTO.UserDTO;
using global::QuickRent.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace QuickRent.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        //[Authorize(Roles = "Customer, Seller")]
        [Route("api/user/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetUserDetails(int userId)
        {
            var userDetails = await _userService.GetUserDetailsAsync(userId);
            if (userDetails == null) return NotFound("User not found");
            return Ok(userDetails);
        }

        //[Authorize(Roles = "Customer, Seller")]
        [HttpPut]
        public async Task<IActionResult> EditUserDetails([FromBody] EditUserDetailsDto editUserDetailsDto)
        {
            var result = await _userService.EditUserDetailsAsync(editUserDetailsDto);
            if (!result) return BadRequest("Failed to update user details");
            return Ok("Edit successful");
        }

        //[Authorize(Roles = "Customer, Seller")]
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var result = await _userService.DeleteUserAsync(userId);
            if (!result) return BadRequest("Failed to delete user");
            return Ok("User deleted successfully");
        }
    }
}
