import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Api from '../../ApiHelper';
import './PostForm.scss';
import { UserContext } from '../../contexts/UserContext';

const PostForm = () => {
  const [addUploadImg, setAddUploadImg] = useState(false);
  let INITIAL_STATE = { content: '', img: '' };
  const { currentUser } = useContext(UserContext);

  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const location = useLocation();
  const urlArr = location.pathname.split('/');
  let postLocation = urlArr[urlArr.length - 1];
  if (!postLocation) {
    postLocation = null;
    console.log(typeof postLocation);
  }
  console.log(postLocation);
  const handleClick = () => setAddUploadImg(!addUploadImg);

  const handleSubmit = e => {
    e.preventDefault();

    async function addPost() {
      const token = await localStorage.getItem('token');
      const userId = currentUser.id;
      console.log('type of', typeof userId);
      const updatedInfo = {
        content: itemData.content,
        userId: currentUser.id,
        img: itemData.img,
        postLocation,
      };

      await Api.createPost(updatedInfo, token);
      setItemData(INITIAL_STATE);
    }
    addPost();
  };

  return (
    <div className='PostForm'>
      <div
        className='profile-img'
        style={{
          backgroundImage: `url(${currentUser.profileImg})`,
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          id='content'
          type='text'
          name='content'
          value={itemData.content}
          placeholder={`What's on your mind?`}
          onChange={handleChange}
        />
        <div className='form-input-row'>
          {addUploadImg ? (
            <input
              id='img'
              type='text'
              name='img'
              value={itemData.img}
              placeholder={`Add image URL`}
              onChange={handleChange}
            />
          ) : (
            ''
          )}
          <div className='form-input-col'>
            <FontAwesomeIcon
              size='xl'
              className='img-icon'
              onClick={handleClick}
              icon={faImage}
            />
            <button disabled={!itemData.content} className='btn btn-dark'>
              Add Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
