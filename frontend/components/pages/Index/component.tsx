import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Props } from './props';
import React, { FC } from 'react';
import locales from '../../../core/locales';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { Container } from '../../atoms/Container';
import { controller } from '../../../core';
import { Heading } from '../../atoms/Heading';
import { Paragraph } from '../../atoms/Paragraph';
import { Button } from '../../atoms/Button';
import { Feed } from '../../organisms/Feed';


const formatDate = (date) => moment(String(date)).format("DD.MM.YYYY hh:mm");

const Index: FC<Props> = ({ language, articles }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Container>
      <Heading
        as="h1"
        css={{
          fontSize: 40,
          marginTop: 50,
          marginBottom: 20
        }}
      >Последние статьи</Heading>
      <Feed articles={articles} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  const articles = await (await controller.get(`/posts/last`)).data.data;
  return { props: { language: locales[language], articles } }
}

export default Index;
