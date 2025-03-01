import React from 'react'
import './ExploreMenu.css'
import { assets, menu_list } from '../../../src/assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div>
            <div className='explore-menu' id='explore-menu'>
                
                <h1>Explore our menu</h1>
                <p className='explore-menu-text'>choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culniary
                    expertise. Our mission is to statisfy your carvings and elevate your dining experence meal at a time </p>
                <div className='explore-menu-list'>
                    {menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='pic1' />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu