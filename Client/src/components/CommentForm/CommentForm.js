import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Api from '../../ApiHelper';
import './CommentForm.scss';

const CommentForm = () => {
  let INITIAL_STATE = { content: '' };
  const user = JSON.parse(localStorage.getItem('user'));

  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    async function addComment() {
      const token = await localStorage.getItem('token');
      const updatedInfo = {
        content: itemData.content,
        username: user.username,
      };

      await Api.createComment(updatedInfo, token);
      setItemData(INITIAL_STATE);
    }
    addComment();
  };
  return (
    <div className='CommentForm'>
      <div
        className='profile-img'
        style={{
          backgroundImage: `url(${user.profileImg})`,
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          id='content'
          type='text'
          name='content'
          value={itemData.content}
          placeholder={`Write a comment...`}
          onChange={handleChange}
        />
        <div className='form-input-row'>
          <div className='form-input-col'>
            <button disabled={!itemData.content} className='btn btn-dark'>
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;