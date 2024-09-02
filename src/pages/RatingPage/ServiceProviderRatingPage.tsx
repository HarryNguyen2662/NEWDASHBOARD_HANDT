import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './RatingPage.module.css';

const ServiceProviderRatingPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [deliverables, setDeliverables] = useState<string>('');
  const [timelyPayments, setTimelyPayments] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleDeliverablesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDeliverables(event.target.value);
  };

  const handleTimelyPaymentsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTimelyPayments(event.target.value);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('Rating:', rating);
    console.log('Communicated Clear Deliverables:', deliverables);
    console.log('Timely Payments:', timelyPayments);
    console.log('Comment:', comment);
  };

  return (
    <div className={styles.projectRatingPage}>
      <div className={styles.header}>
        <button className={styles.loginPageBtn}>Login Page</button>
      </div>
      <h1>Please rate the service provider</h1>
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
        <label>Communicated Clear Deliverables</label>
        <textarea
          value={deliverables}
          onChange={handleDeliverablesChange}
          placeholder="Enter your comments about deliverables here"
        />
        <label>Timely Payments</label>
        <textarea
          value={timelyPayments}
          onChange={handleTimelyPaymentsChange}
          placeholder="Enter your comments about timely payments here"
        />
        <label>Additional Comments</label>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comments here"
        />
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default ServiceProviderRatingPage;
