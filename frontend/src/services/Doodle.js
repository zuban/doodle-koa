import RestApiClient from './RestApiClient';

export default class DoodleService {
    constructor() {
        this.apiClient = new RestApiClient('http://localhost:80/');
    }

    /**
     * @method get
     * @param url
     * @param {Object} query - Query параметры
     * @return {Promise}
     */
    get(url, query) {
        return new Promise((resolve, reject) => {
            this.apiClient
                .get(url, query)
                .end((error, response) => {
                    if (!error) {
                        resolve(response.body);
                    } else {
                        reject({
                            status: error,
                            message: 'Ошибка получения данных',
                        });
                    }
                });
        });
    }

    /**
     * @method post
     * @param url
     * @param {Object} body - тело запроса
     * @param {Object} query - Query параметры
     * @return {Promise}
     */
    post(url, body, query = {}) {
        return new Promise((resolve, reject) => {
            this.apiClient
                .post(url, body, query)
                .end((error, response) => {
                    if (!error) {
                        resolve(response.text);
                    } else {
                        reject({
                            status: error,
                            message: 'Ошибка метода post',
                        });
                    }
                });
        });
    }
}

