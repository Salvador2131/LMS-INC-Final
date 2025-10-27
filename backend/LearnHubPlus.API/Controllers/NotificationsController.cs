using Microsoft.AspNetCore.Mvc;
using LearnHubPlus.API.Services;
using LearnHubPlus.API.Models;

namespace LearnHubPlus.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly NotificationService _notificationService;
        private readonly ILogger<NotificationsController> _logger;

        public NotificationsController(NotificationService notificationService, ILogger<NotificationsController> logger)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        /// <summary>
        /// Obtiene todas las notificaciones de un usuario
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserNotifications(Guid userId, [FromQuery] bool unreadOnly = false)
        {
            try
            {
                var notifications = await _notificationService.GetUserNotificationsAsync(userId, unreadOnly);
                var response = notifications.Select(n => new NotificationResponse
                {
                    Id = n.Id,
                    UserId = n.UserId,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt
                });

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting notifications for user {UserId}", userId);
                return StatusCode(500, new { message = "Error retrieving notifications", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene una notificación específica por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotification(Guid id)
        {
            try
            {
                var notification = await _notificationService.GetNotificationByIdAsync(id);
                
                if (notification == null)
                {
                    return NotFound(new { message = "Notification not found" });
                }

                var response = new NotificationResponse
                {
                    Id = notification.Id,
                    UserId = notification.UserId,
                    Title = notification.Title,
                    Message = notification.Message,
                    Type = notification.Type,
                    IsRead = notification.IsRead,
                    CreatedAt = notification.CreatedAt
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting notification {NotificationId}", id);
                return StatusCode(500, new { message = "Error retrieving notification", error = ex.Message });
            }
        }

        /// <summary>
        /// Crea una nueva notificación
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var notification = await _notificationService.CreateNotificationAsync(request);
                
                var response = new NotificationResponse
                {
                    Id = notification.Id,
                    UserId = notification.UserId,
                    Title = notification.Title,
                    Message = notification.Message,
                    Type = notification.Type,
                    IsRead = notification.IsRead,
                    CreatedAt = notification.CreatedAt
                };

                return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating notification for user {UserId}", request.UserId);
                return StatusCode(500, new { message = "Error creating notification", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualiza una notificación (principalmente para marcar como leída)
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(Guid id, [FromBody] UpdateNotificationRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var notification = await _notificationService.UpdateNotificationAsync(id, request);
                
                if (notification == null)
                {
                    return NotFound(new { message = "Notification not found" });
                }

                var response = new NotificationResponse
                {
                    Id = notification.Id,
                    UserId = notification.UserId,
                    Title = notification.Title,
                    Message = notification.Message,
                    Type = notification.Type,
                    IsRead = notification.IsRead,
                    CreatedAt = notification.CreatedAt
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating notification {NotificationId}", id);
                return StatusCode(500, new { message = "Error updating notification", error = ex.Message });
            }
        }

        /// <summary>
        /// Marca una notificación como leída
        /// </summary>
        [HttpPut("{id}/mark-read")]
        public async Task<IActionResult> MarkAsRead(Guid id)
        {
            try
            {
                var success = await _notificationService.MarkAsReadAsync(id);
                
                if (!success)
                {
                    return NotFound(new { message = "Notification not found" });
                }

                return Ok(new { message = "Notification marked as read" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking notification {NotificationId} as read", id);
                return StatusCode(500, new { message = "Error marking notification as read", error = ex.Message });
            }
        }

        /// <summary>
        /// Marca todas las notificaciones de un usuario como leídas
        /// </summary>
        [HttpPut("user/{userId}/mark-all-read")]
        public async Task<IActionResult> MarkAllAsRead(Guid userId)
        {
            try
            {
                var success = await _notificationService.MarkAllAsReadAsync(userId);
                
                if (!success)
                {
                    return StatusCode(500, new { message = "Error marking all notifications as read" });
                }

                return Ok(new { message = "All notifications marked as read" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking all notifications as read for user {UserId}", userId);
                return StatusCode(500, new { message = "Error marking all notifications as read", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene el conteo de notificaciones no leídas de un usuario
        /// </summary>
        [HttpGet("user/{userId}/unread-count")]
        public async Task<IActionResult> GetUnreadCount(Guid userId)
        {
            try
            {
                var count = await _notificationService.GetUnreadCountAsync(userId);
                return Ok(new { unreadCount = count });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting unread count for user {UserId}", userId);
                return StatusCode(500, new { message = "Error getting unread count", error = ex.Message });
            }
        }

        /// <summary>
        /// Elimina una notificación
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            try
            {
                var success = await _notificationService.DeleteNotificationAsync(id);
                
                if (!success)
                {
                    return NotFound(new { message = "Notification not found" });
                }

                return Ok(new { message = "Notification deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting notification {NotificationId}", id);
                return StatusCode(500, new { message = "Error deleting notification", error = ex.Message });
            }
        }

        // Endpoints para crear notificaciones automáticas específicas

        /// <summary>
        /// Crea una notificación de nueva tarea
        /// </summary>
        [HttpPost("task")]
        public async Task<IActionResult> CreateTaskNotification([FromBody] CreateTaskNotificationRequest request)
        {
            try
            {
                var notification = await _notificationService.CreateTaskNotificationAsync(
                    request.UserId, 
                    request.CourseName, 
                    request.TaskTitle
                );

                var response = new NotificationResponse
                {
                    Id = notification.Id,
                    UserId = notification.UserId,
                    Title = notification.Title,
                    Message = notification.Message,
                    Type = notification.Type,
                    IsRead = notification.IsRead,
                    CreatedAt = notification.CreatedAt
                };

                return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task notification for user {UserId}", request.UserId);
                return StatusCode(500, new { message = "Error creating task notification", error = ex.Message });
            }
        }

        /// <summary>
        /// Crea una notificación de calificación publicada
        /// </summary>
        [HttpPost("grade")]
        public async Task<IActionResult> CreateGradeNotification([FromBody] CreateGradeNotificationRequest request)
        {
            try
            {
                var notification = await _notificationService.CreateGradeNotificationAsync(
                    request.UserId, 
                    request.CourseName, 
                    request.AssignmentName, 
                    request.Grade
                );

                var response = new NotificationResponse
                {
                    Id = notification.Id,
                    UserId = notification.UserId,
                    Title = notification.Title,
                    Message = notification.Message,
                    Type = notification.Type,
                    IsRead = notification.IsRead,
                    CreatedAt = notification.CreatedAt
                };

                return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating grade notification for user {UserId}", request.UserId);
                return StatusCode(500, new { message = "Error creating grade notification", error = ex.Message });
            }
        }
    }

    // Clases de request específicas para notificaciones automáticas
    public class CreateTaskNotificationRequest
    {
        public Guid UserId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string TaskTitle { get; set; } = string.Empty;
    }

    public class CreateGradeNotificationRequest
    {
        public Guid UserId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string AssignmentName { get; set; } = string.Empty;
        public int Grade { get; set; }
    }
}

