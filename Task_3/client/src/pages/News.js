import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { getNews } from '../services/api';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h1>Newsroom</h1>
      <div className="grid">
        {articles.map(article => <NewsCard key={article.id} article={article} />)}
      </div>
    </div>
  );
}

export default News;