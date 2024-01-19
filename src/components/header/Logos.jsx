import classes from './index.module.less';
import clsx from 'clsx';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import GitHubButton from '../githubButton';
import { useState, useEffect } from 'react';

export const LogoSection = props => {
  const { lightMode = true } = props;

  const foundationLogo = lightMode
    ? '/images/lf_logo_light.svg'
    : '/images/lf_logo_dark.svg';

  return (
    <div className={classes.logoSection}>
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
        <img src={foundationLogo} alt="LFAI" />
      </a>
    </div>
  );
};

export const ActionBar = props => {
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
            show: true,
          },
          fork: {
            count: 0,
            show: true,
          },
        });
      }
    })();
  }, []);

  return (
    <div className={clsx(classes.gitBtnWrapper, props.className)}>
      {stat.star.show && (
        <GitHubButton
          count={stat.star.count}
          type="star"
          href="https://github.com/milvus-io/milvus"
        >
          Stars
        </GitHubButton>
      )}
    </div>
  );
};
