namespace Quickrent.Service.Implementation;
using AutoMapper;
using global::QuickRent.DTO.UserDTO;
using global::QuickRent.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Quickrent.Model;
using Quickrent.Repository.Interface;
using System.Threading.Tasks;

//namespace QuickRent.Service.Implementation

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<GetUserDetailsDto> GetUserDetailsAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            return _mapper.Map<GetUserDetailsDto>(user);
        }

        public async Task<bool> EditUserDetailsAsync(EditUserDetailsDto editUserDetailsDto)
        {
            var user = await _userRepository.GetUserByIdAsync(editUserDetailsDto.UserId);
            if (user == null) return false;

        var passwordHasher = new PasswordHasher<EditUserDetailsDto>();
        editUserDetailsDto.Password = passwordHasher.HashPassword(editUserDetailsDto, editUserDetailsDto.Password);

        _mapper.Map(editUserDetailsDto, user);
            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            return await _userRepository.DeleteUserAsync(userId);
        }
    }

