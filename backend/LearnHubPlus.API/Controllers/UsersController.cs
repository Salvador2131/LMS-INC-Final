using Microsoft.AspNetCore.Mvc;
using LearnHubPlus.API.Services;
using LearnHubPlus.API.Models;
using Supabase;

namespace LearnHubPlus.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly SupabaseService _supabaseService;

        public UsersController(SupabaseService supabaseService)
        {
            _supabaseService = supabaseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var response = await _supabaseService.Client
                    .From<User>()
                    .Select("*")
                    .Get();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error connecting to Supabase", error = ex.Message });
            }
        }

        [HttpGet("test")]
        public IActionResult TestConnection()
        {
            try
            {
                return Ok(new { message = "Supabase service is configured correctly", timestamp = DateTime.UtcNow });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error in Supabase configuration", error = ex.Message });
            }
        }
    }
}

