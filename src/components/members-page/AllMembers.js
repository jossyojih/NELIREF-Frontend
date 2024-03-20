import React, { useEffect, useState } from 'react';
import SkeletonArticle from '../../components/skeletons/SkeletonArticle';
import MemberCard from './MemberCard';
import { useSelector } from 'react-redux';

const AllMembers = ({ members }) => {
  const { user } = useSelector((store) => store.user);
  const [userData, setUserData] = useState([]);
  const [otherMembers, setOtherMembers] = useState([]);

  useEffect(() => {
    const updateMembersData = () => {
      const updatedMembers = members?.data?.members && [...members?.data?.members];
      const indexToRemove = updatedMembers?.findIndex(obj => obj?._id === user?._id);

      if (indexToRemove !== -1) {
        const removedUser = updatedMembers?.splice(indexToRemove, 1)[0];
        setUserData([removedUser]);
        setOtherMembers(updatedMembers);
      } else {
        setUserData([]);
        setOtherMembers(members?.data?.members || []);
      }
    };

    updateMembersData();
  }, [members?.data?.members, user?._id]);

  return (
    <article className='all-groups'>
      {members.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <>
          {userData?.length > 0 && userData.map((user) => (
            <MemberCard key={user?._id} member={user} isMe={true} />
          ))}

          {otherMembers?.length > 0 && otherMembers.map((member) => (
            <MemberCard key={member?._id} member={member} />
          ))}
        </>
      )}
    </article>
  );
};

export default AllMembers;
