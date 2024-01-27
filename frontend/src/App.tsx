import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    },
]);

export default function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}
