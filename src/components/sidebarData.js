import {Component} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as GrIcons from 'react-icons/gr'
import * as BiIcons from 'react-icons/bi'


export const SidebarData = [

{
    title:'View Clients',
    path:'/client/list',
    icon:<BiIcons.BiShow/>,
    cName:'nav-text'
},
{
    title:'View Employees',
    path:'/employee/list',
    icon:<BiIcons.BiShow/>,
    cName:'nav-text'
},
{
    title:'View Admins',
    path:'/admin/list',
    icon:<BiIcons.BiShow/>,
    cName:'nav-text'
},
{
    title:'Add Client',
    path:'/client/add',
    icon:<BiIcons.BiAddToQueue/>,
    cName:'nav-text'
},
{
    title:'Add Employee',
    path:'/employee/register',
    icon:<BiIcons.BiAddToQueue/>,
    cName:'nav-text'
},
{
    title:'Add Admin',
    path:'/admin/register',
    icon:<BiIcons.BiAddToQueue/>,
    cName:'nav-text'
},
{
    title:'Logout',
    path:'/admin/logout',
    icon:<BiIcons.BiLogOut/>,
    cName:'nav-text'
},
]