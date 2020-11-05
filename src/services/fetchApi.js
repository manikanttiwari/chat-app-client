const BASE_URL = "http://localhost:5000/api/v1/"

export const postData = async (api = 'get-chat-list', payload, method = 'POST') => {
    let didTimeOut = false;
    return new Promise(function (resolve, reject) {
        const timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request Time Out'));
        }, 60000);

        //console.log(`${BASE_URL}${api}`, payload, token);
        fetch(`${BASE_URL}${api}`,
            {
                method: `${method}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response) {
                        return response.json();
                    } else {
                        reject(new Error('No data found'));
                    }
                }
            })
            .then(formattedResponse => {
                // console.log("API RESPONSE ",formattedResponse)
                resolve(formattedResponse);
            })
            .catch(err => {
                // console.log('POST fetch failed! ', err);
                if (didTimeOut) return;
                reject(new Error('Something went wrong'));
            });
    })
        .then(formattedResponse => {
            return formattedResponse;
        })
        .catch(function (err) {
            return { status: { err_cd: err.message } }
        });
};