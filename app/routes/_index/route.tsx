import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getUrlOriginWithPath } from '~/utils';
import styles0 from './route.module.scss';
import classNames from 'classnames';
import { NavBarComp } from '~/components/nav-bar/nav-bar';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from '@firebase/firestore';
import { db } from '~/credentials/firebase-config';

export const loader = ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function HomePage() {
    const [data, setData] = useState<any[]>([]); // Состояние для хранения данных
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Слушатель изменений в коллекции 'dayoffs'
        const unsubscribe = onSnapshot(
          collection(db, 'dayoffs'),
          (snapshot) => {
              const tableData = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));
              setData(tableData); // Обновляем состояние с новыми данными
              setLoading(false);
          },
          (error) => {
              console.error('Ошибка при чтении данных:', error);
              setLoading(false);
          }
        );

        // Отписываемся от слушателя при размонтировании компонента
        return () => unsubscribe();
    }, []);

    return (
        <div className={classNames(styles0.background)}>
            <div className={styles0.div2} />

            {/* Таблица данных */}
            <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                {loading ? (
                  <p>Загрузка данных...</p>
                ) : (
                  <table style={{ backgroundColor: 'white', margin: '20px auto' }}>
                      <thead>
                      <tr>
                          <th>ID</th>
                          <th>Field 1</th>
                          <th>Field 2</th>
                          {/* Добавьте другие поля, если нужно */}
                      </tr>
                      </thead>
                      <tbody>
                      {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            {/* Замените field1 и field2 на реальные имена полей */}
                        </tr>
                      ))}
                      </tbody>
                  </table>
                )}
            </div>


            <NavBarComp />           
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = 'Blank Starter';
    const description = 'Welcome to the Blank Starter';
    const imageUrl = 'https://website-starter.com/og-image.png';

    return [
        { title },
        {
            name: 'description',
            content: description,
        },
        {
            tagName: 'link',
            rel: 'canonical',
            href: data?.canonicalUrl,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: imageUrl,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: description,
        },
        {
            name: 'twitter:image',
            content: imageUrl,
        },
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/ico',
        },
    ];
};
