/**
 * Async based HTTP Client for making HTTP requests
 */
export class Http {
  /**
   * Create a new HTTP client.
   * @param {string} baseUrl The base URL to route all requests to. Omit trailing '/'
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make an HTTP GET request
   * @param {string} url The path of the request.
   * @param {{name: string, value: string}} param A query string parameter
   */
  async get(url, param) {
    return this._makeRequest('GET', `${this.baseUrl}${url}?${param.name}=${encodeURIComponent(param.value)}`);
  }

  /**
   * Make an HTTP POST request.
   * @param {string} url The path of request.
   * @param {{}} body The JSON body content.
   */
  async post(url, body) {
    return this._makeRequest('POST', `${this.baseUrl}${url}`, body);
  }

  async _makeRequest(method, url, body = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr;
      xhr.open(method, url);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      if (body != null) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }
}
