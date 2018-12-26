app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    }]);

app.value('userTemp', sessionStorage.getItem("userTemp"));

app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$httpProvider', config]);
function config($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

    // $httpProvider.defaults.headers.common = {'X-TOKEN': 'biaodaaTestToken'};
    // $httpProvider.interceptors.push('loadingInterceptor');
    $httpProvider.defaults.headers.common = { 'X-TOKEN' : sessionStorage.getItem("X-TOKEN") }
    /**
     * 定义路由
     */
    $stateProvider
        .state('Index', {
            url: '/index',
            templateUrl: window.rootSrc + 'app/index/index.tpl.html',//路由更改
            controller: 'IndexCtrl as $ctrl',
            title:'首页',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/index/controller.js'
                    ]);
                }]
            }
        })
        .state('About', {
            url: '/about/:id',
            templateUrl: window.rootSrc + 'app/about/index.tpl.html',
            title:'关于',
            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'AboutCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/about/controller.js'
                    ]);
                }]
            }
        })
        .state('Company', {
            url: '/company',
            templateUrl: window.rootSrc + 'app/company/index.tpl.html',
            title:'标大大-企信',
            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'CompanyCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/company/controller.js'
                    ]);
                }]
            }
        })

        .state('CompanyTop', {
            url: '/companyTop',
            templateUrl: window.rootSrc + 'app/company/companyTop.html',
            title:'标大大-企信',
            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'CompanyTopCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/company/companyTop.js'
                    ]);
                }]
            }
        })


        .state('home', {
            url: '/home',
            cache:false,
            templateUrl: window.rootSrc + 'app/home/bdd_home.html',
            title:'掌上修',
            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'HomeCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/home/controller.js'
                    ]);
                }]
            }
        })

        .state('CompanyDetail', {
            url: '/companydetail',
            templateUrl: window.rootSrc + 'app/companydetail/index.tpl.html',
            controller: 'CompanyDetailCtrl as ctrl',
            title:'标大大-企信',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/companydetail/controller.js'
                    ]);
                }]
            }
        })
        .state('Tender', {
            url: '/tender',
            templateUrl: window.rootSrc + 'app/tender/tender.html',
            params: {'id': null},
            title:'标大大-标讯',
            controller: 'tenderIndex as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/tender/tender.js'
                    ]);
                }]
            }
        }) .state('guzhang', {
            url: '/guzhang',
            templateUrl: window.rootSrc + 'app/tender/guzhang_history.html',
            params: {'id': null},
            title:'故障描述',
            controller: 'guzhangCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/tender/guzhang.js'
                    ]);
                }]
            }
        }).state('TenderSay', {
        url: '/tenderSay',
        templateUrl: window.rootSrc + 'app/tender/tenderSay.html',
        title:'标大大-标讯',
        controller: 'TenderSayCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('TenderDtail', {
        url: '/tenderDetail',
        templateUrl: window.rootSrc + 'app/tender/index.tpl.html',
        title:'标大大-标讯',
        controller: 'tenderDetailCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('TendList', {
        url: '/TendList',
        templateUrl: window.rootSrc + 'app/tender/tender_list.html',
        title:'标大大-标讯',
        controller: 'TendListCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('TendListDetailCtrl', {
        url: '/TendListDetail',
        templateUrl: window.rootSrc + 'app/tender/tender_list_detail.html',
        title:'标大大-标讯',
        controller: 'TendListDetailCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('WinBid', {
        url: '/win_bid',
        templateUrl: window.rootSrc + 'app/winbid/index.html',
        title:'标大大-标讯',
        controller: 'WinBidCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/winbid/controller.js'
                ]);
            }]
        }
    }).state('wintotal', {
            url: '/wintotal',
            templateUrl: window.rootSrc + 'app/winbid/total_num.html',
            title:'标大大-标讯',
            controller: 'WinTotalCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/winbid/controller.js'
                    ]);
                }]
            }
        }).state('Winbding', {
        url: '/winbding',
        templateUrl: window.rootSrc + 'app/tender/winbding.html',
        controller: 'WinbdingCtrl as ctrl',
        title:'标大大-标讯',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    })
        .state('Login', {
            url: '/login',
            templateUrl: window.rootSrc + 'app/login/bdd_login.html',
            controller: 'LoginCtrl as ctrl',
            title:'标大大-登录',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/login/controller.js'
                    ]);
                }]
            }
        })
        .state('Register', {
            url: '/register',
            templateUrl: window.rootSrc + 'app/register/bdd_register.html',
            controller: 'RegisterCtrl as ctrl',
            title:'标大大-注册',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/register/controller.js'
                    ]);
                }]
            }
        })
        .state('FactoryPage', {
            url: '/factory/:id',

            templateUrl: window.rootSrc + 'app/forget/bdd_forget.html',
            controller: 'ForgetCtrl as ctrl',
            title:'标大大-忘记密码',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/forget/controller.js'
                    ]);
                }]
            }
        }).state('LinggongPage', {
            url: '/linggong',
            templateUrl: window.rootSrc + 'app/forget/zsx_linggong.html',
            controller: 'LinggongCtrl as ctrl',
            title:'掌上修-领工',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/forget/controller.js'
                    ]);
                }]
            }
        }).state('TiaozhengPage', {
        url: '/tiaozhengPage',
        templateUrl: window.rootSrc + 'app/forget/zsx_tzpg.html',
        controller: 'TiaozhengCtrl as ctrl',
        title:'掌上修-领工',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/forget/controller.js'
                ]);
            }]
        }
    }).state('JianyanPage', {
        url: '/jianyanPage',
        templateUrl: window.rootSrc + 'app/forget/zsx_jianyan.html',
        controller: 'JianyanCtrl as ctrl',
        title:'掌上修-领工',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/forget/controller.js'
                ]);
            }]
        }
    }).state('WanGong', {
            url: '/wanGongPage',
            templateUrl: window.rootSrc + 'app/forget/zsx_wangong.html',
            controller: 'WanGongCtrl as ctrl',
            title:'掌上修-领工',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/forget/controller.js'
                    ]);
                }]
            }
        }).state('HuanRen', {
            url: '/huanrenPage',
            templateUrl: window.rootSrc + 'app/forget/zsx_huanren.html',
            controller: 'HuanRenCtrl as ctrl',
            title:'掌上修-领工',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/forget/controller.js'
                    ]);
                }]
            }
        }).state('workmore', {
            url: '/workmore',
            templateUrl: window.rootSrc + 'app/workmore/index.tpl.html',
            controller: 'WorkMoreCtrl as ctrl',
            title:'标大大-行业动态',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/workmore/controller.js'
                    ]);
                }]
            }
        }) .state('workmoreDetail', {
        url: '/workmoreDetail/:id',
        templateUrl: window.rootSrc + 'app/workmore/detail.html',
        controldler: 'WorkMoreDetailCtrl as ctrl',
        title:'标大大-行业动态',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/workmore/controller.js'
                ]);
            }]
        }
    })

        .state('carInfo', {
            url: '/carInfo',
            templateUrl: window.rootSrc + 'app/society/index.tpl.html',
            controller: 'carInfoCtrl as ctrl',
            title:'标大大-应用',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/society/controller.js'
                    ]);
                }]
            }
        }).state('czInfo', {
            url: '/czInfo',
            templateUrl: window.rootSrc + 'app/society/index_cz.html',
            controller: 'czInfoCtrl as ctrl',
            title:'标大大-应用',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/society/controller.js'
                    ]);
                }]
            }
        })

        .state('ucenter', {
            url: '/ucenter',
            templateUrl: window.rootSrc + 'app/personal/ucenter.html',
            controller: 'UcenterCtrl as ctrl',
            title:'标大大-应用',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/ucenter.js'
                    ]);
                }]
            }
        })

        .state('ucenter.feedback', {
            url: '/feedback',
            templateUrl: window.rootSrc + 'app/personal/feedback.html',
            controller: 'FeedbackCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/feedback.js'
                    ]);
                }]
            }
        })


        .state('ucenter.financial', {
            url: '/financial',
            templateUrl: window.rootSrc + 'app/personal/financial.html',
            controller: 'FinancialCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/financial.js'
                    ]);
                }]
            }
        })

        .state('ucenter.myfollow', {
            url: '/myfollow',
            templateUrl: window.rootSrc + 'app/personal/myfollow.html',
            controller: 'MyfollowCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/myfollow.js'
                    ]);
                }]
            }
        })


        .state('ucenter.personInfo', {
            url: '/personInfo',
            templateUrl: window.rootSrc + 'app/personal/personInfo.html',
            controller: 'PersonInfoCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/personInfo.js'
                    ]);
                }]
            }
        })

        .state('ucenter.messages', {
            url: '/messages',
            templateUrl: window.rootSrc + 'app/personal/messages.html',
            controller: 'MessagesCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/messages.js'
                    ]);
                }]
            }
        })

        .state('Modify', {
            url: '/modify',
            templateUrl: window.rootSrc + 'app/modify/modify.html',
            controller: 'ModifyCtrl as ctrl',
            title:'标大大-更改密码',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/modify/controller.js'
                    ]);
                }]
            }
        })

        .state('mycenter', {
            url: '/mycenter',
            templateUrl: window.rootSrc + 'app/usercenter/mycenter.html',
            controller: 'userCenterCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/usercenter/controller.js'
                    ]);
                }]
            }
        }).state('centerDetail', {
            url: '/centerDetail/:startDate/:endDate/:mType/:name',
            templateUrl: window.rootSrc + 'app/usercenter/centerDetail.html',
            controller: 'centerDetailCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/usercenter/controller.js'
                    ]);
                }]
            }
        })
        .state('msgInfoCenter', {
            url: '/msgInfoCenter',
            templateUrl: window.rootSrc + 'app/usercenter/msgInfoCenter.html',
            controller: 'msgInfoCenterCtrl as ctrl',
            title:'信息中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/usercenter/controller.js'
                    ]);
                }]
            }
        }).state('Usercenter', {
            url: '/usercenter',
            templateUrl: window.rootSrc + 'app/usercenter/center.html',
            controller: 'centerCtrl as ctrl',
            title:'信息中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/usercenter/controller.js'
                    ]);
                }]
            }
        })
        .state('person', {
            url: '/person',
            templateUrl: window.rootSrc + 'app/searchperson/use.html',
            controller: 'PersonCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/searchperson/person.js'
                    ]);
                }]
            }
        })

        .state('Joinus', {
            url: '/joinus',
            templateUrl: window.rootSrc + 'app/footer/Joinus.html',
            controller: 'FooterCtrl as ctrl',
            title:'标大大-加入我们',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/footer/controller.js'
                    ]);
                }]
            }
        })
        .state('Perp', {
            url: '/perp',
            templateUrl: window.rootSrc + 'app/footer/prep.html',
            controller: 'FooterCtrl as ctrl',
            title:'标大大-个人中心',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/footer/controller.js'
                    ]);
                }]
            }
        })
        .state('UserProtocol', {
            url: '/userProtocol',
            templateUrl: window.rootSrc + 'app/footer/user_protocol.html',
            controller: 'FooterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/footer/controller.js'
                    ]);
                }]
            }
        })
        .state('Business', {
            url: '/business',
            templateUrl: window.rootSrc + 'app/footer/business.html',
            controller: 'FooterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/footer/controller.js'
                    ]);
                }]
            }
        })
        .state('companyRes', {
            url: '/companyRes',
            templateUrl: window.rootSrc + 'app/companydetail/company.res.html',

            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'CompanyResCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/companydetail/companyRes.js'
                    ]);
                }]
            }
        }).state('baoyang', {
            url: '/baoyang',
            templateUrl: window.rootSrc + 'app/baoyang/baoyang.html',
            controller: 'baoyangCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/baoyang/baoyang.js'
                    ]);
                }]
            }
        }).state('tipCenter', {
            url: '/tipCenter',
            templateUrl: window.rootSrc + 'app/baoyang/tipCenter.html',
            controller: 'tipCenterCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/baoyang/baoyang.js'
                    ]);
                }]
            }
        }).state('btnCenter', {
        url: '/btnCenter',
        templateUrl: window.rootSrc + 'app/baoyang/btnCenter.html',
        controller: 'btnCenterCtrl as $ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/baoyang/baoyang.js'
                ]);
            }]
        }
    }).state('sinCenter', {
        url: '/sinCenter',
        templateUrl: window.rootSrc + 'app/baoyang/sinCenter.html',
        controller: 'sinCenterCtrl as $ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/baoyang/baoyang.js'
                ]);
            }]
        }
    });
    /**
     * 什么都匹配不到的时候就跳转到首页
     */
    $urlRouterProvider.otherwise('/home');
}