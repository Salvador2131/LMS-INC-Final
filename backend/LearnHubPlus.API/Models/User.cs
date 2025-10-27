using System.ComponentModel.DataAnnotations;
using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;

namespace LearnHubPlus.API.Models
{
    [Table("users")]
    public class User : BaseModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? LastName { get; set; }
        
        [MaxLength(20)]
        public string Role { get; set; } = "estudiante";
        
        [MaxLength(500)]
        public string? Avatar { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Propiedades de navegación
        public List<Notification>? Notifications { get; set; }
    }

    public enum UserRole
    {
        Estudiante,
        Profesor,
        Admin
    }

    public class CreateUserRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? LastName { get; set; }
        
        [MaxLength(20)]
        public string Role { get; set; } = "estudiante";
        
        [MaxLength(500)]
        public string? Avatar { get; set; }
    }

    public class UpdateUserRequest
    {
        [MaxLength(100)]
        public string? Name { get; set; }
        
        [MaxLength(100)]
        public string? LastName { get; set; }
        
        [MaxLength(20)]
        public string? Role { get; set; }
        
        [MaxLength(500)]
        public string? Avatar { get; set; }
        
        public bool? IsActive { get; set; }
    }

    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public string Role { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; }
    }
}
