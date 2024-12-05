import React from 'react'
import SkeletonElement from './SkeletonElement';
// import Shimmer from  '../Shimmer';
const SkeletonArticle = ({theme}) => {
    return (
        <div className={`skeleton-wrapper ${theme?theme:'light'}`}>
            <div className="skeleton-article">
             <SkeletonElement type="thumbnail"/>
             <SkeletonElement type="title"/>
             <SkeletonElement type="text"/>
             <SkeletonElement type="text"/>
            </div>
            <div className="shimmer-wrapper">
            <div className="shimmer">
                
            </div>
        </div>
        </div>
    )
}

export default SkeletonArticle