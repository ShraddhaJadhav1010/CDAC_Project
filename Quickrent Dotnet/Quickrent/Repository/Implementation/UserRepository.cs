using Quickrent.Data;
using Quickrent.Model;
using Quickrent.Repository.Interface;

namespace QuickRent.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly QuickrentContext _context;

        public UserRepository(QuickrentContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.User.FindAsync(userId);
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _context.User.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.User.FindAsync(userId);
            if (user == null) return false;

            _context.User.Remove(user);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}