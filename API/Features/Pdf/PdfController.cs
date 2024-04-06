using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using QRCoder;

namespace API.Features.Pdf {

    [Route("api/[controller]")]
    public class PdfController : ControllerBase {

        public PdfController() { }

        [HttpGet]
        public async Task BuildPdfAsync() {
            await new BrowserFetcher().DownloadAsync();
            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
            using var page = await browser.NewPageAsync();
            var x = LoadTemplateFromFile();
            var z = x.Replace("@Model.Displayname", "John");
            var i = z.Replace("@Model.Image", Create("Hello"));
            await page.SetContentAsync(
                i
            );
            // Working
            // await page.AddStyleTagAsync(new AddTagOptions {
            //     Content = "table { width: 100% }; h1 { color: red; font-family:'Consolas'; display: flex; justify-content: center;}"
            // });
            await page.AddStyleTagAsync(new AddTagOptions {
                Content = LoadStylesFromFile()
            });
            // // Not working
            // await page.AddStyleTagAsync("custom.css");
            await page.PdfAsync("CustomContent.pdf");
            // Page size
            // await page.pdf({path: 'hn.pdf', format: 'A4', printBackground: true});
        }

        private static string LoadTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\Test.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        private static string LoadStylesFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\Styles.css";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        private static string ReplacePlaceHolders(string template) {
            template.Replace("@Model.Displayname", "John");
            // template.Replace("@Model.Image", Create("Hello"));
            return template;
        }

        [HttpPost]
        public string CreateQRCode([FromBody] QRCodeModel qRCode) {
            QRCodeGenerator QrGenerator = new();
            QRCodeData QrCodeInfo = QrGenerator.CreateQrCode(qRCode.QRCodeText, QRCodeGenerator.ECCLevel.Q);
            QRCode QrCode = new(QrCodeInfo);
            Bitmap QrBitmap = QrCode.GetGraphic(60);
            byte[] BitmapArray = QrBitmap.BitmapToByteArray();
            string QrUri = string.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapArray));
            return QrUri;
        }

        private static string Create(string qRCode) {
            QRCodeGenerator QrGenerator = new();
            QRCodeData QrCodeInfo = QrGenerator.CreateQrCode(qRCode, QRCodeGenerator.ECCLevel.Q);
            QRCode QrCode = new(QrCodeInfo);
            Bitmap QrBitmap = QrCode.GetGraphic(60);
            byte[] BitmapArray = QrBitmap.BitmapToByteArray();
            string QrUri = string.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapArray));
            return QrUri;
        }

    }

    public static class BitmapExtension {
        public static byte[] BitmapToByteArray(this Bitmap bitmap) {
            using MemoryStream ms = new();
            bitmap.Save(ms, ImageFormat.Png);
            return ms.ToArray();
        }
    }

    public class QRCodeModel {
        public string QRCodeText { get; set; }
    }

}