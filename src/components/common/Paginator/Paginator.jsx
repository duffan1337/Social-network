import React, { useState } from 'react'
import styles from'./Paginator.module.css' 
import cn from "classnames"




let Paginator=(props)=>{

    let pagesCount=Math.ceil(props.totalUsersCount/props.pageSize)
    let pages = []
    
    debugger;
    // for (let i=Math.max(props.currentPage - 5, 1); i <= Math.max(1, Math.min(props.currentPage + 5, pagesCount)); i++) 
    //     {
    //         pages.push(i);
    //     }
    for (let i=1; i<=pagesCount; i++) 
    {
        pages.push(i);
    }
    let portionSize = 10
    let portionCount=Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNUmber = (portionNumber-1)*portionSize+1
    let rightPortionPageNUmber = portionNumber*portionSize

debugger    
    return(
        <div className={styles.paginator}>
            {portionNumber>1 &&
            <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Prev</button>}
            {pages
            .filter(p=>p>=leftPortionPageNUmber && p<=rightPortionPageNUmber)
            .map((p)=>{
                return <span className ={cn({
                    [styles.selectPage]: props.currentPage===p
                }, styles.pageNumber)}
                key={p}
                onClick={(e)=>{
                    props.onPageChanged(p)
                }}>{p}</span>
            })}
            {portionCount>portionNumber &&
            <button onClick={()=>{setPortionNumber(portionNumber+1)}}>Next</button>
            }
        </div>
    )   
} 

export default Paginator