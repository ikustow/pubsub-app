import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getUrlOriginWithPath } from '~/utils';
import styles0 from './route.module.scss';
import classNames from 'classnames';
import { NavBarComp } from '~/components/nav-bar/nav-bar';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import { db } from '~/credentials/firebase-config';

export const loader = ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function HomePage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const username = 'ikustow';
    useEffect(() => {
        const q = query(collection(db, 'dayoffs'), where('username', '==', username));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const filteredData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(filteredData);
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [username]); // Обновляйте запрос, если `username` меняется

    const formatId = (id: string) => {
        if (id.length > 4) {
            return `${id.slice(0, 2)}...${id.slice(-2)}`;
        }
        return id;
    };

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new':
                return styles0['status-new'];
            case 'approved':
                return styles0['status-approved'];
            case 'canceled':
                return styles0['status-canceled'];
            default:
                return '';
        }
    };

    return (
        <div className={classNames(styles0.background)}>
            <div className={styles0.div2} />
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                }}
            >
                <h1 className={styles0.header1}>Your Requests</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles0.tableContainer}>
                        <table className={styles0.table}>
                            <thead>
                                <tr className={styles0.tr1}>
                                    <th className={styles0['th-head']}>ID</th>
                                    <th className={styles0['th-head']}>username</th>
                                    <th className={styles0['th-head']}>Reason</th>
                                    <th className={styles0['th-head']}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{formatId(item.id)}</td>
                                        <td>{item.username || 'N/A'}</td>
                                        <td>{item.reason || 'N/A'}</td>
                                        <td
                                            className={classNames(
                                                styles0.status,
                                                getStatusClass(item.status || '')
                                            )}
                                        >
                                            {item.status || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
