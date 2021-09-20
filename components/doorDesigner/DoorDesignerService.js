class DoorDesignerService {
    constructor() {
        console.log("DoorDesignerService loaded.");
    }

    getServiceUrl() {
        return theme.routes.shopUrl + theme.prefixes.proxy + "/DoorDesign/";
    }

    suggestDoorQuantity(topWidth, bottomWidth, leftHeight, rightHeight) {
        let url = this.getServiceUrl() + "SuggestDoorQuantity?topWidth=" + topWidth + "&bottomWidth=" + bottomWidth + "&leftHeight=" + leftHeight + "&rightHeight=" + rightHeight;

        return new Promise(function (resolve, reject) {
            fetch(url)
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

    createAggregateProduct(productsList) {
        let url = this.getServiceUrl() + "CreateAggregateProduct";

        const options = {
            method: 'POST',
            body: JSON.stringify(productsList),
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
