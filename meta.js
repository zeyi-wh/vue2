const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
    filterName(name) {
      return name.replace(/_/g,'-')
    }
  },

  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '项目的名称（如：lb_module_bill),该字段很重要',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '项目描述',
      default: 'A Vue.js project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '开发人员',
    },
    // projectType: {
    //   when: 'isNotTest',
    //   type: 'list',
    //   message:
    //     '选择创建项目的类型，qiankun子应用或普通的应用',
    //   choices: [
    //     {
    //       name: 'qiankun',
    //       value: 'qiankun',
    //       short: 'qiankun',
    //     },
    //     {
    //       name: 'normal',
    //       value: 'normal',
    //       short: 'normal',
    //     },
    //   ],
    // },
    gitLabGroup: {
      when: 'isNotTest',
      type: 'list',
      message:
        '选择项目gitlab的分组',
      choices: [
        {
          name: 'SCRM-Frontend',
          value: 'SCRM-Frontend',
          short: 'SCRM-Frontend',
        },
        {
          name: 'his-frontend',
          value: 'his-frontend',
          short: 'his-frontend',
        },
        {
          name: 'Frontend-WECOM',
          value: 'Frontend-WECOM',
          short: 'Frontend-WECOM',
        }
      ],
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message:
        'Should we run `yarn` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    // 'src/configs/lazy_use.js': "projectType === 'normal'",
    // 'src/api/API.util.js': "projectType === 'normal'",
    // 'src/api/APIInterceptors.js': "projectType === 'normal'",
    // 'src/api/HTTPRequestUtil.js': "projectType === 'qiankun'",
    // 'public/index-local.html': "projectType === 'qiankun'",
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
