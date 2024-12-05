import React from 'react';
import MainArea from '../../components/MainArea';
import SideBar from '../../components/SideBar';
import LeftSide from '../../components/LeftSide';
import '../../styles/home.css';

function Home() {
    return (
        <div className='home'>
            <SideBar />
            <MainArea />
            <LeftSide />
        </div>
    );
}

export default Home;