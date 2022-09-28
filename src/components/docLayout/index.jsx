import Layout from '../layout';
import { useTranslation } from 'react-i18next';
import classes from './index.module.less';
import Head from 'next/head';
import clsx from 'clsx';

export default function DocLayout(props) {
  const { t } = useTranslation('common');
  const {
    left,
    center,
    seo: { title, desc, url },
    classes: { root = '', menu = '', content = '' },
    isHome,
  } = props;

  return (
    <Layout
      darkMode={false}
      t={t}
      showFooter={false}
      headerClassName="docHeader"
    >
      <Head>
        <title>{title}</title>
        <meta type="description" content={desc}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
      </Head>

      <div className={clsx(classes.docLayout, { [root]: root })}>
        <div
          className={clsx(classes.leftContainer, {
            [menu]: menu,
          })}
        >
          {left}
        </div>
        <div
          className={clsx(classes.contentContainer, {
            [classes.docHome]: isHome,
            [content]: content,
          })}
        >
          {center}
        </div>
      </div>
    </Layout>
  );
}
