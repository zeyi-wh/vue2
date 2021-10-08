<template>
  <div class="login-wrap">
    <a-form-model
      id="components-form-demo-normal-login"
      ref="form"
      :model="form"
      class="login-form"
      @submit="handleSubmit"
      layout="inline"
    >
      <a-form-model-item label="会员名">
        <a-input v-model="form.memberCode" placeholder="memberCode">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="用户名">
        <a-input v-model="form.username" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input v-model="form.password" type="password" placeholder="Password">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="机构">
        <a-tree-select
          :treeData="hierarchiesTreeData"
          v-model="form.medicalInstitutionId"
          placeholder="medicalInstitutionId"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { login, requestHierarchies } from '@/api/loginApi'
import StorageHelper from '@/utils/StorageHelper'

export default {
  name: 'Login.vue',
  data () {
    return {
      hierarchiesTreeData: [],
      form: {
        memberCode: '9527',
        username: '9527',
        password: '333333',
        medicalInstitutionId: 1830
      },
      redirectUrl: ''
    }
  },
  watch: {
    'form.memberCode' () {
      this.getHierarchies()
    },
    'form.username' () {
      this.getHierarchies()
    }
  },
  created () {
    this.redirectUrl = this.$route.query.redirectUrl || ''
    this.getHierarchies()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      name: 'normal_login'
    })
  },
  methods: {
    formatToTreeData (item) {
      const {
        medicalInstitutionSimpleCode: label,
        medicalInstitutionId: value,
        children = []
      } = item
      return {
        label,
        value,
        children: children.map((childrenItem) =>
          this.formatToTreeData(childrenItem)
        )
      }
    },
    async getHierarchies () {
      const { memberCode: memberName, username } = this.form
      if (!memberName || !username) return
      const data = await requestHierarchies({
        memberName,
        username
      })

      const hierarchiesTreeData = data.map((item) =>
        this.formatToTreeData(item)
      )
      this.form.medicalInstitutionId = hierarchiesTreeData[0]?.value
      this.hierarchiesTreeData = hierarchiesTreeData
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        login(this.form).then(res => {
          this.setStorage(res.data)
          if (res.code === 0) {
            this.$message.success('登录成功', 1, () => {
              const url = this.redirectUrl || '/'
              this.$router.replace(url)
            })
          } else {
            Promise.reject('登录出错')
          }
        }).catch(err => {
          /* eslint-disable */
          console.log(err)
        })
      })
    },

    setStorage (data) {
      StorageHelper.set(
        'MEDICAL_INSTITUTION_ID',
          data?.medicalInstitution?.medicalInstitutionId
      )
      StorageHelper.set('TOKEN', data?._token)
      StorageHelper.set('USER_ID', data?.staff?.staffId)
      StorageHelper.set('MEDICAL_INSTITUTION', data?.medicalInstitution)
    }
  }
}
</script>
<style lang="less" scoped="scoped">
.login-wrap {
  display: flex;
  width: 300px;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;
  padding-top: 100px;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
