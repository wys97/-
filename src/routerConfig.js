// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import React from "react";
import { getRouterData } from "./utils/formatter";
import { asideMenuConfig } from "./menuConfig";

import UserLogin from "./pages/UserLogin";
import BasicLayout from "./layouts/BasicLayout";

import PartnerManage from "./pages/OperationManage/PartnerManage/PartnerManage";
import CustomerInfoTab from "./pages/OperationManage/CustomerManage/CustomerInfoTab";
// import CustomerManage from './pages/OperationManage/CustomerManage/CustomerManage';  // 海航分支客户信息管理新页面
import roleMaintain from "./pages/authorityManage/RoleManage/roleMaintain";
import userMaintain from "./pages/authorityManage/UserManage/userMaintain";
import ProductManage from "./pages/OperationManage/ProductManage/ProductManage";
import ProductAddManage from "./pages/OperationManage/ProductManage/ProductAddManage";
import ProductInfoTabManage from "./pages/OperationManage/ProductManage/ProductInfoTabManage";
import PaymentOptions from "./pages/OperationManage/ProductManage/PaymentOptions";
import ProductUpdateTabManage from "./pages/OperationManage/ProductManage/ProductUpdateTabManage";
import LoansManage from "./pages/OperationManage/LoansManage";
import LoansAddManage from "./pages/OperationManage/LoansManage/LoansAddManage";
import LoansInfoTabManage from "./pages/OperationManage/LoansManage/LoansInfoTabManage";
import LoansInfoDetail from "./pages/OperationManage/LoansManage/LoansInfoDetail";
import LoansUpdateManage from "./pages/OperationManage/LoansManage/LoansUpdateManage";
import PartnerAddManage from "./pages/OperationManage/PartnerManage/PartnerAddManage";
import SearchRuleManage from "./pages/systemSetting/SearchRuleManage";
import LoansDetail from "./pages/fundManage/LoanDetail/LoanDetail";
import LoansDetailInfo from "./pages/fundManage/LoanDetail/LoanDetailInfo";
import DeductionDateChange from "./pages/postLendingManage/DeductionDateChange/DeductionDateChange";
import DateChangeDetail from "./pages/postLendingManage/DeductionDateChange/DateChangeDetail";
import LoanApprovalManage from "./pages/workBench/LoanApprovalManage";
import RepayDetail from "./pages/fundManage/RepayDetail/RepayDetail";
import RepayDetailInfo from "./pages/fundManage/RepayDetail/RepayDetailInfo";
import DefendLoanDetail from "./pages/fundDefend/LoanDetail/LoanDetail";
import DefendLoanDetailInfo from "./pages/fundDefend/LoanDetail/LoanDetailInfo";
import DefendRepayDetail from "./pages/fundDefend/RepayDetail/RepayDetail";
import DefendRepayDetailInfo from "./pages/fundDefend/RepayDetail/RepayDetailInfo";
import DeductChangeApproval from "./pages/approvalManage/DeductChangeApproval/DeductChangeApproval";
import DeductChangeApprovalInfo from "./pages/approvalManage/DeductChangeApproval/DeductChangeApprovalInfo";
import RepayAccountChange from "./pages/postLendingManage/RepayAccountChange/RepayAccountChange";
import AccountChangeDetail from "./pages/postLendingManage/RepayAccountChange/AccountChangeDetail";
import LoanApplyManage from "./pages/assetManagement/LoanApplyManage";
import LoanApplyDetail from "./pages/assetManagement/LoanApplyManage/LoanApplyDetail";
import LoanApprovalDetail from "./pages/workBench/LoanApprovalManage/LoanApprovalDetail";
import LoanApproval from "./pages/workBench/LoanApprovalManage/LoanApprovalApp";
import FeeWaiver from "./pages/workBench/FeeWaiver";
import FeeWaiverDetail from "./pages/workBench/FeeWaiver/FeeWaiverDetail";
import FeeWaiverApp from "./pages/workBench/FeeWaiver/FeeWaiverApp";
import LoanDueManage from "./pages/assetManagement/LoanDueManage";
import LoanDueDetail from "./pages/assetManagement/LoanDueManage/LoanDueDetail";
import FeeWaiverManage from "./pages/postLendingManage/FeeWaiverManage";
import FeeWaiverManageDetail from "./pages/postLendingManage/FeeWaiverManage/FeeWaiverManageDetail";
import FeeWaiverAddUpdate from "./pages/postLendingManage/FeeWaiverManage/FeeWaiverAddUpdate";
import OverdueRepay from "./pages/postLendingManage/OverdueRepay";
import OverdueRepayDetail from "./pages/postLendingManage/OverdueRepay/OverdueRepayDetail";
import CompensatoryManage from "./pages/fundManage/CompensatoryManage";
import CompensatoryDetail from "./pages/fundManage/CompensatoryManage/CompensatoryDetail";
import BuyBackManage from "./pages/fundManage/BuyBackManage";
import BuyBackDetail from "./pages/fundManage/BuyBackManage/BuyBackDetail";
import CustomerRisk from "./pages/riskManage/CustomerRisk";
import OfflineRegister from "./pages/postLendingManage/OfflineRegister";
import OfflineRegisterDetail from "./pages/postLendingManage/OfflineRegister/OfflineRegisterDetail";
import OfflineRepayApprovalManage from "./pages/workBench/OfflineRepayApprovalManage";
import OfflineRepayApprovalDetail from "./pages/workBench/OfflineRepayApprovalManage/OfflineRepayApprovalDetail";
import OfflineRepayApprovalApp from "./pages/workBench/OfflineRepayApprovalManage/OfflineRepayApprovalApp";
import PartnerRank from "./pages/riskManage/PartnerRank";
import LoanType from "./pages/riskManage/LoanType";
import LoanTypeDetail from "./pages/riskManage/LoanType/LoanTypeDetail";
import LoanTypeUpdate from "./pages/riskManage/LoanType/LoanTypeUpdate";
import FiveTypeSettings from "./pages/systemSetting/FiveTypeSettings";
import ContractInfo from "./pages/assetManagement/contractInfo/contractInfo";
// import Home from './pages/workBench/Home/Home' // 海航分支首页新页面
import BlackList from "./pages/riskManage/BlackList";
import BlackDetail from "./pages/riskManage/BlackList/BlackDetail";
import BlackAddUpdate from "./pages/riskManage/BlackList/BlackAddUpdate";
import BlackListApproval from "./pages/workBench/BlackList";
import BlackListApprovalDetail from "./pages/workBench/BlackList/BlackListApprovalDetail";
import BlackListApprovalApp from "./pages/workBench/BlackList/BlackListApprovalApp";
import IncomeReport from "./pages/ReportManage/IncomeReport";
import OverdueReport from "./pages/ReportManage/OverdueReport";
import PartnerInfoTab from "./pages/OperationManage/PartnerManage/PartnerInfoTab";
import LoanReport from "./pages/ReportManage/LoanReport";
import RepayReport from "./pages/ReportManage/RepayReport";
import OperateReport from "./pages/ReportManage/OperateReport/OperateReport";
import TaskExceptLog from "./pages/OperationManage/TaskExceptLog/TaskExceptLog";
import TaskLogDetail from "./pages/OperationManage/TaskExceptLog/TaskLogDetail";
import SysOperateLog from "./pages/OperationManage/SysOperateLog/SysOperateLog";
import SysLogDetail from "./pages/OperationManage/SysOperateLog/SysLogDetail";
import TaskExecuteMonitor from "./pages/systemSetting/TaskExecuteMonitor/TaskExecuteMonitor";
import TaskDetail from "./pages/systemSetting/TaskExecuteMonitor/TaskDetail";
import TimingTaskManage from "./pages/systemSetting/TimingTaskManage/TimingTaskManage";

