import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import Likes from '../Likes/Likes';

import './UserComment.scss';
import ModalMenu from '../ModalMenu/ModalMenu';
import EditCommentForm from '../EditCommentForm/EditCommentForm';

const UserComment = ({ info, postId }) => {
  console.log('COMMENT INFO: ', info);
  const { firstName, lastName, username, content, commentTime, profileImg } =
    info;
  const user = JSON.parse(localStorage.getItem('user'));
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const data = {
    userId: info.id,
    commentId: info.id,
    content,
    type: 'comments',
    postId,
    username,
  };

  const date = new Date(commentTime.replace(' ', 'T'));

  return (
    <>
      <div className='UserComment_container'>
        <div className='UserComment_user'>
          <div className='userInfo'>
            <img src={profileImg} alt={username} />
            <div className='details'>
              <Link
                to={`/profile/${username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='name'>{`${firstName} ${lastName}`}</span>
              </Link>
              <span className='date'>
                {` Posted:
                ${date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}`}
              </span>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faEllipsis}
            size='xl'
            className='modal-menu-btn'
            onClick={() => setShowModal(!showModal)}
          />
          {showModal && (
            <ModalMenu
              setShowModal={setShowModal}
              data={data}
              setShowEditForm={setShowEditForm}
            />
          )}
        </div>
        <div className='content'>
          <p>{content}</p>
        </div>
        <div className='info'>
          <Likes data={data} />
        </div>
      </div>
      <EditCommentForm
        show={showEditForm}
        onHide={() => setShowEditForm(false)}
        commentData={data}
      />
    </>
  );
};

export default UserComment;
