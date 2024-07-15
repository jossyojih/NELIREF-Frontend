import React, { useState } from 'react';
import profileImg from '../../assets/images/profile.png';
import { TbUserPlus } from 'react-icons/tb';
import { CiMenuKebab } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import ApproveMemberModal from '../Modals/ApproveMemberModal';
import userServices from '../../services/api/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify';

const GroupMembers = ({ members, id }) => {
  const [approvalModalOpen, setApprovalModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const queryClient = useQueryClient()
  const { user } = useSelector((store) => store.user);

  // Put pending members on top
  const otherMembers = members
    .filter((item) => item.user?._id !== user?._id)
    .sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0;
    });
  const currentUser = members.find((item) => item?.user?._id === user?._id);


  const openApproveModal = () => {

    setApprovalModalOpen(true)
  }

  const closeApproveModal = () => {
    if (approvalModalOpen && !selectedUser) {
      setApprovalModalOpen(false)
    }
  }

  const mutation = useMutation({
    mutationFn: (data) => userServices.AcceptGroupJoinGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['get-groups'])
      setSelectedUser(null)
      toast.success('Request action successful!');
      setApprovalModalOpen(false)

    },
    onError: (error) => {
      console.error('Like error:', error)
      toast.error('Error processing request')
    },
  })

  const handleAction = (action) => {
    if (!window.confirm(`Are you sure you want to ${action} this user's request?`)) return;

    mutation.mutate({
      action,
      user: selectedUser
    })
  }

  return (
    <div className="post" onClick={closeApproveModal}>
      {currentUser && (
        <div className="list-wrapper">
          <div className="list-card">
            <div className="img-wrapper">
              <img
                className={`${currentUser?.user?.photo && "group-members-photo"}`}
                src={currentUser?.user?.photo || profileImg}
                alt=""
              />
            </div>
            <h2 className="head">{currentUser?.user?.full_name}</h2>
            <p className="role">{currentUser?.isAdmin ? "Admin" : "Member"}</p>
          </div>
          <div className="icons">
            {/* <TbUserPlus /> */}
            <CiMenuKebab />
          </div>
        </div>
      )}
      {otherMembers.map((item, index) => {

        if (item.status === 'pending' && !currentUser?.isAdmin) {
          return (
            <div key={index} className="list-wrapper">
              <div className="list-card">
                <div className="img-wrapper">
                  <img src={item?.user?.photo || profileImg} alt="" />
                </div>
                <h2 className="head">{item?.user?.full_name}</h2>
              </div>
              <div className="icons">
                <TbUserPlus onClick={() => {
                  setSelectedUser(item?.user?._id)
                  openApproveModal()
                }} />
                <CiMenuKebab />
              </div>
            </div>
          );
        } else if (item?.status === 'approved') {
          return (
            <div key={index} className="list-wrapper">
              <div className="list-card">
                <div className="img-wrapper">
                  <img src={item?.user?.photo || profileImg} alt="" />
                </div>
                <h2 className="head">{item?.user?.full_name}</h2>
                <p className="role">{item?.isAdmin ? 'Admin' : 'Member'}</p>
              </div>
              <div className="icons">
                {/* <TbUserPlus /> */}
                <CiMenuKebab />
              </div>
            </div>
          );
        } else {
          return null; // For members with other statuses, render nothing.
        }
      })}
      {approvalModalOpen && <ApproveMemberModal
        action={handleAction}
        isLoading={mutation?.isPending} />}
    </div>
  );
};

export default GroupMembers;
