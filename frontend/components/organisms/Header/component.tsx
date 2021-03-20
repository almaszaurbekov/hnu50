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
      <Container css={{
        borderBottom: `1px solid ${theme.greyBorder}`,
      }}>
        <div className="d-flex align-items-center">
          <Heading
            as="span"
            css={{
              fontSize: 20,
              fontWeight: 600
            }}
          >
            <AnchorButton className="d-flex align-items-center py-3" onClick={() => router.push(`/`)}>
              <img src="/logo.png" alt="" css={{ height: 40 }} />
              <span>100specialists</span>
            </AnchorButton>
          </Heading>
          <nav
            css={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center"
            }}>
            <NavigationItem onClick={() => router.push(`/`)}>Main</NavigationItem>
            <NavigationItem onClick={() => router.push(`/university`)}>University</NavigationItem>
            <NavigationItem onClick={() => router.push(`/specialization`)}>Specialization</NavigationItem>
            <NavigationItem onClick={() => router.push(`/tests`)}>Tests</NavigationItem>
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
                          fontWeight: 500,
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
                              marginRight: 15,
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
                      disableBorder
                      css={{
                        width: 160,
                        boxShadow: theme.blockShadow,
                        borderRadius: 10,
                        padding: "15px 25px"
                      }}
                    >
                      <DropdownItem>Profile</DropdownItem>
                      <DropdownItem>Settings</DropdownItem>
                      <Divider
                        color={theme.accentBlueHover}
                        css={{
                          margin: "7px auto",
                        }}
                      />
                      <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
                    </Card>
                  </Dropdown>
                  ) : null}
              </Fragment>
            ) : (
              <Fragment>
                <NavigationItem onClick={() => router.push(`/login`)}>Login</NavigationItem>
                <NavigationItem onClick={() => router.push(`/register`)}>Sign Up</NavigationItem>
              </Fragment>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
