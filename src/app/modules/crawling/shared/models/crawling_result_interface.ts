import type { DownloadedDocumentInterface } from "../../../download/shared/models/downloaded_document_interface.js";
import type { MergedDocumentInterface } from "../../../merge/shared/models/merged_document_interface.js";

export interface CrawlingResultInterface {
    documents: DownloadedDocumentInterface[];
    mergedFile: MergedDocumentInterface;
}
