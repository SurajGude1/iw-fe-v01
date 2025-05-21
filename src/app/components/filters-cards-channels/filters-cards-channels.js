import { useState, useRef } from 'react';
import styles from "./filters-cards-channels.module.css";
import Image from "next/image";
import Link from "next/link";
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import cardsData from "../../data/posts-data.json";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const theme = createTheme({
  palette: {
    primary: { main: '#ffffff' },
    text: { primary: '#ffffff' },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: { color: '#ffffff', borderColor: '#ffffff' },
      },
    },
  },
});

export default function SocialCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const searchContainerRef = useRef(null);

  const filteredCards = cardsData
    .filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.postSummary.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    // Scroll to the search container when page changes
    searchContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.SocialCardsContainer}>
        <main className={styles.SocialCardsMain}>
          <p className={styles.SectionTitle}>Discover more</p>

          <div className={styles.SocialCardsSearchContainer} ref={searchContainerRef}>
            <FormControl fullWidth variant="standard" className={styles.SearchInputWrapper}>
              <OutlinedInput
                id="search-input"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'var(--off-white)' }} />
                  </InputAdornment>
                }
                sx={{
                  height: '40px',
                  borderRadius: '4px',
                  paddingLeft: '8px',
                  color: 'white',
                  backgroundColor: 'var(--charcoal)',
                  transition: 'background-color 0.3s, color 0.3s',
                  '&:hover': {
                    backgroundColor: 'var(--off-white)',
                    color: 'black',
                    '& .MuiSvgIcon-root': {
                      color: 'black',
                    },
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'var(--off-white)',
                    color: 'black',
                    '& .MuiSvgIcon-root': {
                      color: 'black',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                  },
                }}
              />
            </FormControl>

            <FormControl variant="outlined" className={styles.DropdownWrapper} sx={{ height: '40px' }}>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                displayEmpty
                input={
                  <OutlinedInput
                    notched={false}
                    sx={{
                      height: '40px',
                      padding: '0 16px',
                      backgroundColor: 'var(--charcoal) !important',
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                      },
                      '& input': {
                        padding: 0,
                        height: '100%',
                        boxSizing: 'border-box',
                      },
                    }}
                  />
                }
                sx={{
                  height: '40px',
                  backgroundColor: 'var(--charcoal)',
                  color: 'white',
                  borderRadius: '4px',
                  '& .MuiSelect-select': {
                    paddingLeft: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                    top: 'calc(50% - 12px)',
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--charcoal)',
                      color: 'var(--off-white)',
                      border: 'none',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                      '& .MuiMenuItem-root': {
                        minHeight: '36px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="dateAdded">Newest First</MenuItem>
                <MenuItem value="popular">Political</MenuItem>
                <MenuItem value="dateAdded">Life story</MenuItem>
                <MenuItem value="dateAdded">Health</MenuItem>
                <MenuItem value="dateAdded">Women</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={styles.SocialCardsGrid}>
            {currentCards.map((card) => (
              <article key={card.id} className={styles.SocialCard}>
                <div className={styles.SocialCardImageContainer}>
                  <Image
                    src={card.thumbnail}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'covertitle', borderRadius: 'inherit' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className={styles.SocialCardContent}>
                  <h2 className={styles.SocialCardTitle}>{card.title}</h2>
                  {/* <p className={styles.SocialCardDescription}>{card.postSummary}</p> */}
                  <div className={styles.SocialCardFooter}>
                    <span className={styles.SocialCardViews}>
                      <FontAwesomeIcon icon={faEye} /> {card.views}
                    </span>
                    <Link href="#" className={styles.SocialCardKnowMore}>Know more</Link>
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
          <p className={styles.SocialCardsSidebarHeader}>
            <span className={styles.RecordingIcon}></span>
            Wake & Participate
          </p>

          <div className={styles.SocialCardsChannelBox}>Community Forum</div>
          <div className={styles.SocialCardsChannelBox}>Upcoming Events</div>
          <div className={styles.SocialCardsChannelBox}>Volunteer Opportunities</div>

          <p className={styles.SocialCardsSidebarSubheader}>
            Featured
            <FontAwesomeIcon icon={faYoutube} className={styles.YoutubeIcon} />
            channels
          </p>

          <div className={styles.YouTubeChannelsGrid}>
            <a href="#" className={styles.YouTubeChannelBox}>Tech Reviews</a>
            <a href="#" className={styles.YouTubeChannelBox}>Cooking Master</a>
            <a href="#" className={styles.YouTubeChannelBox}>Fitness Guru</a>
            <a href="#" className={styles.YouTubeChannelBox}>Travel Vlogs</a>
            <a href="#" className={styles.YouTubeChannelBox}>Gaming Zone</a>
            <a href="#" className={styles.YouTubeChannelBox}>DIY Crafts</a>
            <a href="#" className={styles.YouTubeChannelBox}>Finance Tips</a>
            <a href="#" className={styles.YouTubeChannelBox}>Science Today</a>
          </div>
        </aside>
      </div>
    </ThemeProvider>
  );
}