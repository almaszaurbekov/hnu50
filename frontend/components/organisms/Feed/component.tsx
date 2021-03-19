import React, { FC } from 'react';
import { Props } from './props';
import { Heading } from '../../atoms/Heading';
import { Paragraph } from '../../atoms/Paragraph';
import { useRouter } from 'next/router';

export const Feed: FC<Props> = ({ articles, ...rest }: Props) => {
  const router = useRouter();
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(100px, 1fr))",
        gridGap: 50
      }}
      {...rest}
    >
      {articles.map((n, i) => (
        <div key={i}>
          <img
            src={n.cover}
            css={{
              width: "100%"
            }}
          />
          <div
            css={{
              padding: "0 10px"
            }}
          >
            <Heading
              as="h2"
              css={{
                margin: 0,
                marginTop: 15,
                marginBottom: 5
              }}
            >{n.title}</Heading>
            <Paragraph
              css={{
                fontSize: 13,
                lineHeight: 1.25,
                marginTop: 0,
                marginBottom: 25
              }}
            >
              {n.content}
            </Paragraph>
            <button
              css={{
                fontFamily: "inherit",
                fontSize: 11,
                fontWeight: 600,
                padding: "5px 10px",
                background: "transparent",
                border: "2px solid black",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onClick={() => { router.push(`/articles/${n.id}`) }}
            >Подробнее</button>
          </div>
        </div>
      ))}
    </div>
  );
}
