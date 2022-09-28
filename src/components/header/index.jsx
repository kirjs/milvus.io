import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GitHubButton from '../githubButton';
import MilvusCookieConsent from '../milvusCookieConsent';
import { getGithubStatis } from '../../http';
import * as styles from './index.module.less';

const Header = ({ darkMode = false, t = v => v, className = '' }) => {
  const [isLightHeader, setIsLightHeader] = useState(!darkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTutOpen, setIsTutOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isDesktopTutOpen, setIsDesktopTutOpen] = useState(false);
  const [isDesktopToolOpen, setIsDesktopToolOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [stat, setStat] = useState({
    star: {
      count: 0,
      show: true,
    },
    fork: {
      count: 0,
      show: true,
    },
  });
  const isLangOpen = Boolean(anchorEl);
  const toolRef = useRef(null);
  const tutRef = useRef(null);
  const headerRef = useRef(null);
  let isDesktop = true;
  if (typeof navigator !== 'undefined') {
    isDesktop =
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      );
  }

  useEffect(() => {
    (async function () {
      try {
        const { forks_count, stargazers_count } = await getGithubStatis();
        setStat({
          star: {
            count: stargazers_count,
            show: true,
          },
          fork: {
            count: forks_count,
            show: true,
          },
        });
      } catch (error) {
        setStat({
          star: {
            count: 0,
            show: false,
          },
          fork: {
            count: 0,
            show: false,
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (!darkMode) {
      return;
    }
    const onScroll = e => {
      const scrollTop = e.target.documentElement.scrollTop;
      setIsLightHeader(scrollTop > 90);
      if (scrollTop < 78) {
        headerRef.current.classList.remove(styles.hideHeader);
        headerRef.current.classList.remove(styles.posFixed);
        headerRef.current.classList.remove(styles.showHeader);
      }
      if (scrollTop > 78 && scrollTop < 90) {
        headerRef.current.classList.add(styles.hideHeader);
      }
      if (scrollTop > 90) {
        headerRef.current.classList.add(styles.posFixed);
        headerRef.current.classList.add(styles.showHeader);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLightHeader, darkMode]);

  // const handleLangClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleLangClose = () => {
    setAnchorEl(null);
  };

  const openTutorial = open => {
    let isOpen = open;
    if (isOpen === undefined) {
      isOpen = !isTutOpen;
    }
    setIsTutOpen(isOpen);
  };

  const openTool = open => {
    let isOpen = open;
    if (isOpen === undefined) {
      isOpen = !isToolOpen;
    }
    setIsToolOpen(isOpen);
  };

  const handleMenuLinkClick = e => {
    const link = e.target?.children[0];
    if (link && link.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      e.stopPropagation();
      link.click();
      setIsDesktopTutOpen(false);
    }
  };

  const logoSection = (
    <div className={styles.logoSection}>
      <Link href="/">
        <img src="/images/milvus_logo.svg" alt="milvus-logo" />
      </Link>
      <Divider
        variant="middle"
        sx={{
          margin: '0 13px',
          opacity: '0.3',
          border: '1px solid #d1d1d1',
          transform: 'scaleX(0.5)',
          '@media(max-width: 1024px)': {
            margin: '0 10px',
          },
          '@media(max-width: 744px)': {
            margin: '0 6px',
          },
        }}
      />

      <a
        href="https://lfaidata.foundation/projects/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block', lineHeight: 0 }}
      >
        <span className={styles.lfaiLogo} />
      </a>
    </div>
  );

  const actionBar = (
    <div className={styles.actionBar}>
      <div className={styles.gitBtnsWrapper}>
        {stat.star.show && (
          <GitHubButton
            count={stat.star.count}
            type="star"
            href="https://github.com/milvus-io/milvus"
          >
            Star
          </GitHubButton>
        )}
        {stat.fork.show && (
          <GitHubButton
            count={stat.fork.count}
            type="fork"
            href="https://github.com/milvus-io/milvus/fork"
          >
            Fork
          </GitHubButton>
        )}
      </div>
      {/* <Menu
        anchorEl={anchorEl}
        open={isLangOpen}
        onClose={handleLangClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languages.map(lng => {
          return (
            <MenuItem key={lng} value={lng} onClick={handleLangClose}>
              <Link
                className={styles.menuLink}
                to={originalPath}
                language={lng}
              >
                {lng === 'en' ? 'English' : '中文'}
              </Link>
            </MenuItem>
          );
        })}
      </Menu> */}
    </div>
  );

  const header = (
    <header
      className={`${styles.header} ${
        isLightHeader ? styles.light : ''
      } ${className} ${!darkMode ? styles.posSticky : ''}`}
      ref={headerRef}
    >
      <div className={`${styles.headerContainer} headerContainer`}>
        {logoSection}
        <div className={styles.desktopHeaderBar}>
          <div className={styles.leftSection}>
            <ul className={`${styles.menu}`}>
              <li>
                <Link href="/docs">
                  <a className={styles.menuItem}>
                    {t('v3trans.main.nav.docs')}
                  </a>
                </Link>
              </li>
              <li>
                <button
                  ref={tutRef}
                  className={styles.menuItem}
                  onClick={() => setIsDesktopTutOpen(true)}
                >
                  {t('v3trans.main.nav.tutorials')}
                </button>
              </li>
              <li>
                <button
                  ref={toolRef}
                  className={styles.menuItem}
                  onClick={() => setIsDesktopToolOpen(true)}
                >
                  {t('v3trans.main.nav.tools')}
                </button>
              </li>
              <li>
                <Link href="/blog">
                  <a className={styles.menuItem}>
                    {t('v3trans.main.nav.blog')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <a className={styles.menuItem}>
                    {t('v3trans.main.nav.community')}
                  </a>
                </Link>
              </li>
            </ul>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={tutRef.current}
              open={isDesktopTutOpen}
              onClose={() => {
                setIsDesktopTutOpen(false);
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleMenuLinkClick}>
                <Link href="https://codelabs.milvus.io/">
                  <a className={styles.menuLink}>codelabs</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuLinkClick}>
                <Link href="/bootcamp">
                  <a className={styles.menuLink}>
                    {t('v3trans.main.nav.bootcamp')}
                  </a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuLinkClick}>
                <Link href="/milvus-demos">
                  <a className={styles.menuLink}>
                    {t('v3trans.main.nav.demo')}
                  </a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuLinkClick}>
                <a
                  href="https://www.youtube.com/c/MilvusVectorDatabase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menuLink}
                >
                  {t('v3trans.main.nav.video')}
                </a>
              </MenuItem>
            </Menu>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={toolRef.current}
              open={isDesktopToolOpen}
              onClose={() => {
                setIsDesktopToolOpen(false);
              }}
            >
              <MenuItem onClick={handleMenuLinkClick}>
                <a
                  href="https://github.com/zilliztech/attu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menuLink}
                >
                  Attu
                </a>
              </MenuItem>
              <MenuItem onClick={handleMenuLinkClick}>
                <a
                  href="https://github.com/zilliztech/milvus_cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menuLink}
                >
                  Milvus_CLI
                </a>
              </MenuItem>
              <MenuItem onClick={handleMenuLinkClick}>
                <Link href="/tools/sizing">
                  <a className={styles.menuLink}>Sizing Tool</a>
                </Link>
              </MenuItem>
            </Menu>
          </div>

          <div className={styles.rightSection}>
            {isDesktop && actionBar}
            <Link href="/docs/example_code.md">
              <a className={styles.startBtn}>
                {t('v3trans.main.nav.getstarted')}
              </a>
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.hamburg} ${isMenuOpen ? styles.active : ''}`}
        >
          <span className={styles.top}></span>
          <span className={styles.middle}></span>
          <span className={styles.bottom}></span>
        </button>
      </div>
      {!isDesktop && (
        <div className={`${styles.overlay}  ${isMenuOpen ? styles.open : ''}`}>
          <nav className={`${styles.nav} col-4 col-8 col-12`}>
            <List
              sx={{ width: '100%' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Link href="/docs">
                <a className={styles.menuLink}>
                  <ListItemButton>
                    <ListItemText primary={t('v3trans.main.nav.docs')} />
                    <ExpandMore className={styles.turnLeft} />
                  </ListItemButton>
                </a>
              </Link>

              <Divider variant="middle" />

              <ListItemButton
                onClick={() => {
                  openTutorial(!isTutOpen);
                }}
              >
                <ListItemText primary={t('v3trans.main.nav.tutorials')} />
                {isTutOpen ? (
                  <ExpandMore />
                ) : (
                  <ExpandMore className={styles.turnLeft} />
                )}
              </ListItemButton>

              <Collapse in={isTutOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Link href="/bootcamp">
                          <a className={styles.mobileMenuLink}>
                            {t('v3trans.main.nav.bootcamp')}
                          </a>
                        </Link>
                        <Link href="/milvus-demos">
                          <a className={styles.mobileMenuLink}>
                            {t('v3trans.main.nav.demo')}
                          </a>
                        </Link>
                        <a
                          href="https://www.youtube.com/c/MilvusVectorDatabase"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mobileMenuLink}
                        >
                          {t('v3trans.main.nav.video')}
                        </a>
                      </>
                    }
                  />
                </List>
              </Collapse>

              <Divider variant="middle" />

              <ListItemButton
                onClick={() => {
                  openTool(!isToolOpen);
                }}
              >
                <ListItemText primary={t('v3trans.main.nav.tools')} />
                {isToolOpen ? (
                  <ExpandMore />
                ) : (
                  <ExpandMore className={styles.turnLeft} />
                )}
              </ListItemButton>

              <Collapse in={isToolOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <a
                          href="https://github.com/zilliztech/attu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mobileMenuLink}
                        >
                          Attu
                        </a>
                        <a
                          href="https://github.com/zilliztech/milvus_cli"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mobileMenuLink}
                        >
                          Milvus_CLI
                        </a>
                        <Link href="/tools/sizing">
                          <a className={styles.mobileMenuLink}>Sizing Tool</a>
                        </Link>
                      </>
                    }
                  />
                </List>
              </Collapse>

              <Divider variant="middle" />

              <Link href="/blog">
                <a className={styles.menuLink}>
                  <ListItemButton>
                    <ListItemText primary={t('v3trans.main.nav.blog')} />
                    <ExpandMore className={styles.turnLeft} />
                  </ListItemButton>
                </a>
              </Link>

              <Divider variant="middle" />

              <Link href="/community">
                <a className={styles.menuLink}>
                  <ListItemButton>
                    <ListItemText primary={t('v3trans.main.nav.community')} />
                    <ExpandMore className={styles.turnLeft} />
                  </ListItemButton>
                </a>
              </Link>

              <Divider variant="middle" />
            </List>

            {actionBar}

            <Divider
              variant="fullwidth"
              sx={{ position: 'absolute', bottom: '78px', width: '100%' }}
            />
            <Link href="/docs/install_standalone-docker.md">
              <a className={styles.startBtn}>
                {t('v3trans.main.nav.getstarted')}
              </a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );

  return (
    <>
      {header}
      {/* {language !== 'cn' && <MilvusCookieConsent />} */}
      <MilvusCookieConsent />
    </>
  );
};

export default Header;
