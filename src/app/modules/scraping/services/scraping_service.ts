import { PDFParse } from "pdf-parse";
import puppeteer, { Page, type Browser } from "puppeteer";
import { ScrapedDocumentInterface } from "../shared/models/scraped_interface.js";
import ScrapingErrorException from "../../../shared/exceptions/scraping/scraping_exception.js";
import HelperErrorException from "../../../shared/exceptions/exception_error.js";

const SOURCE_URL = "https://omnissolucoes.com/teste3/";

type DocumentLink = Omit<ScrapedDocumentInterface, "content">;

class ScrapingService {

    async execute(): Promise<ScrapedDocumentInterface[]> {
        return this.scraping();
    }

    private async scraping(): Promise<ScrapedDocumentInterface[]> {
        let browser: Browser | undefined;

        try {

            browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(SOURCE_URL, { waitUntil: "networkidle2" });
            
            return await this.getItens(page);
        } finally {
            await browser?.close();
        }
    }

    
    private async getItens(page: Page): Promise<ScrapedDocumentInterface[]> {
        
        try {
            const documentLinks = await page.evaluate(() =>
                Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))
                    .filter((link) => new URL(link.href).pathname.toLowerCase().endsWith(".pdf"))
                    .map((link) => ({
                        name: link.parentElement?.textContent?.trim() || link.pathname,
                        url: link.href,
                    })),
            ) as DocumentLink[];

            if(documentLinks.length === 0) throw new ScrapingErrorException(HelperErrorException.scrapingPdfError);

            return Promise.all(
                documentLinks.map(async ({ name, url }) => ({
                    name,
                    url,
                    content: await this.extractPdfContent(url),
                })),
            );   
        }catch (error) {
            throw error;
        }

    }
    
    private async extractPdfContent(url: string): Promise<string> {
        const parser = new PDFParse({ url });

        try {
            const result = await parser.getText();
            return result.text.trim();
        } finally {
            await parser.destroy();
        }
    }
}

export default new ScrapingService();
