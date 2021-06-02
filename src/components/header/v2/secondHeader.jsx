import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

const SecondHeader = ({
  tabList,
  isMobile,
  handleSearch,
  styles,
  locale
}) => {
  const [activeId, setActiveId] = useState(1);
  const [open, setOpen] = useState(false);

  const handleTabClick = event => {
    const { id } = event.target.dataset;
    if (id && id !== activeId) {
      setActiveId(Number(id));
      open && setOpen(false);
    }
  };

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.style.overflowY = isMobile && open ? 'hidden' : 'auto';
  }, [open, isMobile]);

  return (
    <div className={styles.secondHeader}>
      {isMobile ? (
        <div className={styles.mobileTabWrapper}>
          <span className={styles.location}>Home</span>
          <div
            className={styles.selector}
            onClick={() => setOpen(true)}
            onKeyDown={() => setOpen(true)}
            role="button"
            tabIndex={-1}
          >
            <span>{tabList[activeId - 1]['label']}</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      ) : (
        <>
          <ul
            className={styles.tabsWrapper}
            onClick={handleTabClick}
            onKeyDown={handleTabClick}
            role="button"
            tabIndex={-1}
          >
            {tabList.map(item => {
              const { id, label, href } = item;
              const link = locale === 'en' ? href : `/cn${href}`;
              return (
                <Link
                  to={link}
                  key={id}
                  className={styles.tabItem}
                  activeClassName={styles.active}
                  data-id={id}
                  children={
                    <span>{label}</span>
                  }
                />
              );
            })}
          </ul>
          <div className={styles.searchWrapper}>
            {!isMobile && (
              <input
                className={styles.search}
                type="text"
                onKeyPress={handleSearch}
                placeholder={locale === 'cn' ? '搜索' : 'Search'}
                id="algolia-search"
              />
            )}
          </div>
        </>
      )}
      <div
        className={`${styles.maskContainer} ${open ? styles.show : ''}`}
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
        role="button"
        tabIndex={-1}
      >
        <div className={styles.selectorWrapper}>
          <span
            className={styles.iconWrapper}
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            role="button"
            tabIndex={-1}
          >
            <i className="fas fa-times"></i>
          </span>
          <div
            className={styles.selectList}
            onClick={handleTabClick}
            onKeyDown={handleTabClick}
            role="button"
            tabIndex={-1}
          >
            {tabList.map(item => {
              const { id, label, href } = item;
              const link = locale === 'en' ? href : `/cn${href}`;
              return (
                <Link
                  to={link}
                  key={id}
                  className={styles.tabItem}
                  activeClassName={styles.active}
                  data-id={id}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondHeader;
