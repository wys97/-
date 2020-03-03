module.exports = {
    'GET /api/profile': {
        name: '淘小宝',
        department: '技术部',
        avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
        userid: 10001,
    },

    'POST /api/login': (req, res) => {
        const { password, username } = req.body;
        if (username === 'admin' && password === 'admin') {
            res.send({
                status: 200,
                statusText: 'ok',
                currentAuthority: 'admin',
            });
        } else if (username === 'user' && password === 'user') {
            res.send({
                status: 200,
                statusText: 'ok',
                currentAuthority: 'user',
            });
        } else {
            res.send({
                status: 401,
                statusText: 'unauthorized',
                currentAuthority: 'guest',
            });
        }
    },

    'POST /api/register': (req, res) => {
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'user',
        });
    },

    'POST /api/logout': (req, res) => {
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
        });
    },

    'POST /api/queryPartner': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                name: `京东数字科技控股有限公司`,
                type: '消费金融公司',
                date: '2019-01-01',
                totalAssets: i + 1,
                totalLiabilities: `${i}`,
                status: i % 2 === 0 ? '02' : '01',
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/intelligenceUpdate': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                partnerName: `京东数字科技控股有限公司`,
                intelligenceName: `旅行社业务经营许可证`,
                rank: `一级`,
                licence: `国家旅游局`
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/financeUpdate': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                partnerName: `京东数字科技控股有限公司`,
                totalCapital: `7,000,000.00`,
                totalDebt: `7,000,000.00`,
                flowCapital: `7,000,000.00`,
                flowDebt: `7,000,000.00`,
                legal: `7,000,000.00`,
                endDate: `2019-09-09`
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/shareholderUpdate': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                partnerName: `京东数字科技控股有限公司`,
                name: `刘强东`,
                type: `自然人`,
                scale: `50`,
                sign: `是`,
                date: `2019-09-09`
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/linkUpdate': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                partnerName: `京东数字科技控股有限公司`,
                name: `刘强东`,
                type: `法定代表人`,
                telephone: `18893666666`
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/loansManage': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                partnerName: `京东数字科技控股有限公司`,
                itemName: `消费金融公司`,
                scale: '300',
                startDate: '2019-01-01',
                finishDate: '2019-12-12',
                status: i % 2 === 0 ? '02' : '01',
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },

    'POST /api/productManage': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `012345678${i}`,
                partnerName: `京东数字科技控股有限公司`,
                productName: `消费金融公司`,
                type: `现金类`,
                status: i % 2 === 0 ? '02' : '01',
            });
        }
        res.send({
            status: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/customerManage': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: i + 1,
                name: `李晓红${i + 1}`,
                type: `身份证`,
                idNumber: `400*************0000`,
                phone: `1876666123${i}`,
                partner: `京东数字科技控股有限公司`,
                score: `333`,
            });
        }
        res.send({
            result: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/customerAccount': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: `1876666123${i}`,
                accountName: `李晓红${i + 1}`,
                type: `个人借记卡账户`,
                bankName: `中国建设银行股份有限公司`,
                status: `正常`,
            });
        }
        res.send({
            result: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },

    'POST /api/roleMaintain': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: i + 1,
                name: `运营人员${i + 1}`,
                description: '基础信息的录入与维护',
                createDate: '2018-10-10 09:33:39'
            });
        }
        res.send({
            result: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },


    'POST /api/userMaintain': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: i + 1,
                username: `zhangxiaoming`,
                name: `张晓明`,
                list: `运营人员`,
                status: i % 2 === 0 ? '02' : '01',
                createDate: '2018-10-10 09:33:39'
            });
        }
        res.send({
            result: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    },

    'POST /api/product': (req, res) => {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                id: i + 1,
                partnername: `京东数字科技控股有限公司`,
                productname: `京东金条`,
                type: `现金类`,
                status: `启动`
            });
        }
        res.send({
            result: 200,
            statusText: 'ok',
            currentAuthority: 'guest',
            result: result,
            total: 10
        })
    }
};
