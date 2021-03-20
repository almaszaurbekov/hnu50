import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Props } from './props';
import React, { FC, useContext } from 'react';
import locales from '../../../core/locales';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { Container } from '../../atoms/Container';
import { controller } from '../../../core';
import { Heading } from '../../atoms/Heading';
import { Paragraph } from '../../atoms/Paragraph';
import { Button } from '../../atoms/Button';
import { Fragment } from 'react';
import { Card } from '../../molecules/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faMoneyCheck,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts';

const Index: FC<Props> = ({ language }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const user = useContext(UserContext);

  return (
    <Fragment>
      <div
        css={{
          backgroundImage: `url(/ill-main.jpeg)`,
          height: 600,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: theme.darkBg
        }}
      />
      <Container>
        <Card
          disableBorder
          className="p-5 text-center"
          css={{
            background: "#fff",
            boxShadow: theme.blockShadowWide,
            marginTop: -80,
          }}
        >
          <Heading
            as="h1"
            css={{
              fontSize: 25,
              color: theme.accentBlue,
              marginTop: 0,
              marginBottom: 0
            }}
          >Find your specialty with us</Heading>
          <Paragraph css={{
            fontSize: 13,
            color: theme.greyText,
            marginTop: 10
          }}>Click on the button to go to the test</Paragraph>
          <Button css={{
            padding: "10px 25px",
            textTransform: "initial",
            fontSize: 15,
            marginTop: 10
          }}>Take the test</Button>
        </Card>

        <Heading
          as="span"
          css={{
            display: "block",
            fontSize: 25,
            fontWeight: 600,
            marginTop: 30,
            textAlign: "center",
            marginBottom: 0
          }}
        >We will help you find your way to success</Heading>
        <div
          className="animate__animated animate__bounceIn"
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
            gridGap: 40,
            marginTop: 30
          }}
        >
          <Card
            className="p-3 py-5 text-center"
            css={{
              background: "#fff",
              boxShadow: theme.blockShadow
            }}
          >
            <span css={{ display: "block", fontSize: 20, fontWeight: 700 }}>Universities</span>
            <FontAwesomeIcon icon={faUniversity} css={{ fontSize: 70, color: theme.accentBlue, marginTop: 20 }} />
          </Card>
          <Card
            className="p-3 py-5 text-center"
            css={{
              background: "#fff",
              boxShadow: theme.blockShadow
            }}
          >
            <span css={{ display: "block", fontSize: 20, fontWeight: 700 }}>Results</span>
            <FontAwesomeIcon icon={faMoneyCheck} css={{ fontSize: 70, color: theme.accentBlue, marginTop: 20 }} />
          </Card>
          <Card
            className="p-3 py-5 text-center"
            css={{
              background: "#fff",
              boxShadow: theme.blockShadow
            }}
          >
            <span css={{ display: "block", fontSize: 20, fontWeight: 700 }}>Specialties</span>
            <FontAwesomeIcon icon={faGraduationCap} css={{ fontSize: 70, color: theme.accentBlue, marginTop: 20 }} />
          </Card>

        </div>
        <div className="text-center">
          <Button css={{
            padding: "10px 25px",
            textTransform: "initial",
            fontSize: 15,
            background: theme.accentOrange,
            marginTop: 30,
            marginBottom: 30,
            "&:hover": {
              background: theme.accentOrangeHover
            }
          }}>Take the test</Button>
        </div>
        <Card
          disableBorder
          css={{
            background: "#fff",
            boxShadow: theme.blockShadowWide,
          }}
        >
          <Heading
            as="span"
            css={{
              display: "block",
              fontSize: 25,
              fontWeight: 600,
              marginTop: 30,
              paddingTop: 40,
              textAlign: "center",
              marginBottom: 0
            }}
          >You will also be able to</Heading>
          <div className="d-flex align-items-end">
            <div className="col p-5 px-0 text-right">
              <span css={{
                fontSize: 25,
                fontWeight: 700,
                marginTop: 0,
                marginBottom: 0,
              }}>
                History
                <span css={{
                  color: theme.greyText,
                  fontSize: 140,
                  marginLeft: 30,
                  opacity: .3
                }}>01</span>
              </span>
              <Paragraph css={{
                marginTop: 5,
                fontSize: 15,
                marginLeft: "auto",
                fontWeight: 500,
                maxWidth: 300,
                lineHeight: 1.25,
                opacity: .8
              }}>
                We will store results in your profile, which will be very useful for you in the future.
              </Paragraph>
              <Button
                css={{
                  padding: "10px 30px",
                  textTransform: "initial",
                  fontSize: 14
                }}
                onClick={() => router.push(user ? `/profile/${user.id}` : `/login`)}
              >Go to profile</Button>
            </div>

            <div className="col-4 px-0">
              <img src="/ill-boy.png" css={{ width: "100%" }}/>
            </div>
          </div>
          <div className="d-flex align-items-end">
            <div className="col-5 px-0">
              <img src="/ill-girl.png" css={{ width: "100%" }}/>
            </div>
            <div className="col p-5 px-0 text-left">
              <span css={{
                fontSize: 25,
                fontWeight: 700,
                marginTop: 0,
                marginBottom: 0,
              }}>
                Events
                <span css={{
                  color: theme.greyText,
                  fontSize: 140,
                  marginLeft: 30,
                  opacity: .3
                }}>02</span>
              </span>
              <Paragraph css={{
                marginTop: 5,
                fontSize: 15,
                fontWeight: 500,
                maxWidth: 300,
                lineHeight: 1.25,
                opacity: .8
              }}>
                It's so cool to find friends with common interests, isn't it? You will be able to find friends.
              </Paragraph>
              <Button
                css={{
                  padding: "10px 30px",
                  textTransform: "initial",
                  fontSize: 14
                }}
                onClick={() => router.push(user ? `/profile/${user.id}` : `/login`)}
              >Go to University</Button>
            </div>


          </div>
        </Card>


      </Container>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  // const articles = await (await controller.get(`/posts/last`)).data.data;
  return { props: { language: locales[language] } }
}

export default Index;
