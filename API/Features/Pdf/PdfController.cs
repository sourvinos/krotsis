using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using PdfSharp.Drawing;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using ZXing;
using ZXing.QrCode;
using ZXing.Windows.Compatibility;

namespace API.Features.Pdf {

    [Route("api/[controller]")]
    public class PdfController : ControllerBase {

        public PdfController() { }

        [HttpGet("[action]")]
        public void BuildPdf() {

            var ledger = Seed.Init();

            GlobalFontSettings.FontResolver = new FileFontResolver();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            PdfDocument document = new();
            PdfPage page = document.AddPage();
            XFont logoFont = new("ACCanterBold", 20);
            XFont robotoMonoFont = new("RobotoMono", 6);
            XFont monotypeFont = new("MonoType", 6);
            XGraphics gfx = XGraphics.FromPdfPage(page);

            var locale = CultureInfo.CreateSpecificCulture("el-GR");

            gfx.DrawString("CORFU CRUISES", logoFont, XBrushes.Black, new XPoint(40, 40));
            gfx.DrawString("ΚΑΡΤΕΛΑ ΠΕΛΑΤΗ: " + ledger.Description, robotoMonoFont, XBrushes.Black, new XPoint(40, 53));
            gfx.DrawString("ΔΙΑΣΤΗΜΑ: " + ledger.FromDate + " - " + ledger.ToDate, robotoMonoFont, XBrushes.Black, new XPoint(40, 62));

            gfx.DrawString("ΗΜΕΡΟΜΗΝΙΑ", robotoMonoFont, XBrushes.Black, new XPoint(40, 90));
            gfx.DrawString("ΠΑΡΑΣΤΑΤΙΚΟ", robotoMonoFont, XBrushes.Black, new XPoint(80, 90));
            gfx.DrawString("ΣΕΙΡΑ", robotoMonoFont, XBrushes.Black, new XPoint(218, 90));
            gfx.DrawString("NO", robotoMonoFont, XBrushes.Black, new XPoint(270, 90));
            gfx.DrawString("ΧΡΕΩΣΗ", robotoMonoFont, XBrushes.Black, new XPoint(434, 90));
            gfx.DrawString("ΠΙΣΤΩΣΗ", robotoMonoFont, XBrushes.Black, new XPoint(490, 90));
            gfx.DrawString("ΥΠΟΛΟΙΠΟ", robotoMonoFont, XBrushes.Black, new XPoint(547, 90));

            int verticalPosition = 100;

            for (int i = 0; i < ledger.Transactions.Count; i++) {
                verticalPosition += 12;
                gfx.DrawString(ledger.Transactions[i].Date, robotoMonoFont, XBrushes.Black, new XPoint(40, verticalPosition));
                gfx.DrawString(ledger.Transactions[i].DocumentType, robotoMonoFont, XBrushes.Black, new XPoint(80, verticalPosition));
                gfx.DrawString(ledger.Transactions[i].Series, robotoMonoFont, XBrushes.Black, new XPoint(220, verticalPosition));
                gfx.DrawString(ledger.Transactions[i].DocumentNo, robotoMonoFont, XBrushes.Black, new XPoint(270, verticalPosition));
                gfx.DrawString(ledger.Transactions[i].Debit.ToString("N2", locale), monotypeFont, XBrushes.Black, new XPoint(456 - ledger.Transactions[i].Debit.ToString("N2", locale).Length * 3, verticalPosition));
                gfx.DrawString(ledger.Transactions[i].Credit.ToString("N2", locale), monotypeFont, XBrushes.Black, new XPoint(516 - ledger.Transactions[i].Credit.ToString("N2", locale).Length * 3, verticalPosition));
                gfx.DrawString(ledger.Transactions[i].Balance.ToString("N2", locale), monotypeFont, XBrushes.Black, new XPoint(576 - ledger.Transactions[i].Balance.ToString("N2", locale).Length * 3, verticalPosition));
            }

            gfx.DrawImage(CreateQrCode(ledger.QrCode), 20, 750);

            document.Save("Sample.pdf");

        }

        private static XImage CreateQrCode(string qrCode) {
            QrCodeEncodingOptions options = new() { DisableECI = true, CharacterSet = "UTF-8", Width = 100, Height = 100 };
            BarcodeWriter writer = new() { Format = BarcodeFormat.QR_CODE, Options = options };
            Bitmap qrCodeBitmap = writer.Write(qrCode);
            MemoryStream strm = new();
            qrCodeBitmap.Save(strm, ImageFormat.Png);
            return XImage.FromStream(strm);
        }

    }

}