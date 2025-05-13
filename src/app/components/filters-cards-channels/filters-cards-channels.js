import { useState, useRef } from 'react';
import styles from "./filters-cards-channels.module.css";
import Image from "next/image";
import Link from "next/link";
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FiChevronDown } from 'react-icons/fi';
import cardsData from "../../data/horizontal-cards-data.json";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          borderColor: '#ffffff',
        },
      },
    },
  },
});

export default function SocialCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const mainRef = useRef(null);

  const filteredCards = cardsData
    .filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "popular") return b.views - a.views;
      if (sortOption === "dateAdded") return new Date(b.dateAdded) - new Date(a.dateAdded);
      return 0;
    });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    mainRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.SocialCardsContainer}>
        <main className={styles.SocialCardsMain} ref={mainRef}>
          <h1 className={styles.SocialCardsHeader}>Read, Discover & Enjoy</h1>

          <div className={styles.SocialCardsSearchContainer}>
            <input
              type="text"
              className={styles.SocialCardsSearchInput}
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className={styles.SocialCardsDropdownContainer}>
              <select
                className={styles.SocialCardsDropdown}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="dateAdded">Newest First</option>
              </select>
              <FiChevronDown className={styles.SocialCardsDropdownArrow} />
            </div>
          </div>

          <div className={styles.SocialCardsGrid}>
            {currentCards.map((card) => (
              <article key={card.id} className={styles.SocialCard}>
                <div className={styles.SocialCardImageContainer}>
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: 'inherit',
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
                <div className={styles.SocialCardContent}>
                  <h2 className={styles.SocialCardTitle}>{card.title}</h2>
                  <p className={styles.SocialCardDescription}>{card.description}</p>
                  <div className={styles.SocialCardFooter}>
                    <Link href="#" className={styles.SocialCardKnowMore}>
                      Know more
                    </Link>
                    <span className={styles.SocialCardViews}>{card.views} views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredCards.length > cardsPerPage && (
            <div className={styles.SocialCardsPagination}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </div>
          )}
        </main>

        <aside className={styles.SocialCardsSidebar}>
          <h3 className={styles.SocialCardsSidebarHeader}>Wake & Participate</h3>
          <div className={styles.SocialCardsChannelBox}>Community Forum</div>
          <div className={styles.SocialCardsChannelBox}>Upcoming Events</div>
          <div className={styles.SocialCardsChannelBox}>Volunteer Opportunities</div>
        </aside>
      </div>
    </ThemeProvider>
  );
}