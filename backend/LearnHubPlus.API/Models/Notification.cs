using System.ComponentModel.DataAnnotations;
using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;

namespace LearnHubPlus.API.Models
{
    [Table("notifications")]
    public class Notification : BaseModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        public Guid UserId { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(1000)]
        public string Message { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;
        
        public bool IsRead { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Propiedades de navegación (opcional)
        public User? User { get; set; }
    }

    public enum NotificationType
    {
        Task,        // Tarea asignada
        Message,     // Mensaje del foro
        Grade,       // Calificación publicada
        Course,      // Nuevo curso
        System,      // Notificación del sistema
        Reminder     // Recordatorio
    }

    public class CreateNotificationRequest
    {
        [Required]
        public Guid UserId { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(1000)]
        public string Message { get; set; } = string.Empty;
        
        [Required]
        public string Type { get; set; } = string.Empty;
    }

    public class UpdateNotificationRequest
    {
        public bool IsRead { get; set; }
    }

    public class NotificationResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
