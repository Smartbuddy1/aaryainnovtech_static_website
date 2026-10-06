import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, type = 'website', image = 'https://aaryainnovtech.com/images/aarya-innovtech-logo-640.png' }) => {
  const fullTitle = `${title} | Aarya Innovtech`;
  const url = canonical || 'https://aaryainnovtech.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
