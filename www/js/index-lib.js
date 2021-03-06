// HTML UI模組
const _element = Symbol('element')
const _instance1 = Symbol('instance1')
class customHTMLElement { // html UI重寫
    constructor() {
        this[_element] = null
        this[_instance1] = null
    }

    setElement(element) {
        this[_element] = element
    }

    show() {
        this[_element].style.display = 'block'
    }

    hide() {
        this[_element].style.display = 'none'
    }

    disable() {
        this[_element].setAttribute('disabled', 'disabled')
    }

    enable() {
        this[_element].removeAttribute('disabled')
    }

    html(value) {
        this[_element].innerHTML = value
    }

    click(callback) {
        this[_element].addEventListener('click', callback)
    }

    getHtml() {
        return this[_element].innerHTML
    }

    getValue() {
        return this[_element].value
    }

    addList(str, id) {
        this[_element].innerHTML += '<li id="' + id + '" class="swipeout"> \
        <div class="swipeout-content item-content"> \
            <div class="item-title">'+ str + '</div> \
        </div> \
        <div class="swipeout-actions-right"> \
            <a href="#" class="swipeout-delete" data-confirm="您確定要刪除此筆資料?" data-confirm-title="Delete?">Delete</a> \
        </div></li>'
    }

    getInstance() {
        if (!this[_instance1]) this[_instance1] = new customHTMLElement()
        return this[_instance1]
    }
}

// 飲料店資訊模組
const _instanceDrink = Symbol('instanceDrink')
const _infoDrink = Symbol('nameDrink')
class drinkInfo extends customHTMLElement { // 隨選飲料店資訊
    constructor() {
        super()
        this[_instanceDrink] = null
        this[_infoDrink] = new Object()
        this[_infoDrink].name = null // 店家名稱
        this[_infoDrink].address = null // 地址
        this[_infoDrink].status = null // 營業狀態
        this[_infoDrink].rating = null // Google社群評等
        this[_infoDrink].map = null // 地圖
    }

    setInfo() {
        Object.keys(this[_infoDrink]).map((key, index) => {
            this[_infoDrink][key] = arguments[index]
        })
    }

    setName(name) {
        this[_infoDrink].name = name
    }

    setAddress(address) {
        this[_infoDrink].address = address
    }

    setStatus(status) {
        if (status) {
            this[_infoDrink].status = '營業中'
        } else {
            this[_infoDrink].status = '已打烊'
        }
    }

    setRating(rating) {
        this[_infoDrink].rating = rating + ' / 5'
    }

    setMap(map) {
        this[_infoDrink].map = map
    }

    getInfo() {
        return this[_infoDrink]
    }

    updateUI() {
        Object.keys(this[_infoDrink]).map((key1, index1) => {
            let object = document.querySelectorAll('[name=' + key1 + ']')
            Object.keys(object).map((key2, index2) => object[index2].innerHTML = this[_infoDrink][key1])
        })
    }

    getInstance() {
        if (!this[_instanceDrink]) this[_instanceDrink] = new drinkInfo()
        return this[_instanceDrink]
    }
}

// 訂單資訊模組
const _instanceOrder = Symbol('instanceDrink')
const _infoOrder = Symbol('nameDrink')
class orderInfo extends customHTMLElement {
    constructor() {
        super()
        this[_instanceOrder] = null
        this[_infoOrder] = new Object()
        this[_infoOrder].orderID = null
        this[_infoOrder].menu = null
    }

    setInfo() {
        Object.keys(this[_infoOrder]).map((key, index) => {
            this[_infoOrder][key] = arguments[index]
        })
    }

    setOrderID(orderID) {
        this[_infoOrder].orderID = orderID
    }

    setMenu(menu) {
        this[_infoOrder].menu = menu
    }

    getInfo() {
        return this[_infoOrder]
    }

    updateUI() {
        Object.keys(this[_infoOrder]).map((key1, index1) => {
            let object = document.querySelectorAll('[name=' + key1 + ']')
            Object.keys(object).map((key2, index2) => {
                object[index2].innerHTML = this[_infoOrder][key1]
            })
        })
    }

    getInstance() {
        if (!this[_instanceOrder]) this[_instanceOrder] = new orderInfo()
        return this[_instanceOrder]
    }
}

// 客戶資訊模組
const _instancecustomer = Symbol('instancecustomer')
const _customer = Symbol('customer')
const _customerId = Symbol('customerId')
class customerInfo extends customHTMLElement {
    constructor() {
        super()
        this[_instancecustomer] = null
        this[_customerId] = null
        this[_customer] = new Array()
    }

    setCustomerId(id) {
        this[_customerId] = id
    }

    getCustomerId() {
        return this[_customerId]
    }

    remove(index) {
        this[_customer].splice(index, 1)
    }

    add(message) {
        this[_customer].push(message)
    }

    get() {
        return this[_customer]
    }

    updateUI() {
        let UI = document.querySelector('#customer-list')
        UI.innerHTML = ''
        this[_customer].map((value, index) => {
            UI.innerHTML += '<li class="swipeout"> \
                              <div class="swipeout-content item-content"> \
                                   <div class="item-inner">'+ value + '</div> \
                              </div> \
                              <div class="swipeout-actions-right"> \
                                    <a href="#" class="swipeout-delete" data-confirm="請問您確定要刪除此項目嗎?" data-confirm-title="Delete?">Delete</a> \
                              </div> \
                            </li>'
        })
    }

    getInstance() {
        if (!this[_instancecustomer]) this[_instancecustomer] = new customerInfo()
        return this[_instancecustomer]
    }
}

