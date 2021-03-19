import React, { FC, useContext } from 'react';
import { Props } from './props';
import { Avatar } from '../Avatar';
import { controller, formatDate, getAvatar, notifyError, notifySuccess } from '../../../core';
import { Card } from '../Card';
import { useTheme } from '@emotion/react';
import classNames from 'classnames';
import { TokenContext, UserContext } from '../../contexts';
import { useRouter } from 'next/router';
import { AnchorButton } from '../../atoms/AnchorButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from '../Dropdown';

export const Comment: FC<Props> = ({ comment, className, onCommentsChange, ...rest }: Props) => {
  const theme = useTheme();
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const router = useRouter();

  const deleteComment = () => {
    controller.delete(`/comment/delete/${comment.id}?token=${token}`)
      .then(res => {
        notifySuccess('Комментарий успешно удален');
        onCommentsChange ? onCommentsChange((prev) => prev.filter(n => n.id != comment.id)) : void 0;
      })
      .catch(err => {
        const errData = err.response;
        switch (errData.data.error) {
          case 'wrong token':
            notifyError('Похоже вы не вошли');
            router.push('/login')
            break;
          case 'not found':
            notifyError('Статья не найдена');
            router.push('/');
            break;
          default:
            notifyError('Ошибка сервера. Попробуйте позже');
            break;
        }
      })
  }

  return (
    <Card className={classNames("d-flex animate__animated animate__fadeIn p-2", className)} css={{ marginBottom: 10 }} {...rest}>
      <div css={{ width: 40 }}>
        <Avatar url={getAvatar(comment.user.avatar)} />
      </div>
      <div className="col px-0 pl-3">
        <div className="d-flex">
          <span
            className="col px-0"
            css={{
              display: "block",
              fontSize: 12,
              color: theme.greyText
            }}
          >{comment.user?.name}</span>
          {user?.id === comment.user.id ? (
            <Dropdown
              placement="bottom-end"
              animation='shift-away'
              button={
                <button
                  className="d-block"
                  css={{
                    fontSize: 13,
                    color: theme.greyText,
                    fontFamily: "inherit",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                    transition: "color 0.2s",
                    "&:hover": {
                      color: theme.accentBlue,
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              }
            >
              <Card
                css={{
                  width: 160,
                  background: theme.globalBg,
                  boxShadow: theme.blockShadow,
                  padding: "10px"
                }}
              >
                <AnchorButton
                  css={{
                    fontSize: 12,
                    marginLeft: 5
                  }}
                  onClick={deleteComment}
                >Удалить комментарий</AnchorButton>
              </Card>
            </Dropdown>
          ): null}
        </div>
        <p
          css={{
            margin: 0,
            fontSize: 14
          }}
        >{comment.content}</p>
        <div>
          <span css={{
            color: theme.greyText,
            fontSize: 11
          }}>Добавлено: {formatDate(comment.created_at)}</span>
        </div>
      </div>
    </Card>
  );
}
