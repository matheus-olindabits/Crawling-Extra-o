class MergeErrorException extends Error {
    constructor(error = "Não foi possível unificar os arquivos baixados!") {
        super(error);
        this.name = "mergeError";
    }
}

export default MergeErrorException;
