using Supabase;
using LearnHubPlus.API.Configuration;

namespace LearnHubPlus.API.Services
{
    public class SupabaseService
    {
        private readonly Supabase.Client _client;
        private readonly ILogger<SupabaseService> _logger;

        public SupabaseService(IConfiguration configuration, ILogger<SupabaseService> logger)
        {
            _logger = logger;
            
            var url = configuration["Supabase:Url"];
            var anonKey = configuration["Supabase:AnonKey"];

            // Valores por defecto para desarrollo (reemplaza con tus credenciales reales)
            if (string.IsNullOrEmpty(url) || url == "your_supabase_project_url")
            {
                url = "https://your-project-id.supabase.co";
                _logger.LogWarning("Using default Supabase URL. Please configure your actual Supabase URL in appsettings.json");
            }

            if (string.IsNullOrEmpty(anonKey) || anonKey == "your_supabase_anon_key")
            {
                anonKey = "your-anon-key-here";
                _logger.LogWarning("Using default Supabase Anon Key. Please configure your actual Supabase Anon Key in appsettings.json");
            }

            try
            {
                _client = new Supabase.Client(url, anonKey);
                _logger.LogInformation("Supabase client initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize Supabase client");
                throw new InvalidOperationException("Failed to initialize Supabase client. Please check your configuration.", ex);
            }
        }

        public Supabase.Client Client => _client;
    }
}
