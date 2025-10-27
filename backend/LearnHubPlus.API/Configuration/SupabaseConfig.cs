using System.ComponentModel.DataAnnotations;

namespace LearnHubPlus.API.Configuration
{
    public class SupabaseConfig
    {
        [Required]
        public string Url { get; set; } = string.Empty;

        [Required]
        public string AnonKey { get; set; } = string.Empty;

        [Required]
        public string ServiceRoleKey { get; set; } = string.Empty;
    }
}

