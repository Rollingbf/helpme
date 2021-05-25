# cocassistivetools

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
项目构思
    1 功能视角
        1.1 kp视角
            1.1.1 限定kp群体
                    1）kp应是有足够主持经验者，这是使一个剧本良性运作的基础，也是促成剧本经历者再次体验剧本的前提。
                    2）kp将获知一个剧本的所有信息
            1.1.2 kp的注册与登陆
                    1）kp的注册目前由于能力有限，暂时只能由本人亲自录入数据库
                    2）kp的帐号与密码唯一对应，密码修改目前只能由本人亲自修改
                    3）kp登陆
                        [1] kp登陆后，可浏览**当前推荐的诸剧本**，也可通过**搜索栏精确搜索某剧本**；浏览剧本可以获知**剧本梗概内容**，同时能够**启用剧本**
                        [2] 启用剧本将**跳转至新建剧本信息分发页面（弱化版聊天室）**，启用页面将**获得邀请码**，同时需要**设置kp_id（不设置默认为kp）**
                        [3] 本条为[2]的注释：kp跳转的页面与pl使用邀请码进入的页面并不相同
            1.1.3 kp的信息发布与接收
                    1）kp分发信息
                        [1] kp页面**显示当前连接者id**，**公开信息推送给所有人**，**私密信息推送给指定id**
                        [2] kp分发的消息会**同步显示在自己的页面上**方便查看，*考虑 是否做消息精选（可选显示页面中呈现的消息）*
                    2）kp接收消息
                        [1] kp可接收到**pl接入房间的反馈信息**
                        [2] kp可接收**pl选择公布的私人信息**（此信息虽由kp发布，但出于主持工作（部分剧本规则下），应知晓每条私人信息是否如规则运作）
                        [3] 为界面美观，kp发布信息时的【同步呈现内容】应与接收到pl【公布的私人信息的反馈内容】**不处于同一展示框中**
        1.2 pl视角
            1.1.1 pl招募
                    1）pl应主动扮演剧本角色，这是有效扩展剧本丰富度的主观要求
                    2）pl在剧本中获取有限的信息，信息的不对称是游戏的趣味之一，因此主持过某一剧本的kp应尽量不作为pl参与该剧本
            1.1.2 pl的注册与登录
                    1）出于对玩家群体的足够信任，同时为了进一步发扬不对称信息下的对抗效果，并不阻止玩家反复体验某一剧本
                    2）pl没有自主的注册通道，只有通过kp的招募（初审交由kp）才能参与剧本
                    3）pl**通过邀请码**进入新生成游戏房间，同时在进入前需要提交游戏内id（为剧本游玩顺畅，尽量使用游戏人物id）【3/2问喵喵】
            1.1.3 pl的信息接收与发布
                    1）pl接收来自kp发布的公开信息与私人信息
                    2）pl接收来自其他pl公开的私人信息
                    3）pl可公开自己的私人信息
    2 前端设计
        基于上述kp视角与pl视角的功能描述，作出如下前端设计
        2.1 登陆界面设计
            1.1.1 kp登陆
                kp使用帐号密码登陆
            1.1.2 pl登陆
                pl使用邀请码登陆
        2.2 剧本浏览界面设计
            1.2.1 顶部搜索栏
                顶部搜索栏仅支持精确搜索（搜索结果排列按照条目首字母排序，同字母按照入库时间排序）
            1.2.2 剧本列表排序控制栏
                支持【热门度排序】【发布时间排序】【首字母排序】
            1.2.3 剧本浏览框
                默认按照热门度排序，可点击剧本查看简略信息
                1.2.3.1 简略信息
                    包括剧本梗概，人物简略说明，可打开【详细剧本】，可【启用剧本】
                    【详细剧本】的文本在点击事件触发时调入，弱不存在数据库中则返回“剧本暂不可用”
                    【详细剧本】为简略信息组件下一动态组件
        2.3 剧本房间（kp）设计（剧本信息虽房间的创建进入kp剧本房间的vuex仓库内）
            2.3.1 
    3 vuex使用方式构想
        数据流向应是如下方式
        kp创建房间-数据库导出剧本数据至kp的vuex（模板定式，公共信息进入公共信息池，私人信息进入私人信息池）-kp发布信息-pl端收到信息保存至vuex（临时缓存类型）-pl发布信息-其他pl保存信息、kp保存信息
    4 服务端设计构想
        主要依靠**客户端监听服务端发出的信息更新事件**，实现客户端vuex内数据仓库的更新（使用前端设计中的关于vuex的经历（是否导入vuex中的数据就会在Vue体系下定时刷新页面或者在vuex仓库发生数据变动的时候触发前端页面呈现内容的变更（待答疑）））
    5 数据库设计
        5.1 剧本存放设计（主要内容）
            5.1.1 为便于调入vuex，应将**剧本数据分为三部分**
                1）剧本详细信息：用于调入剧本浏览界面
                2）剧本公开信息：在kp界面中**写死**一个固定的剧本程序与数据库中公开信息的内容匹配