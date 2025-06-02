using QuickRent.DTO.UserDTO;
using System.Threading.Tasks;

namespace QuickRent.Services.Interfaces
{
    public interface IUserService
    {
        Task<GetUserDetailsDto> GetUserDetailsAsync(int userId);
        Task<bool> EditUserDetailsAsync(EditUserDetailsDto editUserDetailsDto);
        Task<bool> DeleteUserAsync(int userId);
    }
}