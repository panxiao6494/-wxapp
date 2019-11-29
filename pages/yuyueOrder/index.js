Page({
    //31.233789，121.471011
    data: {
        list: ['1排1号座', '1排2号座', '6排10号座'],
        markers: [{
            iconPath: "/image/address-mark.png",
            id: 0,
            latitude: 31.233789,
            longitude: 121.471011,
            width: 40,
            height: 50
        }],
        polyline: [{
            points: [{
                longitude: 121.471011,
                latitude: 31.233789
            }, {
                longitude: 121.471011,
                latitude: 31.233790
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: "/image/time.png",
            position: {
                left: 0,
                top: 300 - 50,
                width: 30,
                height: 30
            },
            clickable: true
        }]
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    },
    backPage() {
        wx.navigateBack()
    }
})