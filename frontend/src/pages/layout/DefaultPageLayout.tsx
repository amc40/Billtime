import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container, Grid, Menu } from "semantic-ui-react";
import { Page, topLevelPages } from "../top-level-pages";

import styles from "./DefaultPageLayout.module.css";

interface DefaultPageLayoutProps {
  children?: React.ReactNode;
}

export const DefaultPageLayout: React.FC<DefaultPageLayoutProps> = ({
  children,
}) => {
  const router = useRouter();
  const [selectedPageName, setSelectedPageName] = useState<string>("timesheet");

  const handlePageMenuItemClick = ({ name, path }: Page) => {
    if (name != null) {
      setSelectedPageName(name);
      router.push(path);
    }
  };

  return (
    <div id={styles["page-container"]}>
      <Menu id={styles["main-navbar-menu"]} vertical>
        {topLevelPages.map((topLevelPage) => (
          <Menu.Item
            key={topLevelPage.name}
            className={styles["main-navbar-menu-item"]}
            name={topLevelPage.name}
            active={selectedPageName === topLevelPage.name}
            onClick={() => handlePageMenuItemClick(topLevelPage)}
            link
          />
        ))}
      </Menu>
      <div id={styles["page-area"]}>
        <Container>{children}</Container>
      </div>
    </div>
  );
};
