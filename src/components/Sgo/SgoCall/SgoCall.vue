<template>
  <div class="callNotification">
    <audio id="remoteAudio" autoplay=""></audio>
    <!-- 客服图标 未登录 -->
    <div v-if="isServicer && !loginStatus" v-drag.limit id="drag" class="unReadNews" style="background-color: #b7b6b6;" @click="clickFloatBtn">
      <div class="icon">
        <img class="pic-auto" src="@/assets/image/headset.png" alt="">
      </div>
      <!-- 提示消息弹窗 -->
      <div v-if="messageDialog" class="message-dialog">
        <!-- 普通-弹窗 -->
        <div v-if="messageType === 1" class="info-dialog">{{ messageValue }}</div>
        <!-- 成功-弹窗 -->
        <div v-if="messageType === 2" class="success-dialog">{{ messageValue }}</div>
        <!-- 警告-弹窗 -->
        <div v-if="messageType === 3" class="warning-dialog">{{ messageValue }}</div>
        <!-- 失败-弹窗 -->
        <div v-if="messageType === 4" class="danger-dialog">{{ messageValue }}</div>
      </div>
    </div>
    <!-- 客服图标 已登录 -->
    <div v-if="isServicer && loginStatus" v-drag.limit id="drag" class="unReadNews" @click="clickFloatBtn">
      <div class="icon">
        <img class="pic-auto" src="@/assets/image/headset.png" alt="">
      </div>
      <!-- 提示消息弹窗 -->
      <div v-if="messageDialog" class="message-dialog">
        <!-- 普通-弹窗 -->
        <div v-if="messageType === 1" class="info-dialog">{{ messageValue }}</div>
        <!-- 成功-弹窗 -->
        <div v-if="messageType === 2" class="success-dialog">{{ messageValue }}</div>
        <!-- 警告-弹窗 -->
        <div v-if="messageType === 3" class="warning-dialog">{{ messageValue }}</div>
        <!-- 失败-弹窗 -->
        <div v-if="messageType === 4" class="danger-dialog">{{ messageValue }}</div>
      </div>
    </div>
    <!-- 通知弹窗 -->
    <div v-show="dialogVisible" id="notice-dialog" class="notice-dialog">
      <!-- 头部 -->
      <div class="header clearfix">
        <!-- 登录信息 -->
        <div class="login-info">
          <!-- 用户头像 -->
          <div class="clearfix">
            <div v-if="loginStatus" class="user-icon"><img class="pic-auto" src="@/assets/image/customer-service.png" alt=""></div>
            <div v-else class="user-icon"><img class="pic-auto" src="@/assets/image/default-service.png" alt=""></div>
            <el-link v-if="loginStatus" type="primary" :underline="false" class="loginOutBtn" @click="loginOut">退出</el-link>
          </div>
          <!-- 登录状态 -->
          <div class="login-statu">
            <span v-if="loginStatus">{{ custServicerInfo.account }}</span>
            <el-link v-else type="warning" :underline="false" style="font-size: 12px;" @click="loginIn">未登录</el-link>
          </div>
        </div>
        <!-- 时间状态 -->
        <div class="time-status">
          <div v-if="timeStatus === 0" class="text"><img src="@/assets/image/grey-light.png" alt="">等待</div>
          <div v-if="timeStatus === 1" class="text"><img src="@/assets/image/green-light.png" alt="">拨号中</div>
          <div v-if="timeStatus === 2" class="text"><img src="@/assets/image/green-light.png" alt="">通话中</div>
          <div v-if="timeStatus === 3" class="text"><img src="@/assets/image/yellow-light.png" alt="">来电</div>
          <div v-if="timeStatus === 4" class="text"><img src="@/assets/image/red-light.png" alt="">休息中</div>
          <div class="time">
            <!-- 计时器组件 -->
            <sgo-timer ref="sgoTimer" />
          </div>
        </div>
        <!-- 号码输入框 -->
        <div class="mobile-input">
          <el-input v-model="mobileValue" placeholder="请输入手机号" :disabled="!loginStatus" style="width: 160px;" clearable @input="changeInput" />
        </div>
        <!-- 接听 -->
        <!-- <div v-if="answerType === 1" class="phone btn-box" @click="answerBtn">
          <div class="icon"><img class="pic-auto" src="@/assets/image/green-phone.png" alt=""></div>
          <div class="text" style="color: #1dab47;">接听</div>
        </div> -->
        <!-- 接听-置灰 -->
        <!-- <div v-if="answerType === 2" class="dis-phone btn-box">
          <div class="icon"><img class="pic-auto" src="@/assets/image/grey-phone.png" alt=""></div>
          <div class="text" style="color: #1dab47;">接听</div>
        </div> -->
        <!-- 电话按钮 -->
        <div v-if="callStatus !== 0" class="phone btn-box">
          <!-- 拨号 -->
          <div v-if="callStatus === 1" @click="callBtn">
            <div class="icon"><img class="pic-auto" src="@/assets/image/green-phone.png" alt=""></div>
            <div class="text" style="color: #1dab47;">拨号</div>
          </div>
          <!-- 接听 -->
          <div v-if="callStatus === 2" @click="callBtn">
            <div class="icon"><img class="pic-auto" src="@/assets/image/green-phone.png" alt=""></div>
            <div class="text" style="color: #1dab47;">接听</div>
          </div>
          <!-- 挂断 -->
          <div v-if="callStatus === 3" @click="callBtn">
            <div class="icon" style="transform: rotate(128deg);"><img class="pic-auto" src="@/assets/image/red-phone.png" alt=""></div>
            <div class="text" style="color: red;">挂断</div>
          </div>
        </div>
        <!-- 拨打电话 禁用 -->
        <div v-else class="dis-phone btn-box">
          <div>
            <div class="icon"><img class="pic-auto" src="@/assets/image/grey-phone.png" alt=""></div>
          </div>
        </div>
        <!-- 休息按钮 -->
        <div v-if="restStatus !== 0" class="rest-work btn-box">
          <!-- 休息 -->
          <div v-if="restStatus === 1" @click="restBtn">
            <div class="icon"><img class="pic-auto" src="@/assets/image/yellow-coffee.png" alt=""></div>
            <div class="text" style="color: #cba740;">休息</div>
          </div>
          <!-- 工作 -->
          <div v-if="restStatus === 2" @click="restBtn">
            <div class="icon"><img class="pic-auto" src="@/assets/image/computer.png" alt=""></div>
            <div class="text" style="color: #409EFF;">工作</div>
          </div>
        </div>
        <!-- 休息 禁用 -->
        <div v-else class="dis-rest-work btn-box">
          <div>
            <div class="icon"><img class="pic-auto" src="@/assets/image/grey-coffee.png" alt=""></div>
          </div>
        </div>
        <!-- 提示消息 -->
        <div v-if="messageText" class="message-text">
          <!-- 普通-文字 -->
          <div v-if="messageType === 1">{{ messageValue }}</div>
          <!-- 成功-文字 -->
          <div v-if="messageType === 2" class="success-text">{{ messageValue }}</div>
          <!-- 警告-文字 -->
          <div v-if="messageType === 3" class="warning-text">{{ messageValue }}</div>
          <!-- 失败-文字 -->
          <div v-if="messageType === 4" class="danger-text">{{ messageValue }}</div>
        </div>
      </div>
      <!-- 内容 -->
      <div v-if="formVisible" class="form-content">
        <el-tabs v-model="tabsValue" :tab-position="tabPosition" @tab-click="clickForm">
          <el-tab-pane v-for="item in customerFormArr" :key="item.name" :name="item.name">
            <!-- 标签页 -->
            <span slot="label" style="position: relative;">{{ item.title }}
              <!-- 未读标识 -->
              <span v-if="item.unReadFlag" class="unRead"></span>
            </span>
            <!-- 表单内容 -->
            <el-form :ref="item.name" :model="item.formData" label-position="left" label-width="100px">
              <!-- 来电显示 -->
              <el-row :span="24">
                <el-col :span="12">
                  <el-form-item :label="$t('来电号码')">
                    <span>{{ item.formData.mobile }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('来电时间')">
                    <span>{{ item.call_time }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 公司 -->
              <el-form-item :label="$t('公司')">
                <el-select :placeholder="$t('placeholder.please')" v-model="item.selectEnterpriseArr" multiple filterable style="width: 290px">
                  <el-option v-for="val in item.enterpriseList" :key="val.id" :label="val.name" :value="val.id" />
                </el-select>
              </el-form-item>
              <!-- 备注 -->
              <el-form-item :label="$t('备注')">
                <el-input :rows="5" v-model="item.formData.remark" type="textarea" />
              </el-form-item>
              <!-- 回访时间 -->
              <el-form-item :label="$t('回访时间')">
                <el-date-picker v-model="item.formData.return_visit_time" :picker-options="pickerOptions" type="date" placeholder="选择日期" style="width: 290px;">
                </el-date-picker>
              </el-form-item>
              <!-- 结果 -->
              <el-form-item :label="$t('通话结果')" prop="result" :rules="[{ required: true, message: '结果不能为空'}]">
                <el-select v-model="item.formData.result" :placeholder="$t('placeholder.please')" style="width: 290px;">
                  <el-option v-for="(item, index) in resultList" :key="index" :label="item" :value="index" />
                </el-select>
              </el-form-item>
            </el-form>
            <!-- 操作按钮 -->
            <div class="form-btn">
              <!-- <el-button @click="formVisible = false">{{ $t('button.cancel') }}</el-button> -->
              <el-button :disabled="disabled_saveBtn" type="primary" @click="saveData(item)">{{ $t('保存') }}</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// import Bus from '@/utils/eventBus.js'
// import { alogin, loginout } from '@/utils/infobirdclient'
// import { aaa } from '../../../../public/static/js/infobirdCall'
// import { cacheUserInfo, cacheGongyiguEnum } from '@/utils/cache'
// import { parseTime } from '@/utils/time'

export default {
  name: 'SgoCall', // 来电通知
  directives: {
    // 自定义鼠标拖拽指令
    drag: {
      // 指令的定义
      bind: function (el, binding) {
        const odiv = el // 获取当前元素
        let firstTime = '' // 声明按钮起始时间
        let lastTime = ''
        odiv.onmousedown = e => {
          document.getElementById('drag').setAttribute('data-flag', false)
          firstTime = new Date().getTime()
          // 算出鼠标相对元素的位置
          const disX = e.clientX - odiv.offsetLeft
          const disY = e.clientY - odiv.offsetTop

          document.onmousemove = e => {
            const dialog = document.getElementById('notice-dialog') // 获取弹窗元素
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            const left = e.clientX - disX
            const top = e.clientY - disY
            //  限制在可视窗范围内移动元素
            if (left > 35 && left < document.body.clientWidth - 60) {
              odiv.style.left = left + 'px'
              dialog.style.left = left - 720 + 'px'
            }
            if (top > 0 && top < document.body.clientHeight - 35) {
              odiv.style.top = top + 'px'
              dialog.style.top = top + 'px'
            }
          }
          document.onmouseup = e => {
            document.onmousemove = null
            document.onmouseup = null
            // onmouseup 时的时间，并计算差值
            lastTime = new Date().getTime()
            if (lastTime - firstTime < 200) {
              document.getElementById('drag').setAttribute('data-flag', true)
            }
          }
          return false
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      formVisible: false,
      isServicer: false, // 是否是客服
      loginStatus: false, // 登录状态
      timeStatus: 0, // 默认：等待中
      messageType: 0, // 消息类型
      messageText: false, // 提示文字
      messageDialog: false, // 提示弹窗
      messageValue: undefined, // 消息内容
      clickStatus: false,
      mobileValue: undefined, // 输入框手机号
      custServicerInfo: {
        account: undefined // 获取客服账号
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      callStatus: 0, // 拨号状态    0：禁用 1：拨号 2：接听 3：挂断
      restStatus: 0, // 休息状态    0：禁用 1：休息 2：工作
      // answerType: 0, // 接听按钮状态
      // 左侧tab栏
      tabPosition: 'left', // 位置：左侧
      tabsValue: '', // 当前tab页
      // 客户表单列表
      customerFormArr: [],
      resultList: {}, // 通话结果
      userInfo: undefined, // 用户信息
      disabled_saveBtn: false,
      titleFlag: undefined,
      record: 0,
      // 页面标识
      otherOptions: {
        yesgooo_menu_code: 'comingCall'
      }
    }
  },
  created() {
    // infobirdclient.reloadsession()
    setTimeout(() => {
      if (!localStorage.getItem('token') && sessionStorage.getItem('loginStatus') == '0') {
        this.loginStatus = false
        this.callStatus = 0 // 禁用状态
        this.restStatus = 0 // 禁用状态
        this.timeStatus = 0
        this.custServicerInfo.account = undefined
        // 1：退出状态
        sessionStorage.setItem('loginStatus', '1')
        // 清除休息缓存
        sessionStorage.removeItem('restStatus')
      }
    }, 300)
    // 这里需要配合接入讯鸟系统
    // window.addEventListener('onMessage', ({ detail: { data } }) => {
    //   console.log(data, '心跳数据')
    //   const datastr = JSON.stringify(data)
    //   // 心跳判断
    //   switch (data.type) {
    //     // 建立连接
    //     case 'ConnectConf':
    //       // 链接成功
    //       break
    //     // 等待：没其他操作时的默认状态
    //     case 'HeartBeatConf':
    //       if (data.result == '1107') {
    //         this.messageTip(4, '座席已退出登录！')
    //       }
    //       if (data.result == '2004') {
    //         // token错误
    //         this.loginOutSuccess()
    //         // 清除讯鸟登录状态
    //         localStorage.removeItem('token')
    //         localStorage.removeItem('account')
    //         this.messageTip(4, '账号已在其他设备登录！')
    //       }
    //       // 通话中时，刷新页面后保持原状态
    //       if (data.deviceState == '4' && !this.dialogVisible) {
    //         console.log('通话中')
    //         // this.dialogVisible = true
    //       }
    //       break
    //     // 退出登录
    //     case 'LogoutConf':
    //       // 退出成功
    //       break
    //     // 强制退出，如其他设备登录
    //     case 'ForceLogout':
    //       // 退出成功
    //       this.loginOutSuccess()
    //       // 清除讯鸟登录状态
    //       localStorage.removeItem('token')
    //       localStorage.removeItem('account')
    //       this.messageTip(4, '账号已在其他设备登录！')
    //       break
    //     // 坐席呼出
    //     case 'MakeCallConf':
    //       if (data.result == '0') {
    //         // 呼出成功
    //         this.makeCallSuccess(data)
    //         // 设置通话状态
    //         sessionStorage.setItem('callingStatus', true)
    //       }
    //       break
    //     // 我们主动挂断(包括超时未接听)
    //     case 'DropCallConf':
    //       // 挂断电话
    //       this.hangUp()
    //       // 已挂断
    //       this.messageTip(4, '已挂断！')
    //       this.stopTitleMessage()
    //       break
    //     // 呼入
    //     case 'Alerting':
    //       // 呼入成功
    //       if (!sessionStorage.getItem('restStatus')) {
    //         // 判断：只有工作状态下才接到来电
    //         this.alertingSuccess(data)
    //         // 网页标题闪动
    //         this.startTitleMessage()
    //         // 设置通话状态
    //         sessionStorage.setItem('callingStatus', true)
    //       }
    //       break
    //     // 成功，通话中
    //     case 'EstablishedReal':
    //       this.timeStatus = 2
    //       this.callStatus = 3 // 挂断
    //       // 设置通话状态
    //       sessionStorage.setItem('callingStatus', true)
    //       // this.answerType = 2 // 接听置灰
    //       // this.answerType = 0
    //       break
    //     // 对方挂断(包括超时未接听)
    //     case 'CallReleased':
    //       // 挂断电话
    //       if (!sessionStorage.getItem('restStatus')) {
    //         this.hangUp()
    //         // 提示：对方挂断或未接听
    //         this.messageTip(4, '对方挂断或未接听！')
    //         this.stopTitleMessage()
    //       }
    //       break
    //     default:
    //       // state = 0;
    //       break
    //   }
    // })
    this.isServicer = true
    this.loginIn()
    // 获取用户信息，判断是否是客服
    // cacheUserInfo().then(res => {
    //   this.userInfo = res
    //   // 判断客服是否已登录
    //   if (this.userInfo && this.userInfo.infobird_account !== '') {
    //     // 有客服账号，是客服
    //     this.isServicer = true
    //     // 获取通话结果枚举
    //     cacheGongyiguEnum().then(res => {
    //       this.resultList = res.CallReultTypeEnum
    //     })
    //     // 0：已登录   1：已退出
    //     if (sessionStorage.getItem('loginStatus') === '1') {
    //       // 自行或强制退出，不需登录
    //       this.callStatus = 0 // 禁用状态
    //       this.restStatus = 0 // 禁用状态
    //     } else if (sessionStorage.getItem('loginStatus') === '0' || localStorage.getItem('token')) {
    //       // 已登录过，不需再次登录
    //       this.loginSuccess()
    //       // 获取处理中的用户数据
    //       setTimeout(() => {
    //         this.getDealingUserFormList()
    //       }, 250)
    //     } else {
    //       // 第一次登录
    //       this.loginIn()
    //     }
    //   }
    // })
  },
  mounted: function () {
    // var that = this
    // 用$on事件来接收参数
    // Bus.$on('showCallNotification', data => {
    //   // console.log(data)
    //   // 弹出导航栏
    //   if (!this.dialogVisible) {
    //     this.dialogVisible = true
    //   }
    //   // 打开表单内容
    //   this.mobileValue = data.mobile
    //   if (data.status === 'DEAL_ING' || sessionStorage.getItem('restStatus')) {
    //     // 处理中或休息中：不需自动拨打电话
    //     this.createDealIngForm(data)
    //   } else {
    //     // 待处理、已处理：自动拨打电话
    //     this.callBtn()
    //   }
    // })
  },
  methods: {
    // 提示信息
    messageTip(type, value) {
      this.messageType = type // 类型
      this.messageValue = value // 内容
      if (this.dialogVisible) {
        // 导航栏已打开，显示文字
        this.messageDialog = false
        this.messageText = true
      } else {
        // 导航栏未打开，显示弹窗
        this.messageDialog = true
        this.messageText = false
      }
      setTimeout(() => {
        this.messageText = false
        this.messageDialog = false
      }, 3000)
    },
    // 登录
    loginIn() {
      this.loginSuccess()
      // alogin(this.userInfo.infobird_account, this.userInfo.infobird_password).then(data => {
      //   // console.log(data)
      //   if (data.code === 200) {
      //     // 登录成功
      //     this.loginSuccess()
      //     // 获取处理中的用户数据
      //     setTimeout(() => {
      //       this.getDealingUserFormList()
      //     }, 250)
      //   } else {
      //     this.callStatus = 0 // 禁用状态
      //     this.restStatus = 0 // 禁用状态
      //     // 1002 非法请求数据
      //     // 1100 登录服务异常
      //     // 1101 登录失败：用户名或密码错误
      //     // 1102 登录失败：月账号不存在
      //     // 1108 坐席正在登录中
      //     if (data.data.aproxy) {
      //       if (data.data.aproxy.result == '1002') {
      //         this.messageTip(4, '非法请求数据！')
      //       } else if (data.data.aproxy.result == '1100') {
      //         this.messageTip(4, '网络异常,请稍后重试！')
      //       } else if (data.data.aproxy.result == '1101') {
      //         this.messageTip(4, '用户名或密码错误！')
      //       } else if (data.data.aproxy.result == '1102') {
      //         this.messageTip(4, '账号不存在！')
      //       } else {
      //         this.messageTip(4, '登录失败,用户名或密码错误！')
      //       }
      //     } else {
      //       this.messageTip(4, '登录失败,用户名或密码错误！')
      //     }
      //   }
      // })
    },
    // 退出
    loginOut() {
      this.loginOutSuccess()
      // loginout().then(data => {
      //   if (data.code === 200) {
      //     // 退出成功
      //     this.loginOutSuccess()
      //     this.messageTip(2, '退出成功！')
      //   } else {
      //     // 退出失败
      //   }
      // })
    },
    // 浮动按钮点击事件
    clickFloatBtn(e) {
      //  验证是否为点击事件，是则继续执行click事件，否则不执行
      const isClick = document.getElementById('drag').getAttribute('data-flag')
      if (isClick === 'true') {
        // 弹出导航栏
        this.showNavBar()
      }
    },
    // 弹出导航栏
    showNavBar() {
      if (this.dialogVisible === false) {
        // 打开
        this.dialogVisible = true
      } else {
        // 关闭
        this.dialogVisible = false
      }
    },
    // 初始化
    initData() {
      // this.answerType = 0 // 接听图标状态
      // 清除计时
      this.$refs.sgoTimer.clearTime()
      this.disabled_saveBtn = false
    },
    changeInput() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      // 不符合正整数时
      if (!pattern.test(this.mobileValue)) {
        // input 框绑定的内容为空
        this.mobileValue = undefined
      }
    },
    // 拨号/挂断
    callBtn() {
      if (this.callStatus === 1) {
        // 拨号
        if (this.mobileValue) {
          this.mobileValue = this.mobileValue.trim()
        }
        if (!this.mobileValue) {
          this.messageTip(4, '请输入呼叫号码！')
        } else {
          this.makeCallSuccess()
          // infobirdclient.outdail({
          //   accountType: '1', // 主叫类型
          //   calledDevice: this.mobileValue.toString(), // 呼叫号码
          //   callType: '0' // 呼叫类型， 0：语音呼叫
          // })
        }
      } else if (this.callStatus === 2) {
        // 接听
        // infobirdclient.answercall({
        //   accountType: '1', // 主叫类型
        //   callType: '0' // 呼叫类型， 0：语音呼叫
        // })
        // 停止网页标题闪动
        this.stopTitleMessage()
      } else if (this.callStatus === 3) {
        // 挂断
        this.hangUp()
        // 已挂断
        this.messageTip(4, '已挂断！')
        this.stopTitleMessage()
        // infobirdclient.dropcall({
        //   accountType: '1', // 主叫类型
        //   callType: '0', // 呼叫类型， 0：语音呼叫
        //   success: function () {
        //     // console.log('ok!')
        //   }
        // })
      }
    },
    // 接听
    // answerBtn() {
    //   infobirdclient.answercall({
    //     accountType: '1', // 主叫类型
    //     callType: '0' // 呼叫类型， 0：语音呼叫
    //   })
    //   // 停止网页标题闪动
    //   this.stopTitleMessage()
    // },
    // 休息/工作
    restBtn() {
      if (this.restStatus === 1) {
        this.restStatus = 2 // 工作
        this.callStatus = 0 // 禁用状态
        this.timeStatus = 4
        // 开始计时
        this.$refs.sgoTimer.startTime()
        // 设置缓存
        sessionStorage.setItem('restStatus', true)
        // 同时客户列表的定时器停止
        // Bus.$emit('handleTimer', 'true')
      } else if (this.restStatus === 2) {
        // 工作
        this.restStatus = 1 // 休息
        this.callStatus = 1 // 拨号
        this.timeStatus = 0
        // 清除计时
        this.$refs.sgoTimer.clearTime()
        // 清除缓存
        sessionStorage.removeItem('restStatus')
        // 同时客户列表的定时器开始(前提是在客户列表页)
        // Bus.$emit('handleTimer', 'false')
      }
    },
    // 获取客户表单数据
    getFormData(mobileValue, type) {
      const newData = {}
      newData.mobile = mobileValue // 手机号
      // newData.call_id = data.callID // 讯鸟呼叫记录id
      newData.type = type // 类型：呼入
      this.createForm(newData)
    },
    // 新建客户表单
    createForm(data) {
      this.customerFormArr.unshift({
        serial_num: this.customerFormArr.length + 1,
        title: '客户信息',
        name: this.customerFormArr.length + 1 + '',
        // 通话表单
        formData: {
          mobile: data.mobile, // 通话号码
          enterprise_ids: undefined, // 通话企业(多选，字符串格式)
          result: undefined, // 通话结果：成功，失败  (必填)
          remark: undefined, // 备注
          return_visit_time: undefined // 回访时间
          // customer_info_id: data.customer_info_id, // 客户表id
          // callLogId: undefined // 历史记录id
        },
        enterpriseList: [], // 企业列表
        selectEnterpriseArr: [], // 已选企业数组
        unReadFlag: false, // 未读标识
        call_time: undefined // 通话时间
      })
      // 展示弹窗
      this.dialogVisible = true
      this.formVisible = true
      this.customerFormArr.push('1')
      this.customerFormArr.pop()
      if (data.type == 'CALL_OUT') {
        // 主动呼出：直接切换到当前表单
        this.tabsValue = this.customerFormArr.length + ''
      } else {
        // 呼入：
        if (this.customerFormArr.length === 1) {
          // 第一次打开弹窗，自动展示第一个表单，后续新增的不会自动展示
          this.tabsValue = this.customerFormArr.length + ''
        } else {
          // 除了第一个，后续创建的表单，默认展示未读标识
          this.customerFormArr[0].unReadFlag = true
        }
      }
      setTimeout(() => {
        // 第一次保存用户状态
        this.saveFirstUserStatus(data, this.customerFormArr.length)
      }, 150)
    },
    // 第一次保存用户状态：处理中
    saveFirstUserStatus(data, serial_num) {
      // const tempData = {
      //   customer_info_id: data.customer_info_id, // 客户表id
      //   call_id: data.call_id, // 通话标识
      //   mobile: data.mobile, // 手机号
      //   type: data.type // 通话类型
      // }
      // // 处理中的用户再次打开弹窗，不走下面的接口
      // // 改变用户状态(包括访客)：处理中
      // this.$api.saveCallLog({ callLog: tempData }, this.otherOptions).then(response => {
      //   // 将返回的用户id塞进表单数据中
      //   this.customerFormArr.forEach(item => {
      //     if (item.serial_num == serial_num) {
      //       item.formData.callLogId = response.id
      //       item.call_time = parseTime(response.call_time, '{y}-{m}-{d} {h}:{i}:{s}')
      //     }
      //   })
      //   // 刷新客户列表
      //   Bus.$emit('refreshUserList', '1')
      // })
    },
    // 针对处理中的用户，不需拨打电话，直接创建表单
    // createDealIngForm(data) {
    //   const newLogId = []
    //   this.customerFormArr.forEach(item => {
    //     newLogId.push(item.formData.callLogId)
    //   })
    //   this.$api.getDealingCustomerDetail(data.id, this.otherOptions).then(response => {
    //     this.mobileValue = response.callLogs[0].mobile
    //     if (newLogId.includes(response.callLogs[0].id)) {
    //       // 已存在的直接选中展示
    //       this.customerFormArr.forEach(item => {
    //         if (item.formData.callLogId === response.callLogs[0].id) {
    //           // 自动切换到当前表单
    //           this.tabsValue = item.name
    //         }
    //       })
    //     } else {
    //       // 已存在的不需新增
    //       this.customerFormArr.unshift({
    //         serial_num: this.customerFormArr.length + 1,
    //         title: '客户信息',
    //         name: this.customerFormArr.length + 1 + '',
    //         // 通话表单
    //         formData: {
    //           mobile: response.callLogs[0].mobile, // 通话号码
    //           enterprise_ids: undefined, // 通话企业(多选，字符串格式)
    //           result: undefined, // 通话结果：成功，失败  (必填)
    //           remark: undefined, // 备注
    //           return_visit_time: undefined, // 回访时间
    //           customer_info_id: response.callLogs[0].customer_info_id, // 客户表id
    //           callLogId: response.callLogs[0].id // 历史记录id
    //         },
    //         enterpriseList: response.enterprise_list, // 企业列表
    //         selectEnterpriseArr: [], // 已选企业数组
    //         unReadFlag: false, // 未读标识
    //         call_time: parseTime(response.callLogs[0].call_time, '{y}-{m}-{d} {h}:{i}:{s}')
    //       })
    //       // 自动切换到当前表单
    //       this.tabsValue = this.customerFormArr.length + ''
    //     }
    //     // 展示弹窗
    //     this.dialogVisible = true
    //     this.formVisible = true
    //     this.customerFormArr.push('1')
    //     this.customerFormArr.pop()
    //   })
    // },
    // 点击当前表单
    clickForm(tab, event) {
      // console.log(tab)
      this.customerFormArr.forEach(item => {
        if (item.name === tab.name) {
          item.unReadFlag = false
        }
      })
    },
    // 删除表单
    deleteForm(curName) {
      // 当前表单关闭
      if (this.customerFormArr.length > 1) {
        this.customerFormArr.forEach((item, index) => {
          if (item.name === curName) {
            this.customerFormArr.splice(index, 1)
          }
        })
        // serial_num重新排序
        const newArr = this.customerFormArr.reverse()
        newArr.forEach((item, index) => {
          item.serial_num = index + 1
          item.name = index + 1 + ''
        })
        this.customerFormArr = []
        newArr.forEach(item => {
          this.customerFormArr.unshift(item)
        })
        // 如果删除的是当前页，则切换到下一位，如果删的是最后一个，则切换到上一个
        if (this.tabsValue === curName) {
          if (curName == '1') {
            this.tabsValue = '1'
          } else {
            this.tabsValue = Number(curName) - 1 + ''
          }
        }
      } else {
        // 如果是最后一个，表单弹窗也关闭
        this.customerFormArr = []
        this.formVisible = false
        this.tabsValue = ''
      }
    },
    // 登录成功
    loginSuccess() {
      this.loginStatus = true
      if (sessionStorage.getItem('restStatus')) {
        // 休息中
        this.timeStatus = 4
        this.callStatus = 0 // 禁用状态
        this.restStatus = 2 // 工作
        // 开始计时
        this.$refs.sgoTimer.startTime()
      } else {
        this.callStatus = 1 // 拨号
        this.restStatus = 1 // 休息
      }
      // 客服账号
      this.custServicerInfo.account = localStorage.getItem('account')
      // ========== 提示消息 ==========
      if (!sessionStorage.getItem('loginStatus') || sessionStorage.getItem('loginStatus') == '1') {
        this.messageTip(2, '登录成功！')
      }
      setTimeout(() => {
        // 0：已登录状态
        sessionStorage.setItem('loginStatus', '0')
        // 清除通话中标识
        sessionStorage.removeItem('callingStatus')
        // 同时客户列表的定时器开始(前提是在客户列表页)
        // Bus.$emit('handleTimer', 'false')
      }, 150)
    },
    // 退出成功
    loginOutSuccess() {
      this.loginStatus = false
      this.callStatus = 0 // 禁用状态
      this.restStatus = 0 // 禁用状态
      this.timeStatus = 0
      this.mobileValue = undefined
      // 客服账号
      this.custServicerInfo.account = undefined
      this.$refs.sgoTimer.clearTime()
      // 1：退出状态
      sessionStorage.setItem('loginStatus', '1')
      // 清除休息缓存
      sessionStorage.removeItem('restStatus')
      // 清除通话中标识
      sessionStorage.removeItem('callingStatus')
      this.formVisible = false
      // 同时客户列表的定时器停止
      // Bus.$emit('handleTimer', 'true')
    },
    // 呼出成功
    makeCallSuccess() {
      this.initData()
      this.timeStatus = 1
      this.callStatus = 3 // 挂断
      this.restStatus = 0 // 禁用状态
      // 开始计时
      this.$refs.sgoTimer.startTime()
      const type = 'CALL_OUT'
      // 获取客户表单数据typeof
      this.getFormData(this.mobileValue, type)
    },
    // 呼入成功
    // alertingSuccess(data) {
    //   this.initData()
    //   this.timeStatus = 3
    //   this.callStatus = 2 // 接听
    //   this.restStatus = 0 // 禁用状态
    //   // this.answerType = 1 // 接听
    //   this.messageValue = '有新的来电！'
    //   this.messageType = 4
    //   this.messageText = true
    //   setTimeout(() => {
    //     this.messageText = false
    //   }, 3000)
    //   // 开始计时
    //   this.$refs.sgoTimer.startTime()
    //   // 1. 自动带入来电手机号 2. 打开导航栏和表单弹窗 3. 左侧tab栏新增一列
    //   this.mobileValue = data.callingDevice // 来电号码
    //   const type = 'CALL_IN'
    //   // 获取客户表单数据typeof
    //   this.getFormData(data, this.mobileValue, type)
    // },
    // 挂断电话
    hangUp() {
      this.timeStatus = 0
      this.callStatus = 1 // 拨号
      this.restStatus = 1 // 休息
      // 清除计时
      this.$refs.sgoTimer.clearTime()
      // 清除通话中标识
      sessionStorage.removeItem('callingStatus')
    },
    // 每次刷新后自动展示处理中的用户数据
    // getDealingUserFormList() {
    //   this.customerFormArr = []
    //   this.$api.getDealingCustomerList(this.otherOptions).then(response => {
    //     if (response.length > 0) {
    //       const newArr = response.reverse()
    //       newArr.forEach((item, index) => {
    //         this.customerFormArr.unshift({
    //           serial_num: index + 1,
    //           title: '客户信息',
    //           name: index + 1 + '',
    //           // 通话表单
    //           formData: {
    //             mobile: item.mobile, // 通话号码
    //             enterprise_ids: undefined, // 通话企业(多选，字符串格式)
    //             result: undefined, // 通话结果：成功，失败  (必填)
    //             remark: undefined, // 备注
    //             return_visit_time: undefined, // 回访时间
    //             customer_info_id: item.customer_info_id, // 客户表id
    //             callLogId: item.id // 历史记录id
    //           },
    //           enterpriseList: item.customer_info.enterprise_list, // 企业列表
    //           selectEnterpriseArr: [], // 已选企业数组
    //           unReadFlag: false, // 未读标识
    //           call_time: parseTime(item.call_time, '{y}-{m}-{d} {h}:{i}:{s}')
    //         })
    //       })
    //       // console.log(this.customerFormArr)
    //       // 展示弹窗
    //       this.dialogVisible = true
    //       this.formVisible = true
    //       this.customerFormArr.push('1')
    //       this.customerFormArr.pop()
    //       this.tabsValue = this.customerFormArr.length + ''
    //     }
    //   })
    // },
    // 保存通话记录
    saveData(row) {
      // if (this.disabled_saveBtn) {
      //   return // 防重复提交
      // }
      // this.disabled_saveBtn = true
      // const _this = this
      // this.customerFormArr.forEach(item => {
      //   // 找到当前表单，对当前表单做校验
      //   if (item.name === row.name) {
      //     // 校验当前表单
      //     checkForm(item.name)
      //   }
      // })
      // // 校验当前表单
      // function checkForm(name) {
      //   // 根据form表单的ref，动态生成promise，再对其表单校验，都通过了再去做处理
      //   var result = new Promise(function (resolve, reject) {
      //     _this.$refs[name][0].validate(valid => {
      //       if (valid) {
      //         // 企业转字符串
      //         if (row.selectEnterpriseArr.length > 0) {
      //           row.formData.enterprise_ids = row.selectEnterpriseArr.join(',')
      //         }
      //         // 转时间戳
      //         if (row.formData.return_visit_time) {
      //           row.formData.return_visit_time = parseInt(Date.parse(new Date(row.formData.return_visit_time))) / 1000
      //         }
      //         const tempData = Object.assign({}, row.formData)
      //         const result = _this.$api.saveUserCallLog({ callLog: tempData }, _this.otherOptions)
      //         result
      //           .then(response => {
      //             // 关闭当前表单
      //             _this.deleteForm(row.name)
      //             // 刷新客户列表
      //             // Bus.$emit('refreshUserList', '1')
      //             // 防重按钮
      //             setTimeout(() => {
      //               _this.disabled_saveBtn = false
      //             }, 150)
      //           })
      //           .catch(e => {
      //             _this.disabled_saveBtn = false
      //           })
      //       } else {
      //         reject()
      //         _this.disabled_saveBtn = false
      //       }
      //     })
      //   })
      // }
    },
    // 开始浏览器标题消息提示
    startTitleMessage() {
      clearInterval(this.titleFlag)
      this.titleFlag = setInterval(() => {
        this.record++
        if (this.record == 3) {
          // 当变量this.record累加到3是，将其赋值为1。相当于无限循环。
          this.record = 1
        }
        if (this.record == 1) {
          document.title = '有未接来电！'
        }
        if (this.record == 2) {
          document.title = '请及时接听！'
        }
      }, 800)
    },
    // 停止浏览器标题消息提示
    stopTitleMessage() {
      clearInterval(this.titleFlag)
      this.titleFlag = undefined
      this.record = 0
      document.title = '业务伙伴管理中心'
    }
  }
}
</script>
<style scoped>
/* 未读消息 */
.unReadNews {
  position: fixed;
  top: 50px;
  right: 100px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #409eff;
  box-shadow: 0 3px 10px #aaa;
  cursor: pointer;
  z-index: 1000;
}
.unReadNews .icon {
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  font-size: 15px;
  padding: 9px;
}
/* 通知弹窗样式 */
.notice-dialog {
  width: 750px;
  position: fixed;
  top: 119px;
  right: 49px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 1px 4px rgb(212 210 210);
  background: #f1f1f1;
  z-index: 999;
}
/* 头部 */
.header {
  height: 46px;
  padding: 2px 0;
  padding-right: 40px;
  position: relative;
}
.header .login-info {
  float: left;
  /* width: 120px; */
  margin-left: 5px;
}
/* 头像 */
.header .login-info .user-icon {
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
/* 退出按钮 */
.header .login-info .loginOutBtn {
  font-size: 13px;
  float: left;
  margin-left: 12px;
  margin-top: 3px;
}
/* 登录状态 */
.header .login-info .login-statu {
  float: left;
  font-size: 12px;
  text-align: center;
  color: #666;
}
/* 时间状态 */
.header .time-status {
  float: left;
  margin-left: 15px;
  width: 80px;
}
.header .time-status .text {
  font-size: 14px;
}
.header .time-status .text img {
  margin-right: 7px;
}
.header .time-status .time {
  margin-top: 3px;
  height: 20px;
  line-height: 20px;
  background-color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}
/* 号码输入框 */
.header .mobile-input {
  float: left;
  margin-left: 15px;
  margin-top: 5px;
}

.header .btn-box {
  float: left;
  margin-left: 15px;
  margin-top: 2px;
  width: 40px;
  height: 40px;
  line-height: 38px;
  text-align: center;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
  font-size: 13px;
}
.header .btn-box .icon {
  display: block;
}
.header .btn-box .text {
  padding: 3px;
  display: none;
}
/* 电话按钮 */
.header .phone {
  cursor: pointer;
}
.header .phone .icon {
  padding: 2px 6px;
}
.header .phone:hover .icon {
  display: none;
}
.header .phone:hover .text {
  display: block;
}
/* 休息按钮 */
.header .rest-work {
  cursor: pointer;
}
.header .rest-work .text {
  color: #cba740;
}
.header .rest-work:hover .icon {
  display: none;
}
.header .rest-work:hover .text {
  display: block;
}
/* 电话按钮 禁用 */
.header .dis-phone {
  /* cursor: pointer; */
}
.header .dis-phone .icon {
  padding: 2px 6px;
}
/* 休息按钮 禁用 */
.header .dis-rest-work {
  /* cursor: pointer; */
}

/* 提示消息-文字 */
.header .message-text {
  position: absolute;
  right: 50px;
  top: 15px;
  font-size: 14px;
  color: #909399;
  /* transform: translateX(-50px); */
  /* transition: opacity 0.3s, transform 0.4s, top 0.4s; */
}
/* 成功-文字 */
.header .message-text .success-text {
  color: #67c23a;
}
/* 警告-文字 */
.header .message-text .warning-text {
  color: #e6a23c;
}
/* 失败-文字 */
.header .message-text .danger-text {
  color: red;
}
/* 提示消息-弹窗 */
.message-dialog {
  position: absolute;
  right: 60px;
  top: 6px;
  font-size: 14px;
  border-radius: 4px;
  /* transform: translateX(-50px); */
  /* transition: opacity 0.3s, transform 0.4s, top 0.4s; */
  /* overflow: hidden; */
  white-space: nowrap;
}
/* 普通消息-弹窗 */
.message-dialog .info-dialog {
  color: #909399;
  background-color: #edf2fc;
  border: 1px solid #ebeef5;
  padding: 10px 20px;
}
/* 成功-弹窗 */
.message-dialog .success-dialog {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  padding: 10px 20px;
}
/* 警告-弹窗 */
.message-dialog .warning-dialog {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
  padding: 10px 20px;
}
/* 失败-弹窗 */
.message-dialog .danger-dialog {
  color: red;
  background-color: #fef0f0;
  border-color: #fde2e2;
  padding: 10px 20px;
}

/* 内容 */
.form-content {
  width: 730px;
  background-color: #fff;
  padding: 20px 20px 15px 0;
}
.form-content .form-btn {
  text-align: right;
  margin-top: 10px;
}
/* 未读标识 */
.form-content .unRead {
  width: 8px;
  height: 8px;
  background-color: #f73b3b;
  position: absolute;
  left: -10px;
  top: 0px;
  border-radius: 50%;
}
</style>
