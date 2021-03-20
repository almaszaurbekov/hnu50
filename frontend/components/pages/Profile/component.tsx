import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Props } from './props';
import React, { FC, useContext } from 'react';
import locales from '../../../core/locales';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { Container } from '../../atoms/Container';
import { controller, getAvatar } from '../../../core';
import { Heading } from '../../atoms/Heading';
import { Paragraph } from '../../atoms/Paragraph';
import { Button } from '../../atoms/Button';
import { Feed } from '../../organisms/Feed';
import { Card } from '../../molecules/Card';
import { Profile as ProfileType } from '../../../core/mock';
import { Divider } from '../../atoms/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faIdCard, faPen, faRedo } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts';

const formatDate = (date) => moment(String(date)).format("DD.MM.YYYY hh:mm");

const Profile: FC<Props> = ({ language, user, recent_results, interests }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const currentUser = useContext(UserContext);

  return (
    <Container className="pt-5">
      <Head>
        <title>Профиль {user.name}</title>
      </Head>
      <Card
        className="d-flex align-items-start p-5 animate__animated animate__fadeInDown"
        disableBorder
        css={{
          boxShadow: theme.blockShadowWide
        }}
      >
        <div css={{ flex: "0 0 20%", borderRadius: 10, overflow: "hidden" }}>
          <img className="d-block w-100" src={getAvatar(user.avatar)} alt={user.name}/>
        </div>
        <Card disableBorder css={{ flex: 1, fontSize: 18, marginLeft: 40, padding: 30, boxShadow: theme.blockShadowWide, background: "#fff", }}>
          <Heading
            as="h1"
            css={{
              marginTop: 0,
              marginBottom: 5,
              fontSize: 25,
              color: theme.accentBlue
            }}
          >
            <FontAwesomeIcon icon={faIdCard} className="mr-3" />
            Profile of {user.name}
          </Heading>
          <Divider color={theme.greyBorder} className="mb-4 mt-2" />
          <div className="d-flex align-items-center my-2">
            <div css={{ flex: "0 0 20%", fontWeight: 600 }}>Fullname</div><div css={{ flex: 1 }}>{user.name} {user.last_name}</div>
          </div>
          <div className="d-flex align-items-center my-2">
            <div css={{ flex: "0 0 20%", fontWeight: 600 }}>Email</div><div css={{ flex: 1 }}>{user.email}</div>
          </div>

          {user.id === currentUser.id ? (
            <div className="text-right">
              <Button css={{ padding: "10px 20px", display: "inline-flex", alignItems: "center", marginTop: 20 }}>
                <FontAwesomeIcon icon={faPen} css={{ marginRight: 10, fontSize: 12 }} />
                <span>Edit</span>
              </Button>
            </div>
          ) : null}
        </Card>
      </Card>
      <div className="text-center">
        <Heading
          as="h1"
          css={{
            marginTop: 50,
            marginBottom: 5,
            fontSize: 25,
            color: theme.accentBlue
          }}
        >
          Recent results
        </Heading>
        <div className="mt-4">
          <Button className="mr-3">
            <FontAwesomeIcon className="mr-2" icon={faRedo} />
            Retake the test
          </Button>
          <Button>
            <FontAwesomeIcon className="mr-2" icon={faHistory} />
            View history
          </Button>
        </div>
        <div
          className="animate__animated animate__bounceIn"
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
            gridGap: 40,
            marginTop: 30
          }}
        >
          {recent_results.map((n, i) => (
            <div key={i}>
              <img
                className="w-100"
                src={getAvatar(n.image)}
                alt={n.name}
              />
              <span css={{
                fontSize: 23,
                fontWeight: 700,
                marginTop: 20,
                display: "block",
                marginBottom: 0
              }}>{n.name}</span>
              <Paragraph css={{
                marginTop: 5,
                lineHeight: 1.25,
                fontSize: 14,
                color: theme.greyText
              }}>{n.description}</Paragraph>
            </div>
          ))}
        </div>
      </div>
      <Card
        className="p-5"
        css={{
          background: "#fff",
          marginTop: 50,
          boxShadow: theme.blockShadow,
          textAlign: "center"
        }}
      >
        <Heading
          as="span"
          css={{
            display: "block",
            fontSize: 30,
            fontWeight: 700,
            color: theme.accentBlue,
            marginBottom: 25
          }}
        >
          Interests
        </Heading>
        {interests.map((m, i) => (
          <div css={{
            fontSize: 16,
            display: "inline-block",
            padding: "10px 25px",
            background: theme.accentBlue,
            color: "#fff",
            fontWeight: 600,
            borderRadius: 100,
            marginRight: 10,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)"
            }
          }}>{m}</div>
        ))}
      </Card>


    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  const id = ctx.query.id;
  // const res = await (await controller.get(`/profile/${id}`)).data.data;
  const res: ProfileType = {
    user: {
      id: 1,
      name: "Yernazar",
      last_name: "Karabayev",
      email: "soundsnick@gmail.com",
      avatar: null
    },
    recent_results: [
      {
        id: 1,
        name: "Doctor",
        description: "Doctors give aid",
        image: null
      },
      {
        id: 2,
        name: "Strip-dancer",
        description: "Dances strip dances",
        image: null
      },
      {
        id: 3,
        name: "Racer",
        description: "Rides some cool cars",
        image: null
      }
    ],
    interests: [
      "Math", "Driving", "Fishing", "Gay-sex"
    ]
  }
  return { props: { language: locales[language], user: res.user, interests: res.interests, recent_results: res.recent_results } }
}

export default Profile;
