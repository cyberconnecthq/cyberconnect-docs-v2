import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type ContentItem = {
    picture: JSX.Element;
    content: JSX.Element;
};

export default function ContentCard({picture, content}: ContentItem): JSX.Element {
    return (
        <section className={styles.contentCard}>
            <div className={styles.contentCardContent}>{content}</div>
            <div>{picture}</div>
        </section>
    );
}
