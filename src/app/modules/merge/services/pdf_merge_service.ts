import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { PDFDocument } from "pdf-lib";

import type { DownloadedDocumentInterface } from "../../download/shared/models/downloaded_document_interface.js";
import type { MergedDocumentInterface } from "../shared/models/merged_document_interface.js";
import MergeErrorException from "../../../shared/exceptions/merge/merge_exception.js";

const MERGED_FILE_NAME = "documentos_unificados.pdf";

class PdfMergeService {

    async execute(
        documents: DownloadedDocumentInterface[],
    ): Promise<MergedDocumentInterface> {
        const firstDocument = documents[0];

        if (!firstDocument) {
            throw new MergeErrorException("Não há documentos para unificar.");
        }

        try {
            const mergedPdf = await PDFDocument.create();

            for (const document of documents) {
                const fileContent = await readFile(document.filePath);
                const sourcePdf = await PDFDocument.load(fileContent);
                const pages = await mergedPdf.copyPages(
                    sourcePdf,
                    sourcePdf.getPageIndices(),
                );

                pages.forEach((page) => mergedPdf.addPage(page));
            }

            const filePath = path.join(
                path.dirname(firstDocument.filePath),
                MERGED_FILE_NAME,
            );
            const mergedContent = await mergedPdf.save();

            await writeFile(filePath, mergedContent);

            return {
                fileName: MERGED_FILE_NAME,
                filePath,
                totalDocuments: documents.length,
                totalPages: mergedPdf.getPageCount(),
            };
        } catch (error: unknown) {
            if (error instanceof MergeErrorException) throw error;

            const reason = error instanceof Error ? error.message : "erro desconhecido";
            throw new MergeErrorException(
                `Não foi possível unificar os documentos: ${reason}`,
            );
        }
    }
}

export default new PdfMergeService();
