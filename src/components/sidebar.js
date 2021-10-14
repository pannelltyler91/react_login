import { Component } from "react";
import {NavLink} from 'react-router-dom';
import '../App.css'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './sidebarData'
import '../sideBar.css'
import {IconContext} from 'react-icons';

class Sidebar extends Component {
  constructor(){
    super()
    this.state={
      sidebar:false
    }
  }
  _renderSideBar = () =>this.setState({sidebar:!this.state.sidebar})
  render() {
    return (
      <IconContext.Provider value={{color:'#f5f5f5'}}>
      <div className='sidebar'>
          <NavLink to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={this._renderSideBar}/>
          </NavLink>
          <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle'>
                <NavLink to='#' className='menu-bar'>
                  <AiIcons.AiOutlineClose id='closeIcon'onClick={this._renderSideBar}/>
                </NavLink>
              </li>
              {SidebarData.map((item,index) =>{
                return(
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
      </div>
      </IconContext.Provider>
    );
  }
}

export default Sidebar;
