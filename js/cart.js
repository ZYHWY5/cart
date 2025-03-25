const app = Vue.createApp({
    template:'#root',
    data() {
        return {
            //购物车数组
            cart:[],
            //全局索引 选中的板块的索引
            index:0,
            //类型名
            type:['猜你喜欢','户外运动','潮店数码','办公文具'],
            //类名集合 yes为选中类名 no为默认样式
            className:['yes','no','no','no'],
            //
            checkall:true,
            //商品数据
            goods:[]
        }
    },
    methods: {
        chose(index){
            //全部格式化为no
            for(let i = 0; i < this.className.length; i++){
                this.className[i] = 'no'
            }
            //将点击的设为yes
            this.className[index] = 'yes'
            //给全局index赋值
            this.index = index
        },
        //向购物车数组添加点击商品的对象
        add(temp){
            for(let i = 0; i < this.cart.length; i++){
                if(this.cart[i] == temp){
                    this.cart[i].count++
                    return
                }
            }
            //添加商品自动选中
            temp.checked = true
            this.cart.unshift(temp)
        },
        //单个商品数量增加
        increament(item){
            item.count++
        },
        //单个商品数量减少
        decreament(item){
            if(item.count > 1){
                item.count--
            }
        },
        //移出购物车
        del(item){
            item.count = 1
            this.cart = this.cart.filter(function(x){
                return x != item
            })
        },
        //得到单件商品的价格
        getprice(item){
            return ((item.price * item.count) * item.discount).toFixed(2)
        },
        //四舍五入函数
        numDelivery(num) {
            var result = parseFloat(num);
            if (isNaN(result)) {
              alert("传递参数错误，请检查！");
              return false;
            }
            result = Math.round(num * 100) / 100;
            return result;
        
        },
        //购物车全选
        checkedall(){
            for(let i = 0; i < this.cart.length; i++){
                this.cart[i].checked = true
            }
        },
        //购物车全不选 
        uncheckall(){
            for(let i = 0; i < this.cart.length; i++){
                this.cart[i].checked = false
            }
        }
    },
    computed:{
        //总价
        total(){
            let total = 0
            for(let i = 0; i < this.cart.length; i++){
                if(this.cart[i].checked == true){
                    total += this.numDelivery(((this.cart[i].price * this.cart[i].count) * this.cart[i].discount))
                }
            }
            return total.toFixed(2)
        }
    },
    watch:{
        //全选input
        checkall(newValue, oldValue){
            console.log(newValue, oldValue)
            if(newValue == true){
                for(let i = 0; i < this.cart.length; i++){
                    this.cart[i].checked = newValue
                }
            }
            else{
                let iscontrol = false
                for(let i = 0; i < this.cart.length; i++){
                    if(this.cart[i].checked == true){
                        iscontrol = true
                    }
                    else{
                        iscontrol = false
                        break
                    }   
                }
                if(iscontrol){
                    for(let i = 0; i < this.cart.length; i++){
                        this.cart[i].checked = newValue
                    }
                }
            }
        },
        //侦听商品复选框判断全选复选框的状态
        cart:{
            handler(newValue, oldValue){
                console.log(newValue, oldValue)
                for(let i = 0; i < newValue.length; i++){
                    if(newValue[i].checked == false){
                        this.checkall = false
                        return
                    }
                    else{
                        this.checkall = true
                    }
                }
            },
            deep:true
        }
    },
    async mounted(){
        const result = await axios.get('https://037d7e71-968b-465e-bc87-667944886956.mock.pstmn.io/order-github')
        this.goods = result.data
        console.log(this.goods)
    }
})
app.mount('#app')