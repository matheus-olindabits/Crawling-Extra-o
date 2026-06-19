class ScrapingErrorException extends Error {
    constructor(error="Não foi possível realizar a operação informada!") {
      super(error);
      this.name = "scrapingError";
    }
  }

  export default ScrapingErrorException;