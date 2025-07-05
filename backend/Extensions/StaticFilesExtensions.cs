using Microsoft.Extensions.FileProviders;

namespace SushiZume.Extensions;

public static class StaticFilesExtensions
{
    public static WebApplication UseConfiguredStaticImages(this WebApplication app, IConfiguration config)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseStaticFiles();
        }
        else
        {
            var imagesPath = config["StaticFiles:ImagesPath"];
            var requestPath = config["StaticFiles:RequestPath"];

            if (string.IsNullOrEmpty(imagesPath) || string.IsNullOrEmpty(requestPath))
            {
                throw new InvalidOperationException("Static files configuration is not properly set.");
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(imagesPath),
                RequestPath = requestPath
            });
        }

        return app;
    }
}