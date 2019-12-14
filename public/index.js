var vm = new Vue({
    el: '#app',
    data: {
        items: [
            '果盘',
            '水果',
            '一点点奶茶',
            '一只酸奶牛',
            '周黑鸭',
            '鲍师傅',
            '炸鸡',
            '披萨',
            '椰青',
            '甜点',
            '小蛋糕',
        ],
        activeIndex: 0,
        selectState: 0,
        initialNum: 10,
        btnLabel: '开始选',
        input: '',
        selectCounter: 0,
        selectFinish: false,
    },
    created() {
        const localData = this.getLocalStorage('teaAndCake').split('_')
        localData.forEach(function(element) {
            if (element) this.items.push(element)
        }, this);
    },
    methods: {
        clickBtn() {
            const max = this.items.length;
            if (this.input) this.addInput()
            if (this.selectState) {
                this.selectFinish = true
                this.stop()
                this.btnLabel = '重新选'
                this.selectState = 0;
            } else {
                this.selectFinish = false
                this.start(max)
                this.btnLabel = '选好了~'
                this.selectState = 1
            }
        },
        resetState() {
            this.selectFinish = false
            this.stop()
            this.btnLabel = '开始选~'
            this.selectState = 0;
        },
        start(max) {
            this.selectCounter = setInterval(() => {
                this.activeIndex = Math.floor(Math.random() * max)
            }, 20)
        },
        stop() {
            clearInterval(this.selectCounter)
        },
        addInput() {
            if (this.input) {
                this.items.push(this.input);
                if (window.localStorage) this.addLocalStorage('teaAndCake', this.input)
                this.input = '';
            }
        },
        remove(index) {
            if (index > this.initialNum) {
                const value = this.items.splice(index, 1)
                this.setLocalStorage('teaAndCake', this.getLocalStorage('teaAndCake').replace(value, ''))
            }
        },
        setLocalStorage(key, value) {
            window.localStorage.setItem(key, value);
        },
        addLocalStorage(key, value) {
            const str = this.getLocalStorage(key).replace(/__/g, '') + '_' + value
            window.localStorage.setItem(key, str);
        },
        getLocalStorage(key) {
            return window.localStorage.getItem(key) || '';
        },
    }
})