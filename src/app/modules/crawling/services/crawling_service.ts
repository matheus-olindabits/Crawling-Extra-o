import scrapingService from "../../scraping/services/scraping_service.js";
import downloadService from "../../download/services/download_service.js";
import pdfMergeService from "../../merge/services/pdf_merge_service.js";
import type { CrawlingResultInterface } from "../shared/models/crawling_result_interface.js";


class CrawlingService {

    async crawlingDocument(): Promise<CrawlingResultInterface> {

        try {
            const scrapedDocuments = await scrapingService.execute();
            const documents = await downloadService.execute(scrapedDocuments);
            const mergedFile = await pdfMergeService.execute(documents);

            return { documents, mergedFile };   
        } catch (error) {
            throw error;
        }
    }

}

export default new CrawlingService();
