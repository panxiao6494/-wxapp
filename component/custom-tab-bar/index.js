const app = getApp();
Component({

    pageLifetimes: {
        show: function() {
            // 页面被展示
            this.init();
        },
        hide: function() {
            // 页面被隐藏
        },
        resize: function(size) {
            // 页面尺寸变化
        }
    },

    properties: {
        currentIdx: {
            type: String,
            value: "0"
        }
    },
    data: {
        activeIdx: 0,
        config: {
            color: '#FFFFFF',
            selectedColor: '#FFBA41'
        },
        teamList: [],
        list: [{
                iconPath: "/image/tabbar/cardHead.png",
                selectedIconPath: "/image/tabbar/cardHead.png",
                pagePath: "/pages/index/index",
                text: "首页"
            },
            {
                iconPath: "/image/tabbar/paysuccessLogo.png",
                selectedIconPath: "/image/tabbar/paysuccessLogo.png",
                pagePath: "/pages/vip/index",
                text: "会员中心"
            },
            {
                iconPath: "/image/tabbar/head.png",
                selectedIconPath: "/image/tabbar/head.png",
                pagePath: "/pages/myCenter/index",
                text: "我的"
            }
        ],

    },

    methods: {
        init: function() {
            wx.hideTabBar();
            let current = this.data.currentIdx;
            this.setData({
                activeIdx: current
            });
        },
        switchTab(evt) {
            const {
                pagePath,
                itemIdx
            } = evt.currentTarget.dataset;
            console.log(itemIdx, pagePath);
            wx.switchTab({
                url: pagePath
            })

        },
        handleError(e) {
            console.log("===================", e);
        }
    },
});