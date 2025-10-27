using Supabase;
using LearnHubPlus.API.Models;

namespace LearnHubPlus.API.Services
{
    public class UserService
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly ILogger<UserService> _logger;

        public UserService(SupabaseService supabaseService, ILogger<UserService> logger)
        {
            _supabaseClient = supabaseService.Client;
            _logger = logger;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            try
            {
                var response = await _supabaseClient
                    .From<User>()
                    .Select("*")
                    .Get();

                return response.Models.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting users from Supabase");
                throw;
            }
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            try
            {
                var response = await _supabaseClient
                    .From<User>()
                    .Select("*")
                    .Where(x => x.Id == id)
                    .Single();

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by ID from Supabase");
                return null;
            }
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            try
            {
                var response = await _supabaseClient
                    .From<User>()
                    .Select("*")
                    .Where(x => x.Email == email)
                    .Single();

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by email from Supabase");
                return null;
            }
        }

        public async Task<User> CreateUserAsync(User user)
        {
            try
            {
                var response = await _supabaseClient
                    .From<User>()
                    .Insert(user);

                return response.Models.First();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user in Supabase");
                throw;
            }
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            try
            {
                var response = await _supabaseClient
                    .From<User>()
                    .Where(x => x.Id == user.Id)
                    .Set(x => x.Name, user.Name)
                    .Set(x => x.LastName, user.LastName)
                    .Set(x => x.Role, user.Role)
                    .Set(x => x.Avatar, user.Avatar)
                    .Set(x => x.IsActive, user.IsActive)
                    .Set(x => x.UpdatedAt, DateTime.UtcNow)
                    .Update();

                return response.Models.First();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user in Supabase");
                throw;
            }
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            try
            {
                await _supabaseClient
                    .From<User>()
                    .Where(x => x.Id == id)
                    .Delete();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user from Supabase");
                return false;
            }
        }
    }
}





