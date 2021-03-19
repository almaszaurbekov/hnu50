import React, { FC, Fragment, useContext, useRef } from 'react';
import { Props } from './props';
import { Container } from '../../atoms/Container';
import { Heading } from '../../atoms/Heading';
import { AnchorButton } from '../../atoms/AnchorButton';
import { useRouter } from 'next/router';
import { NavigationItem } from './libs/NavigationItem';
import { useTheme } from '@emotion/react';
import { TokenContext, UserContext } from '../../contexts';
import { Dropdown } from '../../molecules/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../molecules/Card';
import { DropdownItem } from './libs/DropdownItem';
import { Avatar } from '../../molecules/Avatar';
import { controller, getAvatar } from '../../../core';
import { Divider } from '../../atoms/Divider';

export const Header: FC<Props> = ({ ...rest }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const token = useContext(TokenContext);

  const isAuthenticated = token && token.length > 0;
  const user = useContext(UserContext);

  const handleLogout = async () => {
    await controller.delete(`/user/logout?token=${token}`);
    localStorage.removeItem("access_token");
    location.reload();
  }

  return (
    <header css={{ background: theme.lightBg }} {...rest}>
      <Container>
        <div className="d-flex align-items-center">
          <Heading
            as="span"
            css={{
              fontSize: 50,
              fontWeight: 800
            }}
          >
            <AnchorButton onClick={() => router.push(`/`)}>A</AnchorButton>
          </Heading>
          <nav
            css={{
              marginLeft: 30
            }}
          >
            <NavigationItem onClick={() => router.push(`/articles`)}>Категории</NavigationItem>
            <NavigationItem onClick={() => router.push(`/articles`)}>Все статьи</NavigationItem>
            <NavigationItem onClick={() => router.push(`/contacts`)}>Контакты</NavigationItem>
          </nav>
          <nav
            css={{
              marginLeft: "auto"
            }}>
            {isAuthenticated ? (
              <Fragment>
                {user ? (
                  <Dropdown
                    offset={[0, 10]}
                    trigger='click'
                    placement="bottom-end"
                    animation='shift-away'
                    maxWidth={500}
                    button={
                      <button
                        className="d-block"
                        css={{
                          fontSize: 13,
                          fontFamily: "inherit",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          outline: "none",
                          width: 160,
                          transition: "color 0.2s",
                          "&:hover": {
                            color: theme.accentBlue,
                          }
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-end">
                          <Avatar
                            url={getAvatar(user.avatar)}
                            css={{
                              display: "inline-block",
                              width: 35,
                              marginRight: 15
                            }}
                          />
                          <div>
                            {user.name}
                            <FontAwesomeIcon className="ml-2" icon={faAngleDown} />
                          </div>
                        </div>
                      </button>
                    }
                  >
                    <Card
                      css={{
                        width: 160,
                        boxShadow: theme.blockShadow,
                        padding: "15px 25px"
                      }}
                    >
                      <DropdownItem>Профиль</DropdownItem>
                      <DropdownItem>Настройки</DropdownItem>
                      <Divider
                        css={{
                          margin: "10px auto",
                        }}
                        color="#dcdcdc"
                      />
                      <DropdownItem onClick={handleLogout}>Выйти</DropdownItem>
                    </Card>
                  </Dropdown>
                  ) : null}
              </Fragment>
            ) : (
              <Fragment>
                <NavigationItem onClick={() => router.push(`/login`)}>Войти</NavigationItem>
                <NavigationItem onClick={() => router.push(`/register`)}>Зарегистрироваться</NavigationItem>
              </Fragment>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
