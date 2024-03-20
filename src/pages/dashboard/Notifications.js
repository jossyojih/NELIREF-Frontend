import Wrapper from '../../assets/wrappers/Notifications';
import profile from '../../assets/images/profile.png';
import { useQuery } from '@tanstack/react-query';
import userService from '../../services/api/user';
import { AiOutlineUserAdd, AiOutlineCheckSquare } from 'react-icons/ai';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SkeletonArticle from '../../components/skeletons/SkeletonArticle';

const Notifications = () => {
  const { connections } = useSelector((store) => store.user);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [activeMember, setActiveMember] = useState(null);
  const queryClient = useQueryClient();

  const { data, isPending: loading } = useQuery({
    queryKey: ['get-notifications'],
    queryFn: userService.getNotifications,
  });

  const connectionStatus = (memberId) => {
    const receivedConnection = connections.some((item) => item.user === memberId && item.status === 'received');
    const connected = connections.some((item) => item.user === memberId && item.status === 'connected');

    return receivedConnection ? 'received' : connected ? 'connected' : false;
  };

  const openConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const handleConnectionRequest = (member, status) => {
    setActiveMember(member._id);
    setStatus(status)
    setMessage(`${status} ${member.full_name} connection request?`);
    openConfirmModal();
    setActiveMember(member._id);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => userService.handleConnectionRequest(activeMember, status),
    onSuccess: (data) => {
      toast.success(data.message);
      setActiveMember(null);
      setStatus(null)
      queryClient.invalidateQueries(['connections']);
      closeConfirmModal();
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error?.message);
    },
  });

  return (
    <Wrapper>
      <article className='tab-content'>
        <h2>Notifications</h2>
      </article>


      <article>
        <section className='tabs'>
          <div className='groups'>
            <div className={`tab-btn active`}>
              <h4>
                Notifications <span className='number'>{data?.notifications?.length}</span>
              </h4>
            </div>
          </div>
        </section>
        {
          loading
            ? [1, 2, 3].map((n) => (
              <SkeletonArticle key={n} theme='light' />
            )) :
            <section className='notifications-wrapper'>
              {data?.notifications.map((item) =>
                item?.type === 'Connection' ? (
                  <article className='notification-card' key={item._id}>
                    <div className='notification-content'>
                      <img className='profile' src={item?.info?.photo || profile} alt='' />
                      <div>
                        <p>
                          <span className='users-name'> {item?.info?.full_name}</span> Sent you a connection
                        </p>
                        <p className='date'> {moment(item.createdAt).fromNow()}</p>
                      </div>
                    </div>
                    <div className='btns'>
                      {connectionStatus(item.info._id) === 'connected' ? (
                        <button className='connected'>
                          <AiOutlineCheckSquare className='icon' /> Connected
                        </button>
                      ) : connectionStatus(item.info._id) === 'received' ? (
                        <>
                          <button className='connect' onClick={() => handleConnectionRequest(item?.info, 'accept')} disabled={isPending}>
                            <AiOutlineUserAdd className='icon' /> Connect
                          </button>
                          <button className='decline' onClick={() => handleConnectionRequest(item?.info, 'reject')} disabled={isPending}>
                            <AiOutlineUserAdd className='icon' />
                            Decline
                          </button>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </article>
                ) : null
              )}
            </section>
        }

      </article>


      {confirmModalOpen && (
        <ConfirmationModal onClose={closeConfirmModal} action={mutate} isLoading={isPending} message={message} />
      )}
    </Wrapper>
  );
};

export default Notifications;
