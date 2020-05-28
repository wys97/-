// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: "我的工作台",
    path: "",
    external: false,
    newWindow: false,
    index: 0,
    icon: "plus-square",
    authority: "workbench:menu"
  },
  {
    name: "贷款业务管理",
    path: "",
    external: false,
    newWindow: false,
    index: 1,
    icon: "plus-square",
    authority: "loanbusiness:menu"
  },
  {
    name: "产品管理",
    path: "",
    external: false,
    newWindow: false,
    index: 2,
    icon: "plus-square",
    authority: "product:menu"
  },
  {
    name: "运营管理",
    path: "",
    external: false,
    newWindow: false,
    index: 3,
    icon: "plus-square",
    authority: "operate:menu"
  },
  {
    name: "财务管理",
    path: "",
    external: false,
    newWindow: false,
    index: 4,
    icon: "plus-square",
    authority: "finance:menu"
  },
  {
    name: "风控管理",
    path: "",
    external: false,
    newWindow: false,
    index: 5,
    icon: "plus-square",
    authority: "risk:menu"
  },
  {
    name: '催收管理',
    path: '',
    external: false,
    newWindow: false,
    index: 6,
    icon: 'plus-square',
    authority: "collection:menu"
    // authority: 'dunning:menu'
  },
  {
    name: "报表管理",
    path: "",
    external: false,
    newWindow: false,
    index: 7,
    icon: "plus-square",
    authority: "report:menu"
  },
  {
    name: "业务配置",
    path: "",
    external: false,
    newWindow: false,
    index: 8,
    icon: "plus-square",
    authority: "business:menu"
  },
  {
    name: "权限配置",
    path: "",
    external: false,
    newWindow: false,
    index: 9,
    icon: "plus-square",
    authority: "permission:menu"
  },
  {
    name: "app管理",
    path: "",
    external: false,
    newWindow: false,
    index: 10,
    icon: "plus-square",
    authority: "app:menu"
  }
];

