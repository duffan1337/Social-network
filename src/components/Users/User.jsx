import React from 'react'
import styles from'./users.module.css' 
import userPhoto from '../../assets/images/51f6fb256629fc755b8870c801092942.png'
import { NavLink } from 'react-router-dom'
import * as axios from 'axios'
import { profileAPI, usersAPI } from '../../api/api'
import Paginator from '../common/Paginator/Paginator'
 



let Users = (props)=>{

let pagesCount=Math.ceil(props.totalUsersCount/props.pageSize)
let pages = []
// for(let i=1;i<=pagesCount;i++)
// {
//     pages.push(i);
// }
debugger;
for (let i=Math.max(props.currentPage - 5, 1); i <= Math.max(1, Math.min(props.currentPage + 5, pagesCount)); i++) 
{
    pages.push(i);
}
    return ( 
        <div>
        <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
           { 
             props.users.map(u => <div key={u.id}>
           <span>
               <div>
                   <NavLink to={'/profile/'+ u.id}>
                      <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
               </div>
               <div>
                   { u.followed ? <button disabled={props.followingInProgress.some(id=>id==u.id)} onClick={()=>{  
                    //    props.toggleFollowingProgress(true, u.id);
                    //    usersAPI.unfollow(u.id).then(data=>{
                    //         if(data.resultCode==0)
                    //         {
                    //             props.unfollowSuccess(u.id);
                
                    //         }
                    //         props.toggleFollowingProgress(false,u.id);
                    //     })
                    props.unfollow(u.id)
            
                
                     }}>Unfollow</button>: <button disabled={props.followingInProgress.some(id=>id==u.id)} onClick={()=>{  
                         props.follow(u.id)
                        // props.toggleFollowingProgress(true, u.id);
                        // usersAPI.follow(u.id).then(data=>{
                        //     if(data.resultCode==0)
                        //     {
                        //         props.followSucess(u.id);
                        //     }
                        //     props.toggleFollowingProgress(false, u.id);
            
                        // })

                          
                          }}>Follow</button>}
               </div>
           </span>

           <span>
               <span>
                   <div>{u.name}</div>
                   <div>{u.status}</div>
               </span>
               <span>
                   <div>{"u.location.country"}</div>
                   <div>{"u.location.city"}</div>
               </span>
           </span>
           </div>)
       }
       </div>
       )
}

export default Users