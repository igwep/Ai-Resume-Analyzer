import PDFParser from "pdf2json";

export function ExtractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
      const pages = pdfData.Pages;
      const text = pages
        .map(page =>
          page.Texts.map(t =>
            decodeURIComponent(t.R.map(r => r.T).join(""))
          ).join(" ")
        ).join("\n");
      resolve(text);
    });

    pdfParser.parseBuffer(fileBuffer);
  });
}
