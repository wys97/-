import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Dialog, Message, Tab} from '@alifd/next';
import DataTable from '../../components/DataTable';
import DetailForm from "../../components/DetailForm";
import partnerManageApi from "../../../api/OperationManage/PartnerManage";
import PartnerAddManage from './PartnerAddManage';
import CertificateWin from "./CertificateWin";
import CertificateDetailWin from "./CertificateDetailWin";
import FinanceWin from "./FinanceWin";
import FinanceDetailWin from "./FinanceDetailWin";
import ShareholderWin from "./ShareholderWin";
import ShareholderDetailWin from "./ShareholderDetailWin";
import ContactWin from "./ContactWin";
import ContactDetailWin from "./ContactDetailWin";
import InterfaceSetting from "./InterfaceSetting";
import RankDetailWin from "./RankDetailWin";

// const shapes = ['wrapped'];

const partnerDetailCol = [
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构状态：', require: true, key: 'partnerStatusText'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '合作机构类型：', require: true, key: 'partnerBusiness'},
  {label: '联系邮箱：', require: true, key: 'contactEmail'},
  {label: '', require: false, key: ''},
  {label: '成立日期：', require: false, key: 'setupDate'},
  {label: '', require: false, key: ''},
  {label: '行政区划代码：', require: false, key: 'areaNo'},
  {label: '行政区划：', require: false, key: 'areaName'},
  {label: '营业执照号码：', require: false, key: 'licenseNo'},
  {label: '', require: false, key: ''},
  {label: '营业执照注册日期：', require: false, key: 'licenseBeginDate'},
  {label: '营业执照到期日期：', require: false, key: 'licenseEndDate'},
  {label: '营业执照注册地址：', require: false, key: 'licenseAddress', row: 2},
  {label: '注册地行政区划代码：', require: false, key: 'licenseAreaNo'},
  {label: '注册地行政区划：', require: false, key: 'licenseAreaName'},
  {label: '国税登记证号码：', require: false, key: 'stateTaxNo'},
  {label: '', require: false, key: ''},
  {label: '地税登记证号码', require: false, key: 'localTaxNo'},
  {label: '', require: false, key: ''},
  {label: '组织机构代码：', require: false, key: 'organizationNo'},
  {label: '组织机构代码证有效期：', require: false, key: 'organizationEndDate'},
  {label: '社会信用代码：', require: false, key: 'socialCreditNo'},
  {label: '', require: false, key: ''},
  {label: '是否贷款运用方：', require: false, key: 'isLoanUser'},
  {label: '', require: false, key: ''},
  {label: '企业总资产：', require: false, key: 'totalAsset'},
  {label: '企业总负债：', require: false, key: 'totalLiability'},
  {label: '注册资本：', require: false, key: 'registeredCapital'},
  {label: '实收资本：', require: false, key: 'paidCapital'},
  {label: '企业类型：', require: false, key: 'partnerScale'},
  {label: '经营者情况：', require: false, key: 'operatorDescription', row: 2},
  {label: '主营业务情况：', require: false, key: 'businessDescription', row: 2},
  {label: '营业地址：', require: false, key: 'businessAddress', row: 2},
  {label: '邮政编码：', require: false, key: 'postcode'},
  {label: '实际控制人：', require: false, key: 'actualController'},
  {label: '合作机构信用评级：', require: false, key: 'creditRating'},
  {label: '', require: false, key: ''},
  {label: '备注：', require: false, key: 'remark', row: 2},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'}
];

const InterfaceInfoCol = [
  {label: '平台公钥：', require: true, key: 'systemPublicKey', row: 2, line: true},
  {label: '合作机构公钥：', require: true, key: 'partnerPublicKey', row: 2, line: true},
  {label: '回调通知地址：', require: true, key: 'partnerNotifyUrl', row: 2, line: true},
  {label: '合作机构IP白名单：', require: false, key: 'partnerIpWhitelist', row: 2, line: true},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'}
];