// 後端連接模組
const _instanceAzure = Symbol('instanceAzure')
const _clientAzure = Symbol('clientAzure')
const _tableAzure = Symbol('tableAzure')
class azureMobileApp extends customHTMLElement {
    constructor() {
        super()
        this[_instanceAzure] = null
        this[_clientAzure] = null
        this[_tableAzure] = null
    }

    setClient(url) {
        this[_clientAzure] = new WindowsAzure.MobileServiceClient(url)
    }

    getClient() {
        return this[_clientAzure]
    }

    setTable(name) {
        this[_tableAzure] = this[_clientAzure].getTable(name)
    }

    selectIDByOrderID(orderID) {
        return new Promise((resolve, reject) => {
            this[_tableAzure]
                .where({
                    orderID: orderID
                })
                .read()
                .then((results) => {
                    resolve(results[0].id)
                }, (error) => {
                    reject(error)
                })
        })
    }

    selectAllByOrderID(orderID) {
        return new Promise((resolve, reject) => {
            this[_tableAzure]
                .where({
                    orderID: orderID
                })
                .read()
                .then((results) => {
                    resolve(results)
                }, (error) => {
                    reject(error)
                })
        })
    }

    insertTable(data) {
        return new Promise((resolve, reject) => {
            this[_tableAzure].insert(data).done((insertedItem) => {
                resolve(insertedItem)
            }, (error) => {
                reject('Error loading data: ' + error)
            })
        })
    }

    deleteData(id) {
        return new Promise((resolve, reject) => {
            this[_tableAzure].del({ id: id }).done(() => resolve())
        }, (error) => {
            reject(error)
        })
    }

    randomDrinkAsync(location) { // 隨機該位置找出附近飲料店
        return new Promise((resolve, reject) => {
            this[_clientAzure].invokeApi('placesinfo', {
                body: { location: location },
                method: 'POST'
            }).done((results) => {
                let info = JSON.parse(results.responseText)
                resolve(info)
            }, (error) => {
                reject('error: ' + error.message)
            })
        })
    }

    randomOrderAsync() { // 隨機產生訂單編號
        return new Promise((resolve, reject) => {
            this[_clientAzure].invokeApi('random', {
                body: null,
                method: 'POST'
            }).done((results) => {
                let randomStr = results.responseText
                resolve(randomStr)
            }, (error) => {
                reject('error: ' + error.message)
            })
        })
    }

    searchMenuImgAsync(str) {
        return new Promise((resolve, reject) => {
            this[_clientAzure].invokeApi('imagesearch', {
                body: { q: str },
                method: 'POST'
            }).done((results) => {
                let json = JSON.parse(results.responseText)
                resolve(json)
            })
        })
    }

    getInstance() {
        if (!this[_instanceAzure]) this[_instanceAzure] = new azureMobileApp()
        return this[_instanceAzure]
    }
}

// 手機sensor偵測模組
const _instanceLocal = Symbol('instanceLocal')
class localSensor {
    constructor() {
        this[_instanceLocal] = null
    }

    getLocationAsync() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position)
            }, (error) => {
                reject(error)
            })
        })
    }

    getStaticMap(location) {
        return '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + location + '&zoom=18&size=600x300&maptype=roadmap \
         &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318 \
         &markers=color:red%7Clabel:C%7C40.718217,-73.998284 \
         &key=AIzaSyB1FeVNtCVEF6QKTquVuRYdX5IxInJZuYY" width="100%">'
    }

    getInstance() {
        if (!this[_instanceLocal]) this[_instanceLocal] = new localSensor()
        return this[_instanceLocal]
    }
}

const _instanceMath = Symbol('instanceMath')
class mathPlugin {
    constructor() {
        this[_instanceMath] = null
    }

    getRandomInt(lower, upper) {
        return parseInt(upper * Math.random() + lower)
    }

    getInstance() {
        if (!this[_instanceMath]) this[_instanceMath] = new mathPlugin()
        return this[_instanceMath]
    }
}

const _instanceImage = Symbol('instanceImage')
const _tempImage = Symbol('tempImage')
class imageProcess {
    constructor() {
        this[_tempImage] = null
    }

    setImage(img) {
        this[_tempImage] = img
    }

    getBase64Image() {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let dataURL = canvas.toDataURL('image/png')
        canvas.width = this[_tempImage].width
        canvas.height = this[_tempImage].height
        ctx.drawImage(this[_tempImage], 0, 0)
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    }

    getInstance() {
        if (!this[_instanceImage]) this[_instanceImage] = new imageProcess()
        return this[_instanceImage]
    }
}

const _instanceFacebook = Symbol('instanceFacebook')
const _tokenFacebook = Symbol('tokenFacebook')
const _userNameFacebook = Symbol('_userNameFacebook')
const _userIdFacebook = Symbol('_userIdFacebook')
class facebookInfo {
    constructor() {
        this[_userIdFacebook] = null
        this[_tokenFacebook] = null
        this[_userNameFacebook] = null
    }

    setUserId(id) {
        this[_userIdFacebook] = id
    }

    getUserId() {
        return this[_userIdFacebook]
    }

    setUserName(name) {
        this[_userNameFacebook] = name
    }

    getUserName() {
        return this[_userNameFacebook]
    }

    setToken(token) {
        this[_tokenFacebook] = token
    }

    getToken() {
        return this[_tokenFacebook]
    }

    getInstance() {
        if (!this[_instanceFacebook]) this[_instanceFacebook] = new facebookInfo()
        return this[_instanceFacebook]
    }
}