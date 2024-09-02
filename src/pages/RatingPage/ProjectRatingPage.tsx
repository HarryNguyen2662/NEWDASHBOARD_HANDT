import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { Link } from 'react-router-dom';
import styles from './RatingPage.module.css'; 

const ProjectRatingPage = () => {
  const [rating, setRating] = useState(0);
  const [qualityOfWork, setQualityOfWork] = useState('');
  const [timeliness, setTimeliness] = useState('');
  const [comment, setComment] = useState('');

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleQualityOfWorkChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQualityOfWork(event.target.value);
  };

  const handleTimelinessChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTimeliness(event.target.value);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('Rating:', rating);
    console.log('Quality of Work:', qualityOfWork);
    console.log('Timeliness:', timeliness);
    console.log('Comment:', comment);
  };

  return (
    <div className={styles.projectRatingPage}>
      {/* <div className={styles.header">
        {/* shouldn't be a button to login page */}
        {/* <Link to={"/"}> */}
          {/* <button className={styles.login-page-btn">Login Page</button> */}
        {/* </Link> */}
      {/* </div> */} 
      <h1>Please rate the project leader on their work</h1>
      <div className={styles.ratingStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? 'selected' : ''}`}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>Quality of Work</label>
        <textarea
          value={qualityOfWork}
          onChange={handleQualityOfWorkChange}
          placeholder="Enter your comments about the quality of work here"
        />
        <label>Timeliness of Completion</label>
        <textarea
          value={timeliness}
          onChange={handleTimelinessChange}
          placeholder="Enter your comments about timeliness here"
        />
        <label>Additional Comments</label>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comments here"
        />
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div >
  );
};

export default ProjectRatingPage;