import CollectionManage from './pages/collectionManage/CollectionManage/CollectionManage';
import CollectionInfoTab from './pages/collectionManage/CollectionManage/CollectionInfoTab'
import CollectionInfoTabs from './pages/collectionManage/CollectionManage/CollectionInfoTabs'
import CollectionTask from './pages/collectionManage/CollectionFollowUp/CollectionTask';
import CollectionUsersList from './pages/collectionManage/CollectionDetail/CollectionUsersList';
import CollectionHistory from './pages/collectionManage/CollectionDetail/CollectionHistory';
import CollectionPayment from './pages/collectionManage/CollectionDetail/CollectionPayment';
import CollectionStatistics from './pages/collectionManage/CollectionStatistics/CollectionStatistics';
import CollectionRecordAdd from './pages/collectionManage/CollectionFollowUp/CollectionRecordAdd';
import CollectionRecordUpdate from './pages/collectionManage/CollectionFollowUp/CollectionRecordUpdate';
import aviationIousManage from "./pages/airTicketInstallment/aviationIous/AviationIousManage";
import aviationIousDetail from "./pages/airTicketInstallment/aviationIous/AviationIousDetail";
import aviationIousUpdate from "./pages/airTicketInstallment/aviationIous/AviationIousUpdate";
import customerManageNew from "./pages/OperationManage/customerManageNew/customerManageNew";
import customerInfoDetail from "./pages/OperationManage/customerManageNew/customerInfoDetail";
import customerInfoLog from "./pages/OperationManage/customerManageNew/customerInfoLog";
import hnairHome from "./pages/workBench/Home/HnairHome";
import creditManage from "./pages/hnairLoanManage/CreditManage/CreditManage";
import creditManageDetail from "./pages/hnairLoanManage/CreditManage/CreditManageDetail";
import creditApprovalManage from "./pages/workBench/CreditApprovalManage/CreditApprovalManage";
import creditApprovalApp from "./pages/workBench/CreditApprovalManage/CreditApprovalApp";
import creditApprovalDetail from "./pages/workBench/CreditApprovalManage/CreditApprovalDetail";
import hnairLoanDetail from "./pages/fundManage/HnairLoanDetail/HnairLoanDetail";
import hnairOverdueRepay from "./pages/postLendingManage/HnairOverdueRepay/HnairOverdueRepay";
import hnairRepayDetail from "./pages/fundManage/HnairRepayDetail/HnairRepayDetail";
import hnairRepayDetailInfo from "./pages/fundManage/HnairRepayDetail/HnairRepayDetailInfo";
import hnairDrawBack from "./pages/hnairLoanManage/DrawBack/DrawBack";
import hnairRefundManage from "./pages/hnairLoanManage/RefundManage/RefundManage";
import dayendSettlement from "./pages/hnairLoanManage/DayendSettlement/DayendSettlement";
import dayendSettlementTab from "./pages/hnairLoanManage/DayendSettlement/DayendSettlementTab";
import HnairOfflineRegister from "./pages/postLendingManage/HnairOfflineRegister/HnairOfflineRegister";
import HnairOfflineRegisterDetail from "./pages/postLendingManage/HnairOfflineRegister/HnairOfflineRegisterDetail";
import HnairOfflineRegisterAdd from "./pages/postLendingManage/HnairOfflineRegister/HnairOfflineRegisterAdd";
import PwdCheckRules from "./pages/securityOptionsSetting/pwdCheckRules/pwdCheckRules";
import refundDataImport from "./pages/hnairLoanManage/refundDataImport/refundDataImport";
import CreditUserList from "./pages/hnairLoanManage/CreditManage/CreditUserList";
import CreditDivision from "./pages/hnairLoanManage/CreditManage/CreditDivision";
import WorkflowOperate from "./pages/hnairLoanManage/WorkflowDesign/WorkflowOperate";
import WorkflowDetail from "./pages/hnairLoanManage/WorkflowDesign/WorkflowDetail";
import WorkflowUpdate from "./pages/hnairLoanManage/WorkflowDesign/WorkflowUpdate";
import CollectionFollowUp from "./api/CollectionManage/CollectionFollowUp";
import announcementManagement from "./pages/appManage/announcementManagement/announcementManagement";
import versionList from "./pages/appManage/versionManagement/versionList";
import versionUpdate from "./pages/appManage/versionManagement/versionUpdate";
import userRegisterInfo from "./pages/appManage/userRegisterInfo/userRegisterInfo";
import pointsDetailList from "./pages/appManage/userRegisterInfo/pointsDetailList";
import messagePushList from "./pages/appManage/messagePush/messagePushList";
import messagePushUpdate from "./pages/appManage/messagePush/messagePushUpdate";
import questionList from "./pages/appManage/questionManagement/questionList";
import questionUpdate from "./pages/appManage/questionManagement/questionUpdate";
import questionDetail from "./pages/appManage/questionManagement/questionDetail";
import ApprovalProcess from "./pages/approvalProcess/approvalProcess";
import TreeStateQuery from "./pages/treeStateQuery/treeStateQuery";
import AppDownload from "./pages/appManage/appDownload/appDownload";
import BusinessConfig from "./pages/businessConfig/businessConfig";
import PostponeManage from "./pages/postponeManage/postponeManage";
import PostponeAdd from "./pages/postponeManage/postponeAdd";
import PostponeDetail from "./pages/postponeManage/postponeDetail";
import PostpneApprove from "./pages/postponeManage/postponeApprove/postponeApprove";
import ApproveDetail from "./pages/postponeManage/postponeApprove/approveDetail";
import Approve from "./pages/postponeManage/postponeApprove/approve";
import HnairRepayment from "./pages/fundManage/HnairRepayment/hnairRepayment";

