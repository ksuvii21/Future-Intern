import React from 'react';

function NewsCard({ article }) {
  return (
    <div className="card">
      <img src={article.imageUrl} alt={article.title} className="card-img" />
      <div className="card-content">
        <h3>{article.title}</h3>
        <p>{new Date(article.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default NewsCard;