const asideMenuConfig = [
  [
    {
      name: "我的工作台",
      path: "/myWorkspace",
      icon: "plus-square",
      authority: "workbench:workbench:menu",
      children: [
        {
          name: "首页",
          path: "/myWorkspace/home",
          authority: "workbench:workbench:home:menu"
        }
      ]
    },
    {
      name: "审批管理",
      path: "/approvalManage",
      icon: "plus-square",
      authority: "workbench:approval:menu",
      children: [
        {
          name: "授信审批",
          path: "/approvalManage/credit",
          authority: "workbench:approval:credit-apply:menu"
        },
        {
          name: "支用审批",
          path: "/approvalManage/loan",
          authority: "workbench:approval:loan-apply:menu"
        },
        {
          name: "线下还款登记审批",
          path: "/approvalManage/offlineRepay",
          authority: "workbench:approval:offline-repay:menu"
        },
        {
          name: "展期审批",
          path: "/approvalManage/postponeApprove",
          authority: "workbench:approval:offline-repay:menu"
        },
        {
          name: "息费调整审批",
          path: "/approvalManage/feeWaiver",
          authority: "workbench:approval:decrease-interest:menu"
        },
        {
          name: "黑名单审批",
          path: "/approvalManage/blacklist",
          authority: "workbench:approval:blacklist:menu"
        }
        /*{
          name: '我已办理业务',
          path: '',
          authority: 'workbench:approval:handled:menu'
        }*/
      ]
    },
    {
      name: "审批分案",
      path: "/approvalProcess",
      icon: "plus-square",
      authority: "workbench:approval:division:menu",
      children: [
        {
          name: "审批分案",
          path: "/approvalProcess",
          authority: "workbench:approval:division:menu"
        }
      ]
    },
    /*{
      name: '我的工具箱',
      path: '',
      icon: 'plus-square',
      authority: 'workbench:toolbox:menu',
      children: [
        {
          name: '利息计算器',
          path: '',
          authority: 'workbench:toolbox:calculator:menu'
        },
        {
          name: '版本查看',
          path: '',
          authority: 'workbench:toolbox:version:menu'
        }
      ]
    },*/
  ],
  [
    {
      name: "客户管理",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:customer:menu",
      children: [
        {
          name: "客户管理",
          path: "/baseinfo/customer",
          authority: "loanbusiness:customer:customer:menu"
        }
      ]
    },
    {
      name: "授信管理",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:sign:menu",
      children: [
        // {
        //   name: "授信分案",
        //   path: "/hnairLoanManage/creditDivision",
        //   authority: "loanbusiness:sign:sign-record:menu"
        // },
        {
          name: "授信申请记录",
          path: "/hnairLoanManage/creditManage",
          authority: "loanbusiness:sign:sign-record:menu"
        },
        {
          name: "授信用户列表",
          path: "/hnairLoanManage/creditUserList",
          authority: "loanbusiness:sign:sign-record:menu"
        }
      ]
    },
    {
      name: "支用管理",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:use:menu",
      children: [
        {
          name: "支用管理",
          path: "/assetManage/loanApply",
          authority: "asset:asset:loan-apply:menu"
        }
      ]
    },
    {
      name: "借据管理",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:due:menu",
      children: [
        {
          name: "借据管理",
          path: "/assetManage/IOUManage",
          authority: "asset:asset:loan-due:menu"
        }
      ]
    },
    {
      name: "放款明细",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:loan:menu",
      children: [
        {
          name: "放款明细",
          path: "/fundManage/hnairLoanDetail",
          authority: "loanbusiness:loan:loan:menu"
        }
      ]
    },
    {
      name: "还款明细",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:repay:menu",
      children: [
        {
          name: "还款明细",
          path: "/fundManage/hnairRepayDetail",
          authority: "loanbusiness:repay:repay:menu"
        },
        {
          name: "还款借据明细",
          path: "/fundManage/hnairRepayment",
          authority: "loanbusiness:repay:repay:menu"
        }
      ]
    },
    {
      name: "逾期明细",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:overdue:menu",
      children: [
        {
          name: "逾期明细",
          path: "/postLendingManage/hnairOverdueRepay",
          authority: "loanbusiness:overdue:overdue:menu"
        }
      ]
    },
    {
      name: "退款退票",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:refund:menu",
      children: [
        {
          name: "退票明细",
          path: "/hnairLoanManage/hnairDrawBack",
          authority: "loanbusiness:refund:refund:menu"
        },
        {
          name: "溢缴款明细",
          path: "/hnairLoanManage/hnairRefundManage",
          authority: "loanbusiness:refund:overdue-repayment:menu"
        },
        {
          name: "退票数据导入",
          path: "/hnairLoanManage/refundDataImport",
          authority: "loanbusiness:refund:refund-import:menu"
        }
      ]
    },
    {
      name: "线下还款登记",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:offline:menu",
      children: [
        {
          name: "线下还款登记",
          path: "/businessChange/HnairofflineRegister",
          authority: "postloan:postloan:offline-repay:menu"
        }
      ]
    },
    {
      name: "展期管理",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:offline:menu",
      children: [
        {
          name: "展期管理",
          path: "/businessChange/postponeManage",
          authority: "postloan:postloan:offline-repay:menu"
        }
      ]
    },
    {
      name: "息费调整",
      path: "",
      icon: "plus-square",
      authority: "loanbusiness:interest-adjust:menu",
      children: [
        {
          name: "息费调整",
          path: "/businessChange/feeWaiver",
          authority: "postloan:postloan:decrease-interest:menu"
        }
      ]
    }
  ],
  [
    {
      name: "产品管理",
      path: "",
      icon: "plus-square",
      authority: "product:product:menu",
      children: [
        {
          name: "产品管理",
          path: "/baseinfo/product",
          authority: "operation:basic:product:menu"
        }
      ]
    }
  ],
  [
    {
      name: "贷款项目管理",
      path: "",
      icon: "plus-square",
      authority: "operate:project:menu",
      children: [
        {
          name: "贷款项目管理",
          path: "/baseinfo/loans",
          authority: "operation:basic:project:menu"
        }
      ]
    },
    {
      name: "合作机构管理",
      path: "",
      icon: "plus-square",
      authority: "operate:partner:menu",
      children: [
        {
          name: "合作机构管理",
          path: "/baseinfo/partners",
          authority: "operation:basic:partner:menu"
        }
      ]
    },
    {
      name: "系统日志查询",
      path: "",
      icon: "plus-square",
      authority: "operate:log:menu",
      children: [
        {
          name: "批量日志查询",
          path: "/log/exceptLog",
          authority: "operation:log:batch:menu"
        },
        {
          name: "系统日志查询",
          path: "/log/systemQuery",
          authority: "operation:log:admin:menu"
        }
      ]
    }
  ],
  [
    {
      name: "日终结算",
      path: "",
      icon: "plus-square",
      authority: "finance:day-settle:menu",
      children: [
        {
          name: "日终结算",
          path: "/hnairLoanManage/dayendSettlement",
          authority: "finance:day-settle:day-settle:menu"
        }
      ]
    },
    {
      name: "对账管理",
      path: "",
      icon: "plus-square",
      authority: "finance:reconciliation:menu",
      children: [
        {
          name: "代付对账",
          path: "/fundDefend/loanDetail",
          authority: "fund:check:pay:menu"
        },
        {
          name: "还款对账",
          path: "/fundDefend/repayDetail",
          authority: "fund:check:repay:menu"
        }
      ]
    }
  ],
  [
    {
      name: "五级分类管理",
      path: "",
      icon: "plus-square",
      authority: "risk:five:menu",
      children: [
        {
          name: "贷款五级分类",
          path: "/riskManage/loanType",
          authority: "risk:risk:loan-category:menu"
        },
        {
          name: "五级分类配置",
          path: "/basicRiskSettings/typeSettings",
          authority: "setting:risk:loan-category:menu"
        }
      ]
    },
    {
      name: "黑名单管理",
      path: "",
      icon: "plus-square",
      authority: "risk:blacklist:menu",
      children: [
        {
          name: "黑名单",
          path: "/riskManage/blacklist",
          authority: "risk:risk:blacklist:menu"
        }
      ]
    },
    {
      name: "筛查规则管理",
      path: "",
      icon: "plus-square",
      authority: "risk:rule:menu",
      children: [
        {
          name: "筛查规则管理",
          path: "/basicRiskSettings/searchRuleManage",
          authority: "setting:risk:product-rule:menu"
        }
      ]
    }
  ],
  [
    {
      name: '催收分案',
      path: '',
      icon: 'plus-square',
      authority: "collection:division:menu",
      // authority: 'dunning:dunning:menu',
      children: [{
        name: '催收分案',
        path: '/collectionManage/collectionManage',
        authority: "collection:division:division:menu"
        // authority: 'dunning:dunning:dunning:menu'
      }]
    },
    {
      name: '催收跟进',
      path: '',
      icon: 'plus-square',
      authority: "collection:follow:menu",
      // authority: 'dunning:dunning:menu',
      children: [{
        name: '我的催收任务',
        path: '/collectionManage/CollectionTask',
        authority: "collection:follow:task:menu"
        // authority: 'dunning:dunning:dunning:menu'
      }]
    },
    {
      name: '催收明细',
      path: '',
      icon: 'plus-square',
      authority: "collection:detail:menu",
      // authority: 'dunning:dunning:menu',
      children: [
        {
          name: '催收用户列表',
          path: '/collectionManage/CollectionUsersList',
          authority: "collection:detail:user:menu"
          // authority: 'dunning:dunning:dunning:menu'
        },
        {
          name: '历史催收记录',
          path: '/collectionManage/CollectionHistory',
          authority: "collection:detail:history:menu"
          // authority: 'dunning:dunning:dunning:menu'
        },
        {
          name: '催收还款记录',
          path: '/collectionManage/CollectionPayment',
          authority: "collection:detail:repay:menu"
          // authority: 'dunning:dunning:dunning:menu'
        },
      ]
    },
    {
      name: '催收统计',
      path: '',
      icon: 'plus-square',
      authority: "collection:statistics:menu",
      // authority: 'dunning:dunning:menu',
      children: [{
        name: '催收统计',
        path: '/collectionManage/CollectionStatistics',
        authority: "collection:statistics:statistics:menu"
        // authority: 'dunning:dunning:dunning:menu'
      }]
    },
  ],
  [
    {
      name: "报表管理",
      path: "",
      icon: "plus-square",
      authority: "report:report:menu",
      children: [
        {
          name: "运营报告",
          path: "/sumReport/operateReport",
          authority: "report:statistics:operation:menu"
        },
        {
          name: "授信报告",
          path: "/sumReport/incomeReport",
          authority: "report:statistics:income:menu"
        },
        {
          name: "放款报告",
          path: "/sumReport/loanReport",
          authority: "report:statistics:pay:menu"
        },
        {
          name: "还款报告",
          path: "/sumReport/repayReport",
          authority: "report:statistics:repay:menu"
        },
        {
          name: "逾期报告",
          path: "/sumReport/overdueReport",
          authority: "report:statistics:overdue:menu"
        }
        /*{
        name: '授信报告',
        path: '',
        authority: 'report:report:sign:menu'
      }*/
      ]
    }
  ],
  [
    {
      name: "航空白条配置",
      path: "",
      icon: "plus-square",
      authority: "business:white-strip:menu",
      children: [
        {
          name: "航空白条入口配置",
          path: "/airTicketInstallment/aviationIousManage",
          authority: "business:white-strip:entrance:menu"
        }
      ]
    },
    {
      name: "任务调度管理",
      path: "",
      icon: "plus-square",
      authority: "setting:schedule:menu",
      children: [
        {
          name: "定时任务管理",
          path: "/dispatchPlatform/timingTask",
          authority: "setting:schedule:batch-profile:menu"
        },
        {
          name: "任务执行监控",
          path: "/dispatchPlatform/executeMonitor",
          authority: "setting:schedule:system-batch:menu"
        }
      ]
    },
    {
      name: '工作流设计',
      path: '',
      icon: 'plus-square',
      authority: 'business:workflow-design:menu',
      children: [
        {
          name: '工作流维护',
          path: '/workflowDesign/workflowOperate',
          authority: 'business:workflow-design:maintain:menu'
        }
      ]
    },
    {
      name: '树形状态查询',
      path: '',
      icon: 'plus-square',
      authority: 'business:workflow-design:menu',
      children: [
        {
          name: '树形状态查询',
          path: '/treeStateQuery',
          authority: 'business:workflow-design:maintain:menu'
        }
      ]
    },
    {
      name: '业务支付通道路由',
      path: '',
      icon: 'plus-square',
      authority: 'business:router:business-router:menu',
      children: [
        {
          name: '业务路由配置',
          path: '/businessConfig',
          authority: 'business:router:business-router-config:menu',
        }
      ]
    },
  ],
  [
    {
      name: "权限管理",
      path: "",
      icon: "plus-square",
      authority: "permission:permission:menu",
      children: [
        /*{
        name: '菜单管理',
        path: '',
        authority: 'permission:permission:menu:menu'
      },*/
        {
          name: "用户管理",
          path: "/authority/userMaintain",
          authority: "permission:user:user:menu"
        },
        {
          name: "角色管理",
          path: "/authority/roleMaintain",
          authority: "permission:user:role:menu"
        }
      ]
    },
    {
      name: "安全选项配置",
      path: "",
      icon: "plus-square",
      authority: "permission:safeoption:menu",
      children: [
        {
          name: "密码校验规则",
          path: "/securityOptsSettings/pwdValidateRule",
          authority: "permission:safeoption:passwordvalid:menu"
        }
      ]
    }
  ],
  [
    {
      name: "用户管理",
      path: "",
      icon: "plus-square",
      authority: "app:usermanagement:menu",
      children: [
        {
          name: "用户注册信息",
          path: "/appManage/userRegisterInfo",
          authority: "app:usermanagement:userinfo:menu"
        }
      ]
    },
    {
      name: "app维护",
      path: "",
      icon: "plus-square",
      authority: "app:maintain:menu",
      children: [
        {
          name: "版本管理",
          path: "/appManage/versionList",
          authority: "app:maintain:version:menu"
        },
        {
          name: "常见问题维护",
          path: "/appManage/questionList",
          authority: "app:maintain:appquestion:menu"
        }
      ]
    },
    {
      name: "消息推送",
      path: "",
      icon: "plus-square",
      authority: "app:message:menu",
      children: [
        {
          name: "消息推送",
          path: "/messagePush/messagePushList",
          authority: "app:message:push:menu"
        }
      ]
    },
    {
      name: "公告管理",
      path: "",
      icon: "plus-square",
      authority: "app:announcement:menu",
      children: [
        {
          name: "公告管理",
          path: "/appManage/announcementManagement",
          authority: "app:announcement:announcement:menu"
        }
      ]
    },
    {
      name: "app的下载统计",
      path: "",
      icon: "plus-square",
      authority: "app:announcement:menu",
      children: [
        {
          name: "app的下载统计",
          path: "/appManage/appDownload",
          authority: "app:announcement:announcement:menu"
        }
      ]
    },
  ]
];

export { headerMenuConfig, asideMenuConfig };