const routerConfig = [
  //   {
  //       path: '/myWorkspace/home',
  //       layout: BasicLayout,
  //       component: Home
  //   },
  {
    path: "/baseinfo/customer",
    layout: BasicLayout,
    component: customerManageNew //CustomerManage, // 海航客户信息管理页面替换消金重构2.0
  },
  {
    path: "/baseinfo/customerInfoNew",
    layout: BasicLayout,
    component: customerInfoDetail // 海航客户信息管理明细页面
  },
  {
    path: "/baseinfo/customerInfoLog",
    layout: BasicLayout,
    component: customerInfoLog // 海航客户信息额度明细日志页面
  },
  {
    path: "/myWorkspace/home",
    layout: BasicLayout,
    component: hnairHome //Home, // 海航首页页面
  },
  {
    path: "/baseinfo/customerTab",
    layout: BasicLayout,
    component: CustomerInfoTab
  },
  {
    path: "/baseinfo/partners",
    layout: BasicLayout,
    component: PartnerManage
  },
  {
    path: "/baseinfo/partnerAdd",
    layout: BasicLayout,
    component: PartnerAddManage
  },
  {
    path: "/baseinfo/product",
    layout: BasicLayout,
    component: ProductManage
  },
  {
    path: "/baseinfo/ProductInfoTabManage",
    layout: BasicLayout,
    component: ProductInfoTabManage
  },
  {
    path: "/baseinfo/PaymentOptions",
    layout: BasicLayout,
    component: PaymentOptions
  },
  {
    path: "/baseinfo/ProductUpdateTabManage",
    layout: BasicLayout,
    component: ProductUpdateTabManage
  },
  {
    path: "/baseinfo/productAdd",
    layout: BasicLayout,
    component: ProductAddManage
  },
  {
    path: "/baseinfo/loans",
    layout: BasicLayout,
    component: LoansManage
  },
  {
    path: "/baseinfo/loansAdd",
    layout: BasicLayout,
    component: LoansAddManage
  },
  {
    path: "/baseinfo/loansInfoTab",
    layout: BasicLayout,
    component: LoansInfoTabManage
  },
  {
    path: "/baseinfo/loansInfoDetail",
    layout: BasicLayout,
    component: LoansInfoDetail //贷款项目详情页
  },
  {
    path: "/baseinfo/loansUpdate",
    layout: BasicLayout,
    component: LoansUpdateManage
  },

  {
    path: "/authority/rolemaintain",
    layout: BasicLayout,
    component: roleMaintain
  },
  {
    path: "/authority/usermaintain",
    layout: BasicLayout,
    component: userMaintain
  },
  {
    path: "/fundManage/loanDetail",
    layout: BasicLayout,
    component: LoansDetail
  },
  {
    path: "/fundManage/loanDetailInfo",
    layout: BasicLayout,
    component: LoansDetailInfo
  },
  {
    path: "/basicRiskSettings/searchRuleManage",
    layout: BasicLayout,
    component: SearchRuleManage
  },
  {
    path: "/businessChange/deductDateChange",
    layout: BasicLayout,
    component: DeductionDateChange
  },
  {
    path: "/businessChange/deductDateDetail",
    layout: BasicLayout,
    component: DateChangeDetail
  },
  {
    path: "/approvalManage/loan",
    layout: BasicLayout,
    component: LoanApprovalManage
  },
  {
    path: "/fundManage/repayDetail",
    layout: BasicLayout,
    component: RepayDetail
  },
  {
    path: "/fundManage/repayDetailInfo",
    layout: BasicLayout,
    component: RepayDetailInfo
  },
  {
    path: "/approvalManage/deductChange",
    layout: BasicLayout,
    component: DeductChangeApproval
  },
  {
    path: "/approvalManage/deductChangeInfo",
    layout: BasicLayout,
    component: DeductChangeApprovalInfo
  },
  {
    path: "/assetManage/loanApply",
    layout: BasicLayout,
    component: LoanApplyManage
  },
  {
    path: "/assetManage/loanApplyDetail",
    layout: BasicLayout,
    component: LoanApplyDetail
  },
  {
    path: "/approvalManage/loanDetail",
    layout: BasicLayout,
    component: LoanApprovalDetail
  },
  {
    path: "/approvalManage/loanApproval",
    layout: BasicLayout,
    component: LoanApproval
  },
  {
    path: "/approvalManage/feeWaiver",
    layout: BasicLayout,
    component: FeeWaiver
  },
  {
    path: "/approvalManage/feeWaiverDetail",
    layout: BasicLayout,
    component: FeeWaiverDetail
  },
  {
    path: "/approvalManage/feeWaiverApp",
    layout: BasicLayout,
    component: FeeWaiverApp
  },
  {
    path: "/approvalManage/creditDetail",
    layout: BasicLayout,
    component: creditApprovalDetail
  },
  {
    path: "/assetManage/IOUManage",
    layout: BasicLayout,
    component: LoanDueManage
  },
  {
    path: "/assetManage/IOUDetail",
    layout: BasicLayout,
    component: LoanDueDetail
  },
  {
    path: "/businessChange/feeWaiver",
    layout: BasicLayout,
    component: FeeWaiverManage
  },
  {
    path: "/businessChange/feeWaiverManageDetail",
    layout: BasicLayout,
    component: FeeWaiverManageDetail
  },
  {
    path: "/businessChange/feeWaiverAddUpdate",
    layout: BasicLayout,
    component: FeeWaiverAddUpdate
  },
  {
    path: "/businessChange/overdueRepay",
    layout: BasicLayout,
    component: OverdueRepay
  },
  {
    path: "/businessChange/overdueRepayDetail",
    layout: BasicLayout,
    component: OverdueRepayDetail
  },
  {
    path: "/fundManage/compensatory",
    layout: BasicLayout,
    component: CompensatoryManage
  },
  {
    path: "/fundManage/compensatoryDetail",
    layout: BasicLayout,
    component: CompensatoryDetail
  },
  {
    path: "/fundManage/buyBack",
    layout: BasicLayout,
    component: BuyBackManage
  },
  {
    path: "/fundManage/buyBackDetail",
    layout: BasicLayout,
    component: BuyBackDetail
  },
  {
    path: "/fundDefend/loanDetail",
    layout: BasicLayout,
    component: DefendLoanDetail
  },
  {
    path: "/fundDefend/loanDetailInfo",
    layout: BasicLayout,
    component: DefendLoanDetailInfo
  },
  {
    path: "/fundDefend/repayDetail",
    layout: BasicLayout,
    component: DefendRepayDetail
  },
  {
    path: "/fundDefend/repayDetailInfo",
    layout: BasicLayout,
    component: DefendRepayDetailInfo
  },
  {
    path: "/riskManage/customerRank",
    layout: BasicLayout,
    component: CustomerRisk
  },
  {
    path: "/businessChange/offlineRegister",
    layout: BasicLayout,
    component: OfflineRegister
  },
  {
    path: "/businessChange/offlineRegisterDetail",
    layout: BasicLayout,
    component: OfflineRegisterDetail
  },
  {
    path: "/businessChange/HnairOfflineRegister",
    layout: BasicLayout,
    component: HnairOfflineRegister //海航添加 > 线下还款登记
  },
  {
    path: "/businessChange/HnairOfflineRegisterDetail",
    layout: BasicLayout,
    component: HnairOfflineRegisterDetail //海航添加 > 线下还款登记
  },
  {
    path: "/businessChange/HnairOfflineRegisterAdd",
    layout: BasicLayout,
    component: HnairOfflineRegisterAdd //海航添加 > 线下还款登记
  },
  {
    path: "/approvalManage/offlineRepay",
    layout: BasicLayout,
    component: OfflineRepayApprovalManage
  },
  {
    path: "/approvalManage/offlineRepayDetail",
    layout: BasicLayout,
    component: OfflineRepayApprovalDetail
  },
  {
    path: "/approvalManage/offlineRepayApp",
    layout: BasicLayout,
    component: OfflineRepayApprovalApp
  },
  {
    path: "/riskManage/partnerRank",
    layout: BasicLayout,
    component: PartnerRank
  },
  {
    path: "/riskManage/loanType",
    layout: BasicLayout,
    component: LoanType
  },
  {
    path: "/riskManage/loanTypeDetail",
    layout: BasicLayout,
    component: LoanTypeDetail  //海航二期，贷款五级分类详情页面
  },
  {
    path: "/riskManage/loanTypeUpdate",
    layout: BasicLayout,
    component: LoanTypeUpdate  //海航二期，贷款五级分类修改页面
  },
  {
    path: "/basicRiskSettings/typeSettings",
    layout: BasicLayout,
    component: FiveTypeSettings
  },
  {
    path: "/assetManage/contractList",
    layout: BasicLayout,
    component: ContractInfo
  },
  {
    path: "/businessChange/repayAccountChange",
    layout: BasicLayout,
    component: RepayAccountChange
  },
  {
    path: "/businessChange/accountChangeInfo",
    layout: BasicLayout,
    component: AccountChangeDetail
  },
  {
    path: "/riskManage/blacklist",
    layout: BasicLayout,
    component: BlackList
  },
  {
    path: "/riskManage/blackdetail",
    layout: BasicLayout,
    component: BlackDetail
  },
  {
    path: "/riskManage/blackaddupdate",
    layout: BasicLayout,
    component: BlackAddUpdate
  },
  {
    path: "/approvalManage/blacklist",
    layout: BasicLayout,
    component: BlackListApproval
  },
  {
    path: "/approvalManage/blacklistdetail",
    layout: BasicLayout,
    component: BlackListApprovalDetail
  },
  {
    path: "/approvalManage/blacklistapp",
    layout: BasicLayout,
    component: BlackListApprovalApp
  },
  {
    path: "/sumReport/incomeReport",
    layout: BasicLayout,
    component: IncomeReport
  },
  {
    path: "/sumReport/overdueReport",
    layout: BasicLayout,
    component: OverdueReport
  },
  {
    path: "/baseinfo/partnerInfoTab",
    layout: BasicLayout,
    component: PartnerInfoTab
  },
  {
    path: "/sumReport/loanReport",
    layout: BasicLayout,
    component: LoanReport
  },
  {
    path: "/sumReport/repayReport",
    layout: BasicLayout,
    component: RepayReport
  },
  {
    path: "/sumReport/operateReport",
    layout: BasicLayout,
    component: OperateReport
  },
  {
    path: "/log/exceptLog",
    layout: BasicLayout,
    component: TaskExceptLog
  },
  {
    path: "/log/exceptDetail",
    layout: BasicLayout,
    component: TaskLogDetail
  },
  {
    path: "/log/systemQuery",
    layout: BasicLayout,
    component: SysOperateLog
  },
  {
    path: "/log/sysLogDetail",
    layout: BasicLayout,
    component: SysLogDetail
  },
  {
    path: "/dispatchPlatform/executeMonitor",
    layout: BasicLayout,
    component: TaskExecuteMonitor
  },
  {
    path: "/dispatchPlatform/taskDetail",
    layout: BasicLayout,
    component: TaskDetail
  },
  {
    path: "/dispatchPlatform/timingTask",
    layout: BasicLayout,
    component: TimingTaskManage
  },
  {
    path: "/user/login",
    component: UserLogin
  },
  // ,
  // {
  //     path: '/user/register',
  //     component: UserRegister,
  // },

  {
      path: '/collectionManage/collectionManage',
      layout: BasicLayout,
      component: CollectionManage           //海航二期添加催收管理
  },
  {
      path: '/collectionManage/collectionInfoTab',
      layout: BasicLayout,
      component: CollectionInfoTab          //海航二期添加催收管理-详情页
  },
  {
    path: '/collectionManage/collectionInfoTabs',
    layout: BasicLayout,
    component: CollectionInfoTabs          //海航二期添加催收管理-我的催收任务详情页
  },
  {
      path: '/collectionManage/CollectionTask',
      layout: BasicLayout,
      component: CollectionTask           // 海航二期添加-我的催收任务
  },
  {
    path: '/collectionManage/CollectionUsersList',
    layout: BasicLayout,
    component: CollectionUsersList           // 海航二期添加-催收用户记录
  },
  {
    path: '/collectionManage/CollectionRecordAdd',
    layout: BasicLayout,
    component: CollectionRecordAdd           // 海航二期添加-催收用户记录-详情-催收记录添加
  },
  {
    path: '/collectionManage/CollectionRecordUpdate',
    layout: BasicLayout,
    component: CollectionRecordUpdate           // 海航二期添加-催收用户记录-详情-催收记录修改
  },
  {
    path: '/collectionManage/CollectionHistory',
    layout: BasicLayout,
    component: CollectionHistory            //   海航二期添加-历史催收记录
  },
  {
    path: '/collectionManage/CollectionPayment',
    layout: BasicLayout,
    component: CollectionPayment            //   海航二期添加-催收还款记录
  },
  {
    path: '/collectionManage/CollectionStatistics',
    layout: BasicLayout,
    component: CollectionStatistics            //   海航二期添加-催收统计
  },

  {
    path: "/airTicketInstallment/aviationIousManage",
    layout: BasicLayout,
    component: aviationIousManage //海航添加-航空白条入口配置（菜单添加业务配置）
  },
  {
    path: "/airTicketInstallment/aviationIousDetail",
    layout: BasicLayout,
    component: aviationIousDetail //海航添加-航空白条入口配置详情
  },
  {
    path: "/airTicketInstallment/aviationIousUpdate",
    layout: BasicLayout,
    component: aviationIousUpdate //海航添加-航空白条入口配置修改
  },
  {
    path: "/hnairLoanManage/creditManage",
    layout: BasicLayout,
    component: creditManage //海航添加-授信管理（菜单添加贷款业务管理）
  },
  {
    path: "/approvalManage/credit",
    layout: BasicLayout,
    component: creditApprovalManage //海航添加-授信审批 （我的工作台添加授信审批）
  },
  {
    path: "/approvalManage/creditApproval",
    layout: BasicLayout,
    component: creditApprovalApp
  },
  {
    path: "/hnairLoanManage/creditManageDetail",
    layout: BasicLayout,
    component: creditManageDetail
  },
  {
    path: "/fundManage/hnairLoanDetail",
    layout: BasicLayout,
    component: hnairLoanDetail //海航添加-放款明细（贷款业务管理-放款明细）
  },
  {
    path: "/postLendingManage/hnairOverdueRepay",
    layout: BasicLayout,
    component: hnairOverdueRepay //海航添加-逾期明细（贷款业务管理-逾期明细）
  },
  {
    path: "/fundManage/hnairRepayDetail",
    layout: BasicLayout,
    component: hnairRepayDetail //海航添加-还款明细（贷款业务管理-还款明细）
  },
  {
    path: "/fundManage/hnairRepayDetailInfo",
    layout: BasicLayout,
    component: hnairRepayDetailInfo //海航添加-还款明细-详情（贷款业务管理-还款明细）
  },
  {
    path: "/fundManage/hnairRepayment",
    layout: BasicLayout,
    component: HnairRepayment //海航添加-还款借据明细（贷款业务管理-还款明细）
  },
  {
    path: "/hnairLoanManage/hnairDrawBack",
    layout: BasicLayout,
    component: hnairDrawBack //海航添加-退款退票-退票明细（贷款业务管理-退款退票）
  },
  {
    path: "/hnairLoanManage/hnairRefundManage",
    layout: BasicLayout,
    component: hnairRefundManage //海航添加-退款退票-溢交款明细（贷款业务管理-退款退票）
  },
  {
    path: "/hnairLoanManage/dayendSettlement",
    layout: BasicLayout,
    component: dayendSettlement //海航添加-日终结算（财务管理-日终结算）
  },
  {
    path: "/hnairLoanManage/dayendSettlementTab",
    layout: BasicLayout,
    component: dayendSettlementTab //海航添加-日终结算详情
  },
  {
    path: "/securityOptsSettings/pwdValidateRule",
    layout: BasicLayout,
    component: PwdCheckRules // 海航-密码校验规则
  },
  {
    path: "/hnairLoanManage/creditUserList",
    layout: BasicLayout,
    component: CreditUserList // 海航-授信管理-授信用户列表
  },
  {
    path: "/hnairLoanManage/creditDivision",
    layout: BasicLayout,
    component: CreditDivision // 海航-授信管理-授信分案
  },
  {
    path: '/workflowDesign/workflowOperate',
    layout: BasicLayout,
    component: WorkflowOperate // 海航-工作流设计-工作流维护
  },
  {
    path: '/workflowDesign/workflowDetail',
    layout: BasicLayout,
    component: WorkflowDetail // 海航-工作流设计-工作流维护明细
  },
  {
    path: '/workflowDesign/workflowUpdate',
    layout: BasicLayout,
    component: WorkflowUpdate // 海航-工作流设计-工作流维护新增/修改
  },
  {
    path: "/hnairLoanManage/refundDataImport",
    layout: BasicLayout,
    component: refundDataImport
  },
  {
    path: "/appManage/versionList",
    layout: BasicLayout,
    component: versionList // 版本管理-列表
  },
  {
    path: "/appManage/versionUpdate",
    layout: BasicLayout,
    component: versionUpdate // 版本管理-新增/修改
  },
  {
    path: "/messagePush/messagePushList",
    layout: BasicLayout,
    component: messagePushList // 消息推送-列表
  },
  {
    path: "/messagePush/messagePushUpdate",
    layout: BasicLayout,
    component: messagePushUpdate // 消息推送-新增/修改
  },
  {
    path: "/appManage/announcementManagement",
    layout: BasicLayout,
    component: announcementManagement
  },
  {
    path: "/appManage/userRegisterInfo",
    layout: BasicLayout,
    component: userRegisterInfo  //app管理 - 用户注册信息
  },
  {
    path: "/userRegisterInfo/pointsDetailList",
    layout: BasicLayout,
    component: pointsDetailList  // 用户注册信息-积分详情
  },
  {
    path: "/appManage/questionList",
    layout: BasicLayout,
    component: questionList  //app管理 - 问题列表
  },
  {
    path: "/appManage/questionUpdate",
    layout: BasicLayout,
    component: questionUpdate //app管理 - 问题新增或更新
  },
  {
    path: "/appManage/questionDetail",
    layout: BasicLayout,
    component: questionDetail //app管理 - 问题新增或更新
  },
  {
    path: "/approvalProcess",
    layout: BasicLayout,
    component: ApprovalProcess //审批分案 
  },
  {
    path: "/treeStateQuery",
    layout: BasicLayout,
    component: TreeStateQuery //树形状态查询 
  },
  {
    path: "/appManage/appDownload",
    layout: BasicLayout,
    component: AppDownload //app的下载统计 
  },
  {
    path: "/businessConfig",
    layout: BasicLayout,
    component: BusinessConfig //支付业务配置
  },
  {
    path: "/businessChange/postponeManage",
    layout: BasicLayout,
    component: PostponeManage  //展期管理
  },
  {
    path: "/businessChange/postponeAdd",
    layout: BasicLayout,
    component: PostponeAdd  //新增展期
  },
  {
    path: "/businessChange/postponeDetail",
    layout: BasicLayout,
    component: PostponeDetail  //详情展期
  },
  {
    path: "/approvalManage/postponeApprove",
    layout: BasicLayout,
    component: PostpneApprove  //展期审批列表
  },
  {
    path: "/approvalManage/approve",
    layout: BasicLayout,
    component: Approve  //展期审批
  },
  {
    path: "/approvalManage/approveDetail",
    layout: BasicLayout,
    component: ApproveDetail  //展期审批详情
  },

];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
