import Home  from './../components/Home/Home'
import PackageDetail  from './../components/PackageDetail/PackageDetail'
import Router from 'tiny-react-router'

export default {
    '/'            : Home,
    '/package/:id' : PackageDetail
}
