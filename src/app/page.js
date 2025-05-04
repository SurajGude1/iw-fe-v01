"use client";
import styles from "./styles/page.module.css";
import TopNavigationBar from "./components/navigation/top-navigation-bar";
import Hero from "./components/hero/hero";
import Posters from "./components/posters/posters";
import FiltersCardsChannels from "./components/filters-cards-channels/filters-cards-channels";
import UserReviews from "./components/user-reviews/user-reviews";
import SiteMetadata from "./components/site-metadata/site-metadata";
import Collaborators from "./components/collaborators/collaborators";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <div className={styles.MainWrapper}>
      <TopNavigationBar />
      <Hero />
      <Posters />
      <FiltersCardsChannels />
      <div className={styles.FullWidthComponents}>
        <UserReviews />
        <SiteMetadata />
        <Collaborators />
        <Footer />
      </div>
    </div>
  );
}
