# vue2-element-koa-admin

## 项目简介

1. 项目名称：vue2-element-koa-admin
2. 项目类型：企业后台管理系统
3. 使用技术：vue2.0 + element-ui + node + koa
4. 基于 d2 开源框架进行二次开发的项目

## 功能点一览

### 业务模块

#### 一、个人中心

1. 个人中心

#### 二、产品中心

1. 产品管理
2. 品牌管理
3. 应用管理
4. 分类管理
5. 行业管理

#### 三、组织权限

##### 1、员工管理

1. 列表字段
   - 姓名：name
   - 手机号：mobile
   - 密码：password
   - 邮箱：email
   - 头像：icon
     <!-- - 性别：gender -->
     <!-- - 组织： -->
     <!-- - 权限角色： -->
     <!-- - 职能角色： -->
2. 搜索字段

##### 2、公司管理

##### 3、组织管理

##### 4、角色管理

##### 5、菜单权限

#### 四、基础数据

1. 地区管理
2. 计量单位

### 组件库模块

1. 客服工具
2. 代办组件
3. 备注(评论)组件
4. 发送邮件弹窗组件
5. tinymce 富文本插件
6. openlayers 地图插件

## 数据库设计

### 1、owl 组织权限

1. 用户列表：user_list
   - 姓名：name
   - 手机号：mobile
   - 密码：password
   - 邮箱：email
     <!-- - 头像：icon -->
     <!-- - 性别：gender -->
     <!-- - 组织： -->
     <!-- - 权限角色： -->
     <!-- - 职能角色： -->
2. 搜索字段
3. 公司列表：com_list
4. 组织列表：org_list
5. 角色列表：role_list
6. 菜单列表：menu_list

### 2、product 产品中心

### 3、basedata 基础数据

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
