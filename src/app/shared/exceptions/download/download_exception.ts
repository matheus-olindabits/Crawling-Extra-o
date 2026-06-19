class DownloadErrorException extends Error {
    constructor(error = "Não foi possível baixar os arquivos identificados!") {
        super(error);
        this.name = "downloadError";
    }
}

export default DownloadErrorException;
