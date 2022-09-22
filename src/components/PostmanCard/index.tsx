import React from "react";
import styles from "./styles.module.css";
import { SiPostman } from "react-icons/si";

export default function PostmanCard({
    queryURL,
    exampleURL
}: {
    queryURL: string;
    exampleURL: string;
}): JSX.Element {
    return (
        <div className={styles.postmanCard}>
            <SiPostman />
            <h3>Run in Postman:</h3>
            <a href={queryURL} rel="noreferrer" target="_blank">Query</a>
            <a href={exampleURL} rel="noreferrer" target="_blank">Example</a>
        </div>
    );
}
