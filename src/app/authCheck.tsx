import { useEffect, useState, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useVerifyToken } from '../hooks/useVerifyToken'; // Import the custom hook

interface Props {
    children?: React.ReactNode;
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const ComponentWithAuth = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

        const { data, isLoading: tokenLoading, error } = useVerifyToken(token);

        useEffect(() => {
            if (!token) {
                router.push('/login'); 
                return;
            }

            if (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('isAuthenticated');
                router.push('/login');
            }

            if (data) {
                setIsLoading(false);
            }
        }, [data, error, token, router]);

        if (tokenLoading || isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-white">
                    <div className="border-t-transparent border-solid animate-spin border-blue-500 border-8 rounded-full w-16 h-16 border-t-8"></div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
};

export default withAuth;



