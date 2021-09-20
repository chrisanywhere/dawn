class CartService {
    constructor() {
        console.log("CartService loaded.");
    }

    getServiceUrl() {
        return "/cart";
    }

    addToCart(productVariantId) {
        let url = this.getServiceUrl() + "/add.js";

        let body = {
            quantity: 1,
            id: productVariantId
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return new Promise(function (resolve, reject) {
            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    }
                    else {
                        reject(response);
                    }
                });
        });
    }
}