export default class PartnerInfoTab extends Component {
  static displayName = 'PartnerInfoTab';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      partnerNo: this.props.location && this.props.location.state && this.props.location.state.name,
      partnerDetailInfo: {},
      interfaceInfo: {},
      qualification: {
        detailShow: false,
        table: [
          {title: '资质信息ID', key: 'certificateId', width: 180, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 250},
          {title: '资质证书名称', key: 'certificateName', width: 250},
          {title: '资质等级', key: 'certificateLevel', width: 120},
          {title: '发证机关', key: 'issueOrgan', width: 150}
        ],
        editTable: [
          {title: '资质信息ID', key: 'certificateId', width: 180, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 250},
          {title: '资质证书名称', key: 'certificateName', width: 250},
          {title: '资质等级', key: 'certificateLevel', width: 120},
          {title: '发证机关', key: 'issueOrgan', width: 150},
          {title: '操作', key: 'operate', width: 200, cell: true}
        ],
        detailData: {},
        data: {},
        load: 0,
        show: false,
        type: 'add',
        id: ''
      },
      finance: {
        detailShow: false,
        table: [
          {title: '财务信息ID', key: 'financeId', width: 160, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 180},
          {title: '总资产(元)', key: 'totalAsset', width: 100},
          {title: '总负债(元)', key: 'totalLiability', width: 100},
          {title: '流动资产(元)', key: 'currentAsset', width: 100},
          {title: '流动负债(元)', key: 'currentLiability', width: 100},
          {title: '所有者权益(元)', key: 'ownerEquity', width: 100},
          {title: '财务报表截止日期', key: 'reportEndDate', width: 140}
        ],
        editTable: [
          {title: '财务信息ID', key: 'financeId', width: 160, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 180},
          {title: '总资产(元)', key: 'totalAsset', width: 100},
          {title: '总负债(元)', key: 'totalLiability', width: 100},
          {title: '流动资产(元)', key: 'currentAsset', width: 100},
          {title: '流动负债(元)', key: 'currentLiability', width: 100},
          {title: '所有者权益(元)', key: 'ownerEquity', width: 100},
          {title: '财务报表截止日期', key: 'reportEndDate', width: 140},
          {title: '操作', key: 'operate', width: 200, cell: true}
        ],
        detailData: {},
        data: {},
        load: 0,
        show: false,
        type: 'add',
        id: ''
      },
      shareholder: {
        detailShow: false,
        table: [
          {title: '股东信息ID', key: 'shareholderId', width: 160, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 160},
          {title: '股东名称', key: 'shareholderName', width: 120},
          {title: '股东类型', key: 'shareholderType', width: 120},
          {title: '持股比例(%)', key: 'shareRatio', width: 120},
          {title: '实际控制人标志', key: 'controllerFlag', width: 120},
          {title: '入股日期', key: 'shareDate', width: 140}
        ],
        editTable: [
          {title: '股东信息ID', key: 'shareholderId', width: 160, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 160},
          {title: '股东名称', key: 'shareholderName', width: 120},
          {title: '股东类型', key: 'shareholderType', width: 120},
          {title: '持股比例(%)', key: 'shareRatio', width: 120},
          {title: '实际控制人标志', key: 'controllerFlag', width: 120},
          {title: '入股日期', key: 'shareDate', width: 140},
          {title: '操作', key: 'operate', width: 200, cell: true}
        ],
        detailData: {},
        data: {},
        load: 0,
        show: false,
        type: 'add',
        id: ''
      },
      contacts: {
        detailShow: false,
        table: [
          {title: '联系人ID', key: 'contactId', width: 180, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 250},
          {title: '联系人名称', key: 'contactName', width: 200},
          {title: '联系人类型', key: 'contactRole', width: 120},
          {title: '联系电话', key: 'phone', width: 150}
        ],
        editTable: [
          {title: '联系人ID', key: 'contactId', width: 180, window: 'detail'},
          {title: '合作机构名称', key: 'partnerName', width: 250},
          {title: '联系人名称', key: 'contactName', width: 200},
          {title: '联系人类型', key: 'contactRole', width: 120},
          {title: '联系电话', key: 'phone', width: 150},
          {title: '操作', key: 'operate', width: 200, cell: true}
        ],
        detailData: {},
        data: {},
        load: 0,
        show: false,
        type: 'add',
        id: ''
      },
      rank: {
        detailShow: false,
        table: [
          {title: '评级编号', key: 'ratingId', width: 180, window: 'detail'},
          {title: '合作机构编号', key: 'partnerNo', width: 180},
          {title: '合作机构名称', key: 'partnerName', width: 250},
          {title: '评级结果', key: 'partnerRating', width: 120},
          {title: '生效标志', key: 'validStatus', width: 120},
          {title: '评级日期', key: 'ratingDate', width: 150}
        ],
        detailData: {},
        load: 0,
        id: ''
      },
      edit: {
        toolBtn: [
          {
            name: '新增',
            type: 'add',
            icon: 'add',
            permission: ':'
          }
        ],
        lineBtn: [
          {
            name: '修改',
            type: 'edit',
            permission: ':'
          },
          {
            name: '删除',
            type: 'del',
            permission: ':'
          }
        ]
      }
    };
    this.goBack = this.goBack.bind(this)
  }

  qualificationToolBtnFn = {
    add: () => {
      let qualification = {...this.state.qualification};
      qualification.id = '';
      qualification.type = 'add';
      qualification.show = true;
      qualification.data = {
        partnerNo: this.state.partnerDetailInfo.partnerNo,
        partnerName: this.state.partnerDetailInfo.partnerName
      };
      this.setState({
        qualification
      });
    }
  };

  qualificationLineBtnFn = {
    detail: (val, index, row) => {
      partnerManageApi.certificateDetail(row.certificateId).then((res) => {
        if (res.data.code === '200') {
          let qualification = {...this.state.qualification};
          qualification.detailData = res.data.data;
          qualification.detailShow = true;
          this.setState({
            qualification
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    edit: (val, index, row) => {
      partnerManageApi.certificateDetail(row.certificateId).then((res) => {
        if (res.data.code === '200') {
          let qualification = {...this.state.qualification};
          qualification.id = row.certificateId;
          qualification.type = 'edit';
          qualification.show = true;
          qualification.data = res.data.data;
          this.setState({
            qualification
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    del: (value, index, record) => {
      Dialog.show({title: '删除合作机构', content: '确认删除该资质信息吗？', onOk: () => this.delQualificationFn(record.certificateId)});
    }
  };

  qualificationBack = (flag) => {
    let qualification = {...this.state.qualification};
    if (flag) {
      qualification.show = false;
    } else {
      qualification.detailShow = false;
    }
    this.setState({
      qualification
    })
  };

  qualificationSave = (params) => {
    if (this.state.qualification.type === 'add') {
      partnerManageApi.addCertificate(params).then((res) => {
        if (res.data.code === '200') {
          let qualification = {...this.state.qualification};
          qualification.load = qualification.load + 1;
          qualification.show = false;
          this.setState({
            qualification
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    } else {
      partnerManageApi.editCertificate(params).then((res) => {
        if (res.data.code === '200') {
          let qualification = {...this.state.qualification};
          qualification.load = qualification.load + 1;
          qualification.show = false;
          this.setState({
            qualification
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    }
  };

  delQualificationFn = (id) => {
    partnerManageApi.delCertificate(id).then((res) => {
      if (res.data.code === '200') {
        let qualification = {...this.state.qualification};
        qualification.load = qualification.load + 1;
        this.setState({
          qualification
        });
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  financeToolBtnFn = {
    add: () => {
      let finance = {...this.state.finance};
      finance.id = '';
      finance.type = 'add';
      finance.show = true;
      finance.data = {
        partnerNo: this.state.partnerDetailInfo.partnerNo,
        partnerName: this.state.partnerDetailInfo.partnerName
      };
      this.setState({
        finance
      });
    }
  };

  financeLineBtnFn = {
    detail: (val, index, row) => {
      partnerManageApi.financeDetail(row.financeId).then((res) => {
        if (res.data.code === '200') {
          let finance = {...this.state.finance};
          finance.detailData = res.data.data;
          finance.detailShow = true;
          this.setState({
            finance
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    edit: (val, index, row) => {
      partnerManageApi.financeDetail(row.financeId).then((res) => {
        if (res.data.code === '200') {
          let finance = {...this.state.finance};
          finance.id = row.financeId;
          finance.type = 'edit';
          finance.show = true;
          finance.data = res.data.data;
          this.setState({
            finance
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    del: (value, index, record) => {
      Dialog.show({title: '删除合作机构', content: '确认删除该财务信息吗？', onOk: () => this.delFinanceFn(record.financeId)});
    }
  };

  financeBack = (flag) => {
    let finance = {...this.state.finance};
    if (flag) {
      finance.show = false;
    } else {
      finance.detailShow = false;
    }
    this.setState({
      finance
    })
  };

  financeSave = (params) => {
    if (this.state.finance.type === 'add') {
      partnerManageApi.addFinance(params).then((res) => {
        if (res.data.code === '200') {
          let finance = {...this.state.finance};
          finance.load = finance.load + 1;
          finance.show = false;
          this.setState({
            finance
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    } else {
      partnerManageApi.editFinance(params).then((res) => {
        if (res.data.code === '200') {
          let finance = {...this.state.finance};
          finance.load = finance.load + 1;
          finance.show = false;
          this.setState({
            finance
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    }
  };

  delFinanceFn = (id) => {
    partnerManageApi.delFinance(id).then((res) => {
      if (res.data.code === '200') {
        let finance = {...this.state.finance};
        finance.load = finance.load + 1;
        this.setState({
          finance
        });
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  shareholderToolBtnFn = {
    add: () => {
      let shareholder = {...this.state.shareholder};
      shareholder.id = '';
      shareholder.type = 'add';
      shareholder.show = true;
      shareholder.data = {
        partnerNo: this.state.partnerDetailInfo.partnerNo,
        partnerName: this.state.partnerDetailInfo.partnerName
      };
      this.setState({
        shareholder
      });
    }
  };

  shareholderLineBtnFn = {
    detail: (val, index, row) => {
      partnerManageApi.shareholderDetail(row.shareholderId).then((res) => {
        if (res.data.code === '200') {
          let shareholder = {...this.state.shareholder};
          shareholder.detailData = res.data.data;
          shareholder.detailShow = true;
          this.setState({
            shareholder
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    edit: (val, index, row) => {
      partnerManageApi.shareholderDetail(row.shareholderId).then((res) => {
        if (res.data.code === '200') {
          let shareholder = {...this.state.shareholder};
          shareholder.id = row.financeId;
          shareholder.type = 'edit';
          shareholder.show = true;
          shareholder.data = res.data.data;
          this.setState({
            shareholder
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    del: (value, index, record) => {
      Dialog.show({title: '删除合作机构', content: '确认删除该股东吗？', onOk: () => this.delShareholderFn(record.shareholderId)});
    }
  };

  shareholderBack = (flag) => {
    let shareholder = {...this.state.shareholder};
    if (flag) {
      shareholder.show = false;
    } else {
      shareholder.detailShow = false;
    }
    this.setState({
      shareholder
    })
  };

  shareholderSave = (params) => {
    if (this.state.shareholder.type === 'add') {
      partnerManageApi.addShareholder(params).then((res) => {
        if (res.data.code === '200') {
          let shareholder = {...this.state.shareholder};
          shareholder.load = shareholder.load + 1;
          shareholder.show = false;
          this.setState({
            shareholder
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    } else {
      partnerManageApi.editShareholder(params).then((res) => {
        if (res.data.code === '200') {
          let shareholder = {...this.state.shareholder};
          shareholder.load = shareholder.load + 1;
          shareholder.show = false;
          this.setState({
            shareholder
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    }
  };

  delShareholderFn = (id) => {
    partnerManageApi.delShareholder(id).then((res) => {
      if (res.data.code === '200') {
        let shareholder = {...this.state.shareholder};
        shareholder.load = shareholder.load + 1;
        this.setState({
          shareholder
        });
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  contactsToolBtnFn = {
    add: () => {
      let contacts = {...this.state.contacts};
      contacts.id = '';
      contacts.type = 'add';
      contacts.show = true;
      contacts.data = {
        partnerNo: this.state.partnerDetailInfo.partnerNo,
        partnerName: this.state.partnerDetailInfo.partnerName
      };
      this.setState({
        contacts
      });
    }
  };

  contactsLineBtnFn = {
    detail: (val, index, row) => {
      partnerManageApi.contactDetail(row.contactId).then((res) => {
        if (res.data.code === '200') {
          let contacts = {...this.state.contacts};
          contacts.detailData = res.data.data;
          contacts.detailShow = true;
          this.setState({
            contacts
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    edit: (val, index, row) => {
      partnerManageApi.contactDetail(row.contactId).then((res) => {
        if (res.data.code === '200') {
          let contacts = {...this.state.contacts};
          contacts.id = row.financeId;
          contacts.type = 'edit';
          contacts.show = true;
          contacts.data = res.data.data;
          this.setState({
            contacts
          });
        } else {
          Message.error(res.data.message);
        }
      })
    },
    del: (value, index, record) => {
      Dialog.show({title: '删除合作机构', content: '确认删除该联系人吗？', onOk: () => this.delContactsFn(record.contactId)});
    }
  };

  contactsBack = (flag) => {
    let contacts = {...this.state.contacts};
    if (flag) {
      contacts.show = false;
    } else {
      contacts.detailShow = false;
    }
    this.setState({
      contacts
    })
  };

  contactsSave = (params) => {
    if (this.state.contacts.type === 'add') {
      partnerManageApi.addContact(params).then((res) => {
        if (res.data.code === '200') {
          let contacts = {...this.state.contacts};
          contacts.load = contacts.load + 1;
          contacts.show = false;
          this.setState({
            contacts
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    } else {
      partnerManageApi.editContact(params).then((res) => {
        if (res.data.code === '200') {
          let contacts = {...this.state.contacts};
          contacts.load = contacts.load + 1;
          contacts.show = false;
          this.setState({
            contacts
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    }
  };

  delContactsFn = (id) => {
    partnerManageApi.delContact(id).then((res) => {
      if (res.data.code === '200') {
        let contacts = {...this.state.contacts};
        contacts.load = contacts.load + 1;
        this.setState({
          contacts
        });
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  rankLineBtnFn = {
    detail: (val, index, row) => {
      partnerManageApi.queryRankDetail(row.ratingId).then((res) => {
        if (res.data.code === '200') {
          let rank = {...this.state.rank};
          rank.detailData = res.data.data;
          rank.detailShow = true;
          this.setState({
            rank
          });
        } else {
          Message.error(res.data.message);
        }
      })
    }
  };

  rankBack = () => {
    let rank = {...this.state.rank};
    rank.detailShow = false;
    this.setState({
      rank
    })
  };

  goBack = () => {
    this.props.history.push({
      pathname: '/baseinfo/partners'
    });
  };

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.loadDetail();
    }
  }

  loadDetail = () => {
    partnerManageApi.partnerDetail(this.props.location.state.name).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          partnerDetailInfo: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
    partnerManageApi.interfaceDetail(this.props.location.state.name).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          interfaceInfo: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    }

    return (
      <div>
        <IceContainer>
          <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3
              style={{marginTop: '-4px'}}>{this.props.location && this.props.location.state && this.props.location.state.type ? '修改合作机构' : '合作机构详情'}</h3>
            <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
          </div>
          <div className="fusion-demo">
            <Tab>
              <Tab.Item title="机构信息" key="detail">
                {this.props.location && this.props.location.state && this.props.location.state.type ?
                  <PartnerAddManage name={this.props.location.state.name} type={this.props.location.state.type}/> :
                  <DetailForm col={partnerDetailCol} data={this.state.partnerDetailInfo} hideBack={true}/>
                }
              </Tab.Item>
              <Tab.Item title="资质信息" key="intelligence">
                <div>
                  <div className="CustomerTabTitle"
                       style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                    <h3 style={{marginTop: '-4px'}}>资质信息</h3>
                  </div>
                  {this.props.location && this.props.location.state && this.props.location.state.type ?
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.qualification.load}}
                               col={this.state.qualification.editTable}
                               toolBtn={this.state.edit.toolBtn}
                               toolBtnFn={this.qualificationToolBtnFn}
                               lineBtn={this.state.edit.lineBtn}
                               lineBtnFn={this.qualificationLineBtnFn}
                               page={false}
                               api={partnerManageApi.queryCertificateList}/> :
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.qualification.load}}
                               col={this.state.qualification.table}
                               page={false}
                               lineBtnFn={this.qualificationLineBtnFn}
                               api={partnerManageApi.queryCertificateList}/>
                  }
                </div>
                <CertificateDetailWin id={this.state.qualification.id} data={this.state.qualification.detailData}
                                      show={this.state.qualification.detailShow}
                                      backFn={() => this.qualificationBack()}/>
                {
                  this.props.location && this.props.location.state && (this.props.location.state.type === 'edit') ?
                    <CertificateWin title={this.state.qualification.type === 'add' ? '新增资质信息' : '修改资质信息'}
                                    show={this.state.qualification.show}
                                    data={this.state.qualification.data}
                                    save={(params) => this.qualificationSave(params)}
                                    close={() => this.qualificationBack(true)}/> :
                    null
                }
              </Tab.Item>
              <Tab.Item title="财务信息" key="finance">
                <div>
                  <div className="CustomerTabTitle"
                       style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                    <h3 style={{marginTop: '-4px'}}>财务信息</h3>
                  </div>
                  {this.props.location && this.props.location.state && this.props.location.state.type ?
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.finance.load}}
                               col={this.state.finance.editTable}
                               toolBtn={this.state.edit.toolBtn}
                               toolBtnFn={this.financeToolBtnFn}
                               lineBtn={this.state.edit.lineBtn}
                               lineBtnFn={this.financeLineBtnFn}
                               page={false}
                               api={partnerManageApi.queryFinanceList}/> :
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.finance.load}}
                               col={this.state.finance.table}
                               page={false}
                               lineBtnFn={this.financeLineBtnFn}
                               api={partnerManageApi.queryFinanceList}/>
                  }
                </div>
                <FinanceDetailWin id={this.state.finance.id} data={this.state.finance.detailData}
                                  show={this.state.finance.detailShow}
                                  backFn={() => this.financeBack()}/>
                {
                  this.props.location && this.props.location.state && (this.props.location.state.type === 'edit') ?
                    <FinanceWin title={this.state.finance.type === 'add' ? '新增财务信息' : '修改财务信息'}
                                show={this.state.finance.show}
                                data={this.state.finance.data}
                                save={(params) => this.financeSave(params)}
                                close={() => this.financeBack(true)}/> :
                    null
                }
              </Tab.Item>
              < Tab.Item title="股东信息" key="shareholder">
                <div>
                  <div className="CustomerTabTitle"
                       style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                    <h3 style={{marginTop: '-4px'}}>股东信息</h3>
                  </div>
                  {this.props.location && this.props.location.state && this.props.location.state.type ?
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.shareholder.load}}
                               col={this.state.shareholder.editTable}
                               toolBtn={this.state.edit.toolBtn}
                               toolBtnFn={this.shareholderToolBtnFn}
                               lineBtn={this.state.edit.lineBtn}
                               lineBtnFn={this.shareholderLineBtnFn}
                               page={false}
                               api={partnerManageApi.queryShareholderList}/> :
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.shareholder.load}}
                               col={this.state.shareholder.table}
                               page={false}
                               lineBtnFn={this.shareholderLineBtnFn}
                               api={partnerManageApi.queryShareholderList}/>
                  }
                </div>
                <ShareholderDetailWin id={this.state.shareholder.id} data={this.state.shareholder.detailData}
                                      show={this.state.shareholder.detailShow}
                                      backFn={() => this.shareholderBack()}/>
                {
                  this.props.location && this.props.location.state && (this.props.location.state.type === 'edit') ?
                    <ShareholderWin title={this.state.shareholder.type === 'add' ? '新增股东信息' : '修改股东信息'}
                                    show={this.state.shareholder.show}
                                    data={this.state.shareholder.data}
                                    save={(params) => this.shareholderSave(params)}
                                    close={() => this.shareholderBack(true)}/> :
                    null
                }
              </Tab.Item>
              <Tab.Item title="联系人信息" key="link">
                <div>
                  <div className="CustomerTabTitle"
                       style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                    <h3 style={{marginTop: '-4px'}}>联系人信息</h3>
                  </div>
                  {this.props.location && this.props.location.state && this.props.location.state.type ?
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.contacts.load}}
                               col={this.state.contacts.editTable}
                               toolBtn={this.state.edit.toolBtn}
                               toolBtnFn={this.contactsToolBtnFn}
                               lineBtn={this.state.edit.lineBtn}
                               lineBtnFn={this.contactsLineBtnFn}
                               page={false}
                               api={partnerManageApi.queryContactList}/> :
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.contacts.load}}
                               col={this.state.contacts.table}
                               page={false}
                               lineBtnFn={this.contactsLineBtnFn}
                               api={partnerManageApi.queryContactList}/>
                  }
                </div>
                <ContactDetailWin id={this.state.contacts.id} data={this.state.contacts.detailData}
                                  show={this.state.contacts.detailShow}
                                  backFn={() => this.contactsBack()}/>
                {
                  this.props.location && this.props.location.state && (this.props.location.state.type === 'edit') ?
                    <ContactWin title={this.state.contacts.type === 'add' ? '新增联系人信息' : '修改联系人信息'}
                                show={this.state.contacts.show}
                                data={this.state.contacts.data}
                                save={(params) => this.contactsSave(params)}
                                close={() => this.contactsBack(true)}/> :
                    null
                }
              </Tab.Item>
              <Tab.Item title="接口配置" key="interface">
                {this.props.location && this.props.location.state && this.props.location.state.type ?
                  <InterfaceSetting name={this.props.location.state.name} type={this.props.location.state.type}/> :
                  <DetailForm col={InterfaceInfoCol} data={this.state.interfaceInfo} hideBack={true}/>
                }
              </Tab.Item>
              {this.props.location && this.props.location.state && !this.props.location.state.type ?
                <Tab.Item title="评级信息" key="rank">
                  <div>
                    <div className="CustomerTabTitle"
                         style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                      <h3 style={{marginTop: '-4px'}}>评级信息</h3>
                    </div>
                    {/* todo 评级信息 */}
                    <DataTable param={{partnerNo: this.props.location.state.name, load: this.state.rank.load}}
                               col={this.state.rank.table}
                               page={false}
                               lineBtnFn={this.rankLineBtnFn}
                               api={partnerManageApi.queryRankList}/>
                  </div>
                  <RankDetailWin id={this.state.rank.id} data={this.state.rank.detailData}
                                 show={this.state.rank.detailShow}
                                 backFn={() => this.rankBack()}/>
                </Tab.Item> :
                null
              }
            </Tab>
          </div>
        </IceContainer>
      </div>
    );
  }
}
