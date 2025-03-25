const app = Vue.createApp({
    template:'#root',
    data() {
        return {
            email_isfocus:false,
            email_isempty:false,
            pass_isfocus:false,
            pass_isempty:false,
            emailEmpty:'',
            passEmpty:'',
            input_type:'password',
            agreement:false,
            isactive_email:false,
            isactive_pass:false,
            email:'',
            pass:'',
            list:[
                {
                    id:0,
                    name:'登录'
                },
                {
                    id:1,
                    name:'注册'
                },
            ],
            chose:0,
            img_list:[
                'img/eye_close.png',
                'img/eye_open.png'
            ],
            eye:'img/eye_close.png',
            another_list:[
                'img/pay.png',
                'img/wechat.png',
                'img/qq.png',
                'img/webo.png'
            ]
        }
    },
    methods: {
        email_getfocus(){
            this.email_isfocus = true
        },
        email_losefocus(e){
            if(e.target.value.length <= 0){
                this.email_isempty = true
                this.emailEmpty = '请输入账号'
            }
            else{
                this.email_isempty = false
                this.emailEmpty = ''
                return
            }
            this.email_isfocus = false
        },
        pass_getfocus(){
            this.pass_isfocus = true
        },
        pass_losefocus(e){
            if(e.target.value.length <= 0){
                this.pass_isempty = true
                this.passEmpty = '请输入密码'
            }
            else{
                this.pass_isempty = false
                this.passEmpty = ''
                return
            }
            this.pass_isfocus = false
        },
        type(){
            switch(this.eye){
                case this.img_list[0]:this.eye = this.img_list[1];this.input_type = 'text';break
                case this.img_list[1]:this.eye = this.img_list[0];this.input_type = 'password';break
            }
        },
        agree(){
            this.agreement = !this.agreement
        },
        login(){
            if(this.isactive_email == true && this.isactive_pass == true){

            }
            if(this.isactive_email == true && this.isactive_pass == true && this.agreement == true){

            }
        },
        //切换板块
        fun(index){
            this.chose = index
        }
    },
    watch:{
        email(newvalue, oldvalue){
            if(newvalue.length >= 1){
                this.isactive_email = true
            }
            else{
                this.isactive_email = false
            }
        },
        pass(newvalue, oldvalue){
            if(newvalue.length >= 1){
                this.isactive_pass = true
            }
            else{
                this.isactive_pass = false
            }
        }
    }
})
app.mount('#app')