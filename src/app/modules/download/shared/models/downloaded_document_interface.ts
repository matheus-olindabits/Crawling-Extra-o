import type { ScrapedDocumentInterface } from "../../../scraping/shared/models/scraped_interface.js";

export interface DownloadedDocumentInterface extends ScrapedDocumentInterface {
    fileName: string;
    filePath: string;
}
