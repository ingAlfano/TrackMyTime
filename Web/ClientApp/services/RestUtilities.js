;
var RestUtilities = (function () {
    function RestUtilities() {
    }
    RestUtilities.get = function (url) {
        return RestUtilities.request('GET', url);
    };
    RestUtilities.delete = function (url) {
        return RestUtilities.request('DELETE', url);
    };
    RestUtilities.put = function (url, data) {
        return RestUtilities.request('PUT', url, data);
    };
    RestUtilities.post = function (url, data) {
        return RestUtilities.request('POST', url, data);
    };
    RestUtilities.request = function (method, url, data) {
        var isJsonResponse = false;
        var isBadRequest = false;
        var body = data;
        var headers = new Headers();
        headers.set('Accept', 'application/json');
        if (data) {
            if ((typeof data === 'object')) {
                headers.set('Content-Type', 'application/json');
                body = JSON.stringify(data);
            }
            else {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        return fetch(url, {
            method: method,
            headers: headers,
            body: body,
        }).then(function (response) {
            isBadRequest = (response.status == 400);
            var responseContentType = response.headers.get("content-type");
            if (responseContentType && responseContentType.indexOf("application/json") !== -1) {
                isJsonResponse = true;
                return response.json();
            }
            else {
                return response.text();
            }
        }).then(function (responseContent) {
            var response = {
                is_error: isBadRequest,
                error_content: isBadRequest ? responseContent : null,
                content: isBadRequest ? null : responseContent
            };
            return response;
        });
    };
    return RestUtilities;
}());
export default RestUtilities;
//# sourceMappingURL=RestUtilities.js.map