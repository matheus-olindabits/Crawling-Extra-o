class CrawlingErrorException extends Error {
    constructor(error="Não foi possível buscar os dados no link informado!") {
      super(error);
      this.name = "crawlingError";
    }
  }

  export default CrawlingErrorException;