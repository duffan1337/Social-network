import React from 'react'
import { connect } from 'react-redux'
import{ follow,  unfollow,setCurrentPage, toggleFollowingProgress,requestUsers,usersChanged } from '../../redux/users-reducer '
import * as axios from 'axios'
import Users from './User'
import Preloader from '../common/Preloader/Preloader'
import {usersAPI} from '../../api/api'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers,getUsersSuperSelector } from '../../redux/users-selectors'

class UsersContainer extends React.Component {
    componentDidMount(){
    //         this.props.toggleIsFetching(true);
    // usersAPI.getUsers(this.props.currentPage,this.props.pageSize).then(data=>{
    //         this.props.toggleIsFetching(false);
    //         this.props.setUsers(data.items)
    //             this.props.setTotalUsersCount(data.totalCount)
    //     })
    this.props.requestUsers(this.props.currentPage,this.props.pageSize)
    }
    onPageChanged= (pageNumber)=>{
    //     this.props.setCurrentPage(pageNumber)
    //     this.props.toggleIsFetching(true);
    // usersAPI.getUsers(pageNumber,this.props.pageSize).then(data=>{
    //         this.props.toggleIsFetching(false);    
    //     this.props.setUsers(data.items )
 
    //     })
    this.props.usersChanged(pageNumber,this.props.pageSize)
    }


    render() {
        return<>
        {this.props.isFetching ? <Preloader/> : null}
         <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        followingInProgress={this.props.followingInProgress} /> 
        </>
    }
}
 


// let mapStateToProps=(state)=>{
//     return{
//         users:state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }


let mapStateToProps=(state)=>{
    return{
      
        users:getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount:getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


let WithRedirect=withAuthRedirect(UsersContainer)

// let mapDispatchToProps=(dispatch )=>{
//     return{
//         follow:(userID)=>{
//             dispatch(followAC(userID))
//         },
//         unfollow:(userID)=>{
//             dispatch(unfollowAC(userID))
//         },
//         setUsers:(users)=>{
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage:(pageNumber)=>{
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount:(totalCount)=>{
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching:(isFetching)=>
//         {dispatch(toggleIsFetchingAC(isFetching))}
        
//     }
// }

// export default withAuthRedirect(connect(mapStateToProps,{      
// follow,
// unfollow,
// setUsers,
// setCurrentPage,
// setTotalUsersCount, 
// toggleIsFetching,
// toggleFollowingProgress,
// getUsers,
// usersChanged
// })(UsersContainer))

export default compose(

    connect(mapStateToProps,{      
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        requestUsers,
        usersChanged
        })
)(UsersContainer)