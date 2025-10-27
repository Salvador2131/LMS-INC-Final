using Supabase;
using LearnHubPlus.API.Models;
using LearnHubPlus.API.Services;

namespace LearnHubPlus.API.Services
{
    public class NotificationService
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(SupabaseService supabaseService, ILogger<NotificationService> logger)
        {
            _supabaseClient = supabaseService.Client;
            _logger = logger;
        }

        public async Task<List<Notification>> GetUserNotificationsAsync(Guid userId, bool unreadOnly = false)
        {
            try
            {
                var query = _supabaseClient
                    .From<Notification>()
                    .Select("*")
                    .Where(x => x.UserId == userId);

                if (unreadOnly)
                {
                    query = query.Where(x => x.IsRead == false);
                }

                var response = await query.Get();
                return response.Models.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting notifications for user {UserId}", userId);
                throw;
            }
        }

        public async Task<Notification?> GetNotificationByIdAsync(Guid id)
        {
            try
            {
                var response = await _supabaseClient
                    .From<Notification>()
                    .Select("*")
                    .Where(x => x.Id == id)
                    .Single();

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting notification by ID {NotificationId}", id);
                return null;
            }
        }

        public async Task<Notification> CreateNotificationAsync(CreateNotificationRequest request)
        {
            try
            {
                var notification = new Notification
                {
                    UserId = request.UserId,
                    Title = request.Title,
                    Message = request.Message,
                    Type = request.Type,
                    IsRead = false,
                    CreatedAt = DateTime.UtcNow
                };

                var response = await _supabaseClient
                    .From<Notification>()
                    .Insert(notification);

                var createdNotification = response.Models.First();
                _logger.LogInformation("Notification created for user {UserId}: {Title}", request.UserId, request.Title);
                
                return createdNotification;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating notification for user {UserId}", request.UserId);
                throw;
            }
        }

        public async Task<Notification?> UpdateNotificationAsync(Guid id, UpdateNotificationRequest request)
        {
            try
            {
                var response = await _supabaseClient
                    .From<Notification>()
                    .Where(x => x.Id == id)
                    .Set(x => x.IsRead, request.IsRead)
                    .Update();

                if (response.Models.Any())
                {
                    var updatedNotification = response.Models.First();
                    _logger.LogInformation("Notification {NotificationId} updated: IsRead = {IsRead}", id, request.IsRead);
                    return updatedNotification;
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating notification {NotificationId}", id);
                throw;
            }
        }

        public async Task<bool> MarkAsReadAsync(Guid id)
        {
            try
            {
                await _supabaseClient
                    .From<Notification>()
                    .Where(x => x.Id == id)
                    .Set(x => x.IsRead, true)
                    .Update();

                _logger.LogInformation("Notification {NotificationId} marked as read", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking notification {NotificationId} as read", id);
                return false;
            }
        }

        public async Task<bool> MarkAllAsReadAsync(Guid userId)
        {
            try
            {
                await _supabaseClient
                    .From<Notification>()
                    .Where(x => x.UserId == userId && x.IsRead == false)
                    .Set(x => x.IsRead, true)
                    .Update();

                _logger.LogInformation("All notifications marked as read for user {UserId}", userId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking all notifications as read for user {UserId}", userId);
                return false;
            }
        }

        public async Task<bool> DeleteNotificationAsync(Guid id)
        {
            try
            {
                await _supabaseClient
                    .From<Notification>()
                    .Where(x => x.Id == id)
                    .Delete();

                _logger.LogInformation("Notification {NotificationId} deleted", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting notification {NotificationId}", id);
                return false;
            }
        }

        public async Task<int> GetUnreadCountAsync(Guid userId)
        {
            try
            {
                var response = await _supabaseClient
                    .From<Notification>()
                    .Select("id")
                    .Where(x => x.UserId == userId && x.IsRead == false)
                    .Get();

                return response.Models.Count();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting unread count for user {UserId}", userId);
                return 0;
            }
        }

        // Métodos para crear notificaciones automáticas
        public async Task<Notification> CreateTaskNotificationAsync(Guid userId, string courseName, string taskTitle)
        {
            var request = new CreateNotificationRequest
            {
                UserId = userId,
                Title = "Nueva tarea asignada",
                Message = $"{courseName} - {taskTitle}",
                Type = "task"
            };

            return await CreateNotificationAsync(request);
        }

        public async Task<Notification> CreateGradeNotificationAsync(Guid userId, string courseName, string assignmentName, int grade)
        {
            var request = new CreateNotificationRequest
            {
                UserId = userId,
                Title = "Calificación publicada",
                Message = $"{courseName} - {assignmentName}: {grade}",
                Type = "grade"
            };

            return await CreateNotificationAsync(request);
        }

        public async Task<Notification> CreateForumNotificationAsync(Guid userId, string courseName, string postTitle)
        {
            var request = new CreateNotificationRequest
            {
                UserId = userId,
                Title = "Nuevo mensaje en el foro",
                Message = $"{courseName} - {postTitle}",
                Type = "message"
            };

            return await CreateNotificationAsync(request);
        }

        public async Task<Notification> CreateCourseNotificationAsync(Guid userId, string courseName)
        {
            var request = new CreateNotificationRequest
            {
                UserId = userId,
                Title = "Nuevo curso disponible",
                Message = courseName,
                Type = "course"
            };

            return await CreateNotificationAsync(request);
        }
    }
}
