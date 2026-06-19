import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ScrapedDocumentInterface } from "../../scraping/shared/models/scraped_interface.js";
import type { DownloadedDocumentInterface } from "../shared/models/downloaded_document_interface.js";
import DownloadErrorException from "../../../shared/exceptions/download/download_exception.js";

const DOWNLOAD_DIRECTORY = path.resolve(process.cwd(), "downloads");

class DownloadService {

    async execute(documents: ScrapedDocumentInterface[]): Promise<DownloadedDocumentInterface[]> {
        await mkdir(DOWNLOAD_DIRECTORY, { recursive: true });

        return Promise.all(
            documents.map((document) => this.download(document)),
        );
    }

    private async download(document: ScrapedDocumentInterface): Promise<DownloadedDocumentInterface> {
        try {
            const response = await fetch(document.url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const fileName = this.getFileName(document.url);
            const filePath = path.join(DOWNLOAD_DIRECTORY, fileName);
            const fileContent = Buffer.from(await response.arrayBuffer());

            await writeFile(filePath, fileContent);

            return {
                ...document,
                fileName,
                filePath,
            };
        } catch (error: unknown) {
            const reason = error instanceof Error ? error.message : "erro desconhecido";
            throw new DownloadErrorException(
                `Não foi possível baixar o arquivo ${document.url}: ${reason}`,
            );
        }
    }

    private getFileName(url: string): string {
        const urlFileName = path.basename(new URL(url).pathname);
        const decodedFileName = decodeURIComponent(urlFileName);
        const safeFileName = decodedFileName.replace(/[^a-zA-Z0-9._-]/g, "_");

        if (!safeFileName) {
            throw new DownloadErrorException("A URL não possui um nome de arquivo válido.");
        }

        return safeFileName;
    }
}

export default new DownloadService();
