import { Request, Response } from "express";
import CrawlingErrorException from "../../../shared/exceptions/crawling/crawling_exception.js";
import HelperErrorException from "../../../shared/exceptions/exception_error.js";
import crawlingService from "../services/crawling_service.js";
import ScrapingErrorException from "../../../shared/exceptions/scraping/scraping_exception.js";
import DownloadErrorException from "../../../shared/exceptions/download/download_exception.js";
import MergeErrorException from "../../../shared/exceptions/merge/merge_exception.js";

class CrawlingController {

  async crawlingDocument(req: Request, res: Response): Promise<Response> {

    try {
      const result = await crawlingService.crawlingDocument();
      return res.json(result);
    } catch (error) {
      if(error instanceof CrawlingErrorException)
        return res.status(400).json({error: error.message});
      else if(error instanceof ScrapingErrorException)
        return res.status(400).json({error: error.message});
      else if(error instanceof DownloadErrorException)
        return res.status(502).json({error: error.message});
      else if(error instanceof MergeErrorException)
        return res.status(500).json({error: error.message});
      else
        return res.status(400).json({error: HelperErrorException.errorDefault});
    }

  }

}

export default new CrawlingController();
