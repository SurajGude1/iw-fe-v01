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
import FadeInSection from "./components/global/animations/fade-in";

export default function Home() {
  return (
    <div className={styles.MainWrapper}>
      <TopNavigationBar />
      <FadeInSection><Hero /></FadeInSection>
      <FadeInSection><Posters /></FadeInSection>
      <FadeInSection><FiltersCardsChannels /></FadeInSection>
      <FadeInSection><UserReviews /></FadeInSection>
      <FadeInSection><SiteMetadata /></FadeInSection>
      <FadeInSection><Collaborators /></FadeInSection>
      <FadeInSection><Footer /></FadeInSection>
    </div>
  );
}




