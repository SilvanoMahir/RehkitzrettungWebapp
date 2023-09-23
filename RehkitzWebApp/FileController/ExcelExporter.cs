using ClosedXML.Excel;
using RehkitzWebApp.Model;

namespace RehkitzWebApp.FileController;

public class ExcelExporter
{
    internal Stream ExportToExcel(List<Protocol> protocolsList, string district)
    {
        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("Rehkitzrettung Protokolle");
            int row = 1;

            worksheet.Cell(row, 1).Value = "Rehkitzrettung Protokolle " + DateTime.Now.Date.Year;
            worksheet.Cell(row, 1).Style.Font.FontSize = 16;
            worksheet.Cell(row, 1).Style.Font.Bold = true;
            worksheet.Cell(row, 1).Style.Font.Underline = XLFontUnderlineValues.Single;
            row++;

            worksheet.Cell(row, 1).Value = "Erstelldatum: " + DateTime.Now.ToString("dd.MM.yyyy");

            row = 4;
            worksheet.Cell(row, 1).Value = "Protokoll Code";
            worksheet.Cell(row, 2).Value = "Name Pilot";
            worksheet.Cell(row, 3).Value = "Name Kunde/Bauer";
            worksheet.Cell(row, 4).Value = "Datum der Suche";
            worksheet.Cell(row, 5).Value = "Lokaler Ortsname";
            worksheet.Cell(row, 6).Value = "Grösse Suchfeld";
            worksheet.Cell(row, 7).Value = "Bezirk";
            worksheet.Cell(row, 8).Value = "Region";
            worksheet.Cell(row, 9).Value = "Gerettete Kitze";
            worksheet.Cell(row, 10).Value = "Verletzte Kitze";
            worksheet.Cell(row, 11).Value = "Markierte Kitze";
            worksheet.Cell(row, 12).Value = "Kommentar";
            for (int i = 1; i < 13; i++)
            {
                worksheet.Cell(row, i).Style.Font.Bold = true;
            }

            row++;
            foreach (var protocol in protocolsList)
            {
                worksheet.Cell(row, 1).Value = protocol.ProtocolCode;
                worksheet.Cell(row, 2).Value = protocol.PilotFullName;
                worksheet.Cell(row, 3).Value = protocol.ClientFullName;
                worksheet.Cell(row, 4).Value = protocol.Date.Date;
                worksheet.Cell(row, 5).Value = protocol.LocalName;
                worksheet.Cell(row, 6).Value = protocol.AreaSize;
                worksheet.Cell(row, 7).Value = district;
                worksheet.Cell(row, 8).Value = protocol.RegionName;
                worksheet.Cell(row, 9).Value = protocol.FoundFawns;
                worksheet.Cell(row, 10).Value = protocol.InjuredFawns;
                worksheet.Cell(row, 11).Value = protocol.MarkedFawns;
                worksheet.Cell(row, 12).Value = protocol.Remark;

                row++;
            }

            worksheet.Columns().AdjustToContents();
            var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Seek(0, SeekOrigin.Begin);

            return stream;
        }
    }
}
