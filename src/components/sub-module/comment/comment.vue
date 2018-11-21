<template>
  <div ref="comments" class="comments">
    <div ref="commentsListsContent" class="comments-lists-content">
      <ul class="comments-lists">
        <li v-for="item in comments" :key="item.Id" class="list-unit">
          <comments-list
            :list="item"
            :self="item.RegHumId === HumanId"
            ></comments-list>
        </li>
      </ul>
    </div>
    <div class="send-action-content">
      <div class="send-action">
        <div @click="openAtWizard" class="action-list list-at">
          <span class="at-text">@</span>
        </div>
        <div class="action-list show-box">
          <div @click.stop="openAtWizard" class="select-lists">
            <span v-for="item in selectUsers" :key="item.Id" class="select-list">
              <span>{{item.Name}}</span>
              <x-icon @click.stop="deleteSelectUser(item)" type="ios-close-empty" size="25"></x-icon>
            </span>
          </div>
        </div>
        <div @click="PostComment" class="action-list send-btn-box">
          <span class="send-btn">发送</span>
        </div>
      </div>
      <group class="text-wrap">
        <x-textarea
          @on-focus="_scrollBottom" :max="200"
          placeholder="输入评论" v-model="commentValue">
        </x-textarea>
      </group>
    </div>

    <div>
      <at-human
        ref="AtHuman"
        :selectUsers="selectUsers"
        :HumanId="HumanId"
        @getAtUsers="getAtUsers"
      >
      </at-human>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { getStoreUserSession } from 'api/UserSession.js'
import CommentsList from 'base/comments-list/comments-list.vue'
import { XTextarea, Group, CheckIcon } from 'vux'
import AtHuman from 'components/sub-module/Wizard/AtHuman.vue'

const POSTSUCCESS = '提交成功'
const MUSTCONMMENT = '评论内容不能为空'

export default {
  props: {
    loadStart: {
      type: Boolean,
      default: false
    },
    KeyWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      commentValue: '',
      subscribeChecked: false,
      HumanId: '',
      Subscribe: 'N',
      comments: [],
      selectUsers: []
    }
  },
  computed: {
    loginHumanId () {
      let UserSession = getStoreUserSession()
      return UserSession ? UserSession.HumanId : ''
    },
    ...mapGetters([
      'routerParams'
    ])
  },
  methods: {
    // 删除选中的人员
    deleteSelectUser (item) {
      let users = [...this.selectUsers]

      let arr = users.filter((user) => {
        if (user.Id !== item.Id) {
          return user
        }
      })

      this.selectUsers = [...arr]
    },
    // 获取At人员的数据信息
    getAtUsers (users) {
      this.selectUsers = [...users]
    },
    // 打开at人员向导
    openAtWizard () {
      this.$refs.AtHuman.show()
    },
    // 提交评论
    PostComment () {
      if (!this.commentValue || this.commentValue === '') {
        this.AlertShowEvent(MUSTCONMMENT)
        return false
      }

      let AtHumanList = this.selectUsers.map((item) => {
        return {
          HumanId: item.Id,
          HumanName: item.Name
        }
      })

      let params = {
        FormId: this.routerParams.FromId,
        KeyWord: this.KeyWord,
        KeyValue: this.routerParams.Id,
        CommentText: this.commentValue,
        AtHumanList: [...AtHumanList]
      }

      this.PostCommentData(params).then((res) => {
        this.commentValue = ''
        this.selectUsers = []

        this.GetComment(() => {
          this._scrollBottom()
          this.ToastShowEvent(POSTSUCCESS)
        })
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 获取评论数据
    GetComment (callback) {
      let KeyWord = this.KeyWord
      let KeyValue = this.routerParams.Id

      this.GetCommentData({KeyWord, KeyValue}).then((res) => {
        let data = res.data

        this.HumanId = data.HumanId
        this.Subscribe = data.Subscribe
        this.comments = [...data.value].reverse()
        callback && callback()
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 频繁调用 评论列表滚动到底部
    _scrollBottom () {
      this.$nextTick(() => {
        this.ListsContent = this.$refs.commentsListsContent
        this.ListsContent.scrollTop = this.ListsContent.scrollHeight
      })
    },
    ...mapActions([
      'PostCommentData',
      'GetCommentData',
      'AlertShowEvent',
      'ToastShowEvent'
    ])
  },
  watch: {
    loadStart: {
      handler (newLoad, oldLoad) {
        if (this.loadStart) {
          this.GetComment(() => {
            this._scrollBottom()
          })
        }
      },
      immediate: true
    }
  },
  components: {
    CommentsList,
    XTextarea,
    Group,
    CheckIcon,
    AtHuman
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import "~common/styles/colors.less";

  .comments {
    position: absolute;
    width: 100%;
    height: 100%;
    .comments-lists-content {
      height: 68%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .send-action-content {
      min-height: 100px;
      height: 30%;
      .send-action {
        height: 40px;
        .top-line();
        .bottom-line();
        display: flex;
        width: 100%;
        .action-list {
          display: block;
          position: relative;
          min-width: 10px;
          line-height: 40px;
          font-size: 14px;
          &.list-at {
            flex: 0 0 30px;
            width: 30px;
            text-align: center;
            .at-text {
              padding: 2px 5px;
            }
          }
          &.show-box {
            flex: 1;
            padding: 5px 0;
            .select-lists {
              width: 100%;
              height: 100%;
              border-radius: 3px;
              border: 1px solid #dddddd;
              line-height: 23px;
              .select-list {
                display: inline-block;
                position: relative;
                padding: 0px 24px 0px 4px;
                margin-left: 3px;
                margin-top: 2px;
                background-color: @mainColor;
                border-radius: 3px;
                color: #ffffff;
                .vux-x-icon {
                  fill: #ffffff;
                  position: absolute;
                  top:50%;
                  right: 3px;
                  transform: translateY(-50%);
                }
              }
            }
          }
          &.send-btn-box {
            flex: 0 0 50px;
            text-align: center;
            .send-btn {
              background-color: @mainColor;
              color: #ffffff;
              padding: 4px 6px;
              border-radius: 2px;
            }
          }
        }
      }
      .text-wrap {
        height: calc(100% - 35px);
        .weui-cells {
          height: 100%;
          margin-top: 0px;
          .weui-cell {
            height: 100%;
            padding: 0 10px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            .weui-cell__bd {
              height: 100%;
              .weui-textarea {
                height: calc(100% - 55px);
              }
            }
          }
        }
      }
    }
  }
</style>
