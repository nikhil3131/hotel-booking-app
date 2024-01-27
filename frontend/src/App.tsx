import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts';
import { Homepage } from './components';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Homepage/>
            }
        ]
    },
]);

export default function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}
