import React from "react";
import Link from "next/link";
import CardGrid from "@components/CardGrid/CardGrid";
import MinimalCard from "@components/MinimalCard/MinimalCard";
import { Button } from "@components/Common/Common";
import styles from "./RelatedNews.module.scss";

export interface INewsProps {
  news: any[];
}

const RelatedNews = ({ news }: INewsProps) => {
  return (
    <div className={styles.newsList}>
      <div className={styles.newsListCards}>
        <CardGrid title="News and Events" col={[1, 2]}>
          {news.slice(0, 2).map((el) => (
            <Link key={el.title} href={`/news/${el.slug}`}>
              <a>
                <MinimalCard data={el} />
              </a>
            </Link>
          ))}
        </CardGrid>
      </div>

      <div className={styles.newsListWrapper}>
        <div className={styles.newsListCTA}>
          <Button href="/news" color="dark-secondary" rounded>
            View more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedNews;
