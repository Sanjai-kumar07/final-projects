import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div>
        <div className='app-download' id='app-download'>
            <p>For Better Experince Download <br/> Testo App</p>
            <div className='app-download-platforms'>
                <img src={assets.play_store} alt='pic1'/>
                <img src={assets.app_store} alt='pic1'/>
            </div>
        </div>
    </div>
  )
}

export default AppDownload