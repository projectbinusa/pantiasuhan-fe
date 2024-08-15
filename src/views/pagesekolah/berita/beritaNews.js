import React, { useState } from 'react';
import NavbarSekolah from "../../../component/NavbarSekolah";
import FooterSekolah from "../../../component/FooterSekolah";
import Card from './Card';

const newsData = [
    { id: 1, title: 'Local School Wins Award', content: 'The local school has been recognized for its outstanding achievements in academics and sports.', image: 'https://via.placeholder.com/300x200?text=Award', category: 'Berita Sekolah', date: '2024-08-10' },
    { id: 2, title: 'Community Garden Project Launched', content: 'A new community garden has been established to promote local agriculture and sustainability.', image: 'https://via.placeholder.com/300x200?text=Garden', category: 'Info Sekolah', date: '2024-08-12' },
    { id: 3, title: 'New Library Opens Downtown', content: 'The new library offers a wide range of books and community programs for all ages.', image: 'https://via.placeholder.com/300x200?text=Library', category: 'Berita Sekolah', date: '2024-08-14' },
    { id: 4, title: 'Tech Startup Announces Innovative App', content: 'A local tech startup has announced the release of a new app designed to improve productivity.', image: 'https://via.placeholder.com/300x200?text=Tech', category: 'Agenda', date: '2024-08-16' },
    { id: 5, title: 'Annual Art Fair Returns This Weekend', content: 'The annual art fair will showcase works from local artists and provide interactive workshops.', image: 'https://via.placeholder.com/300x200?text=Art', category: 'Berita Sekolah', date: '2024-08-18' },
    { id: 6, title: 'City Marathon a Huge Success', content: 'The city marathon attracted thousands of participants and raised funds for charity.', image: 'https://via.placeholder.com/300x200?text=Marathon', category: 'Agenda', date: '2024-08-20' },
    { id: 7, title: 'New Health Clinic Opens in Town', content: 'A new health clinic has opened to provide essential medical services to the community.', image: 'https://via.placeholder.com/300x200?text=Health', category: 'Info Sekolah', date: '2024-08-22' },
    { id: 8, title: 'School Science Fair Winners Announced', content: 'Students from various schools presented innovative science projects and won awards.', image: 'https://via.placeholder.com/300x200?text=Science', category: 'Berita Sekolah', date: '2024-08-24' },
    { id: 9, title: 'Local Theatre Group Performs Shakespeare', content: 'The local theatre group is performing Shakespeare’s plays this weekend.', image: 'https://via.placeholder.com/300x200?text=Theatre', category: 'Info Sekolah', date: '2024-08-26' },
    { id: 10, title: 'New Restaurant Opens Downtown', content: 'A new restaurant specializing in international cuisine has opened its doors.', image: 'https://via.placeholder.com/300x200?text=Restaurant', category: 'Agenda', date: '2024-08-28' },
    { id: 11, title: 'Local Beach Clean-Up Event', content: 'Volunteers gathered to clean up the local beach and protect marine life.', image: 'https://via.placeholder.com/300x200?text=Beach', category: 'Berita Sekolah', date: '2024-08-30' },
    { id: 12, title: 'Veterans Day Parade Highlights', content: 'The Veterans Day parade featured marching bands and honored military veterans.', image: 'https://via.placeholder.com/300x200?text=Veterans', category: 'Info Sekolah', date: '2024-09-01' },
    { id: 13, title: 'City Council Meeting Discusses Traffic Issues', content: 'The city council discussed various traffic management solutions to improve road safety.', image: 'https://via.placeholder.com/300x200?text=Traffic', category: 'Agenda', date: '2024-09-03' },
    { id: 14, title: 'Children’s Summer Camp Registration Opens', content: 'Registration for the children’s summer camp is now open, offering various activities and programs.', image: 'https://via.placeholder.com/300x200?text=Camp', category: 'Berita Sekolah', date: '2024-09-05' },
    { id: 15, title: 'Local Author Releases New Book', content: 'A local author has released a new book that explores themes of adventure and self-discovery.', image: 'https://via.placeholder.com/300x200?text=Book', category: 'Info Sekolah', date: '2024-09-07' },
    { id: 16, title: 'Annual Food Festival Features Local Delicacies', content: 'The food festival will highlight local delicacies and feature cooking demonstrations.', image: 'https://via.placeholder.com/300x200?text=Food', category: 'Agenda', date: '2024-09-09' },
    { id: 17, title: 'Charity Gala Raises $50,000', content: 'The charity gala successfully raised $50,000 for local nonprofits.', image: 'https://via.placeholder.com/300x200?text=Gala', category: 'Berita Sekolah', date: '2024-09-11' },
    { id: 18, title: 'New Sports Complex Opens', content: 'The new sports complex includes a gym, swimming pool, and courts for various sports.', image: 'https://via.placeholder.com/300x200?text=Sports', category: 'Agenda', date: '2024-09-13' },
    { id: 19, title: 'Technology Conference Attracts Industry Leaders', content: 'The technology conference featured keynote speeches from industry leaders and innovative startups.', image: 'https://via.placeholder.com/300x200?text=Conference', category: 'Info Sekolah', date: '2024-09-15' },
    { id: 20, title: 'Pet Adoption Fair This Weekend', content: 'The pet adoption fair will offer a chance to adopt pets and learn about responsible pet care.', image: 'https://via.placeholder.com/300x200?text=Pets', category: 'Agenda', date: '2024-09-17' },
  ];

  const categories = ['Berita Sekolah', 'Info Sekolah', 'Agenda'];

  const BeritaNews = () => {
    const [selectedCategory, setSelectedCategory] = useState('Berita Sekolah');
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredNews = newsData
      .filter(newsItem => newsItem.category === selectedCategory)
      .filter(newsItem => 
        newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        newsItem.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b.id - a.id);
  
    return (
      <div>
        <NavbarSekolah />
        <div style={styles.container}>
          <div style={styles.filtersContainer}>
            <div style={styles.categoryContainer}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  style={{
                    ...styles.filterButton,
                    backgroundColor: selectedCategory === category ? '#007BFF' : '#e0e0e0',
                    color: selectedCategory === category ? '#fff' : '#000',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.cardsContainer}>
            {filteredNews.map(newsItem => (
              <Card
                key={newsItem.id}
                image={newsItem.image}
                id={newsItem.id}
                title={newsItem.title}
                content={newsItem.content}
              />
            ))}
          </div>
        </div>
        <FooterSekolah />
      </div>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
      marginTop: '50px',
    },
    filtersContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    categoryContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    filterButton: {
      padding: '10px 20px',
      fontSize: '1em',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '4px',
    },
    searchInput: {
      padding: '10px',
      fontSize: '1em',
      marginBottom: '20px',
      width: '100%',
      maxWidth: '300px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    cardsContainer: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
    },
  };
  
  export default BeritaNews;
