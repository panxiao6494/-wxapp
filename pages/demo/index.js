Page({
    data: {
        leftX: 35,
        selectList: [],
        scaleValue: 1,
        chooseFlag: false,
        price: null,
        totalPrice: null,
        total: [],
        scaleFlag: true,
        flag: false,
        scaleArr: [],
        height: 0,
        greenPrice: [
            [{num: 29}, {num: 27}, {num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}, {num: 26}, {num: 28}],
            [{num: 29}, {num: 27}, {num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}, {num: 26}, {num: 28}],
            [{num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}],
            [{num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}, {num: 26}],
            [{num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}, {num: 26}],
            [{num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}, {num: 26}],
            [{num: 27}, {num: 25}, {num: 23}, {num: 21}, {num: 19}, {num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}, {num: 20}, {num: 22}, {num: 24}, {num: 26}, {num: 28}],
            [{num: 17}, {num: 15}, {num: 13}, {num: 11}, {num: 9}, {num: 7}, {num: 5}, {num: 3}, {num: 1}, {num: 2}, {num: 4}, {num: 6}, {num: 8}, {num: 10}, {num: 12}, {num: 14}, {num: 16}, {num: 18}]
        ],
        idx: null
    },
    onLoad() {
        let total = this.data.total
        this.data.greenPrice.forEach((items, index) => {
            items.forEach((item, i) => {
                item.chooseFlag = false
                total.push(item)
                for (var i = 0; i < total.length; i++) {
                    item.id = i
                }
            })
        })
        console.log(this.data.greenPrice)
        this.getHeigth()
    },
    tap(e) {
        console.log(e)
        let row = e.currentTarget.dataset.row //行索引
        let x = e.currentTarget.dataset.row + 1 //行
        let col = e.currentTarget.dataset.col //列索引
        let y = this.data.greenPrice[row][col].num

        this.setData({
            greenPrice: this.data.greenPrice,
        })
        let selectList = this.data.selectList
        if (selectList.length >= 3 && !this.data.greenPrice[row][col].chooseFlag) {
            wx.showModal({
                title: '提示',
                content: '你只能选购3张剧票！',
                showCancel: false
            })
            return
        }
        this.data.greenPrice[row][col].chooseFlag = !this.data.greenPrice[row][col].chooseFlag
        console.log(x + '排', y + '座')
        let seat = {
            x: x,
            y: y,
            id: this.data.greenPrice[row][col].id,
            price: Number(e.currentTarget.dataset.price)
        }

        if (this.data.greenPrice[row][col].chooseFlag) {
            selectList.push(seat)
        } else {
            for (const key in selectList) {
                if (selectList[key].id == this.data.greenPrice[row][col].id) {
                    selectList.splice(key, 1) // 删除未选中的
                }

            }
        }

        console.log(selectList, 55)
        let totalPrice = 0;
        selectList.forEach((item, index) => {
            totalPrice += item.price
        })
        this.setData({
            selectList: selectList,
            greenPrice: this.data.greenPrice,
            totalPrice: totalPrice,
            scaleValue: 2,
            flag: true
        })
        console.log(this.data.height, 3)
    },
    getHeigth() {
        let that = this;
        var query = wx.createSelectorQuery();
        query.select('.zuowei-box').boundingClientRect()
        query.exec(function (res) {
            let height = res[0].height
            that.setData({
                height: height
            })
        })
    },
    delete(e) {
        console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index
        let selectList = this.data.selectList
        let greenPrice = this.data.greenPrice
        let id = selectList[index].id
        console.log(id, 6)
        selectList.splice(index, 1)
        this.data.greenPrice.forEach((items, i) => {
            items.forEach((item, j) => {
                if (item.id == id) {
                    item.chooseFlag = false
                }
            })
        })
        let totalPrice = 0;
        selectList.forEach((item, index) => {
            totalPrice += item.price
        })
        this.setData({
            totalPrice,
            selectList,
            greenPrice
        })
    },
    scaleEvent(e) {
        console.log(e)
        let scaleNum = e.detail.scale;
        //console.log(scaleNum)
        if (scaleNum == 1) {
            this.setData({
                flag: false
            })
        }
        if (scaleNum == 2) {
            this.setData({
                flag: true
            })
        }

    },
    move(e) {
        console.log(e.detail.x)
        let x = e.detail.x
        let leftX = this.data.leftX
        this.setData({
            leftX: 75
        })
    },
    toOrder() {
        console.log(1)
        wx.navigateTo({
            url: '../yuyueOrder/index'
        })
    }
})