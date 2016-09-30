import request from 'superagent';

class RestApiClient {
    /**
     * Конструктор клиента. Проставляет домен, префикс, хедеры
     * @param {String} entryUrl URL рестового сервиса.
     * @param {Object} [headers] Заголовки запроса.
     */
    constructor(entryUrl, headers = {}) {
        this.entryUrl = entryUrl;
        this.headers = headers || {};
    }

    /**
     * Выполняет GET запрос к API
     *
     * @method get
     * @param {String} url - URL ресурса
     * @param {Object} [query] - Query параметры
     * @return {Request}
     */
    get(url, query = {}) {
        return request.get(`${this.entryUrl}${url}`)
            .query(query)
    }
    /**
     * Выполняет POST запрос к API
     *
     * @method get
     * @param {String} url - URL ресурса
     * @param {Object} [data] - body запроса
     * @param {Object} [query] - Query параметры
     * @return {Request}
     */
    post(url, data = {}, query = {}) {
        return request.post(`${this.entryUrl}${url}`)
            .query(query)
            .send(data);
    }
}

export default RestApiClient;